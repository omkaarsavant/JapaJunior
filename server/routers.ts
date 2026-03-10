import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  recognizeCharacter,
  buildWordFromCharacters,
  translateWord
} from './wordRecognition';

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

  auth: router({
    me: publicProcedure.query(({ ctx }) => {
      return ctx.user;
    }),
    logout: publicProcedure.mutation(() => {
      return { success: true };
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
  }),
});

export type AppRouter = typeof appRouter;
