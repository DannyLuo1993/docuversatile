
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface TranslationProgressProps {
  progress: number;
  status: string;
}

export const TranslationProgress = ({ progress, status }: TranslationProgressProps) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">{status}</span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
