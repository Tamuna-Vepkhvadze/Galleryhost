import { useState } from "react";
export const useVoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startListening = (onResult: (text: string) => void) => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition  || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError("Speech recognition not supported in this browser.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onerror = (e: any) => {
        setError(e.error);
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };
      recognition.start();
    } catch (err) {
      setError("Voice search error");
      setIsListening(false);
    }
  };
  return { isListening, startListening, error };
};
