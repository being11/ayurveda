import { Category } from '../types/assessment';

export const identityCategory: Category = {
  id: 'identity',
  title: 'Identity & Baseline',
  questions: [
    {
      id: 'id_gender',
      category: 'identity',
      title: 'What is your sex assigned at birth?',
      subtitle: 'This helps tailor specific physiological and hormonal questions later.',
      type: 'single',
      options: [
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' }
      ]
    },
    {
      id: 'id_frame',
      category: 'identity',
      title: 'How would you describe your natural physical frame?',
      type: 'single',
      options: [
        { id: 'slight', label: 'Slight, thin, prominent joints', observations: [{ observation: 'Supports Vata Frame', weight: 2 }] },
        { id: 'moderate', label: 'Moderate, athletic, well-proportioned', observations: [{ observation: 'Supports Pitta Frame', weight: 2 }] },
        { id: 'broad', label: 'Broad, sturdy, heavy-set', observations: [{ observation: 'Supports Kapha Frame', weight: 2 }] }
      ]
    },
    {
      id: 'id_weight_tendency',
      category: 'identity',
      title: 'How does your body typically respond to weight?',
      type: 'single',
      options: [
        { id: 'lose_easily', label: 'Hard to gain, easy to lose', observations: [{ observation: 'High metabolic rate (Tikshna/Vata)', weight: 2 }] },
        { id: 'stable', label: 'Relatively stable, can gain or lose if I try', observations: [{ observation: 'Stable metabolism (Sama/Pitta)', weight: 2 }] },
        { id: 'gain_easily', label: 'Easy to gain, very hard to lose', observations: [{ observation: 'Slow metabolic rate (Manda/Kapha)', weight: 2 }] }
      ]
    }
  ]
};

export const digestionCategory: Category = {
  id: 'digestion',
  title: 'Digestion & Metabolism (Agni)',
  questions: [
    {
      id: 'dig_appetite',
      category: 'digestion',
      title: 'How would you describe your appetite on a normal day?',
      type: 'single',
      options: [
        { id: 'variable', label: 'Variable (sometimes starving, sometimes skip meals)', observations: [{ observation: 'Vishama Agni', weight: 3 }] },
        { id: 'strong', label: 'Strong (cannot skip meals without getting irritable)', observations: [{ observation: 'Tikshna Agni', weight: 3 }] },
        { id: 'low', label: 'Low or slow (can go a long time without food)', observations: [{ observation: 'Manda Agni', weight: 3 }] },
        { id: 'steady', label: 'Steady and predictable', observations: [{ observation: 'Sama Agni', weight: 2 }] }
      ]
    },
    {
      id: 'dig_acidity',
      category: 'digestion',
      title: 'Do you frequently experience acidity, heartburn, or acid reflux?',
      type: 'single',
      options: [
        { id: 'often', label: 'Yes, quite often', observations: [{ observation: 'Pitta in Amashaya', weight: 2 }] },
        { id: 'rarely', label: 'Rarely or never', observations: [] }
      ]
    },
    {
      id: 'dig_spicy',
      category: 'digestion',
      title: 'How does your stomach react to spicy or very hot foods?',
      conditions: [{ questionId: 'dig_acidity', value: 'often' }],
      type: 'single',
      options: [
        { id: 'aggravates', label: 'It immediately causes burning or discomfort', observations: [{ observation: 'Tikshna Agni / Pitta aggravation', weight: 3 }] },
        { id: 'fine', label: 'I tolerate it relatively well despite general acidity', observations: [] }
      ]
    }
  ]
};

