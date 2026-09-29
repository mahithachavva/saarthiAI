import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Keyboard, 
  RotateCcw,
  Check,
  Clock,
  Sparkle,
  CornerDownLeft,
  AlertCircle
} from 'lucide-react';
import { 
  LanguageCode, 
  UserProfile, 
  AssessmentFlowState,
  AssessmentQuestion
} from '../types';
import { 
  ASSESSMENT_QUESTIONS, 
  UI_TRANSLATIONS,
  getPersonalizedSpokenSummary 
} from '../data/translations';
import { 
  createSpeechRecognizer, 
  SpeechRecognizerController,
  isSpeechRecognitionSupported, 
  isSpeechSynthesisSupported,
  speakQuestion, 
  stopSpeaking 
} from '../utils/speech';
import { extractProfileInsights } from '../utils/nlpParser';

interface AssessmentFlowProps {
  currentLang: LanguageCode;
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
  initialProfile?: Partial<UserProfile>;
}

const FILLER_NOISE_WORDS = new Set([
  'a', 'i', 'uh', 'um', 'umm', 'uhh', 'hmm', 'hm', 'ah', 'oh', 'er', 'eh'
]);

/**
 * Validates that a captured voice or text response is a meaningful answer
 * and not empty silence or accidental microphone noise.
 */
