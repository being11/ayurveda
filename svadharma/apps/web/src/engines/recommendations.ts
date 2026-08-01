export interface Recommendation {
  id: string;
  category: 'Diet' | 'Lifestyle' | 'Mental' | 'Exercise';
  title: string;
  description: string;
  rationale: string;
  triggerObservations: string[]; // Observations that trigger this recommendation
}

export const recommendationsDB: Recommendation[] = [
  {
    id: 'rec_diet_vishama',
    category: 'Diet',
    title: 'Establish Regular Meal Times',
    description: 'Eat warm, cooked, and grounding meals at consistent times every day. Favor healthy fats like ghee or sesame oil.',
    rationale: 'Vishama Agni (variable digestion) is governed by Vata dosha. Consistency and warmth pacify Vata and stabilize the digestive fire.',
    triggerObservations: ['Vishama Agni']
  },
  {
    id: 'rec_diet_tikshna',
    category: 'Diet',
    title: 'Favor Cooling, Nourishing Foods',
    description: 'Avoid excessively spicy, sour, or salty foods. Do not skip meals. Favor cooling foods like sweet fruits, bitter greens, and adequate hydration.',
    rationale: 'Tikshna Agni (sharp digestion) is driven by excess Pitta. Skipping meals or adding heat can lead to acidity and burnout.',
    triggerObservations: ['Tikshna Agni', 'Pitta in Amashaya']
  },
  {
    id: 'rec_diet_manda',
    category: 'Diet',
    title: 'Stimulate Digestion Before Meals',
    description: 'Eat a small piece of fresh ginger with a pinch of rock salt before meals. Favor warm, light, and spiced foods. Avoid heavy, cold, or excessively oily foods.',
    rationale: 'Manda Agni (sluggish digestion) is associated with Kapha dosha. Spices like ginger ignite the digestive fire without aggravating it.',
    triggerObservations: ['Manda Agni']
  },
  {
    id: 'rec_life_vata_nidra',
    category: 'Lifestyle',
    title: 'Grounding Evening Routine',
    description: 'Perform a warm oil massage (Abhyanga) on your feet and head before bed. Drink warm milk with nutmeg. Avoid screens 1 hour before sleep.',
    rationale: 'Vata-type sleep disturbances are caused by excess mobility and dryness in the nervous system. Warm oil and milk provide grounding (Sthira) and unctuousness (Snigdha).',
    triggerObservations: ['Vata in Manas', 'Vata Nidra disturbance']
  },
  {
    id: 'rec_mental_pitta',
    category: 'Mental',
    title: 'Cultivate Surrender and Cool the Mind',
    description: 'Practice cooling pranayama (like Sheetali). Engage in activities where you are not competing. Spend time in nature, especially near water or in moonlight.',
    rationale: 'Pitta mind tends towards intensity, frustration, and over-focus. Cooling practices and non-competitive environments reduce excess Rajas (passion/action).',
    triggerObservations: ['Pitta Manas (Rajasic/Tikshna)']
  }
];

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
