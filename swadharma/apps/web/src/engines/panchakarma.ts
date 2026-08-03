import type { AyurvedaProfile } from '../types/assessment';
import panchakarmaData from '../data/panchakarma.json';

export interface PanchakarmaTherapy {
  id: string;
  name: string;
  dosha: string;
  benefits: string[];
  contraindications: string[];
  duration: string;
}

export interface PurvakarmaTask {
  id: string;
  task: string;
  description: string;
}

/**
 * Gets recommended Panchakarma therapies based on the user's dominant dosha profile.
 */
export function getRecommendedTherapies(profile: AyurvedaProfile): PanchakarmaTherapy[] {
  // Find the dominant dosha
  let dominantDosha = 'Vata';
  let maxScore = profile.prakrtiDosha.vata;

  if (profile.prakrtiDosha.pitta > maxScore) {
    maxScore = profile.prakrtiDosha.pitta;
    dominantDosha = 'Pitta';
  }
  if (profile.prakrtiDosha.kapha > maxScore) {
    dominantDosha = 'Kapha';
  }

  // Filter therapies targeting the dominant dosha
  return panchakarmaData.therapies.filter(therapy => therapy.dosha === dominantDosha);
}

/**
 * Retrieves the Purvakarma preparation checklist.
 */
export function getPurvakarmaChecklist(): PurvakarmaTask[] {
  return panchakarmaData.purvakarma;
}
