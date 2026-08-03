import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';
import { AyurvedaProfile } from '../../types/assessment';
import { getDominantDosha } from '../../engines/report';

interface AssessmentCompleteProps {
  profile: AyurvedaProfile;
  onReview: () => void;
}

export function AssessmentComplete({ profile, onReview }: AssessmentCompleteProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF8F2] p-4 text-center text-[#3D2B1F]">
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
          <div className="w-20 h-20 mx-auto rounded-full bg-[#4A7C59]/10 flex items-center justify-center text-[#4A7C59]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
        </motion.div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-serif">Assessment Complete</h2>
          
          <div className="py-4 space-y-2">
            <p className="font-semibold text-xl">Your Innate Constitution (Prakriti)</p>
            <p className="text-[#E8973A] text-lg font-medium">{getDominantDosha(profile.prakrtiDosha)} Predominant</p>
            
            <div className="flex justify-center gap-4 text-sm mt-2 opacity-80">
               <span>Vata: {Math.round(profile.prakrtiDosha.vata * 100)}%</span>
               <span>Pitta: {Math.round(profile.prakrtiDosha.pitta * 100)}%</span>
               <span>Kapha: {Math.round(profile.prakrtiDosha.kapha * 100)}%</span>
            </div>
          </div>
          
           <div className="py-4 space-y-2 border-t border-[#3D2B1F]/10">
            <p className="font-semibold text-xl">Your Current State (Vikriti)</p>
            <p className="text-[#4A7C59] text-lg font-medium">{getDominantDosha(profile.vikrtiDosha)} Predominant</p>
            
            <div className="flex justify-center gap-4 text-sm mt-2 opacity-80">
               <span>Vata: {Math.round(profile.vikrtiDosha.vata * 100)}%</span>
               <span>Pitta: {Math.round(profile.vikrtiDosha.pitta * 100)}%</span>
               <span>Kapha: {Math.round(profile.vikrtiDosha.kapha * 100)}%</span>
            </div>
          </div>

          <p className="text-lg opacity-80 pt-4">
            Your answers have been thoughtfully woven together. Let's explore your full report.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="w-full sm:w-auto bg-[#4A7C59] hover:bg-[#4A7C59]/90 text-white" onClick={() => router.push('/report')}>
            View Full Report
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59]/10" onClick={onReview}>
            Review Answers
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
