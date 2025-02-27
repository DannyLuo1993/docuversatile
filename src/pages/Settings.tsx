
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Network, Save, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [apiConfig, setApiConfig] = React.useState({
    apiKey: "",
    apiAddress: "https://api.deepseek.ai/v1",
    selectedModel: "deepseek-ai/DeepSeek-R1",
    batchSize: "1",
    maxTokens: "2048",
    temperature: "0.7",
    topP: "0.9",
  });
  
  const [connectionStatus, setConnectionStatus] = React.useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  const handleConfigChange = (key: keyof typeof apiConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApiConfig(prev => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  const handleModelSelect = (value: string) => {
    setApiConfig(prev => ({
      ...prev,
      selectedModel: value
    }));
  };

  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      // Here you would typically test the API connection
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setConnectionStatus('success');
      toast.success("API connection successful");
    } catch (error) {
      setConnectionStatus('error');
      toast.error("API connection failed");
    }
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
              <h1 className="text-2xl font-bold">API Settings</h1>
            </div>
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">API Configuration</h2>
              </div>
              
              <div className="p-6 border rounded-lg space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-4">
                      <Input
                        id="apiKey"
                        type="password"
                        value={apiConfig.apiKey}
                        onChange={handleConfigChange("apiKey")}
                        className="flex-1"
                        placeholder="Enter your API key"
                      />
                      <Button 
                        onClick={testConnection}
                        variant="secondary"
                        className="gap-2 min-w-[140px]"
                      >
                        {connectionStatus === 'testing' ? (
                          "Testing..."
                        ) : connectionStatus === 'success' ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            Connected
                          </>
                        ) : connectionStatus === 'error' ? (
                          <>
                            <X className="h-4 w-4 text-red-500" />
                            Failed
                          </>
                        ) : (
                          "Test Connection"
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiAddress">API Address</Label>
                    <Input
                      id="apiAddress"
                      value={apiConfig.apiAddress}
                      onChange={handleConfigChange("apiAddress")}
                      placeholder="Enter API address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Select value={apiConfig.selectedModel} onValueChange={handleModelSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deepseek-ai/DeepSeek-R1">DeepSeek-R1</SelectItem>
                        <SelectItem value="deepseek-ai/DeepSeek-V3">DeepSeek-V3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input
                      id="batchSize"
                      type="number"
                      value={apiConfig.batchSize}
                      onChange={handleConfigChange("batchSize")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      value={apiConfig.maxTokens}
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
                      value={apiConfig.temperature}
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
                      value={apiConfig.topP}
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
