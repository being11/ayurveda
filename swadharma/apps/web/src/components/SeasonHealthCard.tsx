'use client';

import React from 'react';
import { useAssessmentStore } from '../stores/assessmentStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import seasonsData from '../data/seasons.json';
import type { Season } from '../types/seasons';

const seasons: Season[] = seasonsData as Season[];

export default function SeasonHealthCard() {
  const { currentSeasonId } = useAssessmentStore();

  const currentSeason = seasons.find((s) => s.id === currentSeasonId);

  if (!currentSeason) {
    return null;
  }

  const getDoshaBg = (dosha: string) => {
    switch (dosha) {
      case 'Vata': return 'bg-[#E8973A]/10 border-[#E8973A]/20';
      case 'Pitta': return 'bg-[#4A7C59]/10 border-[#4A7C59]/20';
      case 'Kapha': return 'bg-[#8B5A2B]/10 border-[#8B5A2B]/20';
      default: return 'bg-stone-50 border-stone-200';
    }
  };

  const getDoshaText = (dosha: string) => {
    switch (dosha) {
      case 'Vata': return 'text-[#E8973A]';
      case 'Pitta': return 'text-[#4A7C59]';
      case 'Kapha': return 'text-[#8B5A2B]';
      default: return 'text-stone-800';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md border-stone-200 bg-[#FBF8F2]">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-heading text-[#4A7C59] mb-1">
              {currentSeason.sanskritName} ({currentSeason.name})
            </CardTitle>
            <CardDescription className="text-stone-600 font-medium">
              {currentSeason.startDate} to {currentSeason.endDate}
            </CardDescription>
          </div>
          <div className={`px-4 py-2 rounded-full border ${getDoshaBg(currentSeason.dominantDosha)}`}>
            <span className="text-sm font-semibold uppercase tracking-wider text-stone-700">
              Dominant: <span className={getDoshaText(currentSeason.dominantDosha)}>{currentSeason.dominantDosha}</span>
            </span>
          </div>
        </div>
        <p className="text-stone-700 mt-4 italic">
          {currentSeason.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h3 className="text-lg font-semibold text-[#4A7C59] mb-3 flex items-center">
            Dietary Guidelines (Ahara)
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-stone-700">
            {currentSeason.diet.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#4A7C59] mb-3 flex items-center">
            Lifestyle Recommendations (Vihara)
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-stone-700">
            {currentSeason.lifestyle.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#4A7C59] mb-3 flex items-center">
            Key Herbs (Aushadhi)
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentSeason.herbs.map((herb: string, idx: number) => (
              <span key={idx} className="bg-white border border-[#4A7C59]/30 text-[#4A7C59] px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                {herb}
              </span>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
