export interface KanaCharacter {
  character: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  category: 'basic' | 'dakuten' | 'handakuten' | 'small' | 'combination';
}

// All Hiragana characters
export const hiraganaCharacters: KanaCharacter[] = [
  // Basic Hiragana (46 characters)
  { character: 'あ', romaji: 'a', type: 'hiragana', category: 'basic' },
  { character: 'い', romaji: 'i', type: 'hiragana', category: 'basic' },
  { character: 'う', romaji: 'u', type: 'hiragana', category: 'basic' },
  { character: 'え', romaji: 'e', type: 'hiragana', category: 'basic' },
  { character: 'お', romaji: 'o', type: 'hiragana', category: 'basic' },
  { character: 'か', romaji: 'ka', type: 'hiragana', category: 'basic' },
  { character: 'き', romaji: 'ki', type: 'hiragana', category: 'basic' },
  { character: 'く', romaji: 'ku', type: 'hiragana', category: 'basic' },
  { character: 'け', romaji: 'ke', type: 'hiragana', category: 'basic' },
  { character: 'こ', romaji: 'ko', type: 'hiragana', category: 'basic' },
  { character: 'さ', romaji: 'sa', type: 'hiragana', category: 'basic' },
  { character: 'し', romaji: 'shi', type: 'hiragana', category: 'basic' },
  { character: 'す', romaji: 'su', type: 'hiragana', category: 'basic' },
  { character: 'せ', romaji: 'se', type: 'hiragana', category: 'basic' },
  { character: 'そ', romaji: 'so', type: 'hiragana', category: 'basic' },
  { character: 'た', romaji: 'ta', type: 'hiragana', category: 'basic' },
  { character: 'ち', romaji: 'chi', type: 'hiragana', category: 'basic' },
  { character: 'つ', romaji: 'tsu', type: 'hiragana', category: 'basic' },
  { character: 'て', romaji: 'te', type: 'hiragana', category: 'basic' },
  { character: 'と', romaji: 'to', type: 'hiragana', category: 'basic' },
  { character: 'な', romaji: 'na', type: 'hiragana', category: 'basic' },
  { character: 'に', romaji: 'ni', type: 'hiragana', category: 'basic' },
  { character: 'ぬ', romaji: 'nu', type: 'hiragana', category: 'basic' },
  { character: 'ね', romaji: 'ne', type: 'hiragana', category: 'basic' },
  { character: 'の', romaji: 'no', type: 'hiragana', category: 'basic' },
  { character: 'は', romaji: 'ha', type: 'hiragana', category: 'basic' },
  { character: 'ひ', romaji: 'hi', type: 'hiragana', category: 'basic' },
  { character: 'ふ', romaji: 'fu', type: 'hiragana', category: 'basic' },
  { character: 'へ', romaji: 'he', type: 'hiragana', category: 'basic' },
  { character: 'ほ', romaji: 'ho', type: 'hiragana', category: 'basic' },
  { character: 'ま', romaji: 'ma', type: 'hiragana', category: 'basic' },
  { character: 'み', romaji: 'mi', type: 'hiragana', category: 'basic' },
  { character: 'む', romaji: 'mu', type: 'hiragana', category: 'basic' },
  { character: 'め', romaji: 'me', type: 'hiragana', category: 'basic' },
  { character: 'も', romaji: 'mo', type: 'hiragana', category: 'basic' },
  { character: 'や', romaji: 'ya', type: 'hiragana', category: 'basic' },
  { character: 'ゆ', romaji: 'yu', type: 'hiragana', category: 'basic' },
  { character: 'よ', romaji: 'yo', type: 'hiragana', category: 'basic' },
  { character: 'ら', romaji: 'ra', type: 'hiragana', category: 'basic' },
  { character: 'り', romaji: 'ri', type: 'hiragana', category: 'basic' },
  { character: 'る', romaji: 'ru', type: 'hiragana', category: 'basic' },
  { character: 'れ', romaji: 're', type: 'hiragana', category: 'basic' },
  { character: 'ろ', romaji: 'ro', type: 'hiragana', category: 'basic' },
  { character: 'わ', romaji: 'wa', type: 'hiragana', category: 'basic' },
  { character: 'を', romaji: 'wo', type: 'hiragana', category: 'basic' },
  { character: 'ん', romaji: 'n', type: 'hiragana', category: 'basic' },

  // Dakuten Hiragana (20 characters)
  { character: 'が', romaji: 'ga', type: 'hiragana', category: 'dakuten' },
  { character: 'ぎ', romaji: 'gi', type: 'hiragana', category: 'dakuten' },
  { character: 'ぐ', romaji: 'gu', type: 'hiragana', category: 'dakuten' },
  { character: 'げ', romaji: 'ge', type: 'hiragana', category: 'dakuten' },
  { character: 'ご', romaji: 'go', type: 'hiragana', category: 'dakuten' },
  { character: 'ざ', romaji: 'za', type: 'hiragana', category: 'dakuten' },
  { character: 'じ', romaji: 'ji', type: 'hiragana', category: 'dakuten' },
  { character: 'ず', romaji: 'zu', type: 'hiragana', category: 'dakuten' },
  { character: 'ぜ', romaji: 'ze', type: 'hiragana', category: 'dakuten' },
  { character: 'ぞ', romaji: 'zo', type: 'hiragana', category: 'dakuten' },
  { character: 'だ', romaji: 'da', type: 'hiragana', category: 'dakuten' },
  { character: 'ぢ', romaji: 'di', type: 'hiragana', category: 'dakuten' },
  { character: 'づ', romaji: 'du', type: 'hiragana', category: 'dakuten' },
  { character: 'で', romaji: 'de', type: 'hiragana', category: 'dakuten' },
  { character: 'ど', romaji: 'do', type: 'hiragana', category: 'dakuten' },
  { character: 'ば', romaji: 'ba', type: 'hiragana', category: 'dakuten' },
  { character: 'び', romaji: 'bi', type: 'hiragana', category: 'dakuten' },
  { character: 'ぶ', romaji: 'bu', type: 'hiragana', category: 'dakuten' },
  { character: 'べ', romaji: 'be', type: 'hiragana', category: 'dakuten' },
  { character: 'ぼ', romaji: 'bo', type: 'hiragana', category: 'dakuten' },

  // Handakuten Hiragana (5 characters)
  { character: 'ぱ', romaji: 'pa', type: 'hiragana', category: 'handakuten' },
  { character: 'ぴ', romaji: 'pi', type: 'hiragana', category: 'handakuten' },
  { character: 'ぷ', romaji: 'pu', type: 'hiragana', category: 'handakuten' },
  { character: 'ぺ', romaji: 'pe', type: 'hiragana', category: 'handakuten' },
  { character: 'ぽ', romaji: 'po', type: 'hiragana', category: 'handakuten' },

  // Small Hiragana (5 characters)
  { character: 'ぁ', romaji: 'a', type: 'hiragana', category: 'small' },
  { character: 'ぃ', romaji: 'i', type: 'hiragana', category: 'small' },
  { character: 'ぅ', romaji: 'u', type: 'hiragana', category: 'small' },
  { character: 'ぇ', romaji: 'e', type: 'hiragana', category: 'small' },
  { character: 'ぉ', romaji: 'o', type: 'hiragana', category: 'small' },
  { character: 'ゃ', romaji: 'ya', type: 'hiragana', category: 'small' },
  { character: 'ゅ', romaji: 'yu', type: 'hiragana', category: 'small' },
  { character: 'ょ', romaji: 'yo', type: 'hiragana', category: 'small' },
  { character: 'ゎ', romaji: 'wa', type: 'hiragana', category: 'small' },
  { character: 'っ', romaji: 'tsu', type: 'hiragana', category: 'small' },

  // Combination Hiragana (36 characters)
  { character: 'きゃ', romaji: 'kya', type: 'hiragana', category: 'combination' },
  { character: 'きゅ', romaji: 'kyu', type: 'hiragana', category: 'combination' },
  { character: 'きょ', romaji: 'kyo', type: 'hiragana', category: 'combination' },
  { character: 'しゃ', romaji: 'sha', type: 'hiragana', category: 'combination' },
  { character: 'しゅ', romaji: 'shu', type: 'hiragana', category: 'combination' },
  { character: 'しょ', romaji: 'sho', type: 'hiragana', category: 'combination' },
  { character: 'ちゃ', romaji: 'cha', type: 'hiragana', category: 'combination' },
  { character: 'ちゅ', romaji: 'chu', type: 'hiragana', category: 'combination' },
  { character: 'ちょ', romaji: 'cho', type: 'hiragana', category: 'combination' },
  { character: 'にゃ', romaji: 'nya', type: 'hiragana', category: 'combination' },
  { character: 'にゅ', romaji: 'nyu', type: 'hiragana', category: 'combination' },
  { character: 'にょ', romaji: 'nyo', type: 'hiragana', category: 'combination' },
  { character: 'ひゃ', romaji: 'hya', type: 'hiragana', category: 'combination' },
  { character: 'ひゅ', romaji: 'hyu', type: 'hiragana', category: 'combination' },
  { character: 'ひょ', romaji: 'hyo', type: 'hiragana', category: 'combination' },
  { character: 'みゃ', romaji: 'mya', type: 'hiragana', category: 'combination' },
  { character: 'みゅ', romaji: 'myu', type: 'hiragana', category: 'combination' },
  { character: 'みょ', romaji: 'myo', type: 'hiragana', category: 'combination' },
  { character: 'りゃ', romaji: 'rya', type: 'hiragana', category: 'combination' },
  { character: 'りゅ', romaji: 'ryu', type: 'hiragana', category: 'combination' },
  { character: 'りょ', romaji: 'ryo', type: 'hiragana', category: 'combination' },
  { character: 'ぎゃ', romaji: 'gya', type: 'hiragana', category: 'combination' },
  { character: 'ぎゅ', romaji: 'gyu', type: 'hiragana', category: 'combination' },
  { character: 'ぎょ', romaji: 'gyo', type: 'hiragana', category: 'combination' },
  { character: 'じゃ', romaji: 'ja', type: 'hiragana', category: 'combination' },
  { character: 'じゅ', romaji: 'ju', type: 'hiragana', category: 'combination' },
  { character: 'じょ', romaji: 'jo', type: 'hiragana', category: 'combination' },
  { character: 'びゃ', romaji: 'bya', type: 'hiragana', category: 'combination' },
  { character: 'びゅ', romaji: 'byu', type: 'hiragana', category: 'combination' },
  { character: 'びょ', romaji: 'byo', type: 'hiragana', category: 'combination' },
  { character: 'ぴゃ', romaji: 'pya', type: 'hiragana', category: 'combination' },
  { character: 'ぴゅ', romaji: 'pyu', type: 'hiragana', category: 'combination' },
  { character: 'ぴょ', romaji: 'pyo', type: 'hiragana', category: 'combination' },
];

