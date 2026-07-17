'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { categories } from '@/src/data/questions';
import { Button } from '@/src/components/ui/button';
import { Progress } from '@/src/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AssessmentEngine() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md space-y-6"
        >
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
          <h2 className="text-3xl font-serif">Assessment Complete</h2>
          <p className="text-muted-foreground">
            Your answers have been thoughtfully collected. Let's explore your unique constitution.
          </p>
          <Button size="lg" className="w-full" onClick={() => router.push('/report')}>
            Generate My Report
          </Button>
        </motion.div>
      </div>
    );
  }

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions.find(q => q.id === currentQuestionId);
  const currentAnswer = currentQuestionId ? answers[currentQuestionId] : undefined;

  const progressPercentage = ((currentCategoryIndex) / categories.length) * 100;

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen max-w-3xl mx-auto px-4 py-8">
      <div className="w-full space-y-4 mb-12">
        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
          <span>{currentCategory?.title}</span>
          <span>Category {currentCategoryIndex + 1} of {categories.length}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />

        {history.length > 0 && (
          <button
            onClick={prevQuestion}
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-medium leading-tight">
                {currentQuestion.title}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-lg text-muted-foreground">
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
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      if (currentQuestion.type === 'single') {
                        setAnswer(currentQuestion.id, option.id);
                        setTimeout(nextQuestion, 400);
                      } else {
                        const current = (currentAnswer as string[]) || [];
                        const newAnswer = current.includes(option.id)
                          ? current.filter(id => id !== option.id)
                          : [...current, option.id];
                        setAnswer(currentQuestion.id, newAnswer);
                      }
                    }}
                    className={`
                      w-full text-left p-6 rounded-xl border-2 transition-all duration-200
                      ${isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-medium
                        ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                      `}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg">{option.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t flex justify-center">
        <div className="max-w-3xl w-full flex justify-end">
          {currentQuestion.type === 'multiple' && (
            <Button onClick={nextQuestion} size="lg" className="px-8">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
