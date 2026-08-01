import coreRecommendations from '../data/recommendations/core.json';

export interface Recommendation {
  id: string;
  category: 'Diet' | 'Lifestyle' | 'Mental' | 'Exercise';
  title: string;
  description: string;
  rationale: string;
  triggerObservations: string[]; // Observations that trigger this recommendation
}

export const recommendationsDB: Recommendation[] = coreRecommendations as Recommendation[];

export function generateRecommendations(observations: Record<string, number>): Recommendation[] {
  const generated: Recommendation[] = [];
  const obsKeys = Object.keys(observations);

  recommendationsDB.forEach(rec => {
    // If any of the trigger observations are present in the user's observations, add the recommendation
    const hasTrigger = rec.triggerObservations.some(trigger =>
      obsKeys.some(obs => obs.includes(trigger))
    );

    if (hasTrigger) {
      generated.push(rec);
    }
  });

  return generated;
}
