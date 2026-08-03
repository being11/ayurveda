import type { AyurvedaProfile } from '../types/assessment';
import panchakarmaData from '../data/panchakarma.json';

import type { PanchakarmaTherapy, PurvakarmaStep } from "../types/assessment";
export type { PanchakarmaTherapy, PurvakarmaStep };

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
  return (panchakarmaData.therapies as unknown as PanchakarmaTherapy[]).filter(therapy =>
    therapy.indicatedDoshas?.includes(dominantDosha.toLowerCase()) || therapy.dosha === dominantDosha
  );
}

/**
 * Retrieves the Purvakarma preparation checklist.
 */
export function getPurvakarmaChecklist(): PurvakarmaStep[] {
  return panchakarmaData.purvakarma as unknown as PurvakarmaStep[];
}
