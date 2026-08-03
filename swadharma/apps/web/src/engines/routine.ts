// swadharma/apps/web/src/engines/routine.ts
import type { RoutineData, DoshaRoutine, DoshaProfile } from '../types/assessment';
import { getDominantDosha } from './report';

let routineDB: RoutineData = { routines: {}, seasons: {} };
try {
  routineDB = require('../data/routine/core.json') as RoutineData;
} catch (e) {
  console.error("Failed to load routine data", e);
}

/**
 * Get the daily routine tailored to the dominant dosha.
 */
export function getRoutineForProfile(profile: DoshaProfile): DoshaRoutine | null {
  const dominantDosha = getDominantDosha(profile); // Returns "Vata", "Pitta", "Kapha", or "Balanced"
  
  if (routineDB.routines[dominantDosha]) {
    return routineDB.routines[dominantDosha];
  }
  
  // Fallback
  return routineDB.routines['Balanced'] || null;
}
