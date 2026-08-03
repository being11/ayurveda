// swadharma/apps/web/src/app/routine/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { computeProfile, getDominantDosha } from '../../engines/report';
import { getRoutineForProfile } from '../../engines/routine';
import { RoutineTimeline } from '../../components/routine/RoutineTimeline';
import { SeasonalAdjustmentCard } from '../../components/routine/SeasonalAdjustmentCard';
import Navigation from '../../components/Navigation';
import seasonsData from '../../data/seasons.json';
import type { Season } from '../../types/seasons';

const seasons: Season[] = seasonsData as Season[];

export default function RoutinePage() {
  const [mounted, setMounted] = useState(false);
  const { observations, answers, currentSeasonId, autoDetectSeason } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
    if (!currentSeasonId) {
      autoDetectSeason();
    }
  }, [currentSeasonId, autoDetectSeason]);

  if (!mounted) return null; // Prevent hydration mismatch

  const profile = computeProfile(observations, answers);
  const dominantDosha = getDominantDosha(profile.prakrtiDosha);
  const routine = getRoutineForProfile(profile.prakrtiDosha);
  const season = seasons.find((s) => s.id === currentSeasonId) || seasons[0];

  if (!routine || !season) {
    return (
      <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-stone-800">Routine not available</h2>
          <p className="text-stone-600 mt-2">Could not generate a routine at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 pt-24 pb-20">
        <header className="mb-8 text-center print:text-left">
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Your Daily Routine (Dinacharya)</h1>
          <p className="text-stone-600 mt-2 max-w-2xl mx-auto print:mx-0">
            A personalized Ayurvedic routine aligned with the natural rhythms of the day, tailored for your dominant constitution ({dominantDosha}).
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RoutineTimeline routine={routine} dominantDosha={dominantDosha} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <SeasonalAdjustmentCard season={season} />
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-stone-200 shadow-sm print:hidden">
                <h3 className="font-semibold text-stone-800 mb-2">How to use this</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Start by incorporating just one or two changes at a time. Consistency is more important than perfection in Ayurveda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
