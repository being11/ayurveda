/** @fileoverview Diet and Ahara main page */
'use client';

import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { computeProfile, getDominantDosha } from '@/src/engines/report';
import { SeasonalMenuCard } from '@/src/components/diet/SeasonalMenuCard';
import { FoodCategoryGrid } from '@/src/components/diet/FoodCategoryGrid';
import { TasteGrid } from '@/src/components/diet/TasteGrid';
import { PaschatkarmaDashboard } from '@/src/components/PaschatkarmaDashboard';
import { Apple, Printer } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export default function DietPage() {
  const [mounted, setMounted] = useState(false);
  const { observations, answers, isComplete } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isComplete && Object.keys(answers).length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-xl">
        <div className="w-20 h-20 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
          <Apple className="w-10 h-10 text-stone-400" />
        </div>
        <h1 className="text-3xl font-serif text-stone-800 mb-4">Your Ayurvedic Diet Plan</h1>
        <p className="text-stone-600 mb-8">
          Complete the assessment to receive a personalized diet plan based on your unique Ayurvedic constitution (Prakrti) and current state (Vikrti).
        </p>
        <Link href="/assessment">
          <Button size="lg" className="w-full sm:w-auto">Start Assessment</Button>
        </Link>
      </div>
    );
  }

  const profile = computeProfile(observations, answers);
  const dominantDoshaString = getDominantDosha(profile.prakrtiDosha);
  const dominantDosha = (['Vata', 'Pitta', 'Kapha'].includes(dominantDoshaString) 
    ? dominantDoshaString 
    : 'Balanced') as 'Vata' | 'Pitta' | 'Kapha' | 'Balanced';

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif text-stone-800 mb-2 flex items-center gap-3">
            <Apple className="w-8 h-8 text-green-600" /> Ahara: Personalized Diet Plan
          </h1>
          <p className="text-lg text-stone-600">
            Based on your dominant dosha: <strong className="text-stone-800">{dominantDosha}</strong>
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.print()}
          className="print:hidden flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print Diet Plan
        </Button>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-serif text-stone-800 mb-6 border-b border-stone-200 pb-2">Food Categories & Tastes</h2>
          <TasteGrid dosha={dominantDosha} />
          <FoodCategoryGrid dosha={dominantDosha} />
        </section>

        <section>
          <h2 className="text-2xl font-serif text-stone-800 mb-6 border-b border-stone-200 pb-2">Seasonal Routine & Meal Timing</h2>
          {/* Defaulting to vasanta since we didn't hook up seasonsStore to this page yet as requested by TPM merge */}
          <SeasonalMenuCard seasonId="vasanta" dosha={dominantDosha} />
        </section>

        <section className="print:break-before-page">
          <h2 className="text-2xl font-serif text-stone-800 mb-6 border-b border-stone-200 pb-2">Post-Purification Diet (Paschatkarma)</h2>
          <PaschatkarmaDashboard />
        </section>
      </div>
    </div>
  );
}
