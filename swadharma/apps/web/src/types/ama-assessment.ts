export interface AmaSymptoms {
  tongueCoating: 'none' | 'thin' | 'thick' | 'yellowish';
  heaviness: 'none' | 'mild' | 'moderate' | 'severe';
  foulOdor: 'none' | 'mild' | 'severe';
  sluggishness: 'none' | 'mild' | 'moderate' | 'severe';
  indigestion: 'none' | 'mild' | 'moderate' | 'severe';
  lethargy: 'none' | 'mild' | 'moderate' | 'severe';
}

export interface AmaAssessmentMetrics {
  score: number; // 0 to 100, where higher is more Ama
  status: 'Niraama' | 'Alpa-Saama' | 'Saama' | 'Maha-Saama';
  recommendations: string[];
}

export interface AmaAssessmentState {
  symptoms: AmaSymptoms;
  metrics: AmaAssessmentMetrics;
  lastUpdated: string | null;
}

export interface AmaStore extends AmaAssessmentState {
  setSymptoms: (symptoms: Partial<AmaSymptoms>) => void;
  calculateMetrics: () => void;
  resetAssessment: () => void;
}
