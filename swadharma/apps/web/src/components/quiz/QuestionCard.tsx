import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import type { Question } from '../../types/assessment';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: string | string[];
  onAnswer?: (optionId: string) => void;
  onOptionClick?: (optionId: string) => void;
}

export function QuestionCard({ question, currentAnswer = '', onAnswer, onOptionClick }: QuestionCardProps) {
  const handleOptionClick = (optionId: string) => {
    if (onOptionClick) onOptionClick(optionId);
    if (onAnswer) onAnswer(optionId);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto space-y-8"
      >
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight text-gray-900">
            {question.title}
          </h1>
          {question.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 opacity-80">
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
                onClick={() => handleOptionClick(option.id)}
                className={cn(
                  "w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 group flex items-center bg-white/50 backdrop-blur-sm",
                  isSelected
                    ? "border-[#4A7C59] bg-[#4A7C59]/10 shadow-sm"
                    : "border-transparent hover:border-[#4A7C59]/30 hover:bg-white/80 shadow-sm"
                )}
                style={!isSelected ? { backgroundColor: '#FBF8F2' } : {}}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-medium transition-colors shrink-0",
                  isSelected
                    ? "bg-[#4A7C59] text-white"
                    : "bg-black/5 text-black/50 group-hover:bg-[#4A7C59]/20 group-hover:text-[#4A7C59]"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-medium text-gray-800">{option.label}</span>
                  {option.sublabel && (
                    <span className="text-sm text-gray-500 mt-1">{option.sublabel}</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {question.type === 'multiple' && (
             <div className="text-sm text-stone-500 mt-4 text-center md:text-left">
                Select all that apply. Press continue when ready.
             </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
