import type { AyurvedaProfile, ObservationResult, DoshaProfile } from '../types/assessment';

// --- Constants ---
const DOSHA_KEYWORDS: Record<string, string[]> = {
  vata: ['vata', 'vishama agni', 'vata nidra', 'vata manas', 'vata frame', 'vata apana',
         'vata lifestyle', 'vata aggravation', 'vata bala', 'vata in', 'vata artava',
         'vata shukra', 'vata majja', 'vata rasa', 'vata prakrti', 'vata vriddha'],
  pitta: ['pitta', 'tikshna agni', 'pitta nidra', 'pitta manas', 'pitta frame',
          'pitta lifestyle', 'pitta aggravation', 'pitta in', 'pitta artava',
          'pitta rakta', 'pitta twak', 'pitta prakrti', 'pitta social'],
  kapha: ['kapha', 'manda agni', 'kapha nidra', 'kapha manas', 'kapha frame',
          'kapha lifestyle', 'kapha aggravation', 'kapha in', 'kapha ama',
          'kapha sedentary', 'kapha bala', 'kapha stiffness', 'kapha prakrti'],
};

const AGNI_KEYWORDS: Record<AyurvedaProfile['agni'], string[]> = {
  vishama: ['vishama agni', 'vishama ahara', 'vishama nidra', 'meal skipping'],
  tikshna: ['tikshna agni', 'pitta in amashaya', 'tikshna agni /'],
  manda:   ['manda agni', 'kapha ama accumulation', 'manda nidra'],
  sama:    ['sama agni', 'sama artava', 'sama nidra', 'balanced nidra'],
  unknown: [],
};

// Compute dosha totals from all observations
function computeDoshaProfile(observations: Record<string, number>): DoshaProfile {
  const totals = { vata: 0, pitta: 0, kapha: 0 };
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    for (const dosha of ['vata', 'pitta', 'kapha'] as const) {
      if (DOSHA_KEYWORDS[dosha]?.some(kw => lower.includes(kw))) {
        totals[dosha] += weight;
      }
    }
  });
  const total = totals.vata + totals.pitta + totals.kapha || 1;
  return {
    vata: Math.round((totals.vata / total) * 100) / 100,
    pitta: Math.round((totals.pitta / total) * 100) / 100,
    kapha: Math.round((totals.kapha / total) * 100) / 100,
  };
}

// Determine dominant Agni type
function computeAgni(observations: Record<string, number>): AyurvedaProfile['agni'] {
  const agniScores: Record<string, number> = { vishama: 0, tikshna: 0, manda: 0, sama: 0 };
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    for (const [agniType, keywords] of Object.entries(AGNI_KEYWORDS)) {
      if (agniType === 'unknown') continue;
      if (keywords?.some(kw => lower.includes(kw))) {
        if (agniScores[agniType] !== undefined) {
          agniScores[agniType] += weight;
        }
      }
    }
  });
  const dominant = Object.entries(agniScores).reduce((a, b) => a[1] >= b[1] ? a : b);
  return dominant[1] > 0 ? dominant[0] as AyurvedaProfile['agni'] : 'unknown';
}

// Compute Ojas level
function computeOjas(observations: Record<string, number>): AyurvedaProfile['ojas'] {
  let ojasScore = 0;
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    if (lower.includes('low ojas') || lower.includes('ojas depletion')) ojasScore -= weight;
    if (lower.includes('high ojas') || lower.includes('ojas strength')) ojasScore += weight;
  });
  if (ojasScore >= 3) return 'high';
  if (ojasScore <= -3) return 'low';
  return 'moderate';
}

// Compute Manas type
function computeManas(observations: Record<string, number>): AyurvedaProfile['manas'] {
  const scores = { vata_dominant: 0, pitta_dominant: 0, kapha_dominant: 0 };
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    if (lower.includes('vata manas')) scores.vata_dominant += weight;
    if (lower.includes('pitta manas')) scores.pitta_dominant += weight;
    if (lower.includes('kapha manas')) scores.kapha_dominant += weight;
  });
  const max = Math.max(...Object.values(scores));
  if (max === 0) return 'balanced';
  const dominant = Object.entries(scores).find(([, v]) => v === max);
  return dominant ? dominant[0] as AyurvedaProfile['manas'] : 'balanced';
}

// Main export
export function computeProfile(
  observations: Record<string, number>,
  answers: Record<string, string | string[]>
): AyurvedaProfile {
  const doshaProfile = computeDoshaProfile(observations);
  const agni = computeAgni(observations);
  const ojas = computeOjas(observations);
  const manas = computeManas(observations);
  const gender = (answers['intro_gender'] as AyurvedaProfile['gender']) ?? null;

  const obsResults: ObservationResult[] = Object.entries(observations)
    .sort(([, a], [, b]) => b - a)
    .map(([key, weight]) => ({ key, weight, dimensions: [] }));

  return {
    prakrtiDosha: doshaProfile,
    vikrtiDosha: doshaProfile, // Will differentiate in future version
    agni,
    dominantGunas: [],
    ojas,
    manas,
    observations: obsResults,
    gender,
  };
}

// Helper: get dominant dosha label
export function getDominantDosha(profile: DoshaProfile): string {
  const max = Math.max(profile.vata, profile.pitta, profile.kapha);
  if (max === 0) return 'Balanced';
  if (profile.vata === max) return 'Vata';
  if (profile.pitta === max) return 'Pitta';
  return 'Kapha';
}

// Helper: get constitution description
export function getConstitutionDescription(profile: DoshaProfile): string {
  const sorted = Object.entries(profile).sort(([, a], [, b]) => b - a);
  const first = sorted[0];
  const second = sorted[1];

  if (!first || !second) return 'Tridoshic (balanced Vata, Pitta, Kapha)';

  const gap = (first[1] as number) - (second[1] as number);
  if (gap < 0.1) return `Tridoshic (balanced Vata, Pitta, Kapha)`;
  if (gap < 0.2) return `${capitalize(first[0] as string)}-${capitalize(second[0] as string)} (dual constitution)`;
  return `${capitalize(first[0] as string)}-predominant`;
}

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
