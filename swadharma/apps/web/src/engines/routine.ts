import routineData from '../data/routine/core.json';
import { getDominantDosha } from './report';
import type { DoshaProfile } from '../types/assessment';

export interface RoutineActivity {
  id: string;
  timeRange: string;
  activity: string;
  description: string;
}

export interface DailyRoutine {
  morning: RoutineActivity[];
  afternoon: RoutineActivity[];
  evening: RoutineActivity[];
  night: RoutineActivity[];
}

export interface SeasonAdjustment {
  name: string;
  dosha: string;
  guidelines: string[];
}

export interface RoutineOutput {
  dominantDosha: string;
  dailyRoutine: DailyRoutine;
  yoga: string[];
  pranayama: string[];
  seasonalAdjustment: SeasonAdjustment;
}

// Simple rule-based season determiner for northern hemisphere
function getCurrentSeason(): "Spring" | "Summer" | "Autumn" | "Winter" {
  const month = new Date().getMonth();
  // Spring: March(2), April(3), May(4)
  if (month >= 2 && month <= 4) return "Spring";
  // Summer: June(5), July(6), August(7)
  if (month >= 5 && month <= 7) return "Summer";
  // Autumn: September(8), October(9), November(10)
  if (month >= 8 && month <= 10) return "Autumn";
  // Winter: December(11), January(0), February(1)
  return "Winter";
}

export function generateRoutine(doshaProfile: DoshaProfile): RoutineOutput {
  const dominantDosha = getDominantDosha(doshaProfile);

  let dailyRoutine: DailyRoutine;
  let yoga: string[];
  let pranayama: string[];

  // Support Vata, Pitta, Kapha, Balanced
  if (routineData.routines[dominantDosha as keyof typeof routineData.routines]) {
    dailyRoutine = routineData.routines[dominantDosha as keyof typeof routineData.routines] as DailyRoutine;
    yoga = routineData.yoga[dominantDosha as keyof typeof routineData.yoga] || routineData.yoga["Balanced"];
    pranayama = routineData.pranayama[dominantDosha as keyof typeof routineData.pranayama] || routineData.pranayama["Balanced"];
  } else {
    // Fallback
    dailyRoutine = routineData.routines["Balanced"] as DailyRoutine;
    yoga = routineData.yoga["Balanced"];
    pranayama = routineData.pranayama["Balanced"];
  }

  const currentSeason = getCurrentSeason();
  const seasonalAdjustment = routineData.seasons[currentSeason] as SeasonAdjustment;

  return {
    dominantDosha,
    dailyRoutine,
    yoga,
    pranayama,
    seasonalAdjustment
  };
}
