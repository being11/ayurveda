import { useEffect } from 'react';
import type { Question } from '@/src/types/assessment';

interface UseQuizNavigationProps {
  currentQuestion?: Question;
  currentAnswer?: string | string[];
  historyLength: number;
  showTransition: boolean;
  isComplete: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  handleOptionClick: (id: string) => void;
}

export function useQuizNavigation({
  currentQuestion,
  currentAnswer,
  historyLength,
  showTransition,
  isComplete,
  handlePrev,
  handleNext,
  handleOptionClick
}: UseQuizNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion || showTransition || isComplete) return;

      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        if (historyLength > 0) {
          e.preventDefault();
          handlePrev();
        }
      } else if (e.key === 'Enter') {
        if (currentQuestion.type === 'multiple') {
          const current = (currentAnswer as string[]) || [];
          if (current.length > 0) {
            e.preventDefault();
            handleNext();
          }
        }
      } else {
        const num = parseInt(e.key);
        if (!isNaN(num) && num > 0 && currentQuestion.options && num <= currentQuestion.options.length) {
          e.preventDefault();
          const option = currentQuestion.options[num - 1];
          if (option) {
            handleOptionClick(option.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, currentAnswer, historyLength, showTransition, isComplete, handlePrev, handleNext, handleOptionClick]);
}
