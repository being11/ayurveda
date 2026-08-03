// apps/web/src/types/assessment.ts

export interface ObservationMapping {
  observation: string;
  weight: number;
  dimensions?: string[];
}

export interface Condition {
  questionId: string;
  value: string;
}

export interface Option {
  id: string;
  label: string;
  sublabel?: string | null;
  observations?: ObservationMapping[];
  nextQuestion?: string | null;
}

export interface Question {
  id: string;
  category: string;
  subCategory?: string;
  title: string;
  subtitle?: string | null;
  illustration?: string | null;
  type: 'single' | 'multiple';
  options: Option[];
  conditions?: Condition[] | null;
  nextQuestion?: string | null;
  importance: 1 | 2 | 3;
  source?: string;
}

export interface QuestionCategory {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface ObservationResult {
  key: string;
  weight: number;
  dimensions: string[];
}

export interface DoshaProfile {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface AyurvedaProfile {
  prakrtiDosha: DoshaProfile;
  vikrtiDosha: DoshaProfile;
  agni: 'vishama' | 'tikshna' | 'manda' | 'sama' | 'unknown';
  dominantGunas: string[];
  ojas: 'high' | 'moderate' | 'low' | 'unknown';
  manas: 'vata_dominant' | 'pitta_dominant' | 'kapha_dominant' | 'balanced' | 'unknown';
  observations: ObservationResult[];
  gender: 'male' | 'female' | 'other' | null;
  age?: number;
}

export interface AssessmentState {
  answers: Record<string, string | string[]>;
  observations: Record<string, number>;
  currentCategoryIndex: number;
  currentQuestionId: string | null;
  history: string[];
  isComplete: boolean;

  // Herbs State
  herbSearchQuery: string;
  selectedHerbDosha: 'vata' | 'pitta' | 'kapha' | null;
  selectedHerbOrganSystem: string | null;

  setAnswer: (questionId: string, value: string | string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  reset: () => void;

  // Herbs Actions
  setHerbSearchQuery: (query: string) => void;
  setSelectedHerbDosha: (dosha: 'vata' | 'pitta' | 'kapha' | null) => void;
  setSelectedHerbOrganSystem: (organSystem: string | null) => void;
}

export interface DoshaEffect {
  vata: 'balances' | 'aggravates' | 'neutral';
  pitta: 'balances' | 'aggravates' | 'neutral';
  kapha: 'balances' | 'aggravates' | 'neutral';
}

export interface Herb {
  id: string;
  sanskritName: string;
  commonName: string;
  botanicalName: string;
  rasa: string[];
  virya: string;
  vipaka: string;
  prabhava: string | null;
  dosha: DoshaEffect;
  organSystems: string[];
  useCases: string[];
  description: string;
}
