import { useState, useEffect, useCallback } from 'react';

export interface SpeechOptions {
  text: string;
  language: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export interface SpeechState {
  isSupported: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
}

export const useSpeechSynthesis = () => {
  const [speechState, setSpeechState] = useState<SpeechState>({
    isSupported: false,
    isPlaying: false,
    isPaused: false,
    voices: [],
    selectedVoice: null,
  });

  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechState(prev => ({ ...prev, isSupported: true }));
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setSpeechState(prev => ({ 
          ...prev, 
          voices,
          selectedVoice: voices.find(voice => voice.lang.startsWith('en')) || voices[0] || null
        }));
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Get voices for specific language
  const getVoicesForLanguage = useCallback((languageCode: string) => {
    return speechState.voices.filter(voice => 
      voice.lang.toLowerCase().startsWith(languageCode.toLowerCase())
    );
  }, [speechState.voices]);

  // Speak function
  const speak = useCallback((options: SpeechOptions) => {
    if (!speechState.isSupported) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(options.text);
    
    // Find appropriate voice for language
    const languageVoices = getVoicesForLanguage(options.language);
    const voice = languageVoices[0] || speechState.selectedVoice;
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = options.language;
    }

    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    utterance.onstart = () => {
      setSpeechState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    };

    utterance.onend = () => {
      setSpeechState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
      setCurrentUtterance(null);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setSpeechState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
      setCurrentUtterance(null);
    };

    utterance.onpause = () => {
      setSpeechState(prev => ({ ...prev, isPaused: true }));
    };

    utterance.onresume = () => {
      setSpeechState(prev => ({ ...prev, isPaused: false }));
    };

    setCurrentUtterance(utterance);
    window.speechSynthesis.speak(utterance);
  }, [speechState.isSupported, speechState.selectedVoice, getVoicesForLanguage]);

  // Pause speech
  const pause = useCallback(() => {
    if (speechState.isSupported && speechState.isPlaying) {
      window.speechSynthesis.pause();
    }
  }, [speechState.isSupported, speechState.isPlaying]);

  // Resume speech
  const resume = useCallback(() => {
    if (speechState.isSupported && speechState.isPaused) {
      window.speechSynthesis.resume();
    }
  }, [speechState.isSupported, speechState.isPaused]);

  // Stop speech
  const stop = useCallback(() => {
    if (speechState.isSupported) {
      window.speechSynthesis.cancel();
      setSpeechState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
      setCurrentUtterance(null);
    }
  }, [speechState.isSupported]);

  // Set voice
  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setSpeechState(prev => ({ ...prev, selectedVoice: voice }));
  }, []);

  return {
    ...speechState,
    speak,
    pause,
    resume,
    stop,
    setVoice,
    getVoicesForLanguage,
  };
};
