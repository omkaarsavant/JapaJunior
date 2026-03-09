import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User;
};

// Default user for local-only/no-auth mode
const DEFAULT_USER_OPEN_ID = 'local-user';

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  const db = await getDb();
  let user: User | null = null;

  if (db) {
    try {
      // Find or create local user
      const results = await db.select().from(users).where(eq(users.openId, DEFAULT_USER_OPEN_ID)).limit(1);
      if (results.length > 0) {
        user = results[0];
      } else {
        const insertResult = await db.insert(users).values({
          openId: DEFAULT_USER_OPEN_ID,
          name: 'Local User',
          role: 'user',
        }).returning();
        user = insertResult[0];
      }
    } catch (error) {
      console.error("[Auth Bypass] Failed to find or create default user:", error);
    }
  }

  // Fallback if DB is not ready or failed
  if (!user) {
    user = {
      id: 1,
      openId: DEFAULT_USER_OPEN_ID,
      name: 'Local User',
      email: null,
      loginMethod: null,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
