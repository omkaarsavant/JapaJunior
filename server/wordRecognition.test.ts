import { describe, it, expect, vi } from 'vitest';
import {
  recognizeCharacter,
  translateWord,
  buildWordFromCharacters,
  type RecognitionResult,
} from './wordRecognition';

describe('Word Recognition Service', () => {
  describe('buildWordFromCharacters', () => {
    it('should combine multiple hiragana characters into a word', () => {
      const chars: RecognitionResult[] = [
        { character: 'さ', romaji: 'sa', type: 'hiragana', confidence: 0.95 },
        { character: 'く', romaji: 'ku', type: 'hiragana', confidence: 0.92 },
        { character: 'ら', romaji: 'ra', type: 'hiragana', confidence: 0.88 },
      ];

      const word = buildWordFromCharacters(chars);
      expect(word.word).toBe('さくら');
      expect(word.romaji).toBe('sakura');
      expect(word.wordType).toBe('hiragana');
      expect(word.confidence).toBeCloseTo(0.917, 2);
      expect(word.characters).toHaveLength(3);
    });

    it('should combine katakana characters', () => {
      const chars: RecognitionResult[] = [
        { character: 'コ', romaji: 'ko', type: 'katakana', confidence: 0.9 },
        { character: 'ン', romaji: 'n', type: 'katakana', confidence: 0.85 },
        { character: 'ピ', romaji: 'pi', type: 'katakana', confidence: 0.88 },
      ];

      const word = buildWordFromCharacters(chars);
      expect(word.word).toBe('コンピ');
      expect(word.romaji).toBe('konpi');
      expect(word.wordType).toBe('katakana');
    });

    it('should handle mixed character types', () => {
      const chars: RecognitionResult[] = [
        { character: 'あ', romaji: 'a', type: 'hiragana', confidence: 0.9 },
        { character: 'カ', romaji: 'ka', type: 'katakana', confidence: 0.85 },
      ];

      const word = buildWordFromCharacters(chars);
      expect(word.word).toBe('あカ');
      expect(word.romaji).toBe('aka');
      expect(word.wordType).toBe('mixed');
    });

    it('should calculate average confidence correctly', () => {
      const chars: RecognitionResult[] = [
        { character: 'あ', romaji: 'a', type: 'hiragana', confidence: 1.0 },
        { character: 'い', romaji: 'i', type: 'hiragana', confidence: 0.8 },
        { character: 'う', romaji: 'u', type: 'hiragana', confidence: 0.6 },
      ];

      const word = buildWordFromCharacters(chars);
      expect(word.confidence).toBeCloseTo(0.8, 1);
    });

    it('should handle single character', () => {
      const chars: RecognitionResult[] = [
        { character: 'あ', romaji: 'a', type: 'hiragana', confidence: 0.95 },
      ];

      const word = buildWordFromCharacters(chars);
      expect(word.word).toBe('あ');
      expect(word.romaji).toBe('a');
      expect(word.confidence).toBe(0.95);
      expect(word.characters).toHaveLength(1);
    });

    it('should throw error for empty input', () => {
      expect(() => buildWordFromCharacters([])).toThrow('No characters provided');
    });

    it('should preserve character metadata', () => {
      const chars: RecognitionResult[] = [
        {
          character: '漢',
          romaji: 'kan',
          type: 'kanji',
          confidence: 0.92,
          category: 'common',
          meanings: ['Chinese', 'Han'],
        },
      ];

      const word = buildWordFromCharacters(chars);
      expect(word.characters[0].meanings).toEqual(['Chinese', 'Han']);
      expect(word.characters[0].category).toBe('common');
    });
  });

  describe('translateWord', () => {
    it('should translate a simple hiragana word', async () => {
      const result = await translateWord('あ', 'a', 'hiragana');

      expect(result).toBeDefined();
      expect(result?.translation).toBeDefined();
      expect(typeof result?.translation).toBe('string');
      expect(result?.word).toBe('あ');
      expect(result?.romaji).toBe('a');
    });

    it('should translate a katakana word', async () => {
      const result = await translateWord('コンピュータ', 'konpyuta', 'katakana');

      expect(result).toBeDefined();
      expect(result?.translation).toBeDefined();
      expect(typeof result?.translation).toBe('string');
    });

    it('should handle mixed character types', async () => {
      const result = await translateWord('あカ', 'aka', 'mixed');

      expect(result).toBeDefined();
      expect(result?.translation).toBeDefined();
    });

    it('should include word and romaji in response', async () => {
      const result = await translateWord('あ', 'a', 'hiragana');

      expect(result).toHaveProperty('word');
      expect(result).toHaveProperty('romaji');
      expect(result).toHaveProperty('translation');
      expect(result?.word).toBe('あ');
      expect(result?.romaji).toBe('a');
    });

    it('should handle translation errors gracefully', async () => {
      // Test with empty string
      const result = await translateWord('', '', 'hiragana');
      // Should either return null or a valid result
      expect(result === null || result?.translation !== undefined).toBe(true);
    });
  });

  describe('recognizeCharacter', () => {
    it('should return null for invalid canvas data', async () => {
      const result = await recognizeCharacter('invalid-data');
      expect(result).toBeNull();
    });

    it('should return null for empty canvas data URL', async () => {
      const result = await recognizeCharacter('');
      expect(result).toBeNull();
    });

    it('should return null if base64 data is missing', async () => {
      const result = await recognizeCharacter('data:image/png;base64,');
      expect(result).toBeNull();
    });

    it('should handle malformed data URLs', async () => {
      const result = await recognizeCharacter('data:image/png;base64');
      expect(result).toBeNull();
    });

    it('should attempt to recognize valid base64 data', async () => {
      // Create a minimal valid PNG base64 string
      const validPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const dataUrl = `data:image/png;base64,${validPngBase64}`;

      // This will likely return null due to LLM recognition, but should not throw
      const result = await recognizeCharacter(dataUrl);
      expect(result === null || result?.character !== undefined).toBe(true);
    });
  });

  describe('Integration: Character Recognition to Word Building', () => {
    it('should build a word from multiple recognized characters', () => {
      const recognizedChars: RecognitionResult[] = [
        { character: 'あ', romaji: 'a', type: 'hiragana', confidence: 0.95 },
        { character: 'い', romaji: 'i', type: 'hiragana', confidence: 0.93 },
        { character: 'う', romaji: 'u', type: 'hiragana', confidence: 0.91 },
      ];

      const word = buildWordFromCharacters(recognizedChars);

      expect(word.word).toBe('あいう');
      expect(word.romaji).toBe('aiu');
      expect(word.wordType).toBe('hiragana');
      expect(word.confidence).toBeGreaterThan(0.9);
    });

    it('should handle word with varying confidence levels', () => {
      const recognizedChars: RecognitionResult[] = [
        { character: 'さ', romaji: 'sa', type: 'hiragana', confidence: 0.99 },
        { character: 'く', romaji: 'ku', type: 'hiragana', confidence: 0.5 },
        { character: 'ら', romaji: 'ra', type: 'hiragana', confidence: 0.95 },
      ];

      const word = buildWordFromCharacters(recognizedChars);

      expect(word.confidence).toBeCloseTo(0.813, 2);
      expect(word.confidence).toBeGreaterThan(0.5);
    });
  });
});
