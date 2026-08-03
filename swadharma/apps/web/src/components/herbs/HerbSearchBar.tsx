'use client';

import React from 'react';
import { Input } from '@workspace/ui/components/input';
import { Badge } from '@workspace/ui/components/badge';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { Search } from 'lucide-react';

const doshas = ['vata', 'pitta', 'kapha'];
const organSystems = [
  'Digestive', 'Respiratory', 'Nervous', 'Circulatory', 
  'Reproductive', 'Skeletal', 'Muscular', 'Immune'
];

export function HerbSearchBar() {
  const { 
    herbSearchQuery, 
    setHerbSearchQuery, 
    herbDoshaFilter, 
    setHerbDoshaFilter,
    herbOrganFilter,
    setHerbOrganFilter
  } = useAssessmentStore();

  return (
    <div className="space-y-4 mb-8 p-4 bg-[#FBF8F2] rounded-lg border border-stone-200">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <Input 
          type="text" 
          placeholder="Search by Sanskrit or common name..."
          value={herbSearchQuery}
          onChange={(e) => setHerbSearchQuery(e.target.value)}
          className="pl-9 bg-white border-stone-300 focus-visible:ring-[#4A7C59]"
        />
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-stone-700 mr-3">Filter by Dosha (Balancing):</span>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge 
              variant={herbDoshaFilter === null ? "default" : "outline"}
              className={`cursor-pointer ${herbDoshaFilter === null ? 'bg-[#4A7C59] hover:bg-[#3d664a]' : 'text-stone-600'}`}
              onClick={() => setHerbDoshaFilter(null)}
            >
              All Doshas
            </Badge>
            {doshas.map(dosha => (
              <Badge 
                key={dosha}
                variant={herbDoshaFilter === dosha ? "default" : "outline"}
                className={`cursor-pointer capitalize ${herbDoshaFilter === dosha ? 'bg-[#E8973A] hover:bg-[#c9802d]' : 'text-stone-600'}`}
                onClick={() => setHerbDoshaFilter(herbDoshaFilter === dosha ? null : dosha)}
              >
                {dosha} Balancing
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-stone-700 mr-3">Filter by Organ System:</span>
          <div className="flex flex-wrap gap-2 mt-2">
             <Badge 
              variant={herbOrganFilter === null ? "default" : "outline"}
              className={`cursor-pointer ${herbOrganFilter === null ? 'bg-[#4A7C59] hover:bg-[#3d664a]' : 'text-stone-600'}`}
              onClick={() => setHerbOrganFilter(null)}
            >
              All Systems
            </Badge>
            {organSystems.map(system => (
              <Badge 
                key={system}
                variant={herbOrganFilter === system ? "default" : "outline"}
                className={`cursor-pointer ${herbOrganFilter === system ? 'bg-[#4A7C59] hover:bg-[#3d664a]' : 'text-stone-600'}`}
                onClick={() => setHerbOrganFilter(herbOrganFilter === system ? null : system)}
              >
                {system}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
