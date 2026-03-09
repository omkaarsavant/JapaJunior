export interface KanjiCharacter {
  character: string;
  romaji: string;
  meanings: string[];
  strokeCount: number;
  grade: number; // JLPT level or school grade
}

// Common Kanji characters (subset for demonstration)
// In production, this would be a much larger database
export const kanjiCharacters: KanjiCharacter[] = [
  // Numbers
  { character: '一', romaji: 'ichi', meanings: ['one'], strokeCount: 1, grade: 1 },
  { character: '二', romaji: 'ni', meanings: ['two'], strokeCount: 2, grade: 1 },
  { character: '三', romaji: 'san', meanings: ['three'], strokeCount: 3, grade: 1 },
  { character: '四', romaji: 'shi/yon', meanings: ['four'], strokeCount: 5, grade: 1 },
  { character: '五', romaji: 'go', meanings: ['five'], strokeCount: 4, grade: 1 },
  { character: '六', romaji: 'roku', meanings: ['six'], strokeCount: 4, grade: 1 },
  { character: '七', romaji: 'shichi', meanings: ['seven'], strokeCount: 2, grade: 1 },
  { character: '八', romaji: 'hachi', meanings: ['eight'], strokeCount: 2, grade: 1 },
  { character: '九', romaji: 'kyuu', meanings: ['nine'], strokeCount: 2, grade: 1 },
  { character: '十', romaji: 'juu', meanings: ['ten'], strokeCount: 2, grade: 1 },

  // Common characters
  { character: '人', romaji: 'hito', meanings: ['person', 'human'], strokeCount: 2, grade: 1 },
  { character: '日', romaji: 'hi', meanings: ['day', 'sun'], strokeCount: 4, grade: 1 },
  { character: '月', romaji: 'tsuki', meanings: ['moon', 'month'], strokeCount: 4, grade: 1 },
  { character: '火', romaji: 'hi', meanings: ['fire'], strokeCount: 4, grade: 1 },
  { character: '水', romaji: 'mizu', meanings: ['water'], strokeCount: 4, grade: 1 },
  { character: '木', romaji: 'ki', meanings: ['tree', 'wood'], strokeCount: 4, grade: 1 },
  { character: '金', romaji: 'kin', meanings: ['gold', 'money'], strokeCount: 8, grade: 1 },
  { character: '土', romaji: 'tsuchi', meanings: ['earth', 'soil'], strokeCount: 3, grade: 1 },

  // Common verbs/adjectives
  { character: '大', romaji: 'oo', meanings: ['big', 'large'], strokeCount: 3, grade: 1 },
  { character: '小', romaji: 'chiisai', meanings: ['small', 'little'], strokeCount: 3, grade: 1 },
  { character: '中', romaji: 'naka', meanings: ['middle', 'inside'], strokeCount: 4, grade: 1 },
  { character: '上', romaji: 'ue', meanings: ['up', 'above'], strokeCount: 3, grade: 1 },
  { character: '下', romaji: 'shita', meanings: ['down', 'below'], strokeCount: 3, grade: 1 },
  { character: '左', romaji: 'hidari', meanings: ['left'], strokeCount: 5, grade: 1 },
  { character: '右', romaji: 'migi', meanings: ['right'], strokeCount: 5, grade: 1 },
  { character: '前', romaji: 'mae', meanings: ['front', 'before'], strokeCount: 9, grade: 2 },
  { character: '後', romaji: 'ushiro', meanings: ['back', 'after'], strokeCount: 9, grade: 2 },

  // Time/Nature
  { character: '年', romaji: 'toshi', meanings: ['year'], strokeCount: 6, grade: 1 },
  { character: '山', romaji: 'yama', meanings: ['mountain'], strokeCount: 3, grade: 1 },
  { character: '川', romaji: 'kawa', meanings: ['river'], strokeCount: 3, grade: 1 },
  { character: '花', romaji: 'hana', meanings: ['flower'], strokeCount: 7, grade: 1 },
  { character: '草', romaji: 'kusa', meanings: ['grass'], strokeCount: 9, grade: 1 },
  { character: '石', romaji: 'ishi', meanings: ['stone', 'rock'], strokeCount: 5, grade: 1 },

  // Common nouns
  { character: '学', romaji: 'gaku', meanings: ['study', 'learning'], strokeCount: 8, grade: 1 },
  { character: '校', romaji: 'kou', meanings: ['school'], strokeCount: 10, grade: 1 },
  { character: '生', romaji: 'sei', meanings: ['student', 'life'], strokeCount: 5, grade: 1 },
  { character: '先', romaji: 'sen', meanings: ['before', 'previous'], strokeCount: 6, grade: 1 },
  { character: '生', romaji: 'sensei', meanings: ['teacher'], strokeCount: 5, grade: 1 },
  { character: '家', romaji: 'ie', meanings: ['house', 'home'], strokeCount: 10, grade: 1 },
  { character: '父', romaji: 'chichi', meanings: ['father'], strokeCount: 4, grade: 1 },
  { character: '母', romaji: 'haha', meanings: ['mother'], strokeCount: 5, grade: 1 },
  { character: '兄', romaji: 'ani', meanings: ['older brother'], strokeCount: 5, grade: 1 },
  { character: '弟', romaji: 'ototo', meanings: ['younger brother'], strokeCount: 5, grade: 1 },

  // Common verbs
  { character: '行', romaji: 'iku', meanings: ['go'], strokeCount: 6, grade: 1 },
  { character: '来', romaji: 'kuru', meanings: ['come'], strokeCount: 7, grade: 1 },
  { character: '見', romaji: 'miru', meanings: ['see', 'look'], strokeCount: 7, grade: 1 },
  { character: '食', romaji: 'taberu', meanings: ['eat'], strokeCount: 9, grade: 1 },
  { character: '飲', romaji: 'nomu', meanings: ['drink'], strokeCount: 12, grade: 1 },
  { character: '書', romaji: 'kaku', meanings: ['write'], strokeCount: 10, grade: 1 },
  { character: '読', romaji: 'yomu', meanings: ['read'], strokeCount: 14, grade: 1 },
  { character: '話', romaji: 'hanasu', meanings: ['speak', 'talk'], strokeCount: 13, grade: 1 },
  { character: '聞', romaji: 'kiku', meanings: ['listen', 'hear'], strokeCount: 14, grade: 1 },
  { character: '買', romaji: 'kau', meanings: ['buy'], strokeCount: 12, grade: 1 },
  { character: '売', romaji: 'uru', meanings: ['sell'], strokeCount: 12, grade: 1 },
  { character: '作', romaji: 'tsukuru', meanings: ['make', 'create'], strokeCount: 7, grade: 1 },
  { character: '開', romaji: 'akeru', meanings: ['open'], strokeCount: 12, grade: 1 },
  { character: '閉', romaji: 'tojiru', meanings: ['close'], strokeCount: 11, grade: 1 },

  // Colors
  { character: '赤', romaji: 'aka', meanings: ['red'], strokeCount: 7, grade: 1 },
  { character: '白', romaji: 'shiro', meanings: ['white'], strokeCount: 5, grade: 1 },
  { character: '黒', romaji: 'kuro', meanings: ['black'], strokeCount: 11, grade: 1 },
  { character: '青', romaji: 'ao', meanings: ['blue', 'green'], strokeCount: 8, grade: 1 },
  { character: '黄', romaji: 'ki', meanings: ['yellow'], strokeCount: 11, grade: 1 },

  // Common adjectives
  { character: '新', romaji: 'atarashii', meanings: ['new'], strokeCount: 13, grade: 1 },
  { character: '古', romaji: 'furui', meanings: ['old'], strokeCount: 5, grade: 1 },
  { character: '高', romaji: 'takai', meanings: ['high', 'tall'], strokeCount: 10, grade: 1 },
  { character: '低', romaji: 'hikui', meanings: ['low'], strokeCount: 7, grade: 1 },
  { character: '長', romaji: 'nagai', meanings: ['long'], strokeCount: 8, grade: 1 },
  { character: '短', romaji: 'mijikai', meanings: ['short'], strokeCount: 12, grade: 1 },
  { character: '多', romaji: 'ooi', meanings: ['many', 'much'], strokeCount: 6, grade: 1 },
  { character: '少', romaji: 'sukunai', meanings: ['few', 'little'], strokeCount: 4, grade: 1 },
  { character: '好', romaji: 'suki', meanings: ['like', 'good'], strokeCount: 6, grade: 1 },
  { character: '悪', romaji: 'warui', meanings: ['bad', 'evil'], strokeCount: 12, grade: 1 },
  { character: '美', romaji: 'utsukushii', meanings: ['beautiful'], strokeCount: 9, grade: 1 },
  { character: '醜', romaji: 'minikui', meanings: ['ugly'], strokeCount: 17, grade: 1 },
];

/**
 * Get all Kanji characters
 */
export function getAllKanjiCharacters(): KanjiCharacter[] {
  return kanjiCharacters;
}

/**
 * Find Kanji by character
 */
export function findKanjiByCharacter(character: string): KanjiCharacter | undefined {
  return kanjiCharacters.find(k => k.character === character);
}

/**
 * Find Kanji by romaji
 */
export function findKanjiByRomaji(romaji: string): KanjiCharacter[] {
  return kanjiCharacters.filter(k => k.romaji.includes(romaji));
}
