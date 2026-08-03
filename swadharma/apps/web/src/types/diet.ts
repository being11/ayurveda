export type Dosha = 'vata' | 'pitta' | 'kapha';

export interface Rasa {
  id: string;
  name: string; // Sweet, Sour, Salty, Pungent, Bitter, Astringent
  elements: string[];
  effects: {
    vata: 'increase' | 'decrease' | 'neutral';
    pitta: 'increase' | 'decrease' | 'neutral';
    kapha: 'increase' | 'decrease' | 'neutral';
  };
  description: string;
}

export interface FoodCategory {
  categoryName: string; // e.g., 'Grains', 'Vegetables', 'Fruits', 'Dairy'
  favor: string[];
  reduce: string[];
  avoid: string[];
}

export interface DoshaDiet {
  dosha: Dosha;
  description: string;
  rasasToFavor: string[]; // references Rasa.id
  rasasToReduce: string[]; // references Rasa.id
  foodCategories: FoodCategory[];
}

export interface SeasonalMenu {
  id: string;
  season: string; // e.g., 'Grishma (Summer)'
  doshaSeason: Dosha; // predominant dosha of the season
  guidelines: string[];
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
}

export interface MealTiming {
  agniType: 'vishama' | 'tikshna' | 'manda' | 'sama';
  description: string;
  breakfastTime: string;
  lunchTime: string;
  dinnerTime: string;
  guidelines: string[];
}
