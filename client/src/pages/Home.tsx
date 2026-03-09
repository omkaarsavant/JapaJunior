import { useState, useEffect, useCallback } from 'react';
import { DrawingCanvas } from '@/components/DrawingCanvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { RotateCcw, Trash2, Plus, X, Copy, Trash, BookOpen, Languages, Sun, Moon, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';

interface RecognitionResult {
  character: string;
  romaji: string;
  type: 'hiragana' | 'katakana' | 'kanji';
  confidence: number;
  category?: string;
  meanings?: string[];
}

interface WordCharacter {
  character: string;
  romaji: string;
  type: 'hiragana' | 'katakana' | 'kanji';
  confidence: number;
  meanings?: string[];
}

const HIRAGANA = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const KANJI_SAMPLES = '一二三四五六七八九十日月中火水木金土山川人上下右左';

export default function Home() {
  const { user } = useAuth();
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [wordCharacters, setWordCharacters] = useState<WordCharacter[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [examples, setExamples] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const generateExamples = useCallback(() => {
    const all = HIRAGANA + KATAKANA + KANJI_SAMPLES;
    const newExamples: string[] = [];
    for (let i = 0; i < 6; i++) {
      newExamples.push(all[Math.floor(Math.random() * all.length)]);
    }
    setExamples(newExamples);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    generateExamples();
  }, [generateExamples]);

  const recognizeMutation = trpc.recognition.recognize.useMutation({
    onSuccess: (data) => {
      setIsRecognizing(false);
      if (data) {
        setResult(data);
        setTranslation(null);
      } else {
        setResult(null);
        toast.error('Could not recognize character. Try drawing more clearly.');
      }
    },
    onError: () => {
      setIsRecognizing(false);
      setResult(null);
      toast.error('Recognition failed. Please try again.');
    },
  });

  const translateMutation = trpc.word.translate.useMutation({
    onSuccess: (data) => {
      setIsTranslating(false);
      if (data && wordCharacters.length > 0) {
        setTranslation(data.translation);

        // Auto-save to history (Silent)
        if (user) {
          const word = wordCharacters.map((c) => c.character).join('');
          const romaji = wordCharacters.map((c) => c.romaji).join('');
          const types = new Set(wordCharacters.map((c) => c.type));
          const wordType = types.size === 1 ? Array.from(types)[0] : 'mixed';
          const confidence = wordCharacters.reduce((sum, c) => sum + c.confidence, 0) / wordCharacters.length;

          saveHistoryMutation.mutate({
            word,
            romaji,
            translation: data.translation,
            wordType: wordType as 'hiragana' | 'katakana' | 'kanji' | 'mixed',
            characters: JSON.stringify(wordCharacters),
            confidence,
          });
        }
      }
    },
    onError: () => {
      setIsTranslating(false);
      toast.error('Translation failed. Please try again.');
    },
  });

  const saveHistoryMutation = trpc.word.saveToHistory.useMutation({
    onError: () => {
      console.error('Failed to auto-save word to history.');
    },
  });

  const drawingCanvas = DrawingCanvas({
    onStrokeStart: () => {
      setHasStrokes(true);
    },
    onStrokeComplete: async (canvas: HTMLCanvasElement) => {
      setIsRecognizing(true);
      const dataUrl = canvas.toDataURL('image/png');
      await recognizeMutation.mutateAsync({ canvasDataUrl: dataUrl });
    },
  });

  const handleClear = () => {
    drawingCanvas.clear();
    setHasStrokes(false);
    setResult(null);
    setTranslation(null);
  };

  const handleUndo = () => {
    drawingCanvas.undo();
    if (!drawingCanvas.hasStrokes) {
      setHasStrokes(false);
      setResult(null);
    }
  };

  const handleAddToWord = () => {
    if (result) {
      setWordCharacters((prev) => [
        ...prev,
        {
          character: result.character,
          romaji: result.romaji,
          type: result.type,
          confidence: result.confidence,
          meanings: result.meanings,
        },
      ]);
      handleClear();
    }
  };

  const handleRemoveLastCharacter = () => {
    setWordCharacters((prev) => prev.slice(0, -1));
    setTranslation(null);
  };

  const handleClearWord = () => {
    setWordCharacters([]);
    setTranslation(null);
  };

  const handleTranslateWord = async () => {
    if (wordCharacters.length === 0) {
      toast.error('No word to translate');
      return;
    }

    setIsTranslating(true);
    const word = wordCharacters.map((c) => c.character).join('');
    const romaji = wordCharacters.map((c) => c.romaji).join('');
    const types = new Set(wordCharacters.map((c) => c.type));
    const wordType = types.size === 1 ? Array.from(types)[0] : 'mixed';

    await translateMutation.mutateAsync({ word, romaji, wordType: wordType as string });
  };

  const wordDisplay = wordCharacters.map((c) => c.character).join('');
  const wordRomaji = wordCharacters.map((c) => c.romaji).join('');

  return (
    <div className="min-h-screen md:h-screen w-screen bg-background flex flex-col items-center justify-start p-4 md:p-6 transition-colors duration-500 overflow-y-auto md:overflow-hidden">
      <div className="w-full max-w-6xl h-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-1000">
        {/* Header - Very Compact */}
        <header className="mb-4 text-center relative flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute right-0 top-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <h1 className="text-2xl md:text-3xl font-display tracking-tight text-foreground">
            Japa Junior
          </h1>
          <div className="h-px w-16 bg-foreground/10 mx-auto mt-1" />
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Main Interaction Area */}
          <div className="md:col-span-8 flex flex-col space-y-4 min-h-0">
            {/* Word Display Area - Compact */}
            <div className="flex flex-col items-center justify-center p-4 rounded-3xl bg-card/40 border border-border/40 shadow-md backdrop-blur-sm transition-all duration-500 hover:bg-card/60 flex-shrink-0">
              {wordCharacters.length > 0 ? (
                <div className="text-center">
                  <div className="text-5xl font-display text-foreground leading-tight tracking-[0.1em]">{wordDisplay}</div>
                  <div className="text-sm text-muted-foreground font-mono opacity-80">{wordRomaji}</div>
                  {translation && (
                    <div className="mt-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 animate-in zoom-in-95 duration-300">
                      {translation}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground/50 dark:text-white/40 text-base font-light italic">Start drawing characters...</div>
              )}
            </div>

            {/* Canvas Area - Stretched to fill, no shadows */}
            <Card className="flex-1 min-h-0 border-border/50 shadow-none bg-card/10 backdrop-blur-xl rounded-[2.5rem] transition-all duration-500 overflow-hidden group">
              <CardContent className="p-0 h-full w-full flex flex-col">
                <canvas
                  ref={drawingCanvas.canvasRef}
                  className="flex-1 w-full bg-background/40 dark:bg-black/40 cursor-crosshair transition-all duration-500 hover:bg-background/60 dark:hover:bg-black/50"
                  style={{ touchAction: 'none' }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="md:col-span-4 flex flex-col space-y-4 min-h-0">
            {/* Contextual Action / Result Box */}
            <Card className="border-border/50 shadow-lg rounded-[2rem] bg-card overflow-hidden transition-all duration-500 shrink-0">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 dark:text-white/90 font-bold">Inference</span>
                    {result && (
                      <span className="text-[9px] font-bold text-primary/70 dark:text-white/70 uppercase tracking-tighter mt-0.5">{result.type}</span>
                    )}
                  </div>
                  {result && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black border border-emerald-500/20">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center h-28 mb-4 bg-muted/10 rounded-2xl border border-dashed border-border/40">
                  {result ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                      <span className="text-5xl font-display leading-none text-foreground">{result.character}</span>
                      <span className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-widest">{result.romaji}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-40 dark:opacity-80">
                      <Sparkles className="h-6 w-6 text-muted-foreground dark:text-white mb-1" />
                      <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground dark:text-white">Analyzing</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleAddToWord}
                    disabled={!result}
                    className="w-full h-12 bg-foreground text-background dark:text-black hover:scale-[1.01] rounded-xl transition-all duration-300 disabled:opacity-30 shadow-md"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="text-xs font-bold">Store in Word</span>
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      className="h-10 border-border/40 text-muted-foreground dark:text-white/90 hover:text-foreground rounded-xl transition-all duration-300"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-2" />
                      <span className="text-[10px] font-bold">Clear</span>
                    </Button>
                    <Button
                      onClick={handleUndo}
                      variant="outline"
                      disabled={!hasStrokes}
                      className="h-10 border-border/40 text-muted-foreground dark:text-white/90 hover:text-foreground rounded-xl transition-all duration-300 disabled:opacity-20"
                    >
                      <RotateCcw className="h-3.5 w-3.5 mr-2" />
                      <span className="text-[10px] font-bold">Undo</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Tools & Examples */}
            <div className="p-5 rounded-[2rem] bg-card border border-border/50 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-500">
              <div className="flex items-center justify-between mb-2 flex-shrink-0">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 dark:text-white/90 font-bold">Processing</h3>
                <Button
                  onClick={handleTranslateWord}
                  disabled={wordCharacters.length === 0 || isTranslating}
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-[10px] font-bold text-primary dark:text-white/90 hover:bg-primary/10 rounded-lg transition-all duration-300"
                >
                  <Languages className="h-3 w-3 mr-1.5" />
                  {isTranslating ? '...' : 'Translate'}
                </Button>
              </div>

              {/* Actions Section */}
              <div className="flex gap-4 px-2 mb-3 flex-shrink-0">
                <button
                  onClick={handleRemoveLastCharacter}
                  disabled={wordCharacters.length === 0}
                  className="text-[10px] font-bold text-foreground/70 dark:text-white/90 hover:text-destructive transition-colors disabled:opacity-20"
                >
                  Pop Last
                </button>
                <button
                  onClick={handleClearWord}
                  disabled={wordCharacters.length === 0}
                  className="text-[10px] font-bold text-foreground/70 dark:text-white/90 hover:text-destructive transition-colors disabled:opacity-20 ml-auto"
                >
                  Reset All
                </button>
              </div>

              {/* Examples Section - High End Grid */}
              <div className="pt-2 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                  <h4 className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground/40 dark:text-white/60 font-bold">Try Drawing These</h4>
                  <button
                    onClick={generateExamples}
                    className="p-1 hover:bg-muted/50 rounded-full transition-colors text-muted-foreground/40 hover:text-foreground dark:text-white/40 dark:hover:text-white"
                    title="New Examples"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-2 min-h-0 overflow-y-auto scrollbar-hide">
                  {examples.map((char, i) => (
                    <div
                      key={i}
                      className="aspect-square flex items-center justify-center bg-background/40 rounded-xl border border-border/5 transition-all group cursor-default"
                    >
                      <span className="text-2xl font-display text-foreground/40 group-hover:text-foreground dark:group-hover:text-white transition-colors">
                        {char}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
