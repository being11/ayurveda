import type { PaschatkarmaProtocol } from '../types/assessment';
import samsarjanaData from '../data/samsarjana.json';

export type ShuddhiLevel = 'pravara' | 'madhyama' | 'avara';

/**
 * Gets the Samsarjana Krama dietary protocol based on the level of purification (Shuddhi).
 * @param level The level of purification (Shuddhi). Defaults to 'madhyama'.
 * @returns The Paschatkarma protocol details including the meal schedule.
 */
export function getSamsarjanaProtocol(level: ShuddhiLevel = 'madhyama'): PaschatkarmaProtocol {
  const data = samsarjanaData.shuddhiLevels as Record<string, PaschatkarmaProtocol>;

  if (data[level]) {
    return data[level];
  }

  // Default fallback if somehow an invalid level is passed
  return data['madhyama']!;
}

/**
 * Recommends a Shuddhi level based on the user's Agni state.
 * Visama/Manda Agni -> Avara Shuddhi (needs slower start but less meals)
 * Sama Agni -> Madhyama Shuddhi
 * Tikshna Agni -> Pravara Shuddhi (can handle faster progression, but typically requires more meals to stabilize)
 */
export function recommendShuddhiByAgni(agniState: 'vishama' | 'tikshna' | 'manda' | 'sama' | 'unknown'): ShuddhiLevel {
  switch (agniState) {
    case 'tikshna':
      return 'pravara';
    case 'sama':
      return 'madhyama';
    case 'vishama':
    case 'manda':
      return 'avara';
    default:
      return 'madhyama';
  }
}
