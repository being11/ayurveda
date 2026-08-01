import { Question, Condition } from '../types/assessment';

export function areConditionsMet(conditions: Condition[] | null | undefined, answers: Record<string, string | string[]>): boolean {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(condition => {
    const answer = answers[condition.questionId];
    if (Array.isArray(answer)) {
      return answer.includes(condition.value);
    }
    return answer === condition.value;
  });
}

export function getNextQuestionId(
  currentQuestion: Question,
  categoryQuestions: Question[],
  answers: Record<string, string | string[]>
): string | null {
  const answer = answers[currentQuestion.id];

  if (answer && typeof answer === 'string') {
    const selectedOption = currentQuestion.options.find(opt => opt.id === answer);
    if (selectedOption?.nextQuestion) {
      return selectedOption.nextQuestion;
    }
  }

  if (currentQuestion.nextQuestion) {
    const nextQ = categoryQuestions.find(q => q.id === currentQuestion.nextQuestion);
    if (nextQ && areConditionsMet(nextQ.conditions, answers)) {
      return nextQ.id;
    } else if (nextQ) {
       return getNextQuestionId(nextQ, categoryQuestions, answers);
    }
  }

  const currentIndex = categoryQuestions.findIndex(q => q.id === currentQuestion.id);
  for (let i = currentIndex + 1; i < categoryQuestions.length; i++) {
    if (areConditionsMet(categoryQuestions[i]?.conditions, answers)) {
      return categoryQuestions[i]?.id ?? null;
    }
  }

  return null;
}

export function calculateObservations(
  allQuestions: Question[],
  answers: Record<string, string | string[]>
): Record<string, number> {
  const observations: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) return;

    const values = Array.isArray(answerValue) ? answerValue : [answerValue];

    values.forEach(val => {
      const option = question.options.find(o => o.id === val);
      if (option && option.observations) {
        option.observations.forEach(obs => {
          observations[obs.observation] = (observations[obs.observation] || 0) + obs.weight;
        });
      }
    });
  });

  return observations;
}
