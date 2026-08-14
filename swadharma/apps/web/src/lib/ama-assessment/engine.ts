import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { AmaSymptoms, AmaAssessmentMetrics, AmaStore } from '../../types/ama-assessment';

const defaultSymptoms: AmaSymptoms = {
  tongueCoating: 'none',
  heaviness: 'none',
  foulOdor: 'none',
  sluggishness: 'none',
  indigestion: 'none',
  lethargy: 'none',
};

const defaultMetrics: AmaAssessmentMetrics = {
  score: 0,
  status: 'Niraama',
  recommendations: [],
};

const calculateAmaScore = (symptoms: AmaSymptoms): number => {
  let score = 0;

  const severityMap = {
    none: 0,
    thin: 1,
    mild: 1,
    moderate: 2,
    thick: 3,
    yellowish: 3,
    severe: 3,
  };

  score += severityMap[symptoms.tongueCoating] * 6; // High weight
  score += severityMap[symptoms.heaviness] * 4;
  score += severityMap[symptoms.foulOdor] * 5;
  score += severityMap[symptoms.sluggishness] * 4;
  score += severityMap[symptoms.indigestion] * 5;
  score += severityMap[symptoms.lethargy] * 4;

  // Max score is approximately 3*6 + 3*4 + 3*5 + 3*4 + 3*5 + 3*4 = 18 + 12 + 15 + 12 + 15 + 12 = 84.
  // Normalize to 100
  return Math.min(100, Math.round((score / 84) * 100));
};

const determineStatusAndRecommendations = (score: number): Pick<AmaAssessmentMetrics, 'status' | 'recommendations'> => {
  if (score < 15) {
    return {
      status: 'Niraama',
      recommendations: [
        'Maintain a balanced diet and regular routine.',
        'Continue current healthy practices as metabolic fire is strong.',
      ],
    };
  } else if (score < 40) {
    return {
      status: 'Alpa-Saama',
      recommendations: [
        'Sip warm water throughout the day.',
        'Include light digestive spices like ginger, cumin, and fennel.',
        'Avoid heavy, cold, or processed foods.',
      ],
    };
  } else if (score < 70) {
    return {
      status: 'Saama',
      recommendations: [
        'Practice Langhana (light fasting or eating very light meals like Kitchari).',
        'Drink ginger tea regularly.',
        'Avoid dairy, sweets, and heavy meals entirely until digestion improves.',
        'Engage in light exercise to stimulate metabolism.',
      ],
    };
  } else {
    return {
      status: 'Maha-Saama',
      recommendations: [
        'Consult an Ayurvedic practitioner for targeted Ama-pachana (toxin digestion) protocols.',
        'Consider guided Panchakarma therapies.',
        'Strictly adhere to a light, warm, and easily digestible diet (e.g., moong dal soup).',
        'Avoid cold drinks, raw foods, and daytime sleep.',
      ],
    };
  }
};

const storage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(name);
    }
    return null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(name);
    }
  },
};

export const useAmaStore = create<AmaStore>()(
  persist(
    (set, get) => ({
      symptoms: defaultSymptoms,
      metrics: defaultMetrics,
      lastUpdated: null,

      setSymptoms: (newSymptoms) => {
        set((state) => ({
          symptoms: { ...state.symptoms, ...newSymptoms },
        }));
      },

      calculateMetrics: () => {
        const { symptoms } = get();
        const score = calculateAmaScore(symptoms);
        const { status, recommendations } = determineStatusAndRecommendations(score);

        set({
          metrics: { score, status, recommendations },
          lastUpdated: new Date().toISOString(),
        });
      },

      resetAssessment: () => {
        set({
          symptoms: defaultSymptoms,
          metrics: defaultMetrics,
          lastUpdated: null,
        });
      },
    }),
    {
      name: 'ama-assessment-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
