import React from 'react';
import { motion } from 'framer-motion';

interface QuizTransitionProps {
  categoryId: string;
  title: string;
  description?: string;
}

export function QuizTransition({ categoryId, title, description }: QuizTransitionProps) {
  return (
    <motion.div
      key={`transition-${categoryId}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="text-center space-y-6"
    >
      <h2 className="text-3xl md:text-5xl font-serif text-[#4A7C59]">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto text-gray-600">
          {description}
        </p>
      )}
    </motion.div>
  );
}
