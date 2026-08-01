# Subagent 14 — Assessment Store, Logic Engine & Routing


## Repository Location

```
/ayurveda/swadharma/
```

Monorepo:
- `apps/web/` — Next.js 16 app
- `packages/ui/` — Shared ShadCN/Tailwind library
- `packages/eslint-config/`, `packages/typescript-config/` — tooling

> **CRITICAL:** Read `apps/web/node_modules/next/dist/docs/` before writing any Next.js code.  
> This is **Next.js 16** with breaking changes. The monorepo `AGENTS.md` warns about this.

---

## Existing Files to Read Before Starting

| File | What it contains |
|---|---|
| `apps/web/src/types/assessment.ts` | Existing type definitions |
| `apps/web/src/engines/logic.ts` | Question routing engine |
| `apps/web/src/stores/assessmentStore.ts` | Zustand + IndexedDB store |
| `apps/web/src/data/questions.ts` | 5 existing categories as TypeScript |
| `apps/web/src/engines/recommendations.ts` | Recommendation engine |
| `apps/web/src/data/knowledge.ts` | Knowledge graph entries |
| `apps/web/src/components/AssessmentEngine.tsx` | Main quiz UI component |
| `apps/web/src/app/report/page.tsx` | Report page |

---


```
apps/web/src/data/
├── questions/
│   ├── introduction.json    <- identity questions 
│   ├── body.json            <- placeholder: []
│   ├── digestion.json       <- digestion questions 
│   ├── sleep.json           <- sleep questions 
│   ├── emotions.json        <- emotions questions 
│   ├── lifestyle.json       <- lifestyle questions 
│   ├── exercise.json        <- placeholder: []
│   ├── reproduction.json    <- placeholder: []
│   ├── skin_hair.json       <- placeholder: []
│   ├── appetite_senses.json <- placeholder: []
│   ├── mental.json          <- placeholder: []
│   ├── environment.json     <- placeholder: []
│   ├── spirituality.json    <- placeholder: []
│   ├── relationships.json   <- placeholder: []
│   ├── childhood.json       <- placeholder: []
│   └── aging.json           <- placeholder: []
├── knowledge/
│   └── core.json            <- 
├── recommendations/
│   └── core.json            <- 
└── index.ts                 <- barrel exporting categories[]
```

---



Every JSON file in `questions/` is an **array** of Question objects.  
write JSON following this exact schema.

```json
[
  {
    "id": "dig_appetite",
    "category": "digestion",
    "subCategory": "agni",
    "title": "How would you describe your appetite on a normal day?",
    "subtitle": "Think about patterns over the past few months, not just today.",
    "illustration": null,
    "type": "single",
    "importance": 3,
    "source": "Charaka Samhita, Chikitsasthana 15.43-45",
    "conditions": null,
    "nextQuestion": null,
    "options": [
      {
        "id": "variable",
        "label": "Variable — sometimes starving, sometimes I forget to eat",
        "sublabel": null,
        "nextQuestion": null,
        "observations": [
          {
            "observation": "Vishama Agni",
            "weight": 3,
            "dimensions": ["agni:vishama", "dosha:vata"]
          }
        ]
      },
      {
        "id": "strong",
        "label": "Strong — I get irritable if I miss a meal",
        "sublabel": null,
        "nextQuestion": null,
        "observations": [
          {
            "observation": "Tikshna Agni",
            "weight": 3,
            "dimensions": ["agni:tikshna", "dosha:pitta"]
          }
        ]
      }
    ]
  }
]
```

**Schema rules to follow:**
- `id`: globally unique. Format: `categoryabbrev_descriptive` (e.g. `dig_appetite`, `slp_falling`, `env_heat_tolerance`)
- `category`: matches the JSON filename base (e.g. `"digestion"` for `digestion.json`)
- `subCategory`: finer grouping within the category (e.g. `"agni"`, `"bowel"`, `"nidra"`)
- `title`: conversational English, warm, NOT clinical. As if a wise teacher is asking.
- `type`: `"single"` (radio, auto-advances) or `"multiple"` (checkboxes, needs Continue button)
- `importance`: `1` = supplementary, `2` = moderate, `3` = critical for profile
- `source`: classical Ayurvedic reference (e.g. `"Charaka Samhita, Sutrasthana 1.57"`)
- `observations[].observation`: namespaced observation string. Examples:
  - `"Vishama Agni"`, `"Tikshna Agni"`, `"Manda Agni"`, `"Sama Agni"`
  - `"Vata Frame"`, `"Pitta Frame"`, `"Kapha Frame"`
  - `"Vata Nidra disturbance"`, `"Kapha Nidra tendency"`
  - `"Vata Manas (Rajasic)"`, `"Pitta Manas (Rajasic/Tikshna)"`
  - `"Pitta in Amashaya"`, `"Vata Aggravation tendency"`
- `observations[].weight`: `1` weak, `2` moderate, `3` strong signal
- `observations[].dimensions`: array of dimension tags:
  - Dosha: `"dosha:vata"`, `"dosha:pitta"`, `"dosha:kapha"`
  - Agni: `"agni:vishama"`, `"agni:tikshna"`, `"agni:manda"`, `"agni:sama"`
  - Dhatu: `"dhatu:rasa"`, `"dhatu:rakta"`, `"dhatu:mamsa"`, `"dhatu:meda"`, `"dhatu:asthi"`, `"dhatu:majja"`, `"dhatu:shukra"`
  - Srotas: `"srotas:annavaha"`, `"srotas:pranavaha"`, `"srotas:ambuvaha"`, `"srotas:manovaha"`
  - Manas: `"manas:rajasic"`, `"manas:tamasic"`, `"manas:sattvic"`
  - Ojas: `"ojas:low"`, `"ojas:moderate"`, `"ojas:high"`
- `conditions`: `null` or array of `{ "questionId": "...", "value": "..." }` — ALL must be met (AND logic)
- `nextQuestion`: `null` or a question ID to jump to (overrides sequential flow)
- `options[].nextQuestion`: `null` or ID — overrides the question-level `nextQuestion` for this specific option

---

**Your files:**
- `apps/web/src/stores/assessmentStore.ts` — expand and harden
- `apps/web/src/engines/logic.ts` — expand with condition evaluation + observation scoring
- `apps/web/src/middleware.ts` — add route protection

Do NOT touch question JSONs, the UI components, report engine, or recommendation engine.

---

## Repository

```
/ayurveda/swadharma/apps/web/
```

---

## Read First

1. `AGENTS.md` — Next.js 16 critical warning
2. `apps/web/src/stores/assessmentStore.ts` — existing store
3. `apps/web/src/engines/logic.ts` — existing logic engine
4. `apps/web/src/types/assessment.ts` — full types (Foundation has expanded these)
5. `tasks/06engine.md` — full engine specification
6. `tasks/12scoring.md` — observation-based scoring specification

---

## Context

The assessment engine is the **brain** of the application. It must:

1. Track every answer
2. Apply `conditions` logic to skip irrelevant questions
3. Score each answer into the `observations` map (weighted accumulation)
4. Maintain navigation history (for back navigation)
5. Detect when the assessment is complete
6. Persist state across page refreshes (IDB-keyval via Zustand persist)
7. Protect routes (`/report`, `/recommendations`) unless assessment is complete

---

## Task 1: Expand `engines/logic.ts`

The existing logic engine has a basic `getNextQuestionId`. Rewrite it completely:

```typescript
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
      const found = categories[catIdx].questions.find(q => q.id === overrideId);
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
    for (let i = currentQIdx + 1; i < currentCategory.questions.length; i++) {
      const candidate = currentCategory.questions[i];
      if (shouldShowQuestion(candidate, { ...answers, [currentQuestionId]: answerValue })) {
        return { nextQuestionId: candidate.id, nextCategoryIndex: currentCategoryIndex, isComplete: false };
      }
    }
  }
  
  // 4. Advance to next category
  for (let catIdx = currentCategoryIndex + 1; catIdx < categories.length; catIdx++) {
    for (const candidate of categories[catIdx].questions) {
      if (shouldShowQuestion(candidate, { ...answers, [currentQuestionId]: answerValue })) {
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
    for (let i = currentQIdx; i < currentCategory.questions.length; i++) {
      if (shouldShowQuestion(currentCategory.questions[i], answers)) count++;
    }
  }
  
  // Subsequent categories
  for (let catIdx = currentCategoryIndex + 1; catIdx < categories.length; catIdx++) {
    for (const q of categories[catIdx].questions) {
      if (shouldShowQuestion(q, answers)) count++;
    }
  }
  
  return count;
}
```

---

## Task 2: Expand `stores/assessmentStore.ts`

Rebuild using the new engine functions:

```typescript
// apps/web/src/stores/assessmentStore.ts
'use client'

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { categories } from '../data/index';
import {
  getNextQuestionId,
  getPreviousQuestionId,
  getObservationsForAnswer,
  calculateObservations,
  countRemainingQuestions,
} from '../engines/logic';
import type { AssessmentState } from '../types/assessment';

const firstCategory = categories[0];
const firstQuestion = firstCategory?.questions[0] ?? null;

const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      answers: {},
      observations: {},
      currentCategoryIndex: 0,
      currentQuestionId: firstQuestion?.id ?? null,
      history: firstQuestion ? [firstQuestion.id] : [],
      isComplete: false,

      setAnswer: (questionId, value) => {
        const state = get();
        const allQuestions = categories.flatMap(cat => cat.questions);
        const question = allQuestions.find(q => q.id === questionId);
        if (!question) return;

        // Accumulate new observations
        const newObs = getObservationsForAnswer(question, value);
        const updatedObservations = { ...state.observations };
        for (const [key, weight] of Object.entries(newObs)) {
          updatedObservations[key] = (updatedObservations[key] || 0) + weight;
        }

        // Navigate to next question
        const { nextQuestionId, nextCategoryIndex, isComplete } = getNextQuestionId(
          categories,
          questionId,
          state.currentCategoryIndex,
          state.answers,
          value
        );

        const newHistory = nextQuestionId
          ? [...state.history, nextQuestionId]
          : state.history;

        set({
          answers: { ...state.answers, [questionId]: value },
          observations: updatedObservations,
          currentQuestionId: nextQuestionId,
          currentCategoryIndex: nextCategoryIndex,
          history: newHistory,
          isComplete,
        });
      },

      nextQuestion: () => {
        // Called for manual advance (shouldn't normally be needed)
        const state = get();
        const { nextQuestionId, nextCategoryIndex, isComplete } = getNextQuestionId(
          categories,
          state.currentQuestionId ?? '',
          state.currentCategoryIndex,
          state.answers,
          state.answers[state.currentQuestionId ?? ''] ?? ''
        );
        if (nextQuestionId) {
          set({
            currentQuestionId: nextQuestionId,
            currentCategoryIndex: nextCategoryIndex,
            history: [...state.history, nextQuestionId],
            isComplete,
          });
        }
      },

      prevQuestion: () => {
        const state = get();
        if (state.history.length <= 1) return;
        const prevId = state.history[state.history.length - 2];
        const newHistory = state.history.slice(0, -1);
        
        // Find which category the previous question belongs to
        let prevCatIdx = state.currentCategoryIndex;
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].questions.some(q => q.id === prevId)) {
            prevCatIdx = i;
            break;
          }
        }

        set({
          currentQuestionId: prevId ?? null,
          currentCategoryIndex: prevCatIdx,
          history: newHistory,
          isComplete: false,
        });
      },

      reset: () => {
        set({
          answers: {},
          observations: {},
          currentCategoryIndex: 0,
          currentQuestionId: firstQuestion?.id ?? null,
          history: firstQuestion ? [firstQuestion.id] : [],
          isComplete: false,
        });
        try {
          useAssessmentStore.persist.clearStorage();
        } catch {}
      },
    }),
    {
      name: 'swadharma-assessment',
      storage: createJSONStorage(() => {
        // Use localStorage with IDB fallback
        if (typeof window === 'undefined') return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
        return localStorage;
      }),
    }
  )
);

export { useAssessmentStore, calculateObservations, countRemainingQuestions };
export default useAssessmentStore;
```

---

## Task 3: Create `apps/web/src/middleware.ts`

```typescript
// apps/web/src/middleware.ts
// Protect /report and /recommendations unless assessment is complete
// NOTE: Cannot read IndexedDB/localStorage in middleware (edge runtime)
// Instead: soft redirect — the pages themselves check completion state

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // The actual guard happens client-side in the page components.
  // Middleware here only handles:
  // 1. Trailing slash normalization
  // 2. Future API rate limiting hooks
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Task 4: Ensure `calculateObservations` is Exported

The function `calculateObservations` from `engines/logic.ts` must also be exported from the store file (re-export) so that `report/page.tsx` and `recommendations/page.tsx` can import it:

```typescript
// Already in assessmentStore.ts above:
export { useAssessmentStore, calculateObservations, countRemainingQuestions };
```

---

## Definition of Done

- [ ] `logic.ts` has all 6 exported functions: `evaluateConditions`, `shouldShowQuestion`, `getObservationsForAnswer`, `calculateObservations`, `getNextQuestionId`, `countRemainingQuestions`
- [ ] Conditions (AND logic) work correctly for gender-branched questions
- [ ] Back navigation works via history stack
- [ ] `setAnswer` correctly accumulates weighted observations
- [ ] `reset` clears all state and persisted storage
- [ ] Store persists to localStorage via Zustand persist
- [ ] `middleware.ts` exists (even if minimal)
- [ ] `calculateObservations` is exported for use by report and recommendations pages
- [ ] No TypeScript errors
- [ ] All edge cases: empty category, no questions, first question, last question
