'use client';

import React, { useEffect, useState } from 'react';
import SeasonalCalendarWheel from '../../components/SeasonalCalendarWheel';
import SeasonHealthCard from '../../components/SeasonHealthCard';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { useSeasonsStore } from '../../stores/seasonsStore';

export default function SeasonsPage() {
  const [mounted, setMounted] = useState(false);
  const autoDetectSeason = useSeasonsStore((state) => state.autoDetectSeason);
  const currentSeasonId = useSeasonsStore((state) => state.currentSeasonId);

  useEffect(() => {
    setMounted(true);
    if (!currentSeasonId) {
      autoDetectSeason();
    }
  }, [autoDetectSeason, currentSeasonId]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 flex justify-center items-center">
        <p className="text-stone-600 animate-pulse">Loading Seasonal Calendar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-heading text-[#4A7C59]">
            Ritucharya
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            The Ayurvedic seasonal calendar. Discover how to align your diet and lifestyle with the rhythms of nature to maintain balance and harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <SeasonHealthCard />
          </div>
          <div className="order-1 lg:order-2">
            <SeasonalCalendarWheel />
            <p className="text-center text-sm text-stone-500 mt-4">
              Click a season to view its guidelines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
