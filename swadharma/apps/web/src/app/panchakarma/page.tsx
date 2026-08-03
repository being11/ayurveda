'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { getPurvakarmaChecklist } from '../../engines/panchakarma';
import { PanchakarmaCard } from '../../components/panchakarma/PanchakarmaCard';
import { PurvakarmaChecklist } from '../../components/panchakarma/PurvakarmaChecklist';
import { Button } from '../../components/ui/button';

export default function PanchakarmaPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  const isComplete = useAssessmentStore(state => state.isComplete);
  const getRecommendedPanchakarma = useAssessmentStore(state => state.getRecommendedPanchakarma);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-stone-500">Loading Panchakarma plan...</div>
      </div>
    );
  }

  // Redirect if assessment is not complete or no data exists
  if (!isComplete) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm text-center">
          <h2 className="text-2xl font-serif text-[#4A7C59] mb-4">Assessment Required</h2>
          <p className="text-stone-600 mb-6">
            Please complete your Ayurvedic assessment to receive personalized Panchakarma recommendations.
          </p>
          <Button 
            onClick={() => router.push('/')}
            className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white"
          >
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  const recommendedTherapies = getRecommendedPanchakarma();
  const purvakarmaTasks = getPurvakarmaChecklist();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A7C59]">
            Your Panchakarma Plan
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Based on your dominant dosha profile, we have recommended the following 
            deep cleansing therapies to restore your natural balance.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Main Therapies Section */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl font-serif text-stone-800 border-b border-stone-200 pb-2">
              Recommended Therapies
            </h2>
            {recommendedTherapies.length > 0 ? (
              <div className="space-y-6">
                {recommendedTherapies.map(therapy => (
                  <PanchakarmaCard key={therapy.id} therapy={therapy} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border border-stone-200 text-stone-600">
                No specific Panchakarma therapies recommended based on your current profile. 
                Consult with a Vaidya for personalized guidance.
              </div>
            )}
          </div>

          {/* Purvakarma Sidebar */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-2xl font-serif text-stone-800 border-b border-stone-200 pb-2">
              Preparation
            </h2>
            <p className="text-stone-600 text-sm">
              Before undergoing any main therapy (Pradhana Karma), the body must be prepared 
              to release deep-seated toxins. Complete these preparation steps:
            </p>
            <PurvakarmaChecklist tasks={purvakarmaTasks} />
          </div>

        </div>

      </div>
    </div>
  );
}
