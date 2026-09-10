import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence?: number;
  error?: string;
  isFinal: boolean;
}

export function useSpeechRecognition(options: SpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<SpeechRecognitionResult | null>(null);
  const recognitionRef = useRef<any>(null);
  const supported =
    typeof window !== 'undefined' &&
    Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = options.lang || 'en-US';
    recognition.continuous = options.continuous || false;
    recognition.interimResults = options.interimResults || false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      setError(event.error);
      setRecognitionResult({
        transcript: '',
        error: event.error,
        isFinal: true,
      });
    };
    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const alternative = result[0];
      const transcriptValue = alternative.transcript;
      setTranscript(transcriptValue);
      setRecognitionResult({
        transcript: transcriptValue,
        confidence: alternative.confidence,
        isFinal: result.isFinal,
      });
    };

    recognitionRef.current = recognition;
  }, [options.lang, options.continuous, options.interimResults]);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      setError(null);
      setTranscript('');
      setRecognitionResult(null);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Speech recognition start error:', e);
        const startError = 'recognition_start_failed';
        setError(startError);
        setRecognitionResult({ transcript: '', error: startError, isFinal: true });
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return {
    isListening,
    transcript,
    error,
    recognitionResult,
    startListening,
    stopListening,
    supported,
  };
}
