// apps/web/src/engines/report.ts
// Scaffold — subagent 10 will expand this with full computation logic
import type { AyurvedaProfile, ObservationResult } from '../types/assessment';

export function computeProfile(
  observations: Record<string, number>,
  answers: Record<string, string | string[]>
): AyurvedaProfile {
  const dim: Record<string, number> = {};

  Object.entries(observations).forEach(([key, weight]) => {
    const k = key.toLowerCase();
    if (k.includes('vata')) dim['dosha:vata'] = (dim['dosha:vata'] || 0) + weight;
    if (k.includes('pitta')) dim['dosha:pitta'] = (dim['dosha:pitta'] || 0) + weight;
    if (k.includes('kapha')) dim['dosha:kapha'] = (dim['dosha:kapha'] || 0) + weight;
    if (k.includes('vishama agni')) dim['agni:vishama'] = (dim['agni:vishama'] || 0) + weight;
    if (k.includes('tikshna agni')) dim['agni:tikshna'] = (dim['agni:tikshna'] || 0) + weight;
    if (k.includes('manda agni')) dim['agni:manda'] = (dim['agni:manda'] || 0) + weight;
    if (k.includes('sama agni')) dim['agni:sama'] = (dim['agni:sama'] || 0) + weight;
  });

  const v = dim['dosha:vata'] || 0;
  const p = dim['dosha:pitta'] || 0;
  const ka = dim['dosha:kapha'] || 0;
  const total = v + p + ka || 1;

  type AgniKey = 'agni:vishama' | 'agni:tikshna' | 'agni:manda' | 'agni:sama';
  const agniKeys: AgniKey[] = ['agni:vishama', 'agni:tikshna', 'agni:manda', 'agni:sama'];
  const topAgni = agniKeys.reduce<AgniKey>((a, b) => (dim[a] || 0) >= (dim[b] || 0) ? a : b, 'agni:sama');
  const agni = (dim[topAgni] || 0) > 0
    ? (topAgni.split(':')[1] as AyurvedaProfile['agni'])
    : 'unknown';

  const gender = (answers['id_gender'] as AyurvedaProfile['gender']) ?? null;

  const obsResults: ObservationResult[] = Object.entries(observations).map(([key, weight]) => ({
    key, weight, dimensions: [],
  }));

  return {
    prakrtiDosha: { vata: v / total, pitta: p / total, kapha: ka / total },
    vikrtiDosha: { vata: v / total, pitta: p / total, kapha: ka / total },
    agni,
    dominantGunas: [],
    ojas: 'unknown',
    manas: 'unknown',
    observations: obsResults,
    gender,
  };
}

export function getDominantDosha(profile: { vata: number; pitta: number; kapha: number }): string {
  const max = Math.max(profile.vata, profile.pitta, profile.kapha);
  if (max === 0) return 'Balanced';
  if (profile.vata === max) return 'Vata';
  if (profile.pitta === max) return 'Pitta';
  return 'Kapha';
}

export function getConstitutionDescription(profile: { vata: number; pitta: number; kapha: number }): string {
  const sorted = Object.entries(profile).sort(([, a], [, b]) => b - a);
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  if (!first || !second || !third) return 'Tridoshic (balanced Vata, Pitta, Kapha)';

  const gap = (first[1] as number) - (second[1] as number);
  const gapThird = (first[1] as number) - (third[1] as number);
  
  if (gapThird < 0.15) {
     return `Tridoshic (balanced Vata, Pitta, Kapha)`;
  }
  
  if (gap < 0.15) {
    return `${capitalize(first[0] as string)}-${capitalize(second[0] as string)} (dual constitution)`;
  }
  
  return `${capitalize(first[0] as string)}-predominant`;
}

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
