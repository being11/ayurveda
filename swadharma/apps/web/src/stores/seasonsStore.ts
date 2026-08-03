import { create } from 'zustand';
import type { Season } from '../types/seasons';
import seasonsData from '../data/seasons.json';

interface SeasonsState {
  currentSeasonId: string | null;
  seasons: Season[];
  setCurrentSeasonId: (id: string) => void;
  autoDetectSeason: () => void;
}

const seasons: Season[] = seasonsData as Season[];

function getCurrentSeasonId(): string {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();

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

export const useSeasonsStore = create<SeasonsState>((set) => ({
  currentSeasonId: null, // Initially null to avoid hydration mismatch if detecting on client
  seasons,
  setCurrentSeasonId: (id: string) => set({ currentSeasonId: id }),
  autoDetectSeason: () => set({ currentSeasonId: getCurrentSeasonId() }),
}));
