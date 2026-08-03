import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import type { Herb } from '../../types/assessment';

interface HerbCardProps {
  herb: Herb;
}

const doshaColorMap: Record<string, string> = {
  vata: 'text-stone-500',
  pitta: 'text-red-500',
  kapha: 'text-green-500',
};

const getDoshaImpact = (doshaName: string, impact: string) => {
  if (impact === '-') return `\u2193 ${doshaName}`; // Decrease
  if (impact === '+') return `\u2191 ${doshaName}`; // Increase
  return `\u2194 ${doshaName}`; // Balance/Neutral
};

export function HerbCard({ herb }: HerbCardProps) {
  return (
    <Card className="h-full border-stone-200 bg-[#FBF8F2] shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 border-b border-stone-200/60 bg-[#FBF8F2]">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-medium text-stone-800">
              {herb.sanskritName}
            </CardTitle>
            <CardDescription className="text-stone-600 mt-1">
              {herb.commonName} <span className="italic">({herb.botanicalName})</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4 text-sm text-stone-700 bg-white">
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          <div>
            <span className="font-semibold text-[#4A7C59]">Rasa (Taste):</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {herb.rasa.map((taste) => (
                <Badge key={taste} variant="outline" className="text-stone-600 bg-stone-50/50">
                  {taste}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold text-[#E8973A]">Virya (Potency):</span>
            <p className="mt-1">{herb.virya}</p>
          </div>
          <div>
            <span className="font-semibold text-[#4A7C59]">Vipaka (Post-Digestive):</span>
            <p className="mt-1">{herb.vipaka}</p>
          </div>
           <div className="col-span-2">
            <span className="font-semibold text-[#E8973A]">Prabhava (Special Action):</span>
            <p className="mt-1">{herb.prabhava}</p>
          </div>
        </div>

        <div>
          <span className="font-semibold text-[#4A7C59] block mb-2">Dosha Impact:</span>
          <div className="flex gap-2">
            {Object.entries(herb.doshaMatrix).map(([dosha, impact]) => (
              <Badge key={dosha} variant="secondary" className={`${doshaColorMap[dosha]} bg-white border border-stone-200`}>
                {getDoshaImpact(dosha.charAt(0).toUpperCase() + dosha.slice(1), impact)}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
           <span className="font-semibold text-stone-800 block mb-1">Key Actions:</span>
           <ul className="list-disc list-inside space-y-1 text-stone-600">
             {herb.useCases.slice(0, 3).map((useCase, idx) => (
               <li key={idx}>{useCase}</li>
             ))}
           </ul>
        </div>
        
        <p className="text-stone-600 italic mt-2">{herb.description}</p>
      </CardContent>
    </Card>
  );
}
