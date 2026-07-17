export interface Condition {
  questionId: string;
  value: string;
}

export interface ObservationMapping {
  observation: string; // e.g., "Supports Vata", "Supports low Agni"
  weight: number; // 1 to 3
}

export interface Option {
  id: string;
  label: string;
  observations?: ObservationMapping[];
  // If nextQuestion is provided here, it overrides the default nextQuestion of the Question
  nextQuestion?: string;
}

export interface Question {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  options: Option[];
  conditions?: Condition[];
  nextQuestion?: string; // ID of the next question, or null if end of category
}

export interface Category {
  id: string;
  title: string;
  questions: Question[];
}

export interface AssessmentState {
  answers: Record<string, string | string[]>;
  observations: Record<string, number>;
  currentCategoryIndex: number;
  currentQuestionId: string | null;
  history: string[]; // stack of question IDs for going back

  setAnswer: (questionId: string, value: string | string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  isComplete: boolean;
}
