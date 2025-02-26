
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Cpu, Upload, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const [modelConfig, setModelConfig] = React.useState({
    modelPath: "",
    batchSize: "1",
    maxTokens: "2048",
    temperature: "0.7",
    topP: "0.9",
  });

  const handleModelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically handle the model file upload
      toast.success("Model uploaded successfully", {
        description: file.name
      });
      setModelConfig(prev => ({
        ...prev,
        modelPath: file.name
      }));
    }
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    toast.success("Settings saved successfully");
  };

  const handleConfigChange = (key: keyof typeof modelConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModelConfig(prev => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">AI Model Settings</h1>
            </div>
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Model Configuration</h2>
              </div>
              
              <div className="p-6 border rounded-lg space-y-6">
                <div className="space-y-4">
                  <Label>Current Model</Label>
                  <div className="flex gap-4">
                    <Input
                      value={modelConfig.modelPath}
                      placeholder="No model selected"
                      readOnly
                      className="flex-1"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept=".gguf,.bin"
                        onChange={handleModelUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button variant="secondary" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Model
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input
                      id="batchSize"
                      type="number"
                      value={modelConfig.batchSize}
                      onChange={handleConfigChange("batchSize")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      value={modelConfig.maxTokens}
                      onChange={handleConfigChange("maxTokens")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={modelConfig.temperature}
                      onChange={handleConfigChange("temperature")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topP">Top P</Label>
                    <Input
                      id="topP"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={modelConfig.topP}
                      onChange={handleConfigChange("topP")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
