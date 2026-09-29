import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';

// Web Speech API interface declarations for TypeScript
interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal?: boolean;
    };
    length: number;
  };
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

export function getSpeechLangCode(lang: LanguageCode): string {
  const cfg = SUPPORTED_LANGUAGES.find(l => l.code === lang);
  return cfg?.speechCode || 'en-IN';
}

// Language name keywords for voice matching fallback across browsers/OS
const LANGUAGE_VOICE_KEYWORDS: Record<LanguageCode, string[]> = {
  en: ['en-in', 'india', 'ravi', 'heera', 'neerja', 'prabhat', 'en-gb', 'en-us', 'english'],
  te: ['te-in', 'telugu', 'తెలుగు', 'shruti', 'mohan'],
  hi: ['hi-in', 'hindi', 'हिन्दी', 'हिंदी', 'swara', 'madhur', 'lekha'],
  mr: ['mr-in', 'marathi', 'मराठी', 'aarohi', 'manohar'],
  ur: ['ur-in', 'ur-pk', 'urdu', 'اردو', 'gul', 'salman', 'asma'],
  ta: ['ta-in', 'ta-lk', 'ta-sg', 'tamil', 'தமிழ்', 'pallavi', 'valluvar', 'vani']
};

// Preload and cache browser synthesis voices
let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  try {
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      cachedVoices = voices;
    }
  } catch {
    // ignore
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  try {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  } catch {
    // ignore
  }
}

/**
 * Selects the best available SpeechSynthesisVoice for the given language code,
 * gracefully falling back if an exact regional voice is unavailable.
 */
export function selectBestVoice(lang: LanguageCode): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (!voices || voices.length === 0) return null;

  const targetSpeechCode = getSpeechLangCode(lang).toLowerCase(); // e.g. 'te-in'
  const langPrefix = targetSpeechCode.split('-')[0]; // e.g. 'te'
  const keywords = LANGUAGE_VOICE_KEYWORDS[lang] || [langPrefix];

  // 1. Exact locale match (e.g. te-IN, hi-IN, en-IN) preferring Google/Microsoft natural voices
  const exactMatches = voices.filter(
    v => v.lang.replace('_', '-').toLowerCase() === targetSpeechCode
  );
  if (exactMatches.length > 0) {
    const preferredExact = exactMatches.find(
      v => /google|microsoft|natural|india/i.test(v.name)
    );
    return preferredExact || exactMatches[0];
  }

  // 2. Language prefix match (e.g. 'te', 'hi', 'mr', 'ur', 'ta', 'en')
  const prefixMatches = voices.filter(v => {
    const vLang = v.lang.replace('_', '-').toLowerCase();
    return vLang === langPrefix || vLang.startsWith(`${langPrefix}-`);
  });
  if (prefixMatches.length > 0) {
    const preferredPrefix = prefixMatches.find(
      v => /india|google|microsoft|natural/i.test(v.name)
    );
    return preferredPrefix || prefixMatches[0];
  }

  // 3. Name or keyword match
  for (const kw of keywords) {
    const kwMatch = voices.find(
      v =>
        v.name.toLowerCase().includes(kw) ||
        v.lang.replace('_', '-').toLowerCase().includes(kw)
    );
    if (kwMatch) return kwMatch;
  }

  // 4. For Indian regional languages when no native voice pack is installed on the OS,
  // check for an Indian English or Hindi voice before falling back to browser default
  const indianFallback = voices.find(v => {
    const vLang = v.lang.replace('_', '-').toLowerCase();
    return vLang === 'en-in' || vLang === 'hi-in' || /india/i.test(v.name);
  });
  if (indianFallback && lang === 'en') {
    return indianFallback;
  }

  return null;
}

/**
 * Unlocks / primes the browser's SpeechSynthesis engine on a direct user click gesture
 * (e.g., clicking "Start My Assessment") so subsequent automatic question TTS is never blocked.
 */
