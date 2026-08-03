import dietData from '../data/diet.json';

export interface FoodList {
  favor: string[];
  reduce: string[];
  avoid?: string[];
}

export interface FoodCategory {
  category: string;
  favor: string[];
  reduce: string[];
  avoid: string[];
}

export interface DoshaSeasonalMenu {
  season: string;
  recommendation: string;
  menu: string[];
}

export function getTastesForDosha(dosha: string): FoodList {
  const tastes = (dietData.tastes as Record<string, FoodList>)[dosha];
  if (!tastes) {
    return { favor: [], reduce: [] };
  }
  return tastes;
}

export function getFoodsForDosha(dosha: string): FoodCategory[] {
  const foodsData = dietData.foods as unknown as Record<string, Record<string, string[]>>;
  const doshaFoods = foodsData[dosha];
  
  if (!doshaFoods) {
    return [];
  }
  
  // Convert flat food list mapping in JSON into single general category for mapping.
  // We can add actual categories here if the data structure supports it in the future.
  return [
    {
      category: 'General',
      favor: doshaFoods.favor || [],
      reduce: doshaFoods.reduce || [],
      avoid: doshaFoods.avoid || []
    }
  ];
}

export function getSeasonalMenu(seasonId: string, dosha: string): DoshaSeasonalMenu | null {
  const menusBySeason = (dietData.seasonalMenus as Record<string, Record<string, DoshaSeasonalMenu>>)[seasonId];
  if (!menusBySeason) {
    return null;
  }
  
  const menu = menusBySeason[dosha];
  return menu || null;
}

export function getTimingForDosha(dosha: string): string | null {
  const timings = dietData.timing as Record<string, string>;
  return timings[dosha] || null;
}
