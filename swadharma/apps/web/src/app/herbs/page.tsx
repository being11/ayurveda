'use client'

import React, { useMemo } from 'react';
import { HerbSearchBar } from '../../components/herbs/HerbSearchBar';
import { HerbCard } from '../../components/herbs/HerbCard';
import useAssessmentStore from '../../stores/assessmentStore';
import herbsData from '../../data/herbs.json';
import { Herb } from '../../types/assessment';

export default function HerbsPage() {
  const { herbSearchQuery, herbDoshaFilter, herbOrganFilter } = useAssessmentStore();
  const herbs: Herb[] = herbsData as Herb[];

  const filteredHerbs = useMemo(() => {
    return herbs.filter(herb => {
      // Search filter
      const matchesSearch = 
        !herbSearchQuery || 
        herb.sanskritName.toLowerCase().includes(herbSearchQuery.toLowerCase()) ||
        herb.commonName.toLowerCase().includes(herbSearchQuery.toLowerCase());

      // Dosha filter
      const matchesDosha = 
        !herbDoshaFilter || 
        (herb.doshaMatrix as any)[herbDoshaFilter] === '-'; // Matches herbs that balance (-) the selected dosha

      // Organ System filter
      const matchesOrgan = 
        !herbOrganFilter || 
        herb.organSystems.includes(herbOrganFilter);

      return matchesSearch && matchesDosha && matchesOrgan;
    });
  }, [herbs, herbSearchQuery, herbDoshaFilter, herbOrganFilter]);

  return (
    <div className="min-h-screen bg-[#FBF8F2] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4A7C59] mb-2 font-serif">
            Dravyaguna Vijnana
          </h1>
          <p className="text-stone-600 text-lg">
            Ayurvedic Herb & Remedy Database
          </p>
        </div>

        {/* Search & Filter section */}
        <div className="bg-white/80 p-6 rounded-xl shadow-sm border border-[#4A7C59]/10 mb-8 backdrop-blur-sm">
          <HerbSearchBar />
        </div>

        {/* Results section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-stone-800">
              Found {filteredHerbs.length} {filteredHerbs.length === 1 ? 'Herb' : 'Herbs'}
            </h2>
          </div>

          {filteredHerbs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHerbs.map(herb => (
                <HerbCard key={herb.id} herb={herb} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-xl border border-stone-200 border-dashed">
              <p className="text-stone-500 text-lg">No herbs found matching your criteria.</p>
              <button 
                onClick={() => useAssessmentStore.getState().reset()}
                className="mt-4 text-[#4A7C59] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
