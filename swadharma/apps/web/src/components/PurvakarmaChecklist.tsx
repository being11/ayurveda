'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { PurvakarmaTask } from '../engines/panchakarma';
import { cn } from '@workspace/ui/lib/utils';

interface PurvakarmaChecklistProps {
  steps: PurvakarmaTask[];
}

export function PurvakarmaChecklist({ steps }: PurvakarmaChecklistProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  return (
    <Card className="border-[#E8973A]/20 bg-[#FBF8F2] shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-[#3D2B1F]">Purvakarma Preparation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(index);
            
            return (
              <div 
                key={index} 
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer",
                  isCompleted 
                    ? "bg-[#4A7C59]/10 border-[#4A7C59]/30" 
                    : "bg-white border-stone-200 hover:border-[#E8973A]/50"
                )}
                onClick={() => toggleStep(index)}
              >
                <div className="mt-0.5 flex-shrink-0">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    isCompleted 
                      ? "border-[#4A7C59] bg-[#4A7C59]" 
                      : "border-stone-300"
                  )}>
                    {isCompleted && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className={cn(
                    "font-medium transition-colors",
                    isCompleted ? "text-[#4A7C59]" : "text-[#3D2B1F]"
                  )}>
                    {step.task}
                  </h4>
                  <p className={cn(
                    "text-sm mt-1 transition-colors",
                    isCompleted ? "text-stone-600" : "text-stone-500"
                  )}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
