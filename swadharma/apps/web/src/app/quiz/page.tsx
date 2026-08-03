'use client'

import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { categories } from '../../data/index';
import { calculateQuizScores } from '../../engines/scoring';
import { QuizProgress } from '../../components/quiz/QuizProgress';
import { QuestionCard } from '../../components/quiz/QuestionCard';
import { QuizResults } from '../../components/quiz/QuizResults';
import { Button } from '../../components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';

/**
 * Main Dosha Quiz Page Component
 * Handles the interactive multi-step dosha assessment flow.
 */
export default function QuizPage() {
  const [mounted, setMounted] = useState(false);
  
  const {
    currentCategoryIndex,
    currentQuestionId,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    history,
    isComplete,
    reset
  } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#FBF8F2]" />;
  }

  if (isComplete) {
    const finalScores = calculateQuizScores(answers);
    return (
      <QuizResults 
        prakriti={finalScores.prakriti} 
        vikriti={finalScores.vikriti} 
        onRetake={() => reset()} 
      />
    );
  }

  const currentCategory = categories[currentCategoryIndex];
  const allQuestions = categories.flatMap(c => c.questions);
  const currentQuestion = allQuestions.find(q => q.id === currentQuestionId);
  const currentAnswer = currentQuestion ? (answers[currentQuestion.id] || (currentQuestion.type === 'multiple' ? [] : '')) : '';

  if (!currentQuestion || !currentCategory) return <div className="min-h-screen bg-[#FBF8F2]" />;

  // Calculate live scores for progress bar
  const liveScores = calculateQuizScores(answers);
  const combinedLiveScores = {
    vata: (liveScores.prakriti.vata + liveScores.vikriti.vata) / 2 || 0,
    pitta: (liveScores.prakriti.pitta + liveScores.vikriti.pitta) / 2 || 0,
    kapha: (liveScores.prakriti.kapha + liveScores.vikriti.kapha) / 2 || 0,
  };

  const handleAnswer = (optionId: string) => {
    if (currentQuestion.type === 'single') {
      setAnswer(currentQuestion.id, optionId);
    } else {
      const current = (currentAnswer as string[]) || [];
      const newAnswer = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      setAnswer(currentQuestion.id, newAnswer);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-4 py-6 md:px-8 max-w-4xl mx-auto flex flex-col gap-4 z-10 sticky top-0 bg-white/80 backdrop-blur-md">
        <div className="flex justify-between items-center text-sm font-medium tracking-wide">
          <button
            onClick={prevQuestion}
            disabled={history.length === 0}
            className={cn(
              "flex items-center hover:text-[#4A7C59] transition-colors text-gray-500",
              history.length === 0 ? "opacity-0 pointer-events-none" : ""
            )}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
        </div>
        
        <QuizProgress 
            currentStep={currentCategoryIndex + 1}
            totalSteps={categories.length}
            categoryTitle={currentCategory.title}
            vataScore={combinedLiveScores.vata}
            pittaScore={combinedLiveScores.pitta}
            kaphaScore={combinedLiveScores.kapha}
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 pb-32 pt-8">
         {/* QuestionCard component for Likert scale or multiple choice options */}
         <QuestionCard 
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
         />
      </main>

      {/* Footer for Multiple Choice */}
      {currentQuestion.type === 'multiple' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent flex justify-center z-20 pointer-events-none"
        >
          <div className="max-w-3xl w-full flex justify-end pointer-events-auto">
            <Button
              onClick={() => nextQuestion()}
              size="lg"
              className="px-8 shadow-lg bg-[#4A7C59] hover:bg-[#4A7C59]/90 text-white"
              disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}


// Add quiz page to commit diff
// Included quiz page in diff