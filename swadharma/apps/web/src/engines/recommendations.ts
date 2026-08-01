// swadharma/apps/web/src/engines/recommendations.ts

export interface Recommendation {
  id: string;
  category: 'Diet' | 'Lifestyle' | 'Mental' | 'Exercise' | 'Sleep' |
            'Seasonal' | 'Spiritual' | "Women's Health" | "Men's Health" | 'Ojas';
  subCategory?: string;
  title: string;
  description: string;
  rationale: string;
  why: string;
  shastraRef?: string;
  alternatives?: string[];
  triggerObservations: string[];
}

let recommendationsDB: Recommendation[] = [];
try {
  const data = require('../data/recommendations/core.json');
  recommendationsDB = data;
} catch {
  // Fallback minimal DB
  recommendationsDB = [
    {
      id: 'rec_diet_vishama_routine',
      category: 'Diet',
      title: 'Establish Regular Meal Times',
      description: 'Eat warm, cooked, grounding meals at consistent times. Favor ghee or sesame oil.',
      rationale: 'Vishama Agni is governed by Vata. Consistency and warmth pacify Vata and stabilize Agni.',
      why: 'Your digestive fire fluctuates unpredictably — a hallmark of Vishama Agni from Vata imbalance.',
      shastraRef: 'Charaka Samhita, Chikitsasthana 15.44',
      alternatives: ['Start by fixing meal time, even with simple food.'],
      triggerObservations: ['Vishama Agni']
    }
  ];
}

export { recommendationsDB };

export function generateRecommendations(
  observations: Record<string, number>
): { recommendation: Recommendation; relevanceScore: number }[] {
  const results: { recommendation: Recommendation; relevanceScore: number }[] = [];

  recommendationsDB.forEach(rec => {
    let relevanceScore = 0;

    rec.triggerObservations.forEach(trigger => {
      // Exact match: full score
      const exactMatch = observations[trigger];
      if (exactMatch) {
        relevanceScore += exactMatch * 2;
        return;
      }

      // Fuzzy match: partial string match
      const fuzzyMatch = Object.entries(observations).find(([obsKey]) =>
        obsKey.toLowerCase().includes(trigger.toLowerCase()) ||
        trigger.toLowerCase().includes(obsKey.toLowerCase())
      );
      if (fuzzyMatch) {
        relevanceScore += fuzzyMatch[1];
      }
    });

    if (relevanceScore > 0) {
      results.push({ recommendation: rec, relevanceScore });
    }
  });

  // Sort by relevance score descending
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export function groupByCategory(
  recs: { recommendation: Recommendation; relevanceScore: number }[]
): Record<string, { recommendation: Recommendation; relevanceScore: number }[]> {
  const grouped: Record<string, typeof recs> = {};
  recs.forEach(item => {
    const cat = item.recommendation.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });
  return grouped;
}
