import React from 'react';
import { QuizProgress } from './QuizProgress';

interface QuizHeaderProps {
  progressPercentage: number;
  categoryTitle: string;
  currentCategoryIndex: number;
  totalCategories: number;
  estimatedTimeMins: number;
  onBack: () => void;
  canGoBack: boolean;
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
}

export function QuizHeader(props: QuizHeaderProps) {
  return (
    <header className="w-full px-4 py-6 md:px-8 max-w-4xl mx-auto flex flex-col gap-4 z-10 sticky top-0 bg-white/80 backdrop-blur-md">
      <QuizProgress
        progressPercentage={props.progressPercentage}
        categoryTitle={props.categoryTitle}
        currentCategoryIndex={props.currentCategoryIndex}
        totalCategories={props.totalCategories}
        estimatedTimeMins={props.estimatedTimeMins}
        onBack={props.onBack}
        canGoBack={props.canGoBack}
        vataScore={props.vataScore}
        pittaScore={props.pittaScore}
        kaphaScore={props.kaphaScore}
      />
    </header>
  );
}
