import React, { useState } from 'react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, Volume2, Languages, Settings } from 'lucide-react';

interface StoryNarratorProps {
  story: string;
  artisanName: string;
  defaultLanguage?: string;
}

const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn-IN', name: 'Bengali', flag: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil', flag: '🇮🇳' },
  { code: 'mr-IN', name: 'Marathi', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn-IN', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ml-IN', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'pa-IN', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'or-IN', name: 'Odia', flag: '🇮🇳' },
  { code: 'as-IN', name: 'Assamese', flag: '🇮🇳' },
  { code: 'ur-IN', name: 'Urdu', flag: '🇮🇳' },
];

export const StoryNarrator: React.FC<StoryNarratorProps> = ({ 
  story, 
  artisanName, 
  defaultLanguage = 'en-US' 
}) => {
  const { 
    isSupported, 
    isPlaying, 
    isPaused, 
    voices, 
    speak, 
    pause, 
    resume, 
    stop,
    getVoicesForLanguage 
  } = useSpeechSynthesis();

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [speechRate, setSpeechRate] = useState([0.9]);
  const [speechPitch, setSpeechPitch] = useState([1]);
  const [showSettings, setShowSettings] = useState(false);

  const handlePlay = () => {
    const narrativeText = `Story of ${artisanName}: ${story}`;
    speak({
      text: narrativeText,
      language: selectedLanguage,
      rate: speechRate[0],
      pitch: speechPitch[0],
    });
  };

  const handlePause = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  const handleStop = () => {
    stop();
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    if (isPlaying) {
      stop();
    }
  };

  const availableVoicesForLanguage = getVoicesForLanguage(selectedLanguage);
  const selectedLanguageInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage);

  if (!isSupported) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-orange-700">
            <Volume2 className="h-5 w-5" />
            <span className="text-sm">Speech synthesis not supported in this browser</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Volume2 className="h-5 w-5 text-blue-600" />
          AI Story Narrator
          <Badge variant="secondary" className="ml-auto">
            <Languages className="h-3 w-3 mr-1" />
            Multi-language
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-2xl">{selectedLanguageInfo?.flag}</span>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const hasVoices = getVoicesForLanguage(lang.code).length > 0;
                  return (
                    <SelectItem 
                      key={lang.code} 
                      value={lang.code}
                      disabled={!hasVoices}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {!hasVoices && (
                          <Badge variant="outline" className="text-xs">
                            Not available
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Voice Info */}
        {availableVoicesForLanguage.length > 0 && (
          <div className="text-sm text-gray-600 bg-white/50 p-2 rounded">
            <span className="font-medium">Available voices:</span> {availableVoicesForLanguage.length}
            {availableVoicesForLanguage.length > 0 && (
              <span className="ml-2">• {availableVoicesForLanguage[0].name}</span>
            )}
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="space-y-4 p-4 bg-white/70 rounded-lg border">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Speech Rate: {speechRate[0].toFixed(1)}x
              </label>
              <Slider
                value={speechRate}
                onValueChange={setSpeechRate}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Pitch: {speechPitch[0].toFixed(1)}
              </label>
              <Slider
                value={speechPitch}
                onValueChange={setSpeechPitch}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <Button 
              onClick={handlePlay}
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
              disabled={availableVoicesForLanguage.length === 0}
            >
              <Play className="h-4 w-4 mr-2" />
              Play Story
            </Button>
          ) : (
            <>
              <Button 
                onClick={handlePause}
                variant="outline"
                className="flex-1"
              >
                <Pause className="h-4 w-4 mr-2" />
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              
              <Button 
                onClick={handleStop}
                variant="destructive"
                className="flex-1"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </>
          )}
        </div>

        {/* Status */}
        {isPlaying && (
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-100 p-2 rounded">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span>
              {isPaused ? 'Paused' : 'Playing'} in {selectedLanguageInfo?.name}
            </span>
          </div>
        )}

        {/* Story Preview */}
        <div className="text-sm text-gray-600 bg-white/50 p-3 rounded max-h-20 overflow-y-auto">
          <strong>Story Preview:</strong> {story.substring(0, 150)}
          {story.length > 150 && '...'}
        </div>
      </CardContent>
    </Card>
  );
};
