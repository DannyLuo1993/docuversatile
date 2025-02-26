
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface SpecialWord {
  original: string;
  translation: string;
}

export const SpecialWords = () => {
  const [words, setWords] = useState<SpecialWord[]>([]);
  const [original, setOriginal] = useState('');
  const [translation, setTranslation] = useState('');

  const addWord = () => {
    if (original && translation) {
      setWords([...words, { original, translation }]);
      setOriginal('');
      setTranslation('');
    }
  };

  const removeWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Original word"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addWord} size="icon" className="shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {words.map((word, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-card animate-slide-up"
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-sm">{word.original}</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-sm">{word.translation}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeWord(index)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
