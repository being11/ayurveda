import React from 'react';
import { Herb } from '../../types/assessment';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@workspace/ui/lib/utils';

interface HerbCardProps {
  herb: Herb;
  className?: string;
}

export function HerbCard({ herb, className }: HerbCardProps) {
  const doshas = [
    { name: 'Vata', val: herb.doshaMatrix.vata, color: 'text-blue-500' },
    { name: 'Pitta', val: herb.doshaMatrix.pitta, color: 'text-red-500' },
    { name: 'Kapha', val: herb.doshaMatrix.kapha, color: 'text-green-500' },
  ];

  return (
    <Card className={cn('bg-[#FBF8F2] border-[#4A7C59]/20 shadow-sm transition-all hover:shadow-md', className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-[#4A7C59]">{herb.sanskritName}</CardTitle>
            <CardDescription className="text-[#E8973A]">{herb.commonName}</CardDescription>
          </div>
          <Badge variant={herb.virya.toLowerCase() === 'heating' ? 'destructive' : 'default'} className={cn(
            herb.virya.toLowerCase() === 'heating' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-400 hover:bg-blue-500'
          )}>
            {herb.virya}
          </Badge>
        </div>
        <p className="text-xs text-stone-500 italic mt-1">{herb.botanicalName}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Dosha Effect</h4>
            <div className="flex gap-2">
              {doshas.map(d => (
                <div key={d.name} className="flex flex-col items-center">
                  <span className={cn("text-lg font-bold", d.color)}>
                    {d.name.charAt(0)}
                  </span>
                  <span className="text-xs font-mono">{d.val}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Properties</h4>
            <div className="text-sm space-y-1">
              <div><span className="font-medium">Rasa:</span> {herb.rasa.join(', ')}</div>
              <div><span className="font-medium">Vipaka:</span> {herb.vipaka}</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Systems & Uses</h4>
          <div className="flex flex-wrap gap-1 mb-2">
            {herb.organSystems.map(sys => (
              <Badge key={sys} variant="outline" className="text-xs border-[#4A7C59]/30 text-[#4A7C59]">
                {sys}
              </Badge>
            ))}
          </div>
          <ul className="list-disc list-inside text-sm text-stone-700 space-y-1">
            {herb.useCases.slice(0, 3).map((use, i) => (
              <li key={i} className="truncate">{use}</li>
            ))}
            {herb.useCases.length > 3 && (
              <li className="text-xs text-stone-500">+{herb.useCases.length - 3} more</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
