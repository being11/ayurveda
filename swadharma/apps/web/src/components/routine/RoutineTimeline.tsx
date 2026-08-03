import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Separator } from '@workspace/ui/components/separator';
import { Clock, Sun, Moon, Sunrise, Sunset, Activity } from 'lucide-react';
import type { RoutineActivity, DailyRoutine } from '../../engines/routine';

interface RoutineTimelineProps {
  routine: DailyRoutine;
}

const timeBlockConfig = [
  { key: 'morning', label: 'Morning', icon: Sunrise, color: 'text-amber-500', bg: 'bg-amber-50' },
  { key: 'afternoon', label: 'Afternoon', icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50' },
  { key: 'evening', label: 'Evening', icon: Sunset, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { key: 'night', label: 'Night', icon: Moon, color: 'text-slate-500', bg: 'bg-slate-50' },
] as const;

export function RoutineTimeline({ routine }: RoutineTimelineProps) {
  return (
    <div className="relative border-l-2 border-stone-200 ml-4 pl-6 space-y-12 py-4">
      {timeBlockConfig.map((block) => {
        const activities = routine[block.key];
        if (!activities || activities.length === 0) return null;

        const Icon = block.icon;

        return (
          <div key={block.key} className="relative">
            {/* Block Icon Indicator */}
            <div className={`absolute -left-[43px] top-1 h-10 w-10 rounded-full border-4 border-white ${block.bg} ${block.color} flex items-center justify-center shadow-sm`}>
              <Icon className="h-5 w-5" />
            </div>

            <h3 className="text-xl font-medium text-stone-800 mb-6 flex items-center gap-2 capitalize">
              {block.label} Routine
            </h3>

            <div className="space-y-6">
              {activities.map((item, idx) => (
                <Card key={item.id} className="border-stone-200 shadow-sm bg-white hover:border-[#4A7C59] transition-colors">
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-start">
                    
                    {/* Time Column */}
                    <div className="flex items-center sm:flex-col sm:items-start gap-2 sm:w-32 shrink-0 text-[#E8973A]">
                      <Clock className="h-4 w-4 hidden sm:block mb-1 opacity-70" />
                      <span className="text-sm font-semibold whitespace-nowrap">{item.timeRange}</span>
                    </div>

                    <Separator orientation="vertical" className="hidden sm:block h-auto mx-2 bg-stone-100" />
                    <Separator orientation="horizontal" className="sm:hidden bg-stone-100" />

                    {/* Activity Column */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base font-medium text-stone-800">{item.activity}</h4>
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
