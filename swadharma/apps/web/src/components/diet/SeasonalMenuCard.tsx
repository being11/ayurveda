'use client';

import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/card';
import { Sun, Calendar, Utensils } from 'lucide-react';
import dietData from '@/src/data/diet.json';
import { useSeasonsStore } from '@/src/stores/seasonsStore';

interface SeasonalMenuCardProps {
  dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Balanced';
}

export function SeasonalMenuCard({ dosha }: SeasonalMenuCardProps) {
  const { currentSeasonId, autoDetectSeason } = useSeasonsStore();

  useEffect(() => {
    if (!currentSeasonId) {
      autoDetectSeason();
    }
  }, [currentSeasonId, autoDetectSeason]);

  const seasonId = currentSeasonId || 'hemanta';
  
  // Type casting since we added seasonalMenus in JSON
  const seasonalMenus = (dietData as any).seasonalMenus;
  const seasonData = seasonalMenus[seasonId]?.[dosha] || seasonalMenus['hemanta'][dosha];
  const timingData = dietData.timing[dosha];

  // Helper for color coding based on dosha
  const getThemeColor = () => {
    switch (dosha) {
      case 'Vata':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Pitta':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'Kapha':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default:
        return 'text-stone-600 bg-stone-50 border-stone-200';
    }
  };

  const themeClass = getThemeColor();
  const iconColorClass = dosha === 'Vata' ? 'text-amber-600' : dosha === 'Pitta' ? 'text-red-500' : dosha === 'Kapha' ? 'text-emerald-600' : 'text-stone-600';
  const iconBgClass = dosha === 'Vata' ? 'bg-amber-100' : dosha === 'Pitta' ? 'bg-red-100' : dosha === 'Kapha' ? 'bg-emerald-100' : 'bg-stone-100';

  return (
    <div className="space-y-6">
      <Card className={`border-l-4 shadow-sm ${themeClass.split(' ')[2]}`}>
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className={`p-2 rounded-full ${iconBgClass} ${iconColorClass}`}>
            <Calendar className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-serif">Seasonal Guide: {seasonData.season}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-stone-700 font-medium mb-4">{seasonData.recommendation}</p>
          <div className="space-y-3 mt-4">
            <h4 className="font-semibold text-stone-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <Sun className="w-4 h-4 text-orange-400" /> Suggested Daily Menu
            </h4>
            <ul className="space-y-2 text-stone-600">
              {seasonData.menu.map((item: string, index: number) => {
                const [meal, ...descParts] = item.split(': ');
                const desc = descParts.join(': ');
                return (
                  <li key={index} className="flex gap-2">
                    <span className="font-medium text-stone-800 min-w-[80px]">{meal}:</span>
                    <span>{desc || item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-stone-200">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 bg-stone-100 rounded-full text-stone-600">
            <Utensils className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-serif">Meal Timing & Agni</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-stone-700">{timingData}</p>
        </CardContent>
      </Card>
    </div>
  );
}
