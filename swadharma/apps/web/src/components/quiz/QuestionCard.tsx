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


  const isLikertScale = question.options.length === 5 && 
    question.options.every(o => o.label.length < 30);

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

        {isLikertScale ? (
          <div className="pt-8 pb-4">
            <div className="flex justify-between w-full max-w-2xl mx-auto mb-2 text-sm text-gray-500">
              <span>{question.options[0]?.label}</span>
              <span>{question.options[question.options.length - 1]?.label}</span>
            </div>
            <div className="flex justify-between items-center gap-2 w-full max-w-2xl mx-auto">
              {question.options.map((option, index) => {
                const isSelected = Array.isArray(currentAnswer)
                  ? currentAnswer.includes(option.id)
                  : currentAnswer === option.id;

                return (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionClick(option.id)}
                    className={cn(
                      "w-12 h-12 md:w-16 md:h-16 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-lg font-medium",
                      isSelected
                        ? "border-[#4A7C59] bg-[#4A7C59] text-white shadow-md scale-110"
                        : "border-[#4A7C59]/30 hover:border-[#4A7C59]/60 hover:bg-[#4A7C59]/10 text-gray-700 bg-white"
                    )}
                    aria-label={option.label}
                    title={option.label}
                  >
                    {index + 1}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ) : (
        <div className="grid gap-3 pt-4">
          {question.type === 'single' && question.options.length === 5 && question.options[0]?.label.includes('Disagree') ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-transparent">
              <span className="text-sm font-medium text-stone-500 hidden md:block w-24 text-right">Strongly Disagree</span>
              <div className="flex w-full justify-between items-center md:w-auto md:gap-8">
                {question.options.map((option, index) => {
                  const isSelected = currentAnswer === option.id;
                  // Sizes: 0,4 are largest (strong), 2 is smallest (neutral), 1,3 are medium
                  const sizeClass = index === 2 ? 'w-8 h-8' : index === 1 || index === 3 ? 'w-10 h-10' : 'w-12 h-12';
                  return (
                    <div key={option.id} className="flex flex-col items-center gap-2">
                       <button
                         onClick={() => handleOptionClick(option.id)}
                         className={cn(
                           "rounded-full transition-all duration-200 border-2",
                           sizeClass,
                           isSelected 
                             ? "bg-[#4A7C59] border-[#4A7C59] scale-110 shadow-md"
                             : "bg-[#FBF8F2] border-stone-300 hover:border-[#4A7C59]/50 hover:bg-[#4A7C59]/10"
                         )}
                         aria-label={option.label}
                       />
                       <span className="text-xs text-stone-500 md:hidden w-16 text-center leading-tight">
                         {option.label}
                       </span>
                    </div>
                  );
                })}
              </div>
              <span className="text-sm font-medium text-stone-500 hidden md:block w-24">Strongly Agree</span>
            </div>
          ) : (
             question.options.map((option, index) => {
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
          })
          )}
        </div>
        )}
        
        {question.type === 'multiple' && (
             <div className="text-sm text-stone-500 mt-4 text-center md:text-left">
                Select all that apply. Press continue when ready.
             </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

}

