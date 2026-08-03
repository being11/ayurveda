import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DoshaProfile } from '../../types/assessment';
import { detectDoshaDominance } from '../../engines/scoring';

interface QuizResultsProps {
  prakriti: DoshaProfile;
  vikriti: DoshaProfile;
  onRetake: () => void;
}

export function QuizResults({ prakriti, vikriti, onRetake }: QuizResultsProps) {
  const router = useRouter();
  const prakritiDominance = detectDoshaDominance(prakriti);
  const vikritiDominance = detectDoshaDominance(vikriti);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF8F2] p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle2 className="w-20 h-20 mx-auto" style={{ color: '#4A7C59' }} strokeWidth={1.5} />
        </motion.div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-serif text-gray-900">Dosha Assessment Complete</h2>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8973A]/20 mt-8 space-y-6 text-left">
             <div>
                <h3 className="text-lg font-medium text-[#4A7C59]">Your Prakriti (Birth Constitution)</h3>
                <p className="text-2xl font-serif mt-1">{prakritiDominance}</p>
                <div className="flex gap-4 text-sm mt-2">
                   <span>Vata: {prakriti.vata}%</span>
                   <span>Pitta: {prakriti.pitta}%</span>
                   <span>Kapha: {prakriti.kapha}%</span>
                </div>
             </div>
             
             <div className="h-px w-full bg-gray-100"></div>
             
             <div>
                <h3 className="text-lg font-medium text-[#E8973A]">Your Vikriti (Current State)</h3>
                <p className="text-2xl font-serif mt-1">{vikritiDominance}</p>
                <div className="flex gap-4 text-sm mt-2">
                   <span>Vata: {vikriti.vata}%</span>
                   <span>Pitta: {vikriti.pitta}%</span>
                   <span>Kapha: {vikriti.kapha}%</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button size="lg" className="w-full sm:w-auto bg-[#4A7C59] hover:bg-[#4A7C59]/90 text-white" onClick={() => router.push('/report')}>
            View Full Report <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto border-[#4A7C59] text-[#4A7C59]" onClick={onRetake}>
            Retake Quiz
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
