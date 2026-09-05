import { useCallback, useEffect, useRef, useState } from "react";

const Recognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

/**
 * Voice dictation and read-aloud, for users who find typing Hindi hard.
 * Both halves degrade to no-ops where the browser lacks the Web Speech API.
 */
export default function useSpeech(lang = "hi") {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const locale = lang === "hi" ? "hi-IN" : "en-IN";

  useEffect(
    () => () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (synth) synth.cancel();
    },
    []
  );

  const listen = useCallback(
    (onResult) => {
      if (!Recognition) return;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }

      const recognition = new Recognition();
      recognition.lang = locale;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0] && event.results[0][0].transcript;
        if (transcript) onResult(transcript.trim());
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => {
        setListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      setListening(true);
      recognition.start();
    },
    [locale]
  );

  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setListening(false);
  }, []);

  const speak = useCallback(
    (text) => {
      if (!synth || !text) return;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;
      utterance.rate = 0.95;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      synth.speak(utterance);
    },
    [locale]
  );

  const stopSpeaking = useCallback(() => {
    if (synth) synth.cancel();
    setSpeaking(false);
  }, []);

  return {
    canListen: Boolean(Recognition),
    canSpeak: Boolean(synth),
    listening,
    speaking,
    listen,
    stopListening,
    speak,
    stopSpeaking,
  };
}
