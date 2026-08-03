import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import type { SeasonalMenu } from '../../types/diet';

interface SeasonalMenuCardProps {
  menu: SeasonalMenu;
}

export function SeasonalMenuCard({ menu }: SeasonalMenuCardProps) {
  return (
    <Card className="bg-[#FBF8F2] border-[#E8973A]/30 shadow-md">
      <CardHeader className="bg-[#FBF8F2] border-b border-[#E8973A]/20 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-[#3D2B1F] font-heading">
            {menu.season} Menu
          </CardTitle>
          <span className="px-3 py-1 bg-[#E8973A]/10 text-[#E8973A] text-xs font-semibold uppercase tracking-wider rounded-full">
            Balances {menu.doshaSeason}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <div className="bg-white/50 p-4 rounded-lg border border-[#3D2B1F]/5 text-sm text-[#3D2B1F]">
          <h4 className="font-semibold text-[#4A7C59] mb-2 uppercase tracking-wider text-xs">Guidelines</h4>
          <ul className="list-disc list-inside space-y-1">
            {menu.guidelines.map((guideline, idx) => (
              <li key={idx} className="opacity-90">{guideline}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h5 className="font-semibold text-[#E8973A] flex items-center border-b border-[#E8973A]/20 pb-2">
              <span className="text-lg mr-2">🌅</span> Breakfast
            </h5>
            <ul className="text-sm space-y-2 text-[#3D2B1F]/80">
              {menu.meals.breakfast.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#4A7C59] mr-2 text-[10px] mt-1">▶</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-semibold text-[#E8973A] flex items-center border-b border-[#E8973A]/20 pb-2">
              <span className="text-lg mr-2">☀️</span> Lunch
            </h5>
            <ul className="text-sm space-y-2 text-[#3D2B1F]/80">
              {menu.meals.lunch.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#4A7C59] mr-2 text-[10px] mt-1">▶</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-[#E8973A] flex items-center border-b border-[#E8973A]/20 pb-2">
              <span className="text-lg mr-2">🌙</span> Dinner
            </h5>
            <ul className="text-sm space-y-2 text-[#3D2B1F]/80">
              {menu.meals.dinner.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#4A7C59] mr-2 text-[10px] mt-1">▶</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