export const sleepCategory: Category = {
  id: 'sleep',
  title: 'Sleep Patterns (Nidra)',
  questions: [
    {
      id: 'slp_falling',
      category: 'sleep',
      title: 'How easily do you fall asleep?',
      type: 'single',
      options: [
        { id: 'difficult', label: 'My mind races, takes a long time', observations: [{ observation: 'Vata in Manas', weight: 2 }] },
        { id: 'moderate', label: 'Usually within 15-30 minutes', observations: [{ observation: 'Balanced Nidra', weight: 1 }] },
        { id: 'immediate', label: 'As soon as my head hits the pillow', observations: [{ observation: 'Kapha Nidra tendency', weight: 2 }] }
      ]
    },
    {
      id: 'slp_quality',
      category: 'sleep',
      title: 'What is the quality of your sleep?',
      type: 'single',
      options: [
        { id: 'light', label: 'Light, easily disturbed, wake up often', observations: [{ observation: 'Vata Nidra disturbance', weight: 3 }] },
        { id: 'sound', label: 'Sound, but wake up alert and maybe too early', observations: [{ observation: 'Pitta Nidra tendency', weight: 2 }] },
        { id: 'heavy', label: 'Deep and heavy, hard to wake up', observations: [{ observation: 'Kapha Nidra tendency', weight: 3 }] }
      ]
    }
  ]
};

export const emotionsCategory: Category = {
  id: 'emotions',
  title: 'Emotions & Mental State (Manas)',
  questions: [
    {
      id: 'emo_stress',
      category: 'emotions',
      title: 'How do you typically react under severe stress?',
      type: 'single',
      options: [
        { id: 'anxiety', label: 'Anxiety, worry, overwhelm, fear', observations: [{ observation: 'Vata Manas (Rajasic)', weight: 3 }] },
        { id: 'anger', label: 'Irritability, anger, frustration, intensely focused', observations: [{ observation: 'Pitta Manas (Rajasic/Tikshna)', weight: 3 }] },
        { id: 'withdrawal', label: 'Withdrawal, depression, lethargy, stubbornness', observations: [{ observation: 'Kapha Manas (Tamasic/Manda)', weight: 3 }] }
      ]
    },
    {
      id: 'emo_memory',
      category: 'emotions',
      title: 'How would you describe your memory and learning style?',
      type: 'single',
      options: [
        { id: 'quick', label: 'Quick to learn, quick to forget', observations: [{ observation: 'Vata Manas (Chala)', weight: 2 }] },
        { id: 'sharp', label: 'Sharp memory, good at logical deduction', observations: [{ observation: 'Pitta Manas (Tikshna)', weight: 2 }] },
        { id: 'slow', label: 'Slow to learn, but never forget', observations: [{ observation: 'Kapha Manas (Sthira)', weight: 2 }] }
      ]
    }
  ]
};

export const lifestyleCategory: Category = {
  id: 'lifestyle',
  title: 'Lifestyle & Routine',
  questions: [
    {
      id: 'life_routine',
      category: 'lifestyle',
      title: 'How do you handle daily routines?',
      type: 'single',
      options: [
        { id: 'dislike', label: 'Dislike routine, prefer spontaneity', observations: [{ observation: 'Vata Lifestyle', weight: 2 }] },
        { id: 'driven', label: 'Driven by lists and schedules, get annoyed if disrupted', observations: [{ observation: 'Pitta Lifestyle', weight: 2 }] },
        { id: 'comfortable', label: 'Comfortable with routine, can become stuck in a rut', observations: [{ observation: 'Kapha Lifestyle', weight: 2 }] }
      ]
    },
    {
      id: 'life_climate',
      category: 'lifestyle',
      title: 'What type of weather do you struggle with the most?',
      type: 'single',
      options: [
        { id: 'cold_wind', label: 'Cold, windy weather', observations: [{ observation: 'Vata Aggravation tendency', weight: 2 }] },
        { id: 'hot', label: 'Hot, humid weather', observations: [{ observation: 'Pitta Aggravation tendency', weight: 2 }] },
        { id: 'cold_damp', label: 'Cold, damp, gloomy weather', observations: [{ observation: 'Kapha Aggravation tendency', weight: 2 }] }
      ]
    }
  ]
};

export const categories: Category[] = [
  identityCategory,
  digestionCategory,
  sleepCategory,
  emotionsCategory,
  lifestyleCategory
];
