import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Herb } from '../../types/assessment';

interface HerbCardProps {
  herb: Herb;
}

export function HerbCard({ herb }: HerbCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-[#FBF8F2] border-stone-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-[#4A7C59]">{herb.sanskritName}</CardTitle>
            <p className="text-sm text-stone-500 italic">{herb.botanicalName}</p>
          </div>
          <Badge variant="outline" className="bg-white">
            {herb.virya}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-stone-700">{herb.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Rasa (Taste):</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {herb.rasa.map((r: string) => (
                <Badge key={r} variant="secondary" className="text-xs bg-[#E8973A]/10 text-[#E8973A]">
                  {r}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium">Vipaka:</span>
            <p className="text-stone-600">{herb.vipaka}</p>
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-medium text-sm">Dosha Effects:</span>
          <div className="flex gap-2">
            {Object.entries(herb.dosha).map(([dosha, effect]) => (
              <Badge 
                key={dosha}
                variant="outline" 
                className={`text-xs capitalize
                  ${effect === 'balances' ? 'border-green-300 text-green-700 bg-green-50' : 
                    effect === 'aggravates' ? 'border-red-300 text-red-700 bg-red-50' : 
                    'border-stone-200 text-stone-500'}`}
              >
                {dosha}: {effect as string}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <span className="font-medium text-sm">Use Cases:</span>
          <div className="flex flex-wrap gap-1">
            {herb.useCases.map((useCase: string) => (
              <Badge key={useCase} variant="secondary" className="text-xs">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