function isMeaningfulAnswer(raw: string, questionKey: string): boolean {
  if (!raw) return false;
  const trimmed = raw.trim();
  if (!trimmed) return false;

  // Strip punctuation/symbols for length check (keep letters, numbers, and Indic/Arabic script chars)
  const cleaned = trimmed.replace(/[\s.,!?;:'"()\-_/\\]+/g, '');
  if (!cleaned) return false;

  const lower = trimmed.toLowerCase();
  if (FILLER_NOISE_WORDS.has(lower)) return false;

  // For age or experience, numeric answers like "24" or "2" are meaningful
  if (questionKey === 'age') {
    if (/\d{1,2}/.test(trimmed)) return true;
    return cleaned.length >= 2;
  }

  if (questionKey === 'experience') {
    if (/\d+/.test(trimmed)) return true;
    return cleaned.length >= 2;
  }

  // Require at least 2 meaningful characters
  return cleaned.length >= 2;
}

/**
 * Normalizes a natural spoken or typed answer for structured option/numeric questions
 * while preserving natural responses on open-ended questions.
 */
function normalizeAnswerForQuestion(raw: string, q: AssessmentQuestion): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  // Extract clean age number if user spoke a phrase like "I am 24 years old"
  if (q.key === 'age') {
    const numMatch = trimmed.match(/\b(1[4-9]|[2-7][0-9]|80)\b/);
    if (numMatch) {
      return numMatch[1];
    }
    return trimmed;
  }

  // If the question has structured options, map natural speech to the matching option value if possible
  if (q.options && q.options.length > 0) {
    const exactOption = q.options.find(
      opt => opt.value.toLowerCase() === trimmed.toLowerCase()
    );
    if (exactOption) return exactOption.value;

    const lower = trimmed.toLowerCase();

    // Check against localized option labels
    for (const opt of q.options) {
      for (const label of Object.values(opt.label)) {
        if (label && lower.includes(label.toLowerCase())) {
          return opt.value;
        }
      }
    }

    if (q.key === 'employmentPreference') {
      if (/either|both|any|open|दोनों|दोन्ही|ఏదైనా|రెండూ|دونوں|இரண்டும்/i.test(lower)) {
        return 'Either';
      }
      if (/job|employ|salary|wage|company|factory|नौकरी|नोकरी|रोजगार|ఉద్యోగం|జాబ్|نوکری|ملازمت|வேலை|பணி/i.test(lower) && !/self/i.test(lower)) {
        return 'Employment';
      }
      if (/self|own|business|shop|enterprise|entrepreneur|स्वयं|खुद|धंदा|व्यवसाय|సొంత|వ్యాపారం|کاروبار|ذاتی|சுய|தொழில்/i.test(lower)) {
        return 'Self-employment';
      }
      return 'Self-employment';
    }

    if (q.key === 'mobilityConstraints') {
      if (/village|block|home|local|mandal|taluka|गांव|ब्लॉक|गावात|గ్రామం|మండలం|گاؤں|கிராமம்/i.test(lower)) {
        return 'Within village/block';
      }
      if (/anywhere|india|country|national|भारत|देश|దేశం|ملک|இந்தியா/i.test(lower)) {
        return 'Anywhere in India';
      }
      if (/state|statewide|राज्य|राज्यात|రాష్ట్రం|ریاست|மாநிலம்/i.test(lower)) {
        return 'Statewide';
      }
      if (/district|town|city|nearby|जिला|जिल्हा|జిల్లా|ضلع|மாவட்டம்/i.test(lower)) {
        return 'Within district';
      }
      return 'Within district';
    }

    if (q.key === 'preferredWorkType') {
      if (/agri|farm|crop|dairy|poultry|goat|fish|organic|कृषि|खेती|शेती|వ్యవసాయం|زراعت|விவசாயம்/i.test(lower)) {
        return 'Agriculture/allied';
      }
      if (/digital|computer|data|online|internet|office|csc|typing|डिजिटल|कंप्यूटर|संगणक|కంప్యూటర్|డిజిటల్|کمپیوٹر|டிஜிட்டல்|கணினி/i.test(lower)) {
        return 'Digital';
      }
      if (/manufactur|tailor|stitch|garment|apparel|textile|craft|food|weld|सिलाई|शिवणकाम|టైలరింగ్|కుట్టు|سلائی|தையல்|உற்பத்தி/i.test(lower)) {
        return 'Manufacturing';
      }
      if (/service|hospitality|retail|sales|beauty|salon|health|delivery|driver|सेवा|సర్వీస్|సేవ|خدمت|சேவை/i.test(lower)) {
        return 'Services';
      }
      if (/tech|electric|solar|wire|wiring|plumb|mechanic|repair|motor|ev|तकनीकी|इलेक्ट्रिक|सोलर|तांत्रिक|టెక్నికల్|సోలార్|ఎలక్ట్రికల్|تکنیکی|தொழில்நுட்பம்/i.test(lower)) {
        return 'Technical';
      }
      return 'Technical';
    }
  }

  return trimmed;
}

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({
  currentLang,
  onComplete,
  onCancel,
  initialProfile
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  // Questions index (0 to 12 => 13 questions total)
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentIdxRef = useRef(0);
  currentIdxRef.current = currentIdx;

  // Form answer store
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    return {
      name: initialProfile?.name || '',
      age: initialProfile?.age || '',
      locationCombined: initialProfile?.location || '',
      education: initialProfile?.education || '',
      currentOccupation: initialProfile?.currentOccupation || '',
      familyOccupation: initialProfile?.familyOccupation || '',
      skills: initialProfile?.skills ? initialProfile.skills.join(', ') : '',
      experience: initialProfile?.experience || '',
      interests: initialProfile?.interests ? initialProfile.interests.join(', ') : '',
      employmentPreference: initialProfile?.employmentPreference || '',
      mobilityConstraints: initialProfile?.mobilityConstraints || '',
      preferredWorkType: initialProfile?.preferredWorkType || '',
      localContext: initialProfile?.localContext || ''
    };
  });

  const answersRef = useRef<Record<string, string>>(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Voice-First Assessment State Machine:
  // IDLE | QUESTION_SPEAKING | WAITING_FOR_USER | LISTENING | PROCESSING_ANSWER | MOVING_TO_NEXT_QUESTION | COMPLETED
  const [flowState, setFlowState] = useState<AssessmentFlowState>('IDLE');
  const flowStateRef = useRef<AssessmentFlowState>('IDLE');
  const updateFlowState = useCallback((nextState: AssessmentFlowState) => {
    flowStateRef.current = nextState;
    setFlowState(nextState);
  }, []);

  const [isAutoVoiceEnabled, setIsAutoVoiceEnabled] = useState(true);
  const isAutoVoiceEnabledRef = useRef(true);
  isAutoVoiceEnabledRef.current = isAutoVoiceEnabled;

  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [finishingSummary, setFinishingSummary] = useState('');
  const [detectedInsightsSummary, setDetectedInsightsSummary] = useState<string | null>(null);
  const [statusPromptMessage, setStatusPromptMessage] = useState<string | null>(null);

  const recognizerRef = useRef<SpeechRecognizerController | null>(null);
  const isComponentMounted = useRef(true);

  // Synchronization refs to prevent TTS from being captured by mic and prevent duplicate transitions
  const isTransitioningRef = useRef(false);
  const isAssistantSpeakingRef = useRef(false);
  const lockedQuestionIdxRef = useRef<number>(-1);
  const capturedTranscriptRef = useRef<string>('');
  const userTypingActiveRef = useRef(false);
  const silenceRetryCountRef = useRef<number>(0);

  // Timers
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speechEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tagAutoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const processingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextQuestionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoListenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQ = ASSESSMENT_QUESTIONS[currentIdx];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentVal = answers[currentQ.key] || '';

  // Exact question text displayed on screen AND spoken by SAARTHI TTS
  const currentQuestionText = currentQ.title[currentLang] || currentQ.title.en;

  const clearAllTimers = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (speechEndTimerRef.current) {
      clearTimeout(speechEndTimerRef.current);
      speechEndTimerRef.current = null;
    }
    if (tagAutoAdvanceTimerRef.current) {
      clearTimeout(tagAutoAdvanceTimerRef.current);
      tagAutoAdvanceTimerRef.current = null;
    }
    if (processingTimerRef.current) {
      clearTimeout(processingTimerRef.current);
      processingTimerRef.current = null;
    }
    if (nextQuestionTimerRef.current) {
      clearTimeout(nextQuestionTimerRef.current);
      nextQuestionTimerRef.current = null;
    }
    if (autoListenTimerRef.current) {
      clearTimeout(autoListenTimerRef.current);
      autoListenTimerRef.current = null;
    }
  }, []);

  // Build the complete UserProfile from an answers dictionary
  const buildProfile = useCallback((sourceAnswers?: Record<string, string>): UserProfile => {
    const ans = sourceAnswers || answersRef.current;
    const locText = ans.locationCombined?.trim() || 'Kurnool, Andhra Pradesh';
    const parts = locText.split(',');
    const district = parts[0]?.trim() || 'Kurnool';
    const state = parts[1]?.trim() || 'Andhra Pradesh';

    const parsedSkills = (ans.skills || '')
      .split(/[,;\n]+/)
      .map(s => s.trim())
      .filter(Boolean);

    const parsedInterests = (ans.interests || '')
      .split(/[,;\n]+/)
      .map(i => i.trim())
      .filter(Boolean);

    return {
      name: ans.name?.trim() || 'Beneficiary',
      age: ans.age?.trim() || '24',
      location: locText,
      state: state,
      district: district,
      education: ans.education?.trim() || '10th Standard',
      currentOccupation: ans.currentOccupation?.trim() || 'Daily wage worker',
      familyOccupation: ans.familyOccupation?.trim() || 'Agriculture',
      skills: parsedSkills.length > 0 ? parsedSkills : ['Basic manual work', 'Smartphone handling'],
      experience: ans.experience?.trim() || '1 year',
      interests: parsedInterests.length > 0 ? parsedInterests : ['Technical skills', 'Self-employment'],
      employmentPreference: (ans.employmentPreference as UserProfile['employmentPreference']) || 'Self-employment',
      mobilityConstraints: (ans.mobilityConstraints as UserProfile['mobilityConstraints']) || 'Within district',
      preferredWorkType: (ans.preferredWorkType as UserProfile['preferredWorkType']) || 'Technical',
      localContext: ans.localContext?.trim() || `${district} local markets and rural enterprise nodes`
    };
  }, []);

  /**
   * Core automatic progression pipeline:
   * LISTENING / WAITING_FOR_USER -> PROCESSING_ANSWER -> MOVING_TO_NEXT_QUESTION -> QUESTION_SPEAKING (or COMPLETED)
   */
  const submitAnswerAndAdvance = useCallback((rawAnswer: string, targetIdx: number) => {
    if (!isComponentMounted.current) return;
    if (isTransitioningRef.current || lockedQuestionIdxRef.current === targetIdx) return;
    if (targetIdx !== currentIdxRef.current) return;

    const q = ASSESSMENT_QUESTIONS[targetIdx];
    if (!q) return;

    const normalized = normalizeAnswerForQuestion(rawAnswer, q);
    if (!isMeaningfulAnswer(normalized, q.key)) {
      setStatusPromptMessage('Please speak your answer.');
      updateFlowState('WAITING_FOR_USER');
      return;
    }

    // Lock transition immediately so no duplicate voice/timer/button events can trigger
    isTransitioningRef.current = true;
    lockedQuestionIdxRef.current = targetIdx;
    userTypingActiveRef.current = false;
    isAssistantSpeakingRef.current = false;
    setStatusPromptMessage(null);

    clearAllTimers();
    stopSpeaking();
    recognizerRef.current?.abort();

    // Merge current answer and any multi-entity NLP insights before moving forward
    const updatedAnswers: Record<string, string> = {
      ...answersRef.current,
      [q.key]: normalized
    };

    const insights = extractProfileInsights(rawAnswer);
    const detectedLabels: string[] = [];

    if (insights.education && !updatedAnswers.education) {
      updatedAnswers.education = insights.education;
      detectedLabels.push(`Education: ${insights.education}`);
    }
    if (insights.currentOccupation && !updatedAnswers.currentOccupation) {
      updatedAnswers.currentOccupation = insights.currentOccupation;
      detectedLabels.push(`Current work: ${insights.currentOccupation}`);
    }
    if (insights.familyOccupation && !updatedAnswers.familyOccupation) {
      updatedAnswers.familyOccupation = insights.familyOccupation;
      detectedLabels.push(`Family occupation: ${insights.familyOccupation}`);
    }
    if (insights.employmentPreference && !updatedAnswers.employmentPreference) {
      updatedAnswers.employmentPreference = insights.employmentPreference;
      detectedLabels.push(`Preference: ${insights.employmentPreference}`);
    }
    if (insights.skills && insights.skills.length > 0 && !updatedAnswers.skills) {
      updatedAnswers.skills = insights.skills.join(', ');
      detectedLabels.push(`Skills: ${insights.skills.join(', ')}`);
    }
    if (insights.interests && insights.interests.length > 0 && !updatedAnswers.interests) {
      updatedAnswers.interests = insights.interests.join(', ');
      detectedLabels.push(`Interests: ${insights.interests.join(', ')}`);
    }

    if (detectedLabels.length > 0) {
      setDetectedInsightsSummary(detectedLabels.join(' • '));
    }

    // Save synchronously to ref and state BEFORE moving to next question
    answersRef.current = updatedAnswers;
    setAnswers(updatedAnswers);

    // State: PROCESSING_ANSWER
    updateFlowState('PROCESSING_ANSWER');

    processingTimerRef.current = setTimeout(() => {
      if (!isComponentMounted.current) return;

      if (targetIdx < totalQuestions - 1) {
        // State: MOVING_TO_NEXT_QUESTION
        updateFlowState('MOVING_TO_NEXT_QUESTION');
        nextQuestionTimerRef.current = setTimeout(() => {
          if (!isComponentMounted.current) return;
          setVoiceTranscript('');
          setDetectedInsightsSummary(null);
          setStatusPromptMessage(null);
          capturedTranscriptRef.current = '';
          silenceRetryCountRef.current = 0;
          isTransitioningRef.current = false;
          setCurrentIdx(targetIdx + 1);
        }, 380);
      } else {
        // Final question answered -> State: COMPLETED
        recognizerRef.current?.abort();
        const finalProfile = buildProfile(updatedAnswers);
        const summaryText = getPersonalizedSpokenSummary(finalProfile, currentLang);
        setFinishingSummary(summaryText);
        updateFlowState('COMPLETED');

        if (isAutoVoiceEnabledRef.current && isSpeechSynthesisSupported()) {
          isAssistantSpeakingRef.current = true;
          speakQuestion(
            summaryText,
            currentLang,
            () => {
              if (isComponentMounted.current) {
                isAssistantSpeakingRef.current = true;
              }
            },
            () => {
              isAssistantSpeakingRef.current = false;
              if (isComponentMounted.current) {
                onComplete(finalProfile);
              }
            }
          );
        } else {
          nextQuestionTimerRef.current = setTimeout(() => {
            if (isComponentMounted.current) {
              onComplete(finalProfile);
            }
          }, 1500);
        }
      }
    }, 550);
  }, [buildProfile, clearAllTimers, currentLang, onComplete, totalQuestions, updateFlowState]);

  const submitAnswerRef = useRef(submitAnswerAndAdvance);
  useEffect(() => {
    submitAnswerRef.current = submitAnswerAndAdvance;
  }, [submitAnswerAndAdvance]);

  /**
   * Starts speech recognition ONLY after TTS has finished speaking the question.
   */
  const startListeningAfterSpeech = useCallback((forQuestionIdx: number) => {
    if (!isComponentMounted.current) return;
    if (isTransitioningRef.current || forQuestionIdx !== currentIdxRef.current) return;
    if (isAssistantSpeakingRef.current) return;
    if (userTypingActiveRef.current) {
      updateFlowState('WAITING_FOR_USER');
      return;
    }

    if (isSpeechRecognitionSupported() && recognizerRef.current) {
      capturedTranscriptRef.current = '';
      updateFlowState('LISTENING');
      recognizerRef.current.start();
    } else {
      updateFlowState('WAITING_FOR_USER');
    }
  }, [updateFlowState]);

  /**
   * Speaks the exact question text aloud using TTS, keeping microphone disabled
   * while SAARTHI is speaking, and activates microphone listening only after TTS ends.
   */
  const triggerQuestionSpeech = useCallback((questionIdx: number, forceSpeak = false) => {
    if (!isComponentMounted.current) return;
    const q = ASSESSMENT_QUESTIONS[questionIdx];
    if (!q) return;

    const exactQuestionText = q.title[currentLang] || q.title.en;

    // Crucial: Stop/disable speech recognition before TTS starts so SAARTHI's voice is never captured
    if (autoListenTimerRef.current) {
      clearTimeout(autoListenTimerRef.current);
      autoListenTimerRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (speechEndTimerRef.current) {
      clearTimeout(speechEndTimerRef.current);
      speechEndTimerRef.current = null;
    }
    recognizerRef.current?.abort();
    capturedTranscriptRef.current = '';

    if (!isAutoVoiceEnabledRef.current && !forceSpeak) {
      isAssistantSpeakingRef.current = false;
      updateFlowState('WAITING_FOR_USER');
      autoListenTimerRef.current = setTimeout(() => {
        startListeningAfterSpeech(questionIdx);
      }, 250);
      return;
    }

    isAssistantSpeakingRef.current = true;
    updateFlowState('QUESTION_SPEAKING');

    speakQuestion(
      exactQuestionText,
      currentLang,
      () => {
        if (isComponentMounted.current && !isTransitioningRef.current && questionIdx === currentIdxRef.current) {
          isAssistantSpeakingRef.current = true;
          updateFlowState('QUESTION_SPEAKING');
        }
      },
      () => {
        if (!isComponentMounted.current || isTransitioningRef.current || questionIdx !== currentIdxRef.current) {
          return;
        }
        isAssistantSpeakingRef.current = false;
        // Wait 250ms after TTS ends so device speaker reverb cannot be picked up by the microphone
        autoListenTimerRef.current = setTimeout(() => {
          startListeningAfterSpeech(questionIdx);
        }, 250);
      },
      () => {
        if (!isComponentMounted.current || isTransitioningRef.current || questionIdx !== currentIdxRef.current) {
          return;
        }
        isAssistantSpeakingRef.current = false;
        autoListenTimerRef.current = setTimeout(() => {
          startListeningAfterSpeech(questionIdx);
        }, 250);
      }
    );
  }, [currentLang, startListeningAfterSpeech, updateFlowState]);

  // Initialize Speech Recognition for the selected language
  useEffect(() => {
    isComponentMounted.current = true;
    const supported = isSpeechRecognitionSupported();
    setSpeechSupported(supported);

    if (supported) {
      const rec = createSpeechRecognizer(
        currentLang,
        (transcript, isFinal) => {
          // Never capture microphone input while SAARTHI is speaking or transitioning
          if (
            !isComponentMounted.current ||
            isTransitioningRef.current ||
            isAssistantSpeakingRef.current ||
            flowStateRef.current === 'QUESTION_SPEAKING'
          ) {
            return;
          }

          const activeIdx = currentIdxRef.current;
          const activeQ = ASSESSMENT_QUESTIONS[activeIdx];
          if (!activeQ) return;

          capturedTranscriptRef.current = transcript;
          setVoiceTranscript(transcript);
          setStatusPromptMessage(null);

          // Live preview in input box
          const previewVal = normalizeAnswerForQuestion(transcript, activeQ);
          setAnswers(prev => {
            const next = { ...prev, [activeQ.key]: previewVal };
            answersRef.current = next;
            return next;
          });

          // Reset silence/end-of-response timers while speech is still arriving
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          if (speechEndTimerRef.current) {
            clearTimeout(speechEndTimerRef.current);
            speechEndTimerRef.current = null;
          }

          // When a final segment is recognized, wait for end-of-response pause (1050ms)
          // so temporary mid-sentence pauses do not prematurely cut off the user
          if (isFinal && isMeaningfulAnswer(previewVal, activeQ.key)) {
            silenceTimerRef.current = setTimeout(() => {
              if (
                !isComponentMounted.current ||
                isTransitioningRef.current ||
                isAssistantSpeakingRef.current
              ) {
                return;
              }
              const finalCaptured = capturedTranscriptRef.current.trim();
              if (finalCaptured && isMeaningfulAnswer(finalCaptured, activeQ.key)) {
                submitAnswerRef.current(finalCaptured, activeIdx);
              }
            }, 1050);
          }
        },
        (state) => {
          if (!isComponentMounted.current || isTransitioningRef.current || isAssistantSpeakingRef.current) {
            return;
          }
          if (state === 'listening') {
            updateFlowState('LISTENING');
          }
        },
        (err) => {
          if (!isComponentMounted.current || isTransitioningRef.current || isAssistantSpeakingRef.current) {
            return;
          }
          if (err === 'no-speech') {
            // User silence: remain on current question and prompt gently
            setStatusPromptMessage('Please speak your answer.');
            updateFlowState('WAITING_FOR_USER');
          } else if (err !== 'aborted') {
            // Speech recognition error: remain on current question and show retry message
            setStatusPromptMessage("I couldn't hear that. Please try again.");
            updateFlowState('WAITING_FOR_USER');
          }
        },
        () => {
          // onSpeechEnd: Browser speech recognition session ended naturally
          if (
            !isComponentMounted.current ||
            isTransitioningRef.current ||
            isAssistantSpeakingRef.current ||
            flowStateRef.current === 'QUESTION_SPEAKING'
          ) {
            return;
          }

          const activeIdx = currentIdxRef.current;
          const activeQ = ASSESSMENT_QUESTIONS[activeIdx];
          if (!activeQ) return;

          const captured = capturedTranscriptRef.current.trim();
          if (captured && isMeaningfulAnswer(captured, activeQ.key)) {
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
            speechEndTimerRef.current = setTimeout(() => {
              if (!isComponentMounted.current || isTransitioningRef.current) return;
              submitAnswerRef.current(captured, activeIdx);
            }, 350);
          } else {
            // Empty or non-meaningful voice input: do NOT advance!
            // If user was simply thinking silently, gently re-open mic once, else wait on current question
            if (!userTypingActiveRef.current && silenceRetryCountRef.current < 1 && !captured) {
              silenceRetryCountRef.current += 1;
              setStatusPromptMessage('Listening... Please speak your answer.');
              autoListenTimerRef.current = setTimeout(() => {
                if (
                  isComponentMounted.current &&
                  !isTransitioningRef.current &&
                  !isAssistantSpeakingRef.current &&
                  !userTypingActiveRef.current &&
                  activeIdx === currentIdxRef.current
                ) {
                  recognizerRef.current?.start();
                }
              }, 300);
            } else {
              setStatusPromptMessage(
                captured.length > 0
                  ? "I couldn't hear that clearly. Please speak again or type your answer."
                  : 'Please speak your answer.'
              );
              updateFlowState('WAITING_FOR_USER');
            }
          }
        }
      );
      recognizerRef.current = rec;
    } else {
      updateFlowState('WAITING_FOR_USER');
    }

    return () => {
      recognizerRef.current?.abort();
    };
  }, [currentLang, updateFlowState]);

  // Clean up on component unmount
  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
      clearAllTimers();
      recognizerRef.current?.abort();
      stopSpeaking();
    };
  }, [clearAllTimers]);

  // Automatically speak the active question whenever currentIdx or currentLang changes
  useEffect(() => {
    if (flowStateRef.current === 'COMPLETED') return;

    isTransitioningRef.current = false;
    userTypingActiveRef.current = false;
    capturedTranscriptRef.current = '';
    silenceRetryCountRef.current = 0;
    setStatusPromptMessage(null);

    triggerQuestionSpeech(currentIdx, false);
  }, [currentIdx, currentLang, triggerQuestionSpeech]);

  // Toggle microphone recording manually (fallback control)
  const handleToggleMic = () => {
    if (!speechSupported || isTransitioningRef.current || flowState === 'COMPLETED') return;

    userTypingActiveRef.current = false;
    setStatusPromptMessage(null);

    if (flowState === 'LISTENING') {
      // If user already spoke a meaningful answer and taps mic to finish, submit it
      const captured = capturedTranscriptRef.current.trim();
      if (captured && isMeaningfulAnswer(captured, currentQ.key)) {
        recognizerRef.current?.stop();
        submitAnswerAndAdvance(captured, currentIdx);
      } else {
        recognizerRef.current?.abort();
        updateFlowState('WAITING_FOR_USER');
      }
    } else {
      stopSpeaking();
      isAssistantSpeakingRef.current = false;
      if (autoListenTimerRef.current) {
        clearTimeout(autoListenTimerRef.current);
        autoListenTimerRef.current = null;
      }
      capturedTranscriptRef.current = '';
      setVoiceTranscript('');
      updateFlowState('LISTENING');
      recognizerRef.current?.start();
    }
  };

  // Submit / Confirm for typed answers -> saves and automatically speaks next question
  const handleConfirmTypedAnswer = () => {
    if (isTransitioningRef.current || flowState === 'COMPLETED') return;
    const val = (answersRef.current[currentQ.key] || '').trim();
    if (isMeaningfulAnswer(val, currentQ.key)) {
      submitAnswerAndAdvance(val, currentIdx);
    } else {
      setStatusPromptMessage('Please speak or type your answer to continue.');
    }
  };

  // Back button
  const handleBack = () => {
    clearAllTimers();
    stopSpeaking();
    recognizerRef.current?.abort();
    isTransitioningRef.current = false;
    isAssistantSpeakingRef.current = false;
    lockedQuestionIdxRef.current = -1;
    capturedTranscriptRef.current = '';
    silenceRetryCountRef.current = 0;
    setDetectedInsightsSummary(null);
    setStatusPromptMessage(null);

    if (currentIdx > 0) {
      setVoiceTranscript('');
      setCurrentIdx(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  // Clicking an option or single-choice suggestion saves and automatically advances
  const handleSelectSuggestion = (val: string) => {
    if (isTransitioningRef.current || flowState === 'COMPLETED') return;
    setAnswers(prev => {
      const next = { ...prev, [currentQ.key]: val };
      answersRef.current = next;
      return next;
    });
    submitAnswerAndAdvance(val, currentIdx);
  };

  // Clicking a tag suggestion toggles the tag and schedules a smooth auto-advance
  const handleToggleTag = (tag: string) => {
    if (isTransitioningRef.current || flowState === 'COMPLETED') return;
    recognizerRef.current?.abort();
    isAssistantSpeakingRef.current = false;

    const existing = (answersRef.current[currentQ.key] || '')
      .split(/[,;]+/)
      .map(s => s.trim())
      .filter(Boolean);

    let updated: string[];
    if (existing.includes(tag)) {
      updated = existing.filter(t => t !== tag);
    } else {
      updated = [...existing, tag];
    }

    const combined = updated.join(', ');
    setAnswers(prev => {
      const next = { ...prev, [currentQ.key]: combined };
      answersRef.current = next;
      return next;
    });

    if (tagAutoAdvanceTimerRef.current) {
      clearTimeout(tagAutoAdvanceTimerRef.current);
      tagAutoAdvanceTimerRef.current = null;
    }

    if (combined && isMeaningfulAnswer(combined, currentQ.key)) {
      const activeIdx = currentIdx;
      tagAutoAdvanceTimerRef.current = setTimeout(() => {
        if (isComponentMounted.current && !isTransitioningRef.current && currentIdxRef.current === activeIdx) {
          submitAnswerRef.current(answersRef.current[currentQ.key] || combined, activeIdx);
        }
      }, 1300);
    }
  };

  // Progress percentage
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);
  const isAutoTransitioning =
    flowState === 'PROCESSING_ANSWER' || flowState === 'MOVING_TO_NEXT_QUESTION';

  // Completion screen after final question
  if (flowState === 'COMPLETED') {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 animate-pulse">
          <Sparkles className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            <span>SAARTHI AI Voice Summary</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {currentLang === 'te' ? 'మీ జీవనోపాధి ప్రొఫైల్ సిద్ధమైంది!' :
             currentLang === 'hi' ? 'आपकी आजीविका प्रोफ़ाइल तैयार है!' :
             currentLang === 'mr' ? 'आपली उपजीविका प्रोफाइल तयार आहे!' :
             currentLang === 'ur' ? 'آپ کا روزگار پروفائل تیار ہے!' :
             currentLang === 'ta' ? 'உங்கள் வாழ்வாதார சுயவிவரம் தயாராக உள்ளது!' :
             'Synthesizing Your Livelihood Profile!'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto italic font-medium p-4 bg-amber-50/80 rounded-2xl border border-amber-200">
            "{finishingSummary}"
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              stopSpeaking();
              onComplete(buildProfile());
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>View My Recommendations & Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-3xl mx-auto py-4 px-4 sm:px-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Breadcrumb & Progress */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <button
            onClick={handleBack}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentIdx > 0 ? t('btnBack') : 'Exit Assessment'}</span>
          </button>
          
          <div className="flex items-center gap-2">
            {/* Auto-voice Toggle Switch */}
            <button
              onClick={() => {
                if (isAutoVoiceEnabled) {
                  stopSpeaking();
                  isAssistantSpeakingRef.current = false;
                  setIsAutoVoiceEnabled(false);
                  isAutoVoiceEnabledRef.current = false;
                  startListeningAfterSpeech(currentIdx);
                } else {
                  setIsAutoVoiceEnabled(true);
                  isAutoVoiceEnabledRef.current = true;
                  triggerQuestionSpeech(currentIdx, true);
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                isAutoVoiceEnabled
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}
              title={isAutoVoiceEnabled ? 'AI Voice is speaking automatically. Click to mute.' : 'AI Voice muted. Click to enable automatic speech.'}
            >
              {isAutoVoiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-600" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isAutoVoiceEnabled ? 'Voice: ON' : 'Voice: Muted'}</span>
            </button>

            <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {currentIdx + 1} / {totalQuestions}
            </span>
            <span className="text-slate-400 font-medium">({progressPercent}%)</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-amber-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Conversational Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-9 space-y-6">
        {/* Assistant Header Prompt */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SAARTHI AI Voice Assistant</span>
            </div>
            <h2
              id="current-assessment-question-text"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug"
            >
              {currentQuestionText}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {currentQ.helper[currentLang] || currentQ.helper.en}
            </p>
          </div>

          {/* Optional Fallback Replay Question Button */}
          <button
            id="read-aloud-question-btn"
            onClick={() => triggerQuestionSpeech(currentIdx, true)}
            disabled={isAutoTransitioning}
            className={`px-3 py-2 rounded-2xl border transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold ${
              flowState === 'QUESTION_SPEAKING'
                ? 'bg-amber-600 text-white border-amber-700 shadow-sm animate-pulse'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title="Replay question aloud"
            aria-label="Replay Question"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${flowState === 'QUESTION_SPEAKING' ? 'animate-spin' : ''}`} />
            <span>{t('replayQuestion')}</span>
          </button>
        </div>

        {/* Dynamic Voice Visualizer Box with Explicit State Machine */}
        <div className={`p-4 rounded-2xl border transition-all ${
          flowState === 'LISTENING'
            ? 'bg-amber-50/90 border-amber-400 shadow-sm ring-2 ring-amber-400/30'
            : flowState === 'QUESTION_SPEAKING'
            ? 'bg-blue-50/90 border-blue-400 shadow-sm ring-2 ring-blue-400/20'
            : flowState === 'PROCESSING_ANSWER'
            ? 'bg-emerald-50/90 border-emerald-400 shadow-sm ring-2 ring-emerald-400/20'
            : flowState === 'MOVING_TO_NEXT_QUESTION'
            ? 'bg-purple-50/90 border-purple-400 shadow-sm ring-2 ring-purple-400/20'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Microphone Button */}
              <button
                id="mic-action-btn"
                onClick={handleToggleMic}
                disabled={!speechSupported || isAutoTransitioning}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0 ${
                  flowState === 'LISTENING'
                    ? 'bg-red-600 text-white animate-bounce ring-4 ring-red-300'
                    : flowState === 'QUESTION_SPEAKING'
                    ? 'bg-blue-600 text-white'
                    : speechSupported
                    ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
                title={
                  flowState === 'QUESTION_SPEAKING'
                    ? 'SAARTHI is speaking the question...'
                    : speechSupported
                    ? 'Speak your answer or tap to toggle microphone'
                    : 'Speech recognition not supported in this browser'
                }
                aria-label="Microphone button"
              >
                {flowState === 'QUESTION_SPEAKING' ? (
                  <Volume2 className="w-7 h-7 animate-pulse" />
                ) : flowState === 'LISTENING' ? (
                  <MicOff className="w-7 h-7" />
                ) : (
                  <Mic className="w-7 h-7" />
                )}
              </button>

              <div className="flex-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span>Conversational Assistant Status</span>
                  <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-semibold">
                    {flowState}
                  </span>
                </div>
                
                {/* Voice State Machine Displays */}
                <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  {(flowState === 'QUESTION_SPEAKING' || flowState === 'IDLE') && (
                    <span className="text-blue-700 font-bold flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 animate-bounce" />
                      <span>{t('voiceSpeaking')}</span>
                    </span>
                  )}
                  {flowState === 'LISTENING' && (
                    <span className="flex items-center gap-1.5 text-red-600 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                      <span>{t('voiceListening')}</span>
                    </span>
                  )}
                  {flowState === 'PROCESSING_ANSWER' && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>{t('voiceProcessing')}</span>
                    </span>
                  )}
                  {flowState === 'MOVING_TO_NEXT_QUESTION' && (
                    <span className="text-purple-700 font-bold flex items-center gap-1.5">
                      <Sparkle className="w-4 h-4 animate-spin" />
                      <span>{t('voiceNextQuestion')}</span>
                    </span>
                  )}
                  {flowState === 'WAITING_FOR_USER' && speechSupported && (
                    <span className="text-slate-800 flex items-center gap-1.5">
                      <Mic className="w-4 h-4 text-amber-600" />
                      <span>{statusPromptMessage || 'Please speak your answer.'}</span>
                    </span>
                  )}
                  {flowState === 'WAITING_FOR_USER' && !speechSupported && (
                    <span className="text-amber-800 text-xs">
                      {t('voiceUnsupported')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Visualizer audio wave animation during speaking, listening, or processing */}
            {flowState === 'QUESTION_SPEAKING' && (
              <div className="flex items-center gap-1 h-7 px-3 bg-blue-100/90 rounded-full border border-blue-200">
                <span className="w-1 h-3 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="w-1 h-5 bg-blue-600 rounded-full animate-bounce"></span>
                <span className="w-1 h-3 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="w-1 h-6 bg-blue-600 rounded-full animate-bounce"></span>
                <span className="w-1 h-4 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-[11px] font-bold text-blue-700 ml-1.5">SAARTHI Speaking</span>
              </div>
            )}
            {flowState === 'LISTENING' && (
              <div className="flex items-center gap-1 h-7 px-3 bg-red-100/80 rounded-full border border-red-200">
                <span className="w-1 h-3 bg-red-600 rounded-full animate-pulse"></span>
                <span className="w-1 h-5 bg-red-600 rounded-full animate-bounce"></span>
                <span className="w-1 h-4 bg-red-600 rounded-full animate-pulse"></span>
                <span className="w-1 h-6 bg-red-600 rounded-full animate-bounce"></span>
                <span className="w-1 h-3 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-[11px] font-bold text-red-700 ml-1.5">Listening...</span>
              </div>
            )}
            {isAutoTransitioning && (
              <div className="flex items-center gap-1.5 h-7 px-3 bg-emerald-100/90 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-[11px] font-bold text-emerald-800">Answer Saved • Next Question</span>
              </div>
            )}
          </div>

          {/* Real-time Voice Transcript Display */}
          {voiceTranscript && (
            <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-xs text-slate-700">
              <span className="font-bold text-slate-500 mr-1.5">Your Voice Answer:</span>
              <span className="font-medium bg-white px-2 py-0.5 rounded border border-slate-200">
                "{voiceTranscript}"
              </span>
            </div>
          )}

          {/* Helpful prompt when waiting or on speech error/silence */}
          {statusPromptMessage && (
            <div className="mt-2.5 text-xs font-semibold text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{statusPromptMessage}</span>
              </div>
              {speechSupported && flowState === 'WAITING_FOR_USER' && (
                <button
                  type="button"
                  onClick={handleToggleMic}
                  className="text-[11px] font-bold bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-0.5 rounded-lg cursor-pointer shrink-0"
                >
                  Speak Now
                </button>
              )}
            </div>
          )}

          {/* Extracted Insights Badge */}
          {detectedInsightsSummary && (
            <div className="mt-2.5 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Automatically Extracted:</strong> {detectedInsightsSummary}
              </span>
            </div>
          )}
        </div>

        {/* Free Input Field / Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              {t('typeOrSpeak')}
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              {currentQ.options
                ? 'Speak your answer after SAARTHI finishes speaking, or tap an option'
                : 'Speak after SAARTHI asks the question, or type & press Enter'}
            </span>
          </div>

          {currentQ.options ? (
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map(opt => {
                const isSelected = currentVal === opt.value;
                const optLabel = opt.label[currentLang] || opt.label.en;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={isAutoTransitioning}
                    onClick={() => handleSelectSuggestion(opt.value)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{optLabel}</span>
                    {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="relative">
              <textarea
                id={`assessment-input-${currentQ.key}`}
                rows={currentQ.inputType === 'number' ? 1 : 3}
                value={currentVal}
                disabled={isAutoTransitioning}
                onFocus={() => {
                  userTypingActiveRef.current = true;
                  if (silenceTimerRef.current) {
                    clearTimeout(silenceTimerRef.current);
                    silenceTimerRef.current = null;
                  }
                  if (tagAutoAdvanceTimerRef.current) {
                    clearTimeout(tagAutoAdvanceTimerRef.current);
                    tagAutoAdvanceTimerRef.current = null;
                  }
                  recognizerRef.current?.abort();
                  if (flowState === 'LISTENING') {
                    updateFlowState('WAITING_FOR_USER');
                  }
                }}
                onChange={(e) => {
                  userTypingActiveRef.current = true;
                  setStatusPromptMessage(null);
                  if (tagAutoAdvanceTimerRef.current) {
                    clearTimeout(tagAutoAdvanceTimerRef.current);
                    tagAutoAdvanceTimerRef.current = null;
                  }
                  const val = e.target.value;
                  setAnswers(prev => {
                    const next = { ...prev, [currentQ.key]: val };
                    answersRef.current = next;
                    return next;
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleConfirmTypedAnswer();
                  }
                }}
                placeholder={currentQ.placeholder[currentLang] || currentQ.placeholder.en}
                className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm text-slate-900 font-medium placeholder:text-slate-400 shadow-inner"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2 text-[11px] text-slate-400 font-medium select-none">
                <span className="hidden sm:inline-flex items-center gap-1">
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Press Enter ↵ to submit</span>
                </span>
              </div>
            </div>
          )}

          {/* Quick suggestions tags in the active language */}
          {currentQ.suggestions?.[currentLang] && (
            <div className="pt-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Quick Selection / ట్యాప్ చేయండి / सुझाव:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentQ.suggestions[currentLang].map((sug, i) => {
                  const isSelected = currentVal.includes(sug);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={isAutoTransitioning}
                      onClick={() => {
                        if (currentQ.inputType === 'tags') {
                          handleToggleTag(sug);
                        } else {
                          handleSelectSuggestion(sug);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      {sug}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status & Action Bar (Back + Typed Answer Confirmation) */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            id="assessment-back-btn"
            type="button"
            onClick={handleBack}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('btnBack')}</span>
          </button>

          {isAutoTransitioning ? (
            <div className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs">
              <Sparkle className="w-4 h-4 animate-spin" />
              <span>
                {flowState === 'PROCESSING_ANSWER' ? t('voiceProcessing') : t('voiceNextQuestion')}
              </span>
            </div>
          ) : !currentQ.options ? (
            <button
              id="assessment-submit-btn"
              type="button"
              onClick={handleConfirmTypedAnswer}
              disabled={!isMeaningfulAnswer(currentVal, currentQ.key)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                isMeaningfulAnswer(currentVal, currentQ.key)
                  ? 'bg-slate-900 hover:bg-slate-800 active:bg-black text-white shadow-sm hover:shadow-md cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <span>
                {currentIdx === totalQuestions - 1 ? t('btnFinish') : t('btnNext')}
              </span>
              <CornerDownLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>SAARTHI speaks each question • Speak or tap an option to continue</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
