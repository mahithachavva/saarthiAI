export type LanguageCode = 'en' | 'te' | 'hi' | 'mr' | 'ur' | 'ta';

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  speechCode: string;
  isRtl?: boolean;
}

export type EmploymentPreference = 'Employment' | 'Self-employment' | 'Either';
export type MobilityConstraint = 'Within village/block' | 'Within district' | 'Statewide' | 'Anywhere in India';
export type WorkType = 'Technical' | 'Agriculture/allied' | 'Digital' | 'Manufacturing' | 'Services' | 'Other';

export interface UserProfile {
  name: string;
  age: string;
  location: string;
  state: string;
  district: string;
  education: string;
  currentOccupation: string;
  familyOccupation: string;
  skills: string[];
  experience: string;
  interests: string[];
  employmentPreference: EmploymentPreference;
  mobilityConstraints: MobilityConstraint;
  preferredWorkType: WorkType;
  localContext: string;
}

export interface AssessmentQuestion {
  id: keyof UserProfile | 'locationCombined';
  key: string;
  title: Record<LanguageCode, string>;
  helper: Record<LanguageCode, string>;
  placeholder: Record<LanguageCode, string>;
  conversationalPrompt?: Record<LanguageCode, string>;
  inputType: 'text' | 'number' | 'select' | 'tags';
  options?: { value: string; label: Record<LanguageCode, string> }[];
  suggestions?: Record<LanguageCode, string[]>;
}

export interface NSQFPathway {
  id: string;
  occupation: string;
  sector: string;
  indicativeNsqfLevel?: number;
  nsqfAlignmentText: string;
  requiredEducationMin: string;
  educationWeight: number; // minimum education tier: 1: Below 10th, 2: 10th, 3: 12th/ITI, 4: Diploma/Degree
  coreSkills: string[];
  associatedInterests: string[];
  associatedWorkTypes: WorkType[];
  livelihoodModes: ('Employment' | 'Self-employment')[];
  potentialLivelihoodModeDisplay: string;
  trainingAreas: {
    theory: string[];
    practical: string[];
    certification: string;
  };
  localRelevanceTags: string[];
  description: Record<LanguageCode, string>;
  nextSteps: Record<LanguageCode, string>;
  pmAjayGiaFocus: string;
}

export interface RecommendationMatch {
  pathway: NSQFPathway;
  score: number; // 0 - 100
  alignmentLabel: 'Strong profile alignment' | 'Relevant pathway' | 'Potential pathway';
  matchReasons: string[];
  userStrengths: string[];
  skillGaps: string[];
  immediateAction: string;
}

export interface LocalContextOpportunity {
  id: string;
  category: string;
  title: string;
  relevanceReason: string;
  hubType: 'Skill Hub (PM-AJAY GIA)' | 'District Livelihood Center' | 'MSME Cluster' | 'Rural Enterprise';
  locationScope: string;
  schemesApplicable: string[];
}

export interface RoadmapStep {
  stepNumber: number;
  phase: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
  supportUnderPmAjay: string;
}

export type VoiceState = 'speaking' | 'listening' | 'processing' | 'next_question' | 'ready' | 'unsupported' | 'error';

export type AssessmentFlowState =
  | 'IDLE'
  | 'QUESTION_SPEAKING'
  | 'WAITING_FOR_USER'
  | 'LISTENING'
  | 'PROCESSING_ANSWER'
  | 'MOVING_TO_NEXT_QUESTION'
  | 'COMPLETED';

