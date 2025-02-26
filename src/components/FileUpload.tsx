
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        onFileSelect(file);
        toast({
          title: "File uploaded successfully",
          description: file.name,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a .doc or .docx file",
          variant: "destructive",
        });
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "relative p-8 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out",
          "bg-background/50 backdrop-blur-sm",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          selectedFile ? "border-success bg-success/5" : "",
          "hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload
            className={cn(
              "w-12 h-12 transition-all duration-200",
              isDragActive ? "text-primary scale-110" : "text-muted-foreground"
            )}
          />
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">
              {isDragActive ? "Drop your file here" : "Drag & drop your document"}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .doc and .docx files
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 rounded-lg bg-card animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium truncate">
                {selectedFile.name}
              </span>
            </div>
            <button
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-destructive/10 transition-colors"
            >
              <X className="w-4 h-4 text-destructive" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
