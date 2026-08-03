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


export interface PanchakarmaTherapy {
  id: string;
  name: string;
  dosha: string;
  indicatedDoshas?: string[];
  benefits: string[];
  contraindications: string[];
  duration: string;
}

export interface PurvakarmaStep {
  id: string;
  task: string;
  description: string;
  step?: string;
}


export interface DoshaMatrix {
  vata: string;
  pitta: string;
  kapha: string;
}


export interface RoutineActivity {
  time: string;
  activity: string;
  description: string;
}

export interface DoshaRoutine {
  morning: RoutineActivity[];
  afternoon: RoutineActivity[];
  evening: RoutineActivity[];
  night: RoutineActivity[];
  yoga: string[];
  pranayama: string[];
}

export interface SeasonAdjustment {
  name: string;
  doshaFocus: string;
  adjustment: string;
}

export interface RoutineData {
  routines: Record<string, DoshaRoutine>;
  seasons: Record<string, SeasonAdjustment>;
}

export interface DoshaMatrix {
  vata: string;
  pitta: string;
  kapha: string;
}



export interface AssessmentState {
  herbSearchQuery: string;
  herbDoshaFilter: string | null;
  herbOrganFilter: string | null;
  setHerbSearchQuery: (query: string) => void;
  setHerbDoshaFilter: (dosha: string | null) => void;
  setHerbOrganFilter: (organ: string | null) => void;
  answers: Record<string, string | string[]>;
  observations: Record<string, number>;
  currentCategoryIndex: number;
  currentQuestionId: string | null;
  history: string[];
  isComplete: boolean;

  activeNadiPoint: DoshaType | null;

  herbSearchQuery: string;
  herbDoshaFilter: string | null;
  herbOrganFilter: string | null;

  setHerbSearchQuery: (query: string) => void;
  setHerbDoshaFilter: (dosha: string | null) => void;
  setHerbOrganFilter: (organ: string | null) => void;


  selectedSrotas: string | null;

  currentSeasonId: string | null;
  setCurrentSeasonId: (seasonId: string | null) => void;
  autoDetectSeason: () => void;

  setAnswer: (questionId: string, value: string | string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  reset: () => void;
  setActiveNadiPoint: (point: DoshaType | null) => void;
  getRecommendedPanchakarma: () => PanchakarmaTherapy[];


  setSelectedSrotas: (srotasId: string | null) => void;
}

// Nadi Pariksha Educational Guide Types

export type FingerPosition = 'index' | 'middle' | 'ring';
export type DoshaType = 'vata' | 'pitta' | 'kapha';

export interface SubDosha {
  name: string;
  description: string;
  location: string;
}

export interface PulseQuality {
  animal: string;
  movement: string;
  characteristics: string[];
}

export interface DoshaPulseInfo {
  dosha: DoshaType;
  finger: FingerPosition;
  quality: PulseQuality;
  subDoshas: SubDosha[];
}

export interface NadiData {
  title: string;
  description: string;
  pulses: DoshaPulseInfo[];
}



