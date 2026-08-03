'use client';

import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { computeProfile, getDominantDosha } from '@/src/engines/report';
import { categories } from '@/src/data/index';
import { doshaDiets, seasonalMenus, mealTimings } from '@/src/data/diet';
import { FoodCategoryGrid } from '@/src/components/diet/FoodCategoryGrid';
import { SeasonalMenuCard } from '@/src/components/diet/SeasonalMenuCard';
import type { Dosha } from '@/src/types/diet';
import { cn } from '@workspace/ui/lib/utils';
import { Apple, Clock, CalendarDays, Info } from 'lucide-react';

export default function DietPage() {
  const [mounted, setMounted] = useState(false);
  const { answers } = useAssessmentStore();
  const [selectedDosha, setSelectedDosha] = useState<Dosha>('vata');
  const [userAgni, setUserAgni] = useState<string>('sama');

  useEffect(() => {
    setMounted(true);
    
    // Calculate defaults from assessment if available
    if (Object.keys(answers).length > 0) {
      const allQuestions = categories.flatMap(cat => cat.questions);
      const observations = calculateObservations(allQuestions, answers);
      const profile = computeProfile(observations, answers);
      
      const dominant = getDominantDosha(profile.prakrtiDosha).toLowerCase() as Dosha;
      if (['vata', 'pitta', 'kapha'].includes(dominant)) {
        setSelectedDosha(dominant);
      }
      if (profile.agni) {
         setUserAgni(profile.agni);
      }
    }
  }, [answers]);

  if (!mounted) return null;

  const currentDiet = doshaDiets.find(d => d.dosha === selectedDosha);
  const agniTiming = mealTimings.find(m => m.agniType === userAgni) || mealTimings[3]!; // fallback to sama

  return (
    <div className="container max-w-6xl py-12 px-4 mx-auto space-y-12">
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#3D2B1F]">
          Ayurvedic Diet & Nutrition
        </h1>
        <p className="text-lg text-muted-foreground">
          Food is medicine. Discover guidelines tailored to your constitution, digestion, and the current season.
        </p>
      </header>

      {/* Dosha Selector */}
      <section className="flex flex-col items-center space-y-4">
        <p className="text-sm font-semibold text-[#4A7C59] uppercase tracking-wider">
          Select a Dosha to view its diet plan
        </p>
        <div className="flex bg-[#FBF8F2] p-1 rounded-full border border-[#E8973A]/20 shadow-sm">
          {(['vata', 'pitta', 'kapha'] as Dosha[]).map(dosha => (
            <button
              key={dosha}
              onClick={() => setSelectedDosha(dosha)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                selectedDosha === dosha
                  ? "bg-[#E8973A] text-white shadow"
                  : "text-[#3D2B1F] hover:bg-[#E8973A]/10"
              )}
            >
              {dosha}
            </button>
          ))}
        </div>
      </section>

      {/* Food Categories */}
      {currentDiet && (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#4A7C59]/10">
          <div className="flex items-center space-x-2 mb-6 border-b border-border pb-4">
            <Apple className="text-[#4A7C59] w-6 h-6" />
            <h2 className="text-2xl font-heading font-semibold text-[#3D2B1F]">Food Guidelines</h2>
          </div>
          <FoodCategoryGrid doshaDiet={currentDiet} />
        </section>
      )}

      {/* Seasonal Menus */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2">
          <CalendarDays className="text-[#E8973A] w-6 h-6" />
          <h2 className="text-2xl font-heading font-semibold text-[#3D2B1F]">Seasonal Ritu Charya</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seasonalMenus.map(menu => (
            <SeasonalMenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </section>

      {/* Agni & Meal Timings */}
      <section className="bg-[#4A7C59]/5 rounded-2xl p-6 md:p-8 border border-[#4A7C59]/20">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="text-[#4A7C59] w-6 h-6" />
          <h2 className="text-2xl font-heading font-semibold text-[#3D2B1F]">Meal Timings (Agni)</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#E8973A]">
                Your Agni Type
              </span>
            </div>
            <h3 className="text-xl font-semibold capitalize text-[#3D2B1F] mb-4">
              {agniTiming.agniType} ({agniTiming.description})
            </h3>
            <ul className="space-y-2 text-[#3D2B1F]/80 text-sm">
              {agniTiming.guidelines.map((g, i) => (
                <li key={i} className="flex items-start">
                  <Info className="w-4 h-4 text-[#4A7C59] mr-2 mt-0.5 shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#4A7C59]/10 space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold text-[#3D2B1F]">Breakfast</span>
              <span className="text-[#4A7C59] font-medium">{agniTiming.breakfastTime}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold text-[#3D2B1F]">Lunch</span>
              <span className="text-[#E8973A] font-medium">{agniTiming.lunchTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#3D2B1F]">Dinner</span>
              <span className="text-[#4A7C59] font-medium">{agniTiming.dinnerTime}</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
