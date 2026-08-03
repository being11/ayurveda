import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  categoryTitle: string;
  progressPercentage?: number;
  currentCategoryIndex?: number;
  totalCategories?: number;
  estimatedTimeMins?: number;
  onBack?: () => void;
  canGoBack?: boolean;
  vataScore?: number;
  pittaScore?: number;
  kaphaScore?: number;
}

/**
 * QuizProgress displays the current progress in the assessment.
 * It shows a unified progress bar, estimated time remaining, and optionally
 * a mini dosha distribution bar that reflects real-time scores across Vata, Pitta, and Kapha.
 */
export function QuizProgress({ 
    currentStep, 
    totalSteps, 
    categoryTitle,
    progressPercentage,
    currentCategoryIndex,
    totalCategories,
    estimatedTimeMins,
    onBack,
    canGoBack,
    vataScore = 0,
    pittaScore = 0,
    kaphaScore = 0
}: QuizProgressProps) {
  const percentage = progressPercentage !== undefined 
    ? progressPercentage 
    : (currentStep && totalSteps ? (currentStep / totalSteps) * 100 : 0);

  const stepLabel = currentStep && totalSteps 
    ? `${currentStep} / ${totalSteps}`
    : (currentCategoryIndex !== undefined && totalCategories !== undefined 
        ? `Category ${currentCategoryIndex + 1} of ${totalCategories}`
        : '');

  return (
    <div className="w-full space-y-4 p-4 md:p-6 border-b border-stone-200/50 bg-white/50 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Category, Back Button and Step info */}
        <div className="flex justify-between items-center text-sm font-medium tracking-wider uppercase text-[#4A7C59]">
          <div className="flex items-center gap-3">
            {onBack && canGoBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors normal-case text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
            <span className="font-serif font-bold tracking-normal text-stone-800 text-base">{categoryTitle}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-sans text-stone-500">
            {estimatedTimeMins !== undefined && (
              <span>~{estimatedTimeMins} min left</span>
            )}
            {stepLabel && <span>{stepLabel}</span>}
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-stone-200/60">
          <div 
              className="h-full transition-all duration-500 ease-in-out bg-[#4A7C59]" 
              style={{ width: `${percentage}%` }} 
          />
        </div>

        {/* Mini Dosha Distribution Bar */}
        {(vataScore > 0 || pittaScore > 0 || kaphaScore > 0) && (
          <div className="flex h-1.5 w-full overflow-hidden rounded-full opacity-80 mt-1">
            <div style={{ width: `${vataScore}%`, backgroundColor: '#4A7C59' }} className="transition-all duration-500" title={`Vata: ${vataScore}%`} />
            <div style={{ width: `${pittaScore}%`, backgroundColor: '#E8973A' }} className="transition-all duration-500" title={`Pitta: ${pittaScore}%`} />
            <div style={{ width: `${kaphaScore}%`, backgroundColor: '#3D2B1F' }} className="transition-all duration-500" title={`Kapha: ${kaphaScore}%`} />
          </div>
        )}
      </div>
    </div>
  );
}
