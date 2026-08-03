'use client'

import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { computeProfile } from '../../engines/report';
import { getRasayanaProtocol } from '../../engines/rasayana';
import { OjasScoreCard } from '../../components/rasayana/OjasScoreCard';
import { Leaf, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RasayanaPage() {
  const [mounted, setMounted] = useState(false);
  const { answers, observations } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#FBF8F2]" />;
  }

  // Calculate profile to get Ojas and Vikriti
  const profile = computeProfile(observations, answers);
  const protocol = getRasayanaProtocol(profile.ojas, profile.vikrtiDosha);

  return (
    <div className="min-h-screen bg-[#FBF8F2] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-3 rounded-2xl bg-[#4A7C59]/10 text-[#4A7C59] mb-4"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900">
            Rasayana Rejuvenation
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Ayurvedic therapies and practices designed to rebuild Ojas (vitality), reverse aging, and restore deep physiological reserves based on your current imbalance.
          </p>
        </div>

        {/* Ojas Score Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <OjasScoreCard ojasLevel={profile.ojas} />
        </motion.div>

        {/* Protocol Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100"
        >
          <div className="mb-8 border-b border-stone-100 pb-6">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-stone-400 mb-2">Primary Focus</h2>
            <p className="text-2xl font-serif text-[#4A7C59]">{protocol.primaryFocus}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Herbs */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-stone-800">
                <Leaf className="w-5 h-5 text-[#E8973A]" />
                <h3 className="text-lg font-medium">Recommended Rasayanas</h3>
              </div>
              <ul className="space-y-3">
                {protocol.recommendedHerbs.map((herb, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600">
                    <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                    <span>{herb}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lifestyle */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-stone-800">
                <Sparkles className="w-5 h-5 text-[#E8973A]" />
                <h3 className="text-lg font-medium">Lifestyle Practices</h3>
              </div>
              <ul className="space-y-3">
                {protocol.lifestylePractices.map((practice, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600">
                    <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Diet */}
          <div className="mt-10 pt-8 border-t border-stone-100">
             <h3 className="text-lg font-medium text-stone-800 mb-4">Dietary Rejuvenation</h3>
             <p className="text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
                {protocol.dietaryAdvice}
             </p>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
