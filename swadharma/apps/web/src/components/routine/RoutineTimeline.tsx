// swadharma/apps/web/src/components/routine/RoutineTimeline.tsx
import React from 'react';
import type { DoshaRoutine } from '../../types/assessment';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Clock, Sunrise, Sun, Sunset, Moon } from 'lucide-react';

interface RoutineTimelineProps {
  routine: DoshaRoutine;
  dominantDosha: string;
}

export function RoutineTimeline({ routine, dominantDosha }: RoutineTimelineProps) {
  const sections = [
    { title: 'Morning', icon: <Sunrise className="w-5 h-5 text-[#E8973A]" />, items: routine.morning },
    { title: 'Afternoon', icon: <Sun className="w-5 h-5 text-[#E8973A]" />, items: routine.afternoon },
    { title: 'Evening', icon: <Sunset className="w-5 h-5 text-[#E8973A]" />, items: routine.evening },
    { title: 'Night', icon: <Moon className="w-5 h-5 text-[#4A7C59]" />, items: routine.night },
  ];

  return (
    <Card className="w-full bg-[#FBF8F2] border-stone-200 shadow-sm print:shadow-none print:border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-[#4A7C59] flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Dinacharya: {dominantDosha} Routine
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4 print:h-auto">
          <div className="relative border-l border-stone-300 ml-3 space-y-8 pb-8">
            {sections.map((section, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[11px] top-1 bg-[#FBF8F2] p-0.5 rounded-full border border-stone-300">
                  {section.icon}
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-4">{section.title}</h3>
                <div className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-[#4A7C59]">{item.time}</span>
                        <span className="font-medium text-stone-700">{item.activity}</span>
                      </div>
                      <p className="text-sm text-stone-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="relative pl-6 pt-4">
               <div className="absolute -left-[11px] top-5 bg-[#FBF8F2] p-0.5 rounded-full border border-stone-300">
                  <div className="w-5 h-5 rounded-full bg-[#4A7C59] flex items-center justify-center text-white text-xs">Y</div>
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-4">Yoga & Pranayama</h3>
                <div className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm space-y-3">
                  <div>
                    <h4 className="font-medium text-[#4A7C59]">Recommended Asanas</h4>
                    <p className="text-sm text-stone-600 mt-1">{routine.yoga.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#4A7C59]">Pranayama</h4>
                    <p className="text-sm text-stone-600 mt-1">{routine.pranayama.join(', ')}</p>
                  </div>
                </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
