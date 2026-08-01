// apps/web/src/engines/logic.ts

import type { Question, Condition, QuestionCategory } from '../types/assessment';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONDITION EVALUATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Evaluates ALL conditions for a question (AND logic).
 * Returns true if all conditions are met (or if no conditions).
 */
export function evaluateConditions(
  conditions: Condition[] | null | undefined,
  answers: Record<string, string | string[]>
): boolean {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(cond => {
    const answer = answers[cond.questionId];
    if (answer === undefined) return false;
    if (Array.isArray(answer)) return answer.includes(cond.value);
    return answer === cond.value;
  });
}

/**
 * Returns true if a question should be shown (conditions pass).
 */
export function shouldShowQuestion(
  question: Question,
  answers: Record<string, string | string[]>
): boolean {
  return evaluateConditions(question.conditions, answers);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OBSERVATION ACCUMULATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Given a question and a submitted answer value,
 * returns the observations to accumulate (observation key → weight).
 */
export function getObservationsForAnswer(
  question: Question,
  answerValue: string | string[]
): Record<string, number> {
  const obs: Record<string, number> = {};
  const values = Array.isArray(answerValue) ? answerValue : [answerValue];

  for (const value of values) {
    const option = question.options.find(o => o.id === value);
    if (!option?.observations) continue;
    for (const mapping of option.observations) {
      obs[mapping.observation] = (obs[mapping.observation] || 0) + mapping.weight;
    }
  }
  return obs;
}

/**
 * Recalculates all observations from scratch from all current answers.
 * Called when loading from persisted state to ensure consistency.
 */
export function calculateObservations(
  allQuestions: Question[],
  answers: Record<string, string | string[]>
): Record<string, number> {
  const accumulated: Record<string, number> = {};

  for (const question of allQuestions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;
    if (!shouldShowQuestion(question, answers)) continue;

    const newObs = getObservationsForAnswer(question, answer);
    for (const [key, weight] of Object.entries(newObs)) {
      accumulated[key] = (accumulated[key] || 0) + weight;
    }
  }
  return accumulated;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// QUESTION NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Given the current question and the answer value,
 * determines the ID of the next question to show.
 * Respects:
 *   1. option-level nextQuestion override
 *   2. question-level nextQuestion override
 *   3. conditional skipping of subsequent questions
 *   4. category advancement
 */
export function getNextQuestionId(
  categories: QuestionCategory[],
  currentQuestionId: string,
  currentCategoryIndex: number,
  answers: Record<string, string | string[]>,
  answerValue: string | string[]
): { nextQuestionId: string | null; nextCategoryIndex: number; isComplete: boolean } {
  const allQuestions = categories.flatMap(cat => cat.questions);
  const currentQuestion = allQuestions.find(q => q.id === currentQuestionId);

  if (!currentQuestion) {
    return { nextQuestionId: null, nextCategoryIndex: currentCategoryIndex, isComplete: true };
  }

  // 1. Check for option-level nextQuestion override
  const values = Array.isArray(answerValue) ? answerValue : [answerValue];
  let overrideId: string | null = null;

  for (const value of values) {
    const option = currentQuestion.options.find(o => o.id === value);
    if (option?.nextQuestion) {
      overrideId = option.nextQuestion;
      break;
    }
  }

  // 2. Question-level nextQuestion override
  if (!overrideId && currentQuestion.nextQuestion) {
    overrideId = currentQuestion.nextQuestion;
  }

  // If we have an override, find which category it's in
  if (overrideId) {
    for (let catIdx = 0; catIdx < categories.length; catIdx++) {
      const found = categories[catIdx]?.questions?.find(q => q.id === overrideId);
      if (found) {
        return { nextQuestionId: overrideId, nextCategoryIndex: catIdx, isComplete: false };
      }
    }
  }

  // 3. Sequential navigation with condition evaluation
  const currentCategory = categories[currentCategoryIndex];
  const currentQIdx = currentCategory?.questions.findIndex(q => q.id === currentQuestionId) ?? -1;

  // Try next questions in current category
  if (currentCategory && currentQIdx >= 0) {
    for (let i = currentQIdx + 1; i < (currentCategory.questions?.length ?? 0); i++) {
      const candidate = currentCategory.questions[i];
      if (candidate && shouldShowQuestion(candidate, { ...answers, [currentQuestionId]: answerValue })) {
        return { nextQuestionId: candidate.id, nextCategoryIndex: currentCategoryIndex, isComplete: false };
      }
    }
  }

  // 4. Advance to next category
  for (let catIdx = currentCategoryIndex + 1; catIdx < categories.length; catIdx++) {
    const nextCategory = categories[catIdx];
    if (!nextCategory?.questions) continue;
    for (const candidate of nextCategory.questions) {
      if (candidate && shouldShowQuestion(candidate, { ...answers, [currentQuestionId]: answerValue })) {
        return { nextQuestionId: candidate.id, nextCategoryIndex: catIdx, isComplete: false };
      }
    }
  }

  // No more questions — assessment complete
  return { nextQuestionId: null, nextCategoryIndex: currentCategoryIndex, isComplete: true };
}

/**
 * Given the history stack, returns the previous question ID.
 */
export function getPreviousQuestionId(history: string[]): string | null {
  if (history.length <= 1) return null;
  return history[history.length - 2] ?? null;
}

/**
 * Counts remaining questions visible from current position.
 * Used for progress and time estimation.
 */
export function countRemainingQuestions(
  categories: QuestionCategory[],
  currentCategoryIndex: number,
  currentQuestionId: string,
  answers: Record<string, string | string[]>
): number {
  let count = 0;
  const currentCategory = categories[currentCategoryIndex];
  const currentQIdx = currentCategory?.questions.findIndex(q => q.id === currentQuestionId) ?? -1;

  // Current category, from current question onwards
  if (currentCategory && currentQIdx >= 0) {
    for (let i = currentQIdx; i < (currentCategory.questions?.length ?? 0); i++) {
      const q = currentCategory.questions[i];
      if (q && shouldShowQuestion(q, answers)) count++;
    }
  }

  // Subsequent categories
  for (let catIdx = currentCategoryIndex + 1; catIdx < categories.length; catIdx++) {
    const nextCategory = categories[catIdx];
    if (!nextCategory?.questions) continue;
    for (const q of nextCategory.questions) {
      if (q && shouldShowQuestion(q, answers)) count++;
    }
  }

  return count;
}
