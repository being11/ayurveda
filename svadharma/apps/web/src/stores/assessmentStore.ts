import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { AssessmentState } from '../types/assessment';
import { getNextQuestionId } from '../engines/logic';
import { categories } from '../data/questions';
import { get, set as idbSet, del } from 'idb-keyval';

// Custom storage adapter for IndexedDB
const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await idbSet(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      answers: {},
      observations: {},
      currentCategoryIndex: 0,
      currentQuestionId: categories[0]?.questions[0]?.id || null,
      history: [],
      isComplete: false,

      setAnswer: (questionId, value) => set((state) => ({
        answers: { ...state.answers, [questionId]: value }
      })),

      nextQuestion: () => {
        const { currentCategoryIndex, currentQuestionId, answers, history } = get();

        if (!currentQuestionId) return;

        const currentCategory = categories[currentCategoryIndex];
        const currentQuestion = currentCategory?.questions.find(q => q.id === currentQuestionId);

        if (!currentQuestion) return;

        const nextId = getNextQuestionId(currentQuestion, currentCategory?.questions ?? [], answers);

        if (nextId) {
          set({
            currentQuestionId: nextId,
            history: [...history, currentQuestionId]
          });
        } else {
          if (currentCategoryIndex + 1 < categories.length) {
            const nextCategory = categories[currentCategoryIndex + 1];
            const firstValidQuestion = nextCategory?.questions.find(q => {
               return true;
            });

            if (firstValidQuestion) {
               set({
                 currentCategoryIndex: currentCategoryIndex + 1,
                 currentQuestionId: firstValidQuestion.id,
                 history: [...history, currentQuestionId]
               });
            }
          } else {
            set({ isComplete: true, history: [...history, currentQuestionId] });
          }
        }
      },

      prevQuestion: () => {
        const { history, currentCategoryIndex } = get();
        if (history.length === 0) return;

        const newHistory = [...history];
        const previousQuestionId = newHistory.pop();

        let targetCategoryIndex = currentCategoryIndex;
        if (previousQuestionId) {
           const currentCategory = categories[currentCategoryIndex];
           const isInCurrent = currentCategory?.questions.some(q => q.id === previousQuestionId);
           if (!isInCurrent && currentCategoryIndex > 0) {
               targetCategoryIndex = currentCategoryIndex - 1;
           }
        }

        set({
          currentQuestionId: previousQuestionId || null,
          history: newHistory,
          currentCategoryIndex: targetCategoryIndex,
          isComplete: false,
        });
      },
    }),
    {
      name: 'swadharma-assessment-storage',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
