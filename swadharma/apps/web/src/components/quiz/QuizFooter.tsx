import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/src/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface QuizFooterProps {
  show: boolean;
  onNext: () => void;
  disabled: boolean;
}

export function QuizFooter({ show, onNext, disabled }: QuizFooterProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent flex justify-center z-20 pointer-events-none"
    >
      <div className="max-w-3xl w-full flex justify-end pointer-events-auto">
        <Button
          onClick={onNext}
          size="lg"
          className="px-8 shadow-lg bg-[#4A7C59] hover:bg-[#4A7C59]/90 text-white"
          disabled={disabled}
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
