'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { categories } from '../../data/index';
import { QuizProgress } from './QuizProgress';
import { QuestionCard } from './QuestionCard';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export function QuizEngine() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const {
    currentCategoryIndex,
    currentQuestionId,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    isComplete,
    history,
  } = useAssessmentStore();

  const prevCategoryIndexRef = useRef(currentCategoryIndex);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      mounted &&
      currentCategoryIndex !== prevCategoryIndexRef.current &&
      currentCategoryIndex > prevCategoryIndexRef.current
    ) {
      setShowTransition(true);
      const timer = setTimeout(() => {
        setShowTransition(false);
      }, 1500);
      prevCategoryIndexRef.current = currentCategoryIndex;
      return () => clearTimeout(timer);
    } else {
      prevCategoryIndexRef.current = currentCategoryIndex;
    }
  }, [currentCategoryIndex, mounted]);

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions.find((q) => q.id === currentQuestionId);
  const currentAnswer = currentQuestionId ? answers[currentQuestionId] : undefined;

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    nextQuestion();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, nextQuestion]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    prevQuestion();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, prevQuestion]);

  const handleOptionClick = useCallback(
    (optionId: string) => {
      if (!currentQuestion || isTransitioning) return;

      if (currentQuestion.type === 'single') {
        setAnswer(currentQuestion.id, optionId);
        setIsTransitioning(true);
        setTimeout(() => {
          nextQuestion();
          setIsTransitioning(false);
        }, 400);
      } else {
        const current = (currentAnswer as string[]) || [];
        const newAnswer = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        setAnswer(currentQuestion.id, newAnswer);
      }
    },
    [currentQuestion, isTransitioning, setAnswer, currentAnswer, nextQuestion]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion || showTransition || isComplete) return;

      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        if (history.length > 0) {
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
  }, [currentQuestion, currentAnswer, history, showTransition, isComplete, handleNext, handlePrev, handleOptionClick]);

  if (!mounted) {
    return <div className="flex flex-col min-h-screen bg-[#FBF8F2]" />;
  }

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF8F2] text-stone-900 p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md space-y-8"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <CheckCircle2 className="w-20 h-20 mx-auto text-[#4A7C59]" strokeWidth={1.5} />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif">Quiz Complete</h2>
            <p className="text-lg opacity-80">
              Your dosha profile is ready. Let's see your results.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#4A7C59] hover:bg-[#3D2B1F] text-[#FBF8F2]"
              onClick={() => router.push('/report')}
            >
              See Results <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59]/10"
              onClick={handlePrev}
            >
              Review Answers
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion || !currentCategory) return <div className="min-h-screen bg-[#FBF8F2]" />;

  const currentIndexInCategory = currentCategory.questions.findIndex((q) => q.id === currentQuestionId);
  const remainingInCurrentCategory = Math.max(0, currentCategory.questions.length - currentIndexInCategory - 1);
  let totalRemaining = remainingInCurrentCategory;
  for (let i = currentCategoryIndex + 1; i < categories.length; i++) {
    const category = categories[i];
    if (category && category.questions) {
      totalRemaining += category.questions.length;
    }
  }
  const estimatedTimeMins = Math.ceil((totalRemaining * 8) / 60);
  const progressPercentage = (currentCategoryIndex / categories.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8F2] text-stone-900">
      <header className="w-full px-4 py-6 md:px-8 max-w-4xl mx-auto flex flex-col gap-4 z-10">
        <button
          onClick={handlePrev}
          disabled={history.length === 0}
          className={cn(
            'flex items-center hover:text-[#4A7C59] transition-colors self-start',
            history.length === 0 ? 'opacity-0 pointer-events-none' : ''
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <QuizProgress
          progressPercentage={progressPercentage}
          categoryTitle={currentCategory.title}
          currentIndex={currentCategoryIndex}
          totalCategories={categories.length}
          estimatedTimeMins={estimatedTimeMins}
        />
      </header>

      <main className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 pb-32">
        <AnimatePresence mode="wait">
          {showTransition ? (
            <motion.div
              key={`transition-${currentCategory.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-serif text-[#4A7C59]">{currentCategory.title}</h2>
              {currentCategory.description && (
                <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto">{currentCategory.description}</p>
              )}
            </motion.div>
          ) : (
            <QuestionCard
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onOptionClick={handleOptionClick}
              onNext={handleNext}
              isTransitioning={isTransitioning}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
