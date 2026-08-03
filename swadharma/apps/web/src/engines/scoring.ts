import { categories } from '../data/index';
import type { DoshaProfile, QuestionCategory } from '../types/assessment';

const PRAKRITI_CATEGORIES = ['introduction', 'body', 'childhood', 'aging'];

/**
 * Dosha Scoring Engine
 * Calculates weighted scoring for Vata, Pitta, Kapha across all question categories.
 * Separates Prakriti (birth constitution) from Vikriti (current imbalance).
 */
/**
 * Dosha Scoring Engine
 * Calculates weighted scoring for Vata, Pitta, Kapha across all question categories.
 * Separates Prakriti (birth constitution) from Vikriti (current imbalance).
 */
export function calculateQuizScores(answers: Record<string, string | string[]>): {
  prakriti: DoshaProfile;
  vikriti: DoshaProfile;
} {
  const prakritiScores = { vata: 0, pitta: 0, kapha: 0 };
  const vikritiScores = { vata: 0, pitta: 0, kapha: 0 };

  const allQuestions = categories.flatMap(c => c.questions);

  for (const [questionId, answer] of Object.entries(answers)) {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) continue;

    const isPrakriti = PRAKRITI_CATEGORIES.includes(question.category);
    const targetScores = isPrakriti ? prakritiScores : vikritiScores;

    const values = Array.isArray(answer) ? answer : [answer];
    for (const val of values) {
      const option = question.options.find(o => o.id === val);
      if (!option || !option.observations) continue;

      for (const obs of option.observations) {
        let hasDoshaDim = false;
        if (obs.dimensions) {
          for (const dim of obs.dimensions) {
            if (dim === 'dosha:vata' || dim.includes('vata')) {
              targetScores.vata += obs.weight;
              hasDoshaDim = true;
            }
            if (dim === 'dosha:pitta' || dim.includes('pitta')) {
              targetScores.pitta += obs.weight;
              hasDoshaDim = true;
            }
            if (dim === 'dosha:kapha' || dim.includes('kapha')) {
              targetScores.kapha += obs.weight;
              hasDoshaDim = true;
            }
          }
        }
        
        if (!hasDoshaDim) {
           const lower = obs.observation.toLowerCase();
           if (lower.includes('vata')) targetScores.vata += obs.weight;
           if (lower.includes('pitta')) targetScores.pitta += obs.weight;
           if (lower.includes('kapha')) targetScores.kapha += obs.weight;
        }
      }
    }
  }

  // If no specific prakriti scores were found (maybe no prakriti questions were answered),
  // fallback to making prakriti and vikriti the same based on whatever we have.
  const totalPrakriti = prakritiScores.vata + prakritiScores.pitta + prakritiScores.kapha;
  const totalVikriti = vikritiScores.vata + vikritiScores.pitta + vikritiScores.kapha;
  
  if (totalPrakriti === 0 && totalVikriti > 0) {
      return {
          prakriti: normalizeScores(vikritiScores),
          vikriti: normalizeScores(vikritiScores)
      };
  }

  return {
    prakriti: normalizeScores(prakritiScores),
    vikriti: normalizeScores(vikritiScores)
  };
}

function normalizeScores(scores: { vata: number; pitta: number; kapha: number }): DoshaProfile {
  const total = scores.vata + scores.pitta + scores.kapha;
  if (total === 0) return { vata: 0, pitta: 0, kapha: 0 };

  return {
    vata: Math.round((scores.vata / total) * 100),
    pitta: Math.round((scores.pitta / total) * 100),
    kapha: Math.round((scores.kapha / total) * 100)
  };
}

/**
 * Evaluates dual-dosha and tri-dosha detection logic based on score differentials.
 */
export function detectDoshaDominance(profile: DoshaProfile): string {
    const { vata, pitta, kapha } = profile;
    const scores = [
        { name: 'Vata', value: vata },
        { name: 'Pitta', value: pitta },
        { name: 'Kapha', value: kapha }
    ].sort((a, b) => b.value - a.value);

    const first = scores[0];
    const second = scores[1];
    const third = scores[2];
    
    // Safety check for undefined (should not happen with 3 items but TS likes it)
    if (!first || !second || !third) return 'Balanced';

    if (first.value - second.value < 10 && second.value - third.value < 10) {
        return 'Tridoshic (Vata-Pitta-Kapha)';
    }

    if (first.value - second.value < 15) {
        return `Dual Dosha (${first.name}-${second.name})`;
    }

    return `Single Dosha (${first.name})`;
}

export const calculateDoshaScores = (_categories: QuestionCategory[], answers: Record<string, string | string[]>) => calculateQuizScores(answers);
export const getDoshaType = detectDoshaDominance;

