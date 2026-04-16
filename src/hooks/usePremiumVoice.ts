import { useEffect, useRef, useState, useCallback } from "react";

function findBestSpanishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const spanishVoices = voices.filter(
    (v) => v.lang.startsWith("es")
  );
  if (!spanishVoices.length) return null;

  const priority = ["Google español", "Microsoft", "Natural", "Premium", "Enhanced"];
  for (const keyword of priority) {
    const match = spanishVoices.find((v) => v.name.includes(keyword));
    if (match) return match;
  }

  const preferred = ["es-CO", "es-MX", "es-ES"];
  for (const locale of preferred) {
    const match = spanishVoices.find((v) => v.lang === locale);
    if (match) return match;
  }

  return spanishVoices[0];
}

export function usePremiumVoice() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) setVoice(findBestSpanishVoice(voices));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      if (voice) utter.voice = voice;
      utter.lang = voice?.lang || "es-ES";
      utter.pitch = 0.9;
      utter.rate = 0.95;
      if (onEnd) utter.onend = onEnd;
      utterRef.current = utter;
      window.speechSynthesis.speak(utter);
    },
    [voice]
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}
