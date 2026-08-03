/** @fileoverview 6 Rasas display UI component */
import React from 'react';
import { getTastesForDosha } from '../../engines/diet';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Leaf, Flame } from 'lucide-react';

interface TasteGridProps {
  dosha: string;
}

export function TasteGrid({ dosha }: TasteGridProps) {
  const tastes = getTastesForDosha(dosha);

  if (!tastes || (!tastes.favor.length && !tastes.reduce.length)) {
    return null;
  }

  return (
    <Card className="border-stone-200 bg-white shadow-sm overflow-hidden mb-6">
      <CardHeader className="bg-[#FBF8F2] border-b border-stone-200 pb-4">
        <CardTitle className="text-xl font-serif text-[#3D2B1F] flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[#4A7C59]" />
          The 6 Rasas (Tastes) for {dosha}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#4A7C59]/10 p-4 rounded-lg border border-[#4A7C59]/20">
            <h4 className="font-semibold text-[#4A7C59] flex items-center mb-3">
              <Leaf className="w-4 h-4 mr-2" /> Favor these tastes
            </h4>
            <div className="flex flex-wrap gap-2">
              {tastes.favor.map((taste) => (
                <span key={taste} className="px-3 py-1 bg-white border border-[#4A7C59]/30 rounded-full text-sm text-[#3D2B1F]">
                  {taste}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#E8973A]/10 p-4 rounded-lg border border-[#E8973A]/20">
            <h4 className="font-semibold text-[#E8973A] flex items-center mb-3">
              <Flame className="w-4 h-4 mr-2" /> Reduce these tastes
            </h4>
            <div className="flex flex-wrap gap-2">
              {tastes.reduce.map((taste) => (
                <span key={taste} className="px-3 py-1 bg-white border border-[#E8973A]/30 rounded-full text-sm text-[#3D2B1F]">
                  {taste}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
