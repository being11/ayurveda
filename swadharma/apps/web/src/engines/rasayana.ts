import { AyurvedaProfile, DoshaProfile } from '../types/assessment';
import { getDominantDosha } from './report';
import rasayanaData from '../data/rasayana.json';

export interface RasayanaProtocol {
  primaryFocus: string;
  recommendedHerbs: string[];
  lifestylePractices: string[];
  dietaryAdvice: string;
}

export function getRasayanaProtocol(ojas: AyurvedaProfile['ojas'], vikrtiDosha: DoshaProfile): RasayanaProtocol {
  const dominantDosha = getDominantDosha(vikrtiDosha).toLowerCase();
  
  if (ojas === 'low') {
    return rasayanaData.low.protocol;
  }

  if (ojas === 'moderate') {
    if (dominantDosha === 'vata' || dominantDosha === 'pitta' || dominantDosha === 'kapha') {
      return rasayanaData.moderate[dominantDosha].protocol;
    }
    // Default fallback to vata if somehow dominant dosha is mixed/balanced
    return rasayanaData.moderate.vata.protocol;
  }

  // High Ojas and unknown
  return rasayanaData.high.protocol;
}
