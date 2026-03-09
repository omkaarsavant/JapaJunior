import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role", { enum: ["user", "admin"] }).$type<"user" | "admin">().default("user").notNull(),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  lastSignedIn: integer("lastSignedIn", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Word history table for storing recognized words with translations
export const wordHistory = sqliteTable('wordHistory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  word: text('word').notNull(),
  romaji: text('romaji').notNull(),
  translation: text('translation'),
  wordType: text('wordType', { enum: ['hiragana', 'katakana', 'kanji', 'mixed'] }).$type<'hiragana' | 'katakana' | 'kanji' | 'mixed'>().notNull(),
  characters: text('characters').notNull(), // JSON string of character objects
  confidence: integer('confidence'), // Average confidence score (0-100)
  createdAt: integer('createdAt', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export type WordHistory = typeof wordHistory.$inferSelect;
export type InsertWordHistory = typeof wordHistory.$inferInsert;

// Character recognition cache for faster lookups
export const characterCache = sqliteTable('characterCache', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  character: text('character').notNull().unique(),
  romaji: text('romaji').notNull(),
  characterType: text('characterType', { enum: ['hiragana', 'katakana', 'kanji'] }).$type<'hiragana' | 'katakana' | 'kanji'>().notNull(),
  meanings: text('meanings'), // JSON string of English meanings
  strokeCount: integer('strokeCount'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export type CharacterCache = typeof characterCache.$inferSelect;
export type InsertCharacterCache = typeof characterCache.$inferInsert;