// swadharma/apps/web/src/engines/routine.ts
import type { RoutineData, DoshaRoutine, SeasonAdjustment, DoshaProfile } from '../types/assessment';
import { getDominantDosha } from './report';

let routineDB: RoutineData = { routines: {}, seasons: {} };
try {
  routineDB = require('../data/routine/core.json') as RoutineData;
} catch (e) {
  console.error("Failed to load routine data", e);
}

/**
 * Get the current season based on month (Northern hemisphere assumption)
 */
export function getCurrentSeason(): SeasonAdjustment | null {
  const month = new Date().getMonth(); // 0-11
  
  let seasonKey = 'Balanced';
  if (month >= 2 && month <= 4) {
    seasonKey = 'Spring'; // March, April, May
  } else if (month >= 5 && month <= 7) {
    seasonKey = 'Summer'; // June, July, August
  } else if (month >= 8 && month <= 10) {
    seasonKey = 'Autumn'; // Sept, Oct, Nov
  } else {
    seasonKey = 'Winter'; // Dec, Jan, Feb
  }

  return routineDB.seasons[seasonKey] || null;
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
