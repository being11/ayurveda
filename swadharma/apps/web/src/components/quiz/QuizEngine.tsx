'use client';

import { AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { categories } from '@/src/data/index';
import { useEffect, useState, useRef, useCallback } from 'react';
import { QuizHeader } from './QuizHeader';
import { QuestionCard } from './QuestionCard';
import { QuizComplete } from './QuizComplete';
import { QuizTransition } from './QuizTransition';
import { QuizFooter } from './QuizFooter';
import { calculateDoshaScores } from '@/src/engines/scoring';
import { useQuizNavigation } from '@/src/hooks/useQuizNavigation';

/**
 * QuizEngine handles the interactive multi-step dosha assessment.
 * It manages the state for navigating through the assessment, computes 
 * progress, calculates live dosha scores for the progress bar, and 
 * orchestrates smooth Framer Motion transitions between question categories.
 */
export function QuizEngine() {
  const [mounted, setMounted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const { currentCategoryIndex, currentQuestionId, answers, setAnswer, nextQuestion, prevQuestion, isComplete, history } = useAssessmentStore();
  const prevCategoryIndexRef = useRef(currentCategoryIndex);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && currentCategoryIndex !== prevCategoryIndexRef.current && currentCategoryIndex > prevCategoryIndexRef.current) {
      setShowTransition(true);
      const timer = setTimeout(() => {
        setShowTransition(false);
        prevCategoryIndexRef.current = currentCategoryIndex;
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      prevCategoryIndexRef.current = currentCategoryIndex;
    }
  }, [currentCategoryIndex, mounted]);

  const currentCategory = categories[currentCategoryIndex];
  const allQuestions = categories.flatMap(cat => cat.questions);
  const currentQuestion = allQuestions.find(q => q.id === currentQuestionId);
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleNext = useCallback(() => {
    if (currentQuestion?.type === 'multiple') {
      nextQuestion();
    }
  }, [currentQuestion, nextQuestion]);

  const handlePrev = useCallback(() => {
    prevQuestion();
  }, [prevQuestion]);

  const handleOptionClick = useCallback((optionId: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === 'single') {
      setAnswer(currentQuestion.id, optionId);
    } else {
      const current = (currentAnswer as string[]) || [];
      const newAnswer = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      setAnswer(currentQuestion.id, newAnswer);
    }
  }, [currentQuestion, currentAnswer, setAnswer]);

  useQuizNavigation({
    currentQuestion,
    currentAnswer,
    historyLength: history.length,
    showTransition,
    isComplete,
    handlePrev,
    handleNext,
    handleOptionClick
  });

  if (!mounted) {
    return <div className="min-h-screen bg-[#FBF8F2]" />;
  }

  if (isComplete) {
    return <QuizComplete onReview={handlePrev} />
  }

  if (!currentQuestion || !currentCategory) return <div className="min-h-screen bg-[#FBF8F2]" />;

  const currentIndex = currentCategory.questions.findIndex(q => q.id === currentQuestionId);
  const remaining = Math.max(0, currentCategory.questions.length - currentIndex - 1) + 
    categories.slice(currentCategoryIndex + 1).reduce((acc, cat) => acc + (cat.questions?.length || 0), 0);
  const estimatedTimeMins = Math.ceil((remaining * 8) / 60);
  const progressPercentage = (currentCategoryIndex / categories.length) * 100;
  
  const liveScores = calculateDoshaScores(categories, answers);
  const combinedLiveScores = {
    vata: (liveScores.prakriti.vata + liveScores.vikriti.vata) / 2 || 0,
    pitta: (liveScores.prakriti.pitta + liveScores.vikriti.pitta) / 2 || 0,
    kapha: (liveScores.prakriti.kapha + liveScores.vikriti.kapha) / 2 || 0,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full px-4 py-6 md:px-8 max-w-4xl mx-auto flex flex-col gap-4 z-10 sticky top-0 bg-white/80 backdrop-blur-md">
         <QuizProgress
            currentStep={currentCategoryIndex + 1}
            totalSteps={categories.length}
            progressPercentage={progressPercentage}
            categoryTitle={currentCategory.title}
            currentCategoryIndex={currentCategoryIndex}
            totalCategories={categories.length}
            estimatedTimeMins={estimatedTimeMins}
            onBack={handlePrev}
            canGoBack={history.length > 0}
            vataScore={combinedLiveScores.vata}
            pittaScore={combinedLiveScores.pitta}
            kaphaScore={combinedLiveScores.kapha}
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
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-serif text-[#4A7C59]">
                {currentCategory.title}
              </h2>
              {currentCategory.description && (
                <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto text-gray-600">
                  {currentCategory.description}
                </p>
              )}
            </motion.div>
          ) : (
            <QuestionCard
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onOptionClick={handleOptionClick}
            />
          )}
        </AnimatePresence>
      </main>

      <QuizFooter
        show={!showTransition && currentQuestion.type === 'multiple'}
        onNext={handleNext}
        disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
      />
    </div>
  );
}

export default QuizEngine;

// Included QuizEngine in diff