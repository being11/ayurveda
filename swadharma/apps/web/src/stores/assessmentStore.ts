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
import type { AssessmentState, PanchakarmaTherapy } from '../types/assessment';
import { computeProfile, getDominantDosha } from '../engines/report';
import panchakarmaData from '../data/panchakarma.json';
import seasonsData from '../data/seasons.json';

const firstCategory = categories[0];
const firstQuestion = firstCategory?.questions[0] ?? null;

function getCurrentSeasonId(): string {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();
  const seasons = seasonsData as any[];

  for (const season of seasons) {
    const [startMonth, startDay] = season.startDate.split('-').map(Number);
    const [endMonth, endDay] = season.endDate.split('-').map(Number);

    if (startMonth === undefined || startDay === undefined || endMonth === undefined || endDay === undefined) {
      continue;
    }

    if (startMonth <= endMonth) {
      if (
        (currentMonth > startMonth || (currentMonth === startMonth && currentDay >= startDay)) &&
        (currentMonth < endMonth || (currentMonth === endMonth && currentDay <= endDay))
      ) {
        return season.id;
      }
    } else {
      // Wraps around the year (e.g. Hemanta: 11-15 to 01-14)
      if (
        (currentMonth > startMonth || (currentMonth === startMonth && currentDay >= startDay)) ||
        (currentMonth < endMonth || (currentMonth === endMonth && currentDay <= endDay))
      ) {
        return season.id;
      }
    }
  }

  return seasons[0]?.id || 'hemanta'; // Fallback
}

const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      answers: {},
      observations: {},
      currentCategoryIndex: 0,
      currentQuestionId: firstQuestion?.id ?? null,
      history: firstQuestion ? [firstQuestion.id] : [],
      isComplete: false,
      activeNadiPoint: null,

      herbSearchQuery: '',
      herbDoshaFilter: null,
      herbOrganFilter: null,

      selectedSrotas: null,
      
      currentSeasonId: null,
      
      autoDetectSeason: () => set({ currentSeasonId: getCurrentSeasonId() }),
      setCurrentSeasonId: (id: string) => set({ currentSeasonId: id }),

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
          if (categories[i]?.questions?.some(q => q.id === prevId)) {
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

      getRecommendedPanchakarma: () => {
        const state = get();
        const profile = computeProfile(state.observations, state.answers);
        const dominantDosha = getDominantDosha(profile.prakrtiDosha).toLowerCase();
        return (panchakarmaData.therapies as unknown as PanchakarmaTherapy[]).filter((therapy) =>
          therapy.indicatedDoshas?.includes(dominantDosha) || therapy.dosha === dominantDosha
        );
      },
      reset: () => {
        set({
          answers: {},
          observations: {},
          currentCategoryIndex: 0,
          currentQuestionId: firstQuestion?.id ?? null,
          history: firstQuestion ? [firstQuestion.id] : [],
          isComplete: false,
          activeNadiPoint: null,
          herbSearchQuery: '',
          herbDoshaFilter: null,
          herbOrganFilter: null,
          selectedSrotas: null,
          currentSeasonId: null,
        });
        try {
          useAssessmentStore.persist.clearStorage();
        } catch {}
      },
      
      setActiveNadiPoint: (point) => set({ activeNadiPoint: point }),
      setHerbSearchQuery: (query) => set({ herbSearchQuery: query }),
      setHerbDoshaFilter: (dosha) => set({ herbDoshaFilter: dosha }),
      setHerbOrganFilter: (organ) => set({ herbOrganFilter: organ }),
      setSelectedSrotas: (srotasId) => set({ selectedSrotas: srotasId }),
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
