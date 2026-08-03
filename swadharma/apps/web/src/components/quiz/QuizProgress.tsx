import React from 'react';
import { cn } from '@workspace/ui/lib/utils';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  categoryTitle: string;
  vataScore?: number;
  pittaScore?: number;
  kaphaScore?: number;
}

export function QuizProgress({ 
    currentStep, 
    totalSteps, 
    categoryTitle,
    vataScore = 0,
    pittaScore = 0,
    kaphaScore = 0
}: QuizProgressProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Category and Step info */}
      <div className="flex justify-between items-center text-sm font-medium tracking-wider uppercase" style={{ color: '#4A7C59' }}>
        <span>{categoryTitle}</span>
        <span>{currentStep} / {totalSteps}</span>
      </div>

      {/* Main Progress Bar */}
      <div className="relative h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: '#FBF8F2' }}>
        <div 
            className="h-full transition-all duration-500 ease-in-out" 
            style={{ 
                width: `${percentage}%`,
                backgroundColor: '#4A7C59'
            }} 
        />
      </div>

      {/* Mini Dosha Distribution Bar */}
      {(vataScore > 0 || pittaScore > 0 || kaphaScore > 0) && (
        <div className="flex h-1.5 w-full overflow-hidden rounded-full opacity-80 mt-1">
          <div style={{ width: `${vataScore}%`, backgroundColor: '#4A7C59' }} className="transition-all duration-500" title={`Vata: ${vataScore}%`} />
          <div style={{ width: `${pittaScore}%`, backgroundColor: '#E8973A' }} className="transition-all duration-500" title={`Pitta: ${pittaScore}%`} />
          <div style={{ width: `${kaphaScore}%`, backgroundColor: '#8DB596' }} className="transition-all duration-500" title={`Kapha: ${kaphaScore}%`} />
        </div>
      )}
    </div>
  );
}
