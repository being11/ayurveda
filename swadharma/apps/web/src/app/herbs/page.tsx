'use client';

import React from 'react';
import { HerbSearchBar } from '../../components/herbs/HerbSearchBar';
import { HerbCard } from '../../components/herbs/HerbCard';
import { useAssessmentStore } from '../../stores/assessmentStore';
import herbsData from '../../data/herbs.json';
import type { Herb } from '../../types/assessment';

export default function HerbsPage() {
  const { herbSearchQuery, selectedHerbDosha, selectedHerbOrganSystem } = useAssessmentStore();
  
  const filteredHerbs = (herbsData as Herb[]).filter((herb) => {
    const matchesSearch = herb.sanskritName.toLowerCase().includes(herbSearchQuery.toLowerCase()) || 
                          herb.commonName.toLowerCase().includes(herbSearchQuery.toLowerCase()) ||
                          herb.botanicalName.toLowerCase().includes(herbSearchQuery.toLowerCase());
    const matchesDosha = selectedHerbDosha ? herb.dosha[selectedHerbDosha] === 'balances' : true;
    const matchesOrgan = selectedHerbOrganSystem ? herb.organSystems.includes(selectedHerbOrganSystem) : true;
    return matchesSearch && matchesDosha && matchesOrgan;
  });

  return (
    <div className="min-h-screen bg-[#FBF8F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#4A7C59] mb-4">Ayurvedic Herb & Remedy Database</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Explore our comprehensive database of 108 primary Ayurvedic herbs. Discover their properties, 
            dosha effects, and traditional use cases.
          </p>
        </div>

        <HerbSearchBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHerbs.length > 0 ? (
            filteredHerbs.map((herb: Herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-stone-500">
              No herbs found matching your criteria. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
