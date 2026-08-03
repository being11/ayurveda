// swadharma/apps/web/src/components/routine/SeasonalAdjustmentCard.tsx
import React from 'react';
import type { Season } from '../../types/seasons';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Leaf } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

interface SeasonalAdjustmentCardProps {
  season: Season;
}

export function SeasonalAdjustmentCard({ season }: SeasonalAdjustmentCardProps) {
  return (
    <Card className={cn(
      "w-full bg-[#4A7C59]/10 border-[#4A7C59]/20 shadow-sm mt-6",
      "print:shadow-none print:border-none print:bg-stone-50"
    )}>
      <CardHeader>
        <CardTitle className="text-xl text-[#4A7C59] flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[#4A7C59]" />
          Ritucharya: {season.sanskritName} ({season.name})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-baseline border-b border-[#4A7C59]/20 pb-2">
          <span className="font-semibold text-stone-700">Dosha in Focus</span>
          <span className="text-[#E8973A] font-medium">{season.dominantDosha}</span>
        </div>
        
        <div className="pt-2">
          <p className="text-sm text-stone-600 leading-relaxed italic mb-4">
            {season.description}
          </p>
          
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-stone-700 block mb-1">Diet Focus</span>
              <ul className="text-sm text-stone-600 leading-relaxed list-disc list-inside space-y-1">
                {season.diet.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <span className="font-semibold text-stone-700 block mb-1">Lifestyle Adjustments</span>
              <ul className="text-sm text-stone-600 leading-relaxed list-disc list-inside space-y-1">
                {season.lifestyle.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <span className="font-semibold text-stone-700 block mb-1">Recommended Herbs</span>
              <p className="text-sm text-stone-600 leading-relaxed">
                {season.herbs.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
