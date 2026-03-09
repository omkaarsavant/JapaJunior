import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  recognizeCharacter,
  buildWordFromCharacters,
  translateWord
} from './wordRecognition';
import {
  saveWordToHistory,
  getUserWordHistory,
  deleteWordFromHistory
} from './db';

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  recognition: router({
    recognize: publicProcedure
      .input(z.object({ canvasDataUrl: z.string() }))
      .mutation(async ({ input }) => {
        return recognizeCharacter(input.canvasDataUrl);
      }),
  }),

  word: router({
    recognizeWord: publicProcedure
      .input(z.object({ characters: z.array(z.any()) }))
      .mutation(async ({ input }) => {
        return buildWordFromCharacters(input.characters);
      }),

    translate: publicProcedure
      .input(z.object({ word: z.string(), romaji: z.string(), wordType: z.string() }))
      .mutation(async ({ input }) => {
        return translateWord(input.word, input.romaji, input.wordType);
      }),

    saveToHistory: protectedProcedure
      .input(
        z.object({
          word: z.string(),
          romaji: z.string(),
          translation: z.string().nullable(),
          wordType: z.enum(['hiragana', 'katakana', 'kanji', 'mixed']),
          characters: z.string(),
          confidence: z.number(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        await saveWordToHistory(
          ctx.user.id,
          input.word,
          input.romaji,
          input.translation,
          input.wordType,
          input.characters,
          input.confidence
        );
        return { success: true };
      }),

    getHistory: protectedProcedure
      .input(z.object({ limit: z.number().default(50) }).optional())
      .query(async ({ input, ctx }) => {
        return getUserWordHistory(ctx.user.id, input?.limit || 50);
      }),

    deleteFromHistory: protectedProcedure
      .input(z.object({ wordId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const success = await deleteWordFromHistory(input.wordId, ctx.user.id);
        return { success };
      }),
  }),
});

export type AppRouter = typeof appRouter;
