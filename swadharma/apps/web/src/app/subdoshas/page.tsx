'use client';

import React, { useState, useEffect } from 'react';
import { SubdoshaMatrixGrid } from '../../components/subdoshas/SubdoshaMatrixGrid';
import { SubdoshaDetailCard } from '../../components/subdoshas/SubdoshaDetailCard';
import subdoshasData from '../../data/subdoshas.json';
import type { SubdoshaDetail } from '../../types/assessment';
import { useAssessmentStore } from '../../stores/assessmentStore';

export default function SubdoshasPage() {
  const [mounted, setMounted] = useState(false);
  const selectedSubdoshaId = useAssessmentStore(state => state.selectedSubdosha);
  const setSelectedSubdosha = useAssessmentStore(state => state.setSelectedSubdosha);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const subdoshas = subdoshasData as SubdoshaDetail[];
  
  const selectedSubdosha = selectedSubdoshaId 
    ? subdoshas.find(s => s.id === selectedSubdoshaId) || null 
    : null;

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2] p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800">
            The 15 Subdoshas
          </h1>
          <p className="text-stone-600 text-lg">
            Explore the subtle energetics of Ayurveda. Each of the three primary doshas (Vata, Pitta, Kapha) is further divided into five subdoshas, governing specific physiological and psychological functions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <SubdoshaMatrixGrid 
              subdoshas={subdoshas} 
              selectedId={selectedSubdoshaId} 
              onSelect={setSelectedSubdosha} 
            />
          </div>
          <div className="lg:col-span-4 sticky top-6">
            <SubdoshaDetailCard subdosha={selectedSubdosha} />
          </div>
        </div>
      </div>
    </div>
  );
}
