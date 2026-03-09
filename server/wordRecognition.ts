import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { ENV } from './_core/env';
import { allKanaCharacters } from '../shared/kanaData';
import { findKanjiByCharacter } from '../shared/kanjiData';

export interface RecognitionResult {
  character: string;
  romaji: string;
  type: 'hiragana' | 'katakana' | 'kanji';
  confidence: number;
  category?: string;
  meanings?: string[];
}

export interface WordRecognitionResult {
  word: string;
  romaji: string;
  characters: RecognitionResult[];
  wordType: 'hiragana' | 'katakana' | 'kanji' | 'mixed';
  confidence: number;
}

export interface TranslationResult {
  word: string;
  romaji: string;
  translation: string;
  definitions?: string[];
}

// Initialize the AI SDK with Google Gemini
const model = google('gemini-3.1-flash-lite-preview');

export async function recognizeCharacter(
  canvasDataUrl: string
): Promise<RecognitionResult | null> {
  console.log('[RECOGNIZE] Starting character recognition...');

  try {
    if (!ENV.googleApiKey && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('[RECOGNIZE] Error: No Google API Key found in environment');
      return null;
    }

    const base64Data = canvasDataUrl.split(',')[1];
    if (!base64Data) {
      console.error('[RECOGNIZE] Error: Invalid image data');
      return null;
    }

    const recognitionSchema = z.object({
      character: z.string().describe('The recognized Japanese character'),
      romaji: z.string().describe('The romaji pronunciation'),
      type: z.enum(['hiragana', 'katakana', 'kanji']).describe('Character type'),
      confidence: z.number().describe('Confidence score between 0 and 1'),
    });

    console.log('[RECOGNIZE] Calling AI SDK (generateObject) with gemini-3.1-flash-lite-preview...');

    const result = await generateObject({
      model,
      schema: recognitionSchema,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'You are a Japanese handwriting recognition expert. Tell me what Japanese character (Hiragana, Katakana, or Kanji) is drawn in this image. Response format: { "character": "...", "romaji": "...", "type": "...", "confidence": 0.0-1.0 }',
            },
            {
              type: 'image',
              image: base64Data,
            },
          ],
        },
      ],
    });

    console.log('[RECOGNIZE] AI Response:', JSON.stringify(result.object));

    const { character, romaji, type, confidence } = result.object;

    if (!character || !romaji || !type) {
      console.warn('[RECOGNIZE] Incomplete response from AI');
      return null;
    }

    // Try to find more detailed data in our shared sets
    let detailedInfo: any = null;
    if (type === 'kanji') {
      detailedInfo = findKanjiByCharacter(character);
    } else {
      detailedInfo = allKanaCharacters.find(c => c.character === character);
    }

    return {
      character,
      romaji: detailedInfo?.romaji || romaji,
      type: type as any,
      confidence: confidence || 0.9,
      category: detailedInfo?.category,
      meanings: detailedInfo?.meanings,
    };

  } catch (error: any) {
    console.error('[RECOGNIZE] Fatal error during recognition:', error);
    throw error;
  }
}

export function buildWordFromCharacters(
  characters: RecognitionResult[]
): WordRecognitionResult {
  const word = characters.map((c) => c.character).join('');
  const romaji = characters.map((c) => c.romaji).join('');
  const confidence =
    characters.reduce((sum, c) => sum + c.confidence, 0) / characters.length;

  const types = new Set(characters.map((c) => c.type));
  let wordType: 'hiragana' | 'katakana' | 'kanji' | 'mixed';
  if (types.size === 1) {
    wordType = Array.from(types)[0] as 'hiragana' | 'katakana' | 'kanji';
  } else {
    wordType = 'mixed';
  }

  return {
    word,
    romaji,
    characters,
    wordType,
    confidence,
  };
}

export async function translateWord(
  word: string,
  romaji: string,
  wordType: string
): Promise<TranslationResult | null> {
  console.log(`[TRANSLATE] Translating: ${word}`);
  try {
    const translationSchema = z.object({
      translation: z.string(),
      definitions: z.array(z.string()).optional(),
    });

    const result = await generateObject({
      model,
      schema: translationSchema,
      messages: [
        {
          role: 'user',
          content: `Translate this Japanese word to English. Word: ${word}, Romaji: ${romaji}, Type: ${wordType}. Provide a concise translation and optional definitions.`,
        },
      ],
    });

    return {
      word,
      romaji,
      translation: result.object.translation,
      definitions: result.object.definitions,
    };
  } catch (error) {
    console.error('[TRANSLATE] Error:', error);
    throw error;
  }
}
