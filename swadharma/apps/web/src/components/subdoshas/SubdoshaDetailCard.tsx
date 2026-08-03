import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import type { SubdoshaDetail } from '../../types/assessment';

interface SubdoshaDetailCardProps {
  subdosha: SubdoshaDetail | null;
}

const doshaColorMap: Record<string, string> = {
  vata: 'text-stone-500',
  pitta: 'text-red-500',
  kapha: 'text-green-500',
};

const doshaBadgeColorMap: Record<string, string> = {
  vata: 'bg-stone-100 text-stone-700 border-stone-200',
  pitta: 'bg-red-50 text-red-700 border-red-200',
  kapha: 'bg-green-50 text-green-700 border-green-200',
};

export function SubdoshaDetailCard({ subdosha }: SubdoshaDetailCardProps) {
  if (!subdosha) {
    return (
      <Card className="h-full border-stone-200 bg-[#FBF8F2] shadow-sm flex items-center justify-center min-h-[400px]">
        <CardContent className="text-center text-stone-500">
          <p>Select a subdosha from the grid to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-stone-200 bg-[#FBF8F2] shadow-sm">
      <CardHeader className="pb-3 border-b border-stone-200/60 bg-[#FBF8F2]">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-medium text-stone-800 flex items-center gap-2">
              {subdosha.name}
              <Badge variant="outline" className={doshaBadgeColorMap[subdosha.dosha]}>
                {subdosha.dosha.charAt(0).toUpperCase() + subdosha.dosha.slice(1)}
              </Badge>
            </CardTitle>
            <CardDescription className="text-stone-600 mt-2 text-base">
              <span className="font-semibold text-[#E8973A]">Location:</span> {subdosha.location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6 text-sm text-stone-700 bg-white">
        <div>
          <h4 className="font-semibold text-[#4A7C59] mb-3 text-base">Governed Functions</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {subdosha.functions.map((func, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#4A7C59] mt-0.5">•</span>
                <span>{func}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-[#E8973A] mb-3 text-base">Aggravation Symptoms</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {subdosha.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#E8973A] mt-0.5">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-[#4A7C59] mb-3 text-base">Balancing Herbs</h4>
          <div className="flex flex-wrap gap-2">
            {subdosha.balancingHerbs.map((herb, idx) => (
              <Badge key={idx} variant="secondary" className="bg-[#FBF8F2] text-stone-700 border border-stone-200/60 hover:bg-[#FBF8F2]">
                {herb}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
