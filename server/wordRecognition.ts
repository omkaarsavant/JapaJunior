import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod/v4';
import { ENV } from './_core/env';

let allKanaCharacters: any[] = [];
let getAllKanjiCharacters: any;
let findKanjiByCharacter: any;

async function loadCharacterData() {
  if (allKanaCharacters.length === 0) {
    const kanaModule = await import('../shared/kanaData');
    const kanjiModule = await import('../shared/kanjiData');
    allKanaCharacters = kanaModule.allKanaCharacters;
    getAllKanjiCharacters = kanjiModule.getAllKanjiCharacters;
    findKanjiByCharacter = kanjiModule.findKanjiByCharacter;
  }
}

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
  try {
    await loadCharacterData();
    const base64Data = canvasDataUrl.split(',')[1];
    if (!base64Data) {
      console.error('Invalid canvas data URL');
      return null;
    }

    const recognitionSchema = z.object({
      character: z.string().describe('The recognized Japanese character'),
      romaji: z.string().describe('The romaji pronunciation'),
      type: z.enum(['hiragana', 'katakana', 'kanji']).describe('Character type'),
      confidence: z.number().min(0).max(1).describe('Confidence score between 0 and 1'),
    });

    const result = await generateObject({
      model,
      schema: recognitionSchema,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Recognize this handwritten Japanese character. Return character, romaji, type, and confidence.',
            },
            {
              type: 'image',
              image: base64Data,
            },
          ],
        },
      ],
    });

    if (!result.object.character || !result.object.romaji || !result.object.type) {
      return null;
    }

    let validCharacter = null;

    if (result.object.type === 'kanji') {
      validCharacter = findKanjiByCharacter(result.object.character);
    } else {
      validCharacter = allKanaCharacters.find(
        (char) => char.character === result.object.character
      );
    }

    if (!validCharacter) {
      console.warn('Character not found in database');
      return null;
    }

    const confidence = Math.min(Math.max(result.object.confidence, 0), 1);
    if (confidence < 0.5) {
      return null;
    }

    return {
      character: validCharacter.character,
      romaji: validCharacter.romaji,
      type: result.object.type,
      confidence,
      category: 'category' in validCharacter ? validCharacter.category : undefined,
      meanings: 'meanings' in validCharacter ? validCharacter.meanings : undefined,
    };
  } catch (error) {
    console.error('Character recognition error:', error);
    return null;
  }
}

export function buildWordFromCharacters(
  characters: RecognitionResult[]
): WordRecognitionResult {
  if (characters.length === 0) {
    throw new Error('No characters provided');
  }

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
  try {
    const translationSchema = z.object({
      translation: z.string().describe('English translation'),
      definitions: z.array(z.string()).optional().describe('Definitions'),
    });

    const result = await generateObject({
      model,
      schema: translationSchema,
      messages: [
        {
          role: 'user',
          content: `Translate to English: ${word} (${romaji}, ${wordType})`,
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
    console.error('Translation error:', error);
    return null;
  }
}
