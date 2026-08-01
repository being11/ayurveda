'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { categories } from '@/src/data/index';
import { Button } from '@/src/components/ui/button';
import { Progress } from '@/src/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export default function AssessmentEngine() {
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
    history
  } = useAssessmentStore();

  const prevCategoryIndexRef = useRef(currentCategoryIndex);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && currentCategoryIndex !== prevCategoryIndexRef.current && currentCategoryIndex > prevCategoryIndexRef.current) {
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
  const currentQuestion = currentCategory?.questions.find(q => q.id === currentQuestionId);
  const currentAnswer = currentQuestionId ? answers[currentQuestionId] : undefined;

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    nextQuestion();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // Allow time for animation state to clear if needed, though mostly handled by layout
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    prevQuestion();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const handleOptionClick = (optionId: string) => {
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
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      setAnswer(currentQuestion.id, newAnswer);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion || showTransition || isComplete) return;

      // Don't intercept if user is typing in an input (not applicable here but good practice)
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
    return (
      <div className="flex flex-col min-h-screen bg-[oklch(0.97_0.02_80)]" />
    );
  }

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[oklch(0.97_0.02_80)] text-[oklch(0.15_0.01_60)] p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <CheckCircle2 className="w-20 h-20 mx-auto text-primary" strokeWidth={1.5} />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif">Assessment Complete</h2>
            <p className="text-lg opacity-80">
              Your answers have been thoughtfully woven together. Let's explore your unique constitution.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push('/report')}>
              Generate My Report <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={handlePrev}>
              Review Answers
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion || !currentCategory) return <div className="min-h-screen bg-[oklch(0.97_0.02_80)]" />;

  // Calculate remaining questions to estimate time
  // This is a rough estimation since we don't know the exact path due to conditions,
  // but we can sum up the remaining questions in current category + all questions in subsequent categories.
  const currentIndexInCategory = currentCategory.questions.findIndex(q => q.id === currentQuestionId);
  const remainingInCurrentCategory = Math.max(0, currentCategory.questions.length - currentIndexInCategory - 1);
  let totalRemaining = remainingInCurrentCategory;
  for (let i = currentCategoryIndex + 1; i < categories.length; i++) {
    const category = categories[i];
    if (category && category.questions) {
      totalRemaining += category.questions.length;
    }
  }
  const estimatedTimeMins = Math.ceil((totalRemaining * 8) / 60);

  const progressPercentage = ((currentCategoryIndex) / categories.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-[oklch(0.97_0.02_80)] text-[oklch(0.15_0.01_60)]">

      {/* Header */}
      <header className="w-full px-4 py-6 md:px-8 max-w-4xl mx-auto flex flex-col gap-4 z-10">
        <div className="flex justify-between items-center text-sm font-medium tracking-wide uppercase opacity-70">
          <button
            onClick={handlePrev}
            disabled={history.length === 0}
            className={cn(
              "flex items-center hover:text-primary transition-colors",
              history.length === 0 ? "opacity-0 pointer-events-none" : ""
            )}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>

          <div className="flex items-center gap-4">
             <span className="hidden sm:inline-block">~{estimatedTimeMins} min remaining</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-primary">
            <span>{currentCategory.title}</span>
            <span>{currentCategoryIndex + 1} / {categories.length}</span>
          </div>
          <Progress value={progressPercentage} className="h-[3px] bg-primary/20" />
        </div>
      </header>

      {/* Main Content Area */}
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
              <h2 className="text-3xl md:text-5xl font-serif text-primary">
                {currentCategory.title}
              </h2>
              {currentCategory.description && (
                <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto">
                  {currentCategory.description}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-10 w-full"
            >
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight">
                  {currentQuestion.title}
                </h1>
                {currentQuestion.subtitle && (
                  <p className="text-lg md:text-xl opacity-70">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              <div className="grid gap-3 pt-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = Array.isArray(currentAnswer)
                    ? currentAnswer.includes(option.id)
                    : currentAnswer === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick(option.id)}
                      className={cn(
                        "w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 group flex items-center bg-white/50 backdrop-blur-sm",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-transparent hover:border-primary/30 hover:bg-white/80 shadow-sm"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-medium transition-colors shrink-0",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-black/5 text-black/50 group-hover:bg-primary/20 group-hover:text-primary"
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg md:text-xl font-medium">{option.label}</span>
                        {option.sublabel && (
                          <span className="text-sm opacity-70 mt-1">{option.sublabel}</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer for Multiple Choice */}
      {!showTransition && currentQuestion.type === 'multiple' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[oklch(0.97_0.02_80)] via-[oklch(0.97_0.02_80)] to-transparent flex justify-center z-20 pointer-events-none"
        >
          <div className="max-w-3xl w-full flex justify-end pointer-events-auto">
            <Button
              onClick={handleNext}
              size="lg"
              className="px-8 shadow-lg"
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
