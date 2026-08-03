'use client';

import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface QuizProgressProps {
  progressPercentage: number;
  categoryTitle: string;
  currentIndex: number;
  totalCategories: number;
  estimatedTimeMins: number;
}

export function QuizProgress({
  progressPercentage,
  categoryTitle,
  currentIndex,
  totalCategories,
  estimatedTimeMins,
}: QuizProgressProps) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center text-sm font-medium tracking-wide uppercase opacity-70">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block">~{estimatedTimeMins} min remaining</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-[#4A7C59]">
          <span>{categoryTitle}</span>
          <span>
            {currentIndex + 1} / {totalCategories}
          </span>
        </div>
        <div className="h-[3px] bg-[#4A7C59]/20 rounded-full overflow-hidden w-full relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute top-0 left-0 h-full bg-[#4A7C59]"
          />
        </div>
      </div>
    </div>
  );
}
