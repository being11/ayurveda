'use client'

import React from 'react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, X } from 'lucide-react';
import useAssessmentStore from '../../stores/assessmentStore';
import { cn } from '@workspace/ui/lib/utils';

export function HerbSearchBar() {
  const {
    herbSearchQuery,
    setHerbSearchQuery,
    herbDoshaFilter,
    setHerbDoshaFilter,
    herbOrganFilter,
    setHerbOrganFilter
  } = useAssessmentStore();

  const doshas = ['vata', 'pitta', 'kapha'];
  const organSystems = ["Nervous", "Digestive", "Respiratory", "Reproductive", "Circulatory", "Skeletal", "Muscular", "Integumentary"];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <Input
          type="text"
          placeholder="Search herbs by English or Sanskrit name..."
          className="pl-10 h-12 bg-white/50 border-[#4A7C59]/20 focus-visible:ring-[#4A7C59]/30"
          value={herbSearchQuery}
          onChange={(e) => setHerbSearchQuery(e.target.value)}
        />
        {herbSearchQuery && (
          <button 
            onClick={() => setHerbSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Dosha Focus</h4>
          <div className="flex flex-wrap gap-2">
            {doshas.map(dosha => (
              <Badge
                key={dosha}
                variant={herbDoshaFilter === dosha ? "default" : "outline"}
                className={cn(
                  "cursor-pointer capitalize transition-all",
                  herbDoshaFilter === dosha 
                    ? "bg-[#4A7C59] hover:bg-[#4A7C59]/90 text-white" 
                    : "border-[#4A7C59]/30 text-[#4A7C59] hover:bg-[#4A7C59]/10"
                )}
                onClick={() => setHerbDoshaFilter(herbDoshaFilter === dosha ? null : dosha)}
              >
                {dosha}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">System Focus</h4>
          <div className="flex flex-wrap gap-2">
            {organSystems.map(sys => (
              <Badge
                key={sys}
                variant={herbOrganFilter === sys ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all",
                  herbOrganFilter === sys 
                    ? "bg-[#E8973A] hover:bg-[#E8973A]/90 text-white" 
                    : "border-[#E8973A]/30 text-[#E8973A] hover:bg-[#E8973A]/10"
                )}
                onClick={() => setHerbOrganFilter(herbOrganFilter === sys ? null : sys)}
              >
                {sys}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