export function primeSpeechSynthesis(): void {
  if (!isSpeechSynthesisSupported()) return;
  try {
    loadVoices();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch {
    // ignore
  }
}

export interface SpeechRecognizerController {
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export function createSpeechRecognizer(
  lang: LanguageCode,
  onResult: (transcript: string, isFinal: boolean) => void,
  onStateChange: (state: 'ready' | 'listening' | 'processing' | 'error') => void,
  onError?: (err: string) => void,
  onSpeechEnd?: () => void
): SpeechRecognizerController | null {
  if (!isSpeechRecognitionSupported()) return null;

  try {
    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) return null;

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = getSpeechLangCode(lang);

    let isRunning = false;
    let isAborted = false;

    recognition.onstart = () => {
      isRunning = true;
      onStateChange('listening');
    };

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      if (isAborted) return;
      let interim = '';
      let final = '';

      for (let i = 0; i < event.results.length; i++) {
        const item = event.results[i];
        if (item && item[0]) {
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }
      }

      const combined = (final + ' ' + interim).trim();
      if (combined) {
        onResult(combined, Boolean(final.trim()));
      }
    };

    recognition.onerror = (e) => {
      isRunning = false;
      if (isAborted) return;
      console.warn('Speech recognition event:', e.error);
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        onStateChange('error');
      } else {
        onStateChange('ready');
      }
      if (onError) onError(e.error);
    };

    recognition.onend = () => {
      isRunning = false;
      if (isAborted) {
        return;
      }
      if (onSpeechEnd) {
        onSpeechEnd();
      } else {
        onStateChange('ready');
      }
    };

    return {
      start: () => {
        if (isRunning) return;
        // Never start speech recognition while TTS is actively speaking
        if (isSpeechSynthesisSupported() && window.speechSynthesis.speaking) {
          return;
        }
        isAborted = false;
        try {
          recognition.lang = getSpeechLangCode(lang);
          recognition.start();
        } catch (err) {
          console.warn('Recognition start exception:', err);
          isRunning = false;
          onStateChange('ready');
        }
      },
      stop: () => {
        if (!isRunning) return;
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
      abort: () => {
        isAborted = true;
        if (!isRunning) return;
        isRunning = false;
        try {
          recognition.abort();
        } catch {
          // ignore
        }
      }
    };
  } catch (err) {
    console.warn('Failed to initialize speech recognition', err);
    return null;
  }
}

// Global references to prevent Chrome garbage collection of active utterances
// and to track active speech requests so cancelled utterances never trigger onEnd
const activeUtterances = new Set<SpeechSynthesisUtterance>();
let currentSpeechRequestId = 0;
let speechSafetyTimeout: ReturnType<typeof setTimeout> | null = null;
let speechStartDelayTimeout: ReturnType<typeof setTimeout> | null = null;
let speechKeepAliveInterval: ReturnType<typeof setInterval> | null = null;

function clearInternalSpeechTimers(): void {
  if (speechSafetyTimeout) {
    clearTimeout(speechSafetyTimeout);
    speechSafetyTimeout = null;
  }
  if (speechStartDelayTimeout) {
    clearTimeout(speechStartDelayTimeout);
    speechStartDelayTimeout = null;
  }
  if (speechKeepAliveInterval) {
    clearInterval(speechKeepAliveInterval);
    speechKeepAliveInterval = null;
  }
}

export function stopSpeaking(): void {
  currentSpeechRequestId += 1;
  clearInternalSpeechTimers();
  activeUtterances.clear();

  if (isSpeechSynthesisSupported()) {
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending || window.speechSynthesis.paused) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // ignore
    }
  }
}

/**
 * Reusable TTS function that speaks an assessment question aloud in the selected language:
 * - Cancels any previous speech safely without triggering stale callbacks
 * - Creates a SpeechSynthesisUtterance with the selected language & best matching voice
 * - Speaks the complete question
 * - Exposes onStart, onEnd, and onError callbacks
 * - Handles browser speech quirks and errors gracefully
 */
