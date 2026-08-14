import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface HabitRecord {
  id: string;
  name: string;
  weight: number;
}

export const HABITS: HabitRecord[] = [
  { id: 'sleep', name: 'Sleep (Before 10 PM)', weight: 3 },
  { id: 'water', name: 'Morning Warm Water', weight: 1 },
  { id: 'meals', name: 'Consistent Meal Times', weight: 2 },
  { id: 'exercise', name: 'Exercise (Vyayama)', weight: 2 },
  { id: 'meditation', name: 'Meditation (Dhyana)', weight: 2 },
  { id: 'pranayama', name: 'Pranayama', weight: 2 },
  { id: 'herbs', name: 'Daily Herbs', weight: 1 },
  { id: 'walking', name: 'Evening Walk', weight: 1 },
  { id: 'screen_time', name: 'Limited Screen Time at Night', weight: 2 },
];

export interface HabitState {
  dailyLogs: Record<string, Record<string, boolean>>; // date -> { habitId -> completed }
  toggleHabit: (date: string, habitId: string) => void;
  getConsistencyScore: (date: string) => number;
  getHeatmapData: (startDate: Date, days: number) => { date: string; score: number }[];
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      dailyLogs: {},
      toggleHabit: (date: string, habitId: string) => {
        set((state) => {
          const currentLogs = state.dailyLogs[date] || {};
          return {
            dailyLogs: {
              ...state.dailyLogs,
              [date]: {
                ...currentLogs,
                [habitId]: !currentLogs[habitId],
              },
            },
          };
        });
      },
      getConsistencyScore: (date: string) => {
        const logs = get().dailyLogs[date] || {};
        let score = 0;
        let maxScore = 0;
        HABITS.forEach((h) => {
          maxScore += h.weight;
          if (logs[h.id]) {
            score += h.weight;
          }
        });
        if (maxScore === 0) return 0;
        return (score / maxScore) * 100;
      },
      getHeatmapData: (startDate: Date, days: number) => {
        const data = [];
        const current = new Date(startDate);
        for (let i = 0; i < days; i++) {
          const dateStr = current.toISOString().split('T')[0];
          data.push({
             date: dateStr || '',
             score: get().getConsistencyScore(dateStr || '')
          });
          current.setDate(current.getDate() + 1);
        }
        return data;
      }
    }),
    {
      name: 'habit-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
    }
  )
);
