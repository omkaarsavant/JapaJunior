import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL || "file:./sqlite.db";
    const authToken = process.env.DATABASE_AUTH_TOKEN;

    try {
      const client = createClient({
        url,
        authToken: authToken || undefined
      });
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Word History Queries
 */
export async function saveWordToHistory(
  userId: number,
  word: string,
  romaji: string,
  translation: string | null,
  wordType: 'hiragana' | 'katakana' | 'kanji' | 'mixed',
  characters: string,
  confidence: number
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot save word: database not available');
    return;
  }

  try {
    await db.insert(users).values({
      openId: '',
    }).onConflictDoNothing();

    // Insert word history
    const { wordHistory: wh } = await import('../drizzle/schema');
    await db.insert(wh).values({
      userId,
      word,
      romaji,
      translation,
      wordType,
      characters,
      confidence: Math.round(confidence),
    });
  } catch (error) {
    console.error('[Database] Failed to save word to history:', error);
    throw error;
  }
}

export async function getUserWordHistory(
  userId: number,
  limit: number = 50
): Promise<any[]> {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot get word history: database not available');
    return [];
  }

  try {
    const { wordHistory: wh } = await import('../drizzle/schema');
    const { desc } = await import('drizzle-orm');
    const result = await db
      .select()
      .from(wh)
      .where(eq(wh.userId, userId))
      .orderBy(desc(wh.createdAt))
      .limit(limit);
    return result;
  } catch (error) {
    console.error('[Database] Failed to get word history:', error);
    return [];
  }
}

export async function deleteWordFromHistory(wordId: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot delete word: database not available');
    return false;
  }

  try {
    const { wordHistory: wh } = await import('../drizzle/schema');
    await db.delete(wh).where(and(eq(wh.id, wordId), eq(wh.userId, userId)));
    return true;
  } catch (error) {
    console.error('[Database] Failed to delete word:', error);
    return false;
  }
}

// TODO: add more feature queries here as your schema grows.
