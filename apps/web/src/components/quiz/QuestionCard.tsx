'use client';

import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import type { Question } from '../../types/assessment';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: string | string[];
  onOptionClick: (optionId: string) => void;
  onNext: () => void;
  isTransitioning?: boolean;
}

export function QuestionCard({
  question,
  currentAnswer,
  onOptionClick,
  onNext,
  isTransitioning,
}: QuestionCardProps) {
  const isMultiple = question.type === 'multiple';

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-10 w-full"
    >
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight text-stone-900">
          {question.title}
        </h1>
        {question.subtitle && (
          <p className="text-lg md:text-xl opacity-70 text-stone-700">
            {question.subtitle}
          </p>
        )}
      </div>

      <div className="grid gap-3 pt-4">
        {question.options.map((option, index) => {
          const isSelected = Array.isArray(currentAnswer)
            ? currentAnswer.includes(option.id)
            : currentAnswer === option.id;

          return (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOptionClick(option.id)}
              disabled={isTransitioning}
              className={cn(
                'w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 group flex items-center bg-white/50 backdrop-blur-sm',
                isSelected
                  ? 'border-[#E8973A] bg-[#E8973A]/10 shadow-sm'
                  : 'border-transparent hover:border-[#4A7C59]/30 hover:bg-white/80 shadow-sm'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-medium transition-colors shrink-0',
                  isSelected
                    ? 'bg-[#E8973A] text-white'
                    : 'bg-black/5 text-black/50 group-hover:bg-[#4A7C59]/20 group-hover:text-[#4A7C59]'
                )}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-medium text-stone-900">
                  {option.label}
                </span>
                {option.sublabel && (
                  <span className="text-sm opacity-70 mt-1 text-stone-700">
                    {option.sublabel}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {isMultiple && (
        <div className="flex justify-end pt-4">
          <Button
            onClick={onNext}
            size="lg"
            className="px-8 shadow-lg bg-[#4A7C59] hover:bg-[#3D2B1F] text-[#FBF8F2]"
            disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}