// All Katakana characters
export const katakanaCharacters: KanaCharacter[] = [
  // Basic Katakana (46 characters)
  { character: 'ア', romaji: 'a', type: 'katakana', category: 'basic' },
  { character: 'イ', romaji: 'i', type: 'katakana', category: 'basic' },
  { character: 'ウ', romaji: 'u', type: 'katakana', category: 'basic' },
  { character: 'エ', romaji: 'e', type: 'katakana', category: 'basic' },
  { character: 'オ', romaji: 'o', type: 'katakana', category: 'basic' },
  { character: 'カ', romaji: 'ka', type: 'katakana', category: 'basic' },
  { character: 'キ', romaji: 'ki', type: 'katakana', category: 'basic' },
  { character: 'ク', romaji: 'ku', type: 'katakana', category: 'basic' },
  { character: 'ケ', romaji: 'ke', type: 'katakana', category: 'basic' },
  { character: 'コ', romaji: 'ko', type: 'katakana', category: 'basic' },
  { character: 'サ', romaji: 'sa', type: 'katakana', category: 'basic' },
  { character: 'シ', romaji: 'shi', type: 'katakana', category: 'basic' },
  { character: 'ス', romaji: 'su', type: 'katakana', category: 'basic' },
  { character: 'セ', romaji: 'se', type: 'katakana', category: 'basic' },
  { character: 'ソ', romaji: 'so', type: 'katakana', category: 'basic' },
  { character: 'タ', romaji: 'ta', type: 'katakana', category: 'basic' },
  { character: 'チ', romaji: 'chi', type: 'katakana', category: 'basic' },
  { character: 'ツ', romaji: 'tsu', type: 'katakana', category: 'basic' },
  { character: 'テ', romaji: 'te', type: 'katakana', category: 'basic' },
  { character: 'ト', romaji: 'to', type: 'katakana', category: 'basic' },
  { character: 'ナ', romaji: 'na', type: 'katakana', category: 'basic' },
  { character: 'ニ', romaji: 'ni', type: 'katakana', category: 'basic' },
  { character: 'ヌ', romaji: 'nu', type: 'katakana', category: 'basic' },
  { character: 'ネ', romaji: 'ne', type: 'katakana', category: 'basic' },
  { character: 'ノ', romaji: 'no', type: 'katakana', category: 'basic' },
  { character: 'ハ', romaji: 'ha', type: 'katakana', category: 'basic' },
  { character: 'ヒ', romaji: 'hi', type: 'katakana', category: 'basic' },
  { character: 'フ', romaji: 'fu', type: 'katakana', category: 'basic' },
  { character: 'ヘ', romaji: 'he', type: 'katakana', category: 'basic' },
  { character: 'ホ', romaji: 'ho', type: 'katakana', category: 'basic' },
  { character: 'マ', romaji: 'ma', type: 'katakana', category: 'basic' },
  { character: 'ミ', romaji: 'mi', type: 'katakana', category: 'basic' },
  { character: 'ム', romaji: 'mu', type: 'katakana', category: 'basic' },
  { character: 'メ', romaji: 'me', type: 'katakana', category: 'basic' },
  { character: 'モ', romaji: 'mo', type: 'katakana', category: 'basic' },
  { character: 'ヤ', romaji: 'ya', type: 'katakana', category: 'basic' },
  { character: 'ユ', romaji: 'yu', type: 'katakana', category: 'basic' },
  { character: 'ヨ', romaji: 'yo', type: 'katakana', category: 'basic' },
  { character: 'ラ', romaji: 'ra', type: 'katakana', category: 'basic' },
  { character: 'リ', romaji: 'ri', type: 'katakana', category: 'basic' },
  { character: 'ル', romaji: 'ru', type: 'katakana', category: 'basic' },
  { character: 'レ', romaji: 're', type: 'katakana', category: 'basic' },
  { character: 'ロ', romaji: 'ro', type: 'katakana', category: 'basic' },
  { character: 'ワ', romaji: 'wa', type: 'katakana', category: 'basic' },
  { character: 'ヲ', romaji: 'wo', type: 'katakana', category: 'basic' },
  { character: 'ン', romaji: 'n', type: 'katakana', category: 'basic' },

  // Dakuten Katakana (20 characters)
  { character: 'ガ', romaji: 'ga', type: 'katakana', category: 'dakuten' },
  { character: 'ギ', romaji: 'gi', type: 'katakana', category: 'dakuten' },
  { character: 'グ', romaji: 'gu', type: 'katakana', category: 'dakuten' },
  { character: 'ゲ', romaji: 'ge', type: 'katakana', category: 'dakuten' },
  { character: 'ゴ', romaji: 'go', type: 'katakana', category: 'dakuten' },
  { character: 'ザ', romaji: 'za', type: 'katakana', category: 'dakuten' },
  { character: 'ジ', romaji: 'ji', type: 'katakana', category: 'dakuten' },
  { character: 'ズ', romaji: 'zu', type: 'katakana', category: 'dakuten' },
  { character: 'ゼ', romaji: 'ze', type: 'katakana', category: 'dakuten' },
  { character: 'ゾ', romaji: 'zo', type: 'katakana', category: 'dakuten' },
  { character: 'ダ', romaji: 'da', type: 'katakana', category: 'dakuten' },
  { character: 'ヂ', romaji: 'di', type: 'katakana', category: 'dakuten' },
  { character: 'ヅ', romaji: 'du', type: 'katakana', category: 'dakuten' },
  { character: 'デ', romaji: 'de', type: 'katakana', category: 'dakuten' },
  { character: 'ド', romaji: 'do', type: 'katakana', category: 'dakuten' },
  { character: 'バ', romaji: 'ba', type: 'katakana', category: 'dakuten' },
  { character: 'ビ', romaji: 'bi', type: 'katakana', category: 'dakuten' },
  { character: 'ブ', romaji: 'bu', type: 'katakana', category: 'dakuten' },
  { character: 'ベ', romaji: 'be', type: 'katakana', category: 'dakuten' },
  { character: 'ボ', romaji: 'bo', type: 'katakana', category: 'dakuten' },

  // Handakuten Katakana (5 characters)
  { character: 'パ', romaji: 'pa', type: 'katakana', category: 'handakuten' },
  { character: 'ピ', romaji: 'pi', type: 'katakana', category: 'handakuten' },
  { character: 'プ', romaji: 'pu', type: 'katakana', category: 'handakuten' },
  { character: 'ペ', romaji: 'pe', type: 'katakana', category: 'handakuten' },
  { character: 'ポ', romaji: 'po', type: 'katakana', category: 'handakuten' },

  // Small Katakana (5 characters)
  { character: 'ァ', romaji: 'a', type: 'katakana', category: 'small' },
  { character: 'ィ', romaji: 'i', type: 'katakana', category: 'small' },
  { character: 'ゥ', romaji: 'u', type: 'katakana', category: 'small' },
  { character: 'ェ', romaji: 'e', type: 'katakana', category: 'small' },
  { character: 'ォ', romaji: 'o', type: 'katakana', category: 'small' },
  { character: 'ャ', romaji: 'ya', type: 'katakana', category: 'small' },
  { character: 'ュ', romaji: 'yu', type: 'katakana', category: 'small' },
  { character: 'ョ', romaji: 'yo', type: 'katakana', category: 'small' },
  { character: 'ヮ', romaji: 'wa', type: 'katakana', category: 'small' },
  { character: 'ッ', romaji: 'tsu', type: 'katakana', category: 'small' },

  // Combination Katakana (36 characters)
  { character: 'キャ', romaji: 'kya', type: 'katakana', category: 'combination' },
  { character: 'キュ', romaji: 'kyu', type: 'katakana', category: 'combination' },
  { character: 'キョ', romaji: 'kyo', type: 'katakana', category: 'combination' },
  { character: 'シャ', romaji: 'sha', type: 'katakana', category: 'combination' },
  { character: 'シュ', romaji: 'shu', type: 'katakana', category: 'combination' },
  { character: 'ショ', romaji: 'sho', type: 'katakana', category: 'combination' },
  { character: 'チャ', romaji: 'cha', type: 'katakana', category: 'combination' },
  { character: 'チュ', romaji: 'chu', type: 'katakana', category: 'combination' },
  { character: 'チョ', romaji: 'cho', type: 'katakana', category: 'combination' },
  { character: 'ニャ', romaji: 'nya', type: 'katakana', category: 'combination' },
  { character: 'ニュ', romaji: 'nyu', type: 'katakana', category: 'combination' },
  { character: 'ニョ', romaji: 'nyo', type: 'katakana', category: 'combination' },
  { character: 'ヒャ', romaji: 'hya', type: 'katakana', category: 'combination' },
  { character: 'ヒュ', romaji: 'hyu', type: 'katakana', category: 'combination' },
  { character: 'ヒョ', romaji: 'hyo', type: 'katakana', category: 'combination' },
  { character: 'ミャ', romaji: 'mya', type: 'katakana', category: 'combination' },
  { character: 'ミュ', romaji: 'myu', type: 'katakana', category: 'combination' },
  { character: 'ミョ', romaji: 'myo', type: 'katakana', category: 'combination' },
  { character: 'リャ', romaji: 'rya', type: 'katakana', category: 'combination' },
  { character: 'リュ', romaji: 'ryu', type: 'katakana', category: 'combination' },
  { character: 'リョ', romaji: 'ryo', type: 'katakana', category: 'combination' },
  { character: 'ギャ', romaji: 'gya', type: 'katakana', category: 'combination' },
  { character: 'ギュ', romaji: 'gyu', type: 'katakana', category: 'combination' },
  { character: 'ギョ', romaji: 'gyo', type: 'katakana', category: 'combination' },
  { character: 'ジャ', romaji: 'ja', type: 'katakana', category: 'combination' },
  { character: 'ジュ', romaji: 'ju', type: 'katakana', category: 'combination' },
  { character: 'ジョ', romaji: 'jo', type: 'katakana', category: 'combination' },
  { character: 'ビャ', romaji: 'bya', type: 'katakana', category: 'combination' },
  { character: 'ビュ', romaji: 'byu', type: 'katakana', category: 'combination' },
  { character: 'ビョ', romaji: 'byo', type: 'katakana', category: 'combination' },
  { character: 'ピャ', romaji: 'pya', type: 'katakana', category: 'combination' },
  { character: 'ピュ', romaji: 'pyu', type: 'katakana', category: 'combination' },
  { character: 'ピョ', romaji: 'pyo', type: 'katakana', category: 'combination' },
];

// Combined list of all characters
export const allKanaCharacters = [...hiraganaCharacters, ...katakanaCharacters];

// Get example characters for display (one from each category)
export const getExampleCharacters = (): KanaCharacter[] => {
  const examples: KanaCharacter[] = [];
  const categories = new Set<string>();

  for (const char of allKanaCharacters) {
    const key = `${char.type}-${char.category}`;
    if (!categories.has(key)) {
      examples.push(char);
      categories.add(key);
    }
  }

  return examples;
};

// Get random characters for practice
export const getRandomCharacters = (count: number = 10): KanaCharacter[] => {
  const shuffled = [...allKanaCharacters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
