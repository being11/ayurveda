import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useAssessmentStore } from '../../stores/assessmentStore';

export function HerbSearchBar() {
  const { 
    herbSearchQuery, setHerbSearchQuery, 
    selectedHerbDosha, setSelectedHerbDosha,
    selectedHerbOrganSystem, setSelectedHerbOrganSystem
  } = useAssessmentStore();

  const doshas = ['vata', 'pitta', 'kapha'] as const;
  const organSystems = ["Digestive", "Respiratory", "Nervous", "Reproductive", "Circulatory", "Excretory", "Skeletal", "Muscular"];

  return (
    <div className="space-y-6 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search herbs by Sanskrit, common, or botanical name..."
          value={herbSearchQuery}
          onChange={(e) => setHerbSearchQuery(e.target.value)}
          className="pl-10 bg-white border-stone-200 focus-visible:ring-[#4A7C59]"
        />
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <span className="text-sm font-medium text-stone-600 block">Filter by Balancing Dosha:</span>
          <div className="flex flex-wrap gap-2">
            {doshas.map(dosha => (
              <Badge
                key={dosha}
                variant={selectedHerbDosha === dosha ? "default" : "outline"}
                className={`cursor-pointer capitalize transition-colors
                  ${selectedHerbDosha === dosha 
                    ? 'bg-[#4A7C59] hover:bg-[#3A6246] text-white' 
                    : 'hover:bg-[#FBF8F2] bg-white'}`}
                onClick={() => setSelectedHerbDosha(selectedHerbDosha === dosha ? null : dosha)}
              >
                {dosha}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-stone-600 block">Filter by Organ System:</span>
          <div className="flex flex-wrap gap-2">
            {organSystems.map(system => (
              <Badge
                key={system}
                variant={selectedHerbOrganSystem === system ? "default" : "outline"}
                className={`cursor-pointer transition-colors
                  ${selectedHerbOrganSystem === system 
                    ? 'bg-[#E8973A] hover:bg-[#D68629] text-white' 
                    : 'hover:bg-[#FBF8F2] bg-white'}`}
                onClick={() => setSelectedHerbOrganSystem(selectedHerbOrganSystem === system ? null : system)}
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
