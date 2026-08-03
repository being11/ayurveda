// swadharma/apps/web/src/components/routine/SeasonalAdjustmentCard.tsx
import React from 'react';
import type { SeasonAdjustment } from '../../types/assessment';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Leaf } from 'lucide-react';

interface SeasonalAdjustmentCardProps {
  season: SeasonAdjustment;
}

export function SeasonalAdjustmentCard({ season }: SeasonalAdjustmentCardProps) {
  return (
    <Card className="w-full bg-[#4A7C59]/10 border-[#4A7C59]/20 shadow-sm mt-6 print:shadow-none print:border-none print:bg-stone-50">
      <CardHeader>
        <CardTitle className="text-xl text-[#4A7C59] flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[#4A7C59]" />
          Ritucharya: Seasonal Focus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-baseline border-b border-[#4A7C59]/20 pb-2">
          <span className="font-semibold text-stone-700">Current Season</span>
          <span className="text-[#4A7C59] font-medium">{season.name}</span>
        </div>
        <div className="flex justify-between items-baseline border-b border-[#4A7C59]/20 pb-2">
          <span className="font-semibold text-stone-700">Dosha to Watch</span>
          <span className="text-[#E8973A] font-medium">{season.doshaFocus}</span>
        </div>
        <div className="pt-2">
          <span className="font-semibold text-stone-700 block mb-1">Seasonal Adjustment</span>
          <p className="text-sm text-stone-600 leading-relaxed">
            {season.adjustment}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
