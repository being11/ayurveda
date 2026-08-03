import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Leaf, Info } from 'lucide-react';
import type { SeasonAdjustment } from '../../engines/routine';

interface SeasonalAdjustmentCardProps {
  adjustment: SeasonAdjustment;
}

export function SeasonalAdjustmentCard({ adjustment }: SeasonalAdjustmentCardProps) {
  return (
    <Card className="border-[#4A7C59]/20 bg-[#FBF8F2] shadow-sm mb-8 overflow-hidden">
      <div className="bg-[#4A7C59]/10 px-6 py-3 border-b border-[#4A7C59]/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#4A7C59]">
          <Leaf className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Seasonal Focus: {adjustment.name}</h3>
        </div>
        <span className="text-sm font-medium text-[#4A7C59]/80 px-2 py-1 bg-white rounded-md border border-[#4A7C59]/20">
          Governing Dosha: {adjustment.dosha}
        </span>
      </div>
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          <Info className="h-5 w-5 text-[#E8973A] shrink-0 mt-0.5" />
          <ul className="space-y-3">
            {adjustment.guidelines.map((guideline, i) => (
              <li key={i} className="text-stone-700 leading-relaxed flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8973A] mt-2 shrink-0" />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
