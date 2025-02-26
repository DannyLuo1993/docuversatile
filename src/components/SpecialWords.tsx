
import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from '@/components/ui/use-toast';

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

  const processCSV = (text: string) => {
    const lines = text.split('\n');
    const newWords: SpecialWord[] = [];
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        const [original, translation] = line.split(',').map(item => item.trim());
        if (original && translation) {
          newWords.push({ original, translation });
        } else {
          toast({
            title: "Warning",
            description: `Invalid format in line ${index + 1}`,
            variant: "destructive",
          });
        }
      }
    });

    if (newWords.length > 0) {
      setWords(prev => [...prev, ...newWords]);
      toast({
        title: "Success",
        description: `Added ${newWords.length} words to dictionary`,
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          processCSV(text);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false
  });

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-fade-in">
      <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors hover:border-primary">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop your CSV file here"
              : "Drag & drop a CSV file or click to select"}
          </p>
          <p className="text-xs text-muted-foreground">
            CSV format: original,translation (one pair per line)
          </p>
        </div>
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <div className="flex-1 border-t"></div>
        <span className="px-3">or add manually</span>
        <div className="flex-1 border-t"></div>
      </div>

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