export function speakQuestion(
  questionText: string,
  lang: LanguageCode = 'en',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: unknown) => void
): void {
  const cleanText = (questionText || '').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  if (!isSpeechSynthesisSupported()) {
    if (onStart) onStart();
    const fallbackMs = Math.max(1200, Math.min(2500, cleanText.length * 40));
    speechSafetyTimeout = setTimeout(() => {
      if (onEnd) onEnd();
    }, fallbackMs);
    return;
  }

  // Increment request ID to invalidate any previous utterance callbacks
  const requestId = ++currentSpeechRequestId;
  clearInternalSpeechTimers();
  activeUtterances.clear();

  const wasSpeakingOrPending =
    window.speechSynthesis.speaking || window.speechSynthesis.pending || window.speechSynthesis.paused;

  if (wasSpeakingOrPending) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }

  const startUtterance = (isRetry: boolean) => {
    if (requestId !== currentSpeechRequestId) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const speechCode = getSpeechLangCode(lang);
      utterance.lang = speechCode;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const matchedVoice = selectBestVoice(lang);
      if (matchedVoice) {
        utterance.voice = matchedVoice;
        // Ensure utterance.lang matches the selected voice's locale for reliable synthesis
        if (matchedVoice.lang) {
          utterance.lang = matchedVoice.lang;
        }
      }

      activeUtterances.add(utterance);
      const startedAt = Date.now();
      let hasFinished = false;

      const finishSpeech = () => {
        if (hasFinished) return;
        hasFinished = true;
        activeUtterances.delete(utterance);

        // Ignore if a newer speech request or stopSpeaking() was called
        if (requestId !== currentSpeechRequestId) return;

        clearInternalSpeechTimers();

        // If the browser finished instantaneously (< 120ms) because an OS voice pack is missing,
        // wait a brief natural reading window before activating the microphone
        const elapsed = Date.now() - startedAt;
        const minSpeakingWindowMs = Math.max(1200, Math.min(2800, cleanText.length * 35));
        if (elapsed < 120) {
          speechSafetyTimeout = setTimeout(() => {
            if (requestId === currentSpeechRequestId && onEnd) {
              onEnd();
            }
          }, minSpeakingWindowMs);
        } else if (onEnd) {
          onEnd();
        }
      };

      utterance.onstart = () => {
        if (requestId !== currentSpeechRequestId) return;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        finishSpeech();
      };

      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        activeUtterances.delete(utterance);
        if (requestId !== currentSpeechRequestId) return;

        const errType = event?.error || 'unknown';
        // If Chromium cancelled the utterance on the first attempt right after cancel(), retry once cleanly
        if (!isRetry && (errType === 'canceled' || errType === 'interrupted')) {
          speechStartDelayTimeout = setTimeout(() => {
            startUtterance(true);
          }, 80);
          return;
        }

        console.warn('SpeechSynthesis event:', errType);
        if (onError) onError(errType);
        finishSpeech();
      };

      // Keep-alive interval to prevent Chrome from pausing speechSynthesis mid-utterance
      speechKeepAliveInterval = setInterval(() => {
        if (requestId !== currentSpeechRequestId) {
          clearInternalSpeechTimers();
          return;
        }
        if (window.speechSynthesis.paused) {
          try {
            window.speechSynthesis.resume();
          } catch {
            // ignore
          }
        }
      }, 1000);

      // Safety timeout in case the browser never fires onend
      const estimatedDurationMs = Math.max(4000, cleanText.length * 85 + 2500);
      speechSafetyTimeout = setTimeout(() => {
        if (requestId === currentSpeechRequestId) {
          finishSpeech();
        }
      }, estimatedDurationMs);

      // Signal start immediately for responsive UI state
      if (onStart) onStart();
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('speakQuestion error:', err);
      if (requestId === currentSpeechRequestId) {
        clearInternalSpeechTimers();
        if (onError) onError(err);
        if (onEnd) onEnd();
      }
    }
  };

  // If we just called speechSynthesis.cancel(), wait 65ms so Chromium clears its queue
  // before queueing the new utterance; otherwise start immediately.
  if (wasSpeakingOrPending) {
    speechStartDelayTimeout = setTimeout(() => {
      startUtterance(false);
    }, 65);
  } else {
    startUtterance(false);
  }
}

export function speakText(
  text: string,
  lang: LanguageCode,
  onStart?: () => void,
  onEnd?: () => void
): void {
  speakQuestion(text, lang, onStart, onEnd);
}
