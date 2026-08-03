import re

with open('apps/web/src/engines/report.ts', 'r') as f:
    content = f.read()

search = """// Compute dosha totals from all observations
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
}"""

replace = """// Compute dosha totals from all observations
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

// Split observations into Prakriti (childhood/baseline) and Vikriti (current)
function splitObservations(observations: Record<string, number>): { prakrti: Record<string, number>, vikrti: Record<string, number> } {
  const prakrti: Record<string, number> = {};
  const vikrti: Record<string, number> = {};

  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    // Keywords identifying Prakriti
    if (lower.includes('prakrti') || lower.includes('childhood') || lower.includes('baseline')) {
      prakrti[obsKey] = weight;
    } else {
      vikrti[obsKey] = weight;
    }
  });

  return { prakrti, vikrti };
}"""

content = content.replace(search, replace)

search2 = """// Main export
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
}"""

replace2 = """// Main export
export function computeProfile(
  observations: Record<string, number>,
  answers: Record<string, string | string[]>
): AyurvedaProfile {
  const { prakrti, vikrti } = splitObservations(observations);
  
  const prakrtiDosha = computeDoshaProfile(prakrti);
  const vikrtiDosha = computeDoshaProfile(vikrti);
  
  // If no specific prakrti observations exist, fallback to all observations
  const finalPrakrtiDosha = Object.keys(prakrti).length > 0 ? prakrtiDosha : computeDoshaProfile(observations);
  
  // If no specific vikrti observations exist, fallback to all observations
  const finalVikrtiDosha = Object.keys(vikrti).length > 0 ? vikrtiDosha : computeDoshaProfile(observations);

  const agni = computeAgni(observations);
  const ojas = computeOjas(observations);
  const manas = computeManas(observations);
  const gender = (answers['intro_gender'] as AyurvedaProfile['gender']) ?? null;

  const obsResults: ObservationResult[] = Object.entries(observations)
    .sort(([, a], [, b]) => b - a)
    .map(([key, weight]) => ({ key, weight, dimensions: [] }));

  return {
    prakrtiDosha: finalPrakrtiDosha,
    vikrtiDosha: finalVikrtiDosha,
    agni,
    dominantGunas: [],
    ojas,
    manas,
    observations: obsResults,
    gender,
  };
}"""

content = content.replace(search2, replace2)

with open('apps/web/src/engines/report.ts', 'w') as f:
    f.write(content)
