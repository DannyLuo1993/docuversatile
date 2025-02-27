
import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { TranslationProgress } from '@/components/TranslationProgress';
import { SpecialWords } from '@/components/SpecialWords';
import { Button } from '@/components/ui/button';
import { Download, Settings, FileText, File } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [translating, setTranslating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setProgress(0);
  };

  const startTranslation = () => {
    if (!file) return;
    
    setTranslating(true);
    // Simulate translation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTranslating(false);
          toast({
            title: "Translation completed",
            description: "Your document has been translated successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const downloadTranslation = (format: 'pdf' | 'word') => {
    // Create a mock download response
    const mockResponse = new Blob(['Translated content'], { type: format === 'pdf' ? 'application/pdf' : 'application/msword' });
    const url = URL.createObjectURL(mockResponse);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated-document.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: `Your translated document will be downloaded as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Document Translator</h1>
            <p className="text-muted-foreground">
              Upload your document and get it translated instantly
            </p>
          </div>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <FileUpload onFileSelect={handleFileSelect} />

          {file && !translating && progress === 0 && (
            <div className="flex justify-center">
              <Button onClick={startTranslation} className="animate-fade-in">
                Start Translation
              </Button>
            </div>
          )}

          {translating && (
            <TranslationProgress
              progress={progress}
              status="Translating document..."
            />
          )}

          {progress === 100 && (
            <div className="flex justify-center animate-fade-in">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Translation
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border shadow-lg z-50">
                  <DropdownMenuItem onClick={() => downloadTranslation('pdf')} className="gap-2">
                    <File className="w-4 h-4" />
                    Download as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadTranslation('word')} className="gap-2">
                    <FileText className="w-4 h-4" />
                    Download as Word
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="pt-8 border-t">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Special Words Dictionary</h2>
              <p className="text-muted-foreground">
                Add custom translations for specific words
              </p>
            </div>
            <SpecialWords />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
