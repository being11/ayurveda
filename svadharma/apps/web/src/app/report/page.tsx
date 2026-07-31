'use client';

import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { categories } from '@/src/data/questions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RefreshCcw, Download, Activity, Moon, Shield, Sparkles } from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { answers, isComplete } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isComplete && Object.keys(answers).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl mb-4">No assessment data found.</h2>
        <Button onClick={() => router.push('/')}>Start Assessment</Button>
      </div>
    );
  }

  const allQuestions = categories.flatMap(cat => cat.questions);
  const observations = calculateObservations(allQuestions, answers);

  const sortedObservations = Object.entries(observations)
    .sort(([, weightA], [, weightB]) => weightB - weightA);

  const resetAssessment = () => {
    useAssessmentStore.persist.clearStorage();
    window.location.href = '/';
  };

  // Helper for matrix view grouping
  const isAgni = (obs: string) => obs.toLowerCase().includes('agni') || obs.toLowerCase().includes('metabolism');
  const isNidra = (obs: string) => obs.toLowerCase().includes('nidra') || obs.toLowerCase().includes('sleep');
  const isFrame = (obs: string) => obs.toLowerCase().includes('frame') || obs.toLowerCase().includes('structure');

  const getIcon = (obs: string) => {
    if (isAgni(obs)) return <Activity className="w-5 h-5 text-orange-500" />;
    if (isNidra(obs)) return <Moon className="w-5 h-5 text-indigo-500" />;
    if (isFrame(obs)) return <Shield className="w-5 h-5 text-stone-500" />;
    return <Sparkles className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight">
            Your SwaDharma Matrix
          </h1>
          <p className="text-lg md:text-xl text-stone-600 font-serif italic max-w-2xl mx-auto">
            A dimensional view of your unique physiological and mental tendencies.
          </p>
        </div>

        {/* Matrix View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedObservations.length > 0 ? (
            sortedObservations.map(([observation, weight], index) => (
              <Card key={index} className="flex flex-col h-full border-stone-200 hover:border-stone-300 transition-colors shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-md">
                    {getIcon(observation)}
                  </div>
                  <CardTitle className="text-lg font-medium leading-tight">
                    {observation}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                       <div
                         className="h-full bg-stone-800"
                         style={{ width: `${Math.min((weight / 6) * 100, 100)}%` }}
                       />
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-500">W:{weight}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-stone-500">
              Not enough data to populate the matrix.
            </div>
          )}
        </div>

        {/* Contextual Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif border-b border-stone-200 pb-2">Agni (Metabolism)</h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              {sortedObservations.some(([obs]) => obs.includes('Vishama')) && "Your digestive fire (Agni) shows variability. Routine, warm, and grounding foods are essential to bring stability to your metabolism."}
              {sortedObservations.some(([obs]) => obs.includes('Tikshna')) && "You have a strong, sharp digestion. You can handle heavier foods but must be careful to avoid excess heat, spice, and skipping meals."}
              {sortedObservations.some(([obs]) => obs.includes('Manda')) && "Your digestion tends to be slow or sluggish. Favor warm, light, and spiced foods to stimulate the metabolism and avoid heavy, cold foods."}
              {sortedObservations.some(([obs]) => obs.includes('Sama')) && "Your digestion appears balanced. Maintain your current healthy habits and eating schedule."}
              {!sortedObservations.some(([obs]) => obs.includes('Vishama') || obs.includes('Tikshna') || obs.includes('Manda') || obs.includes('Sama')) && "More data is needed to fully map your metabolic tendencies."}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif border-b border-stone-200 pb-2">Nidra (Sleep)</h3>
            <p className="text-stone-700 leading-relaxed text-lg">
              {sortedObservations.some(([obs]) => obs.includes('Vata Nidra')) && "Your sleep tends to be light, elusive, or easily disturbed. Grounding evening routines, like oil massage or warm milk, can help anchor the mind."}
              {sortedObservations.some(([obs]) => obs.includes('Pitta Nidra')) && "You may sleep soundly but often wake up highly alert or warm. Ensure your room is cool and avoid intense, highly stimulating activities before bed."}
              {sortedObservations.some(([obs]) => obs.includes('Kapha Nidra')) && "You have a tendency towards deep, heavy sleep and may feel lethargic in the morning. Waking up earlier, ideally before sunrise, can prevent this morning sluggishness."}
              {!sortedObservations.some(([obs]) => obs.includes('Nidra')) && "More data is needed to fully map your sleep patterns."}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-12 border-t border-stone-200">
          <Button variant="outline" onClick={resetAssessment} size="lg" className="px-8 text-base">
            <RefreshCcw className="w-4 h-4 mr-2" /> Retake Assessment
          </Button>
          <Button size="lg" className="px-8 text-base bg-stone-800 hover:bg-stone-700" onClick={() => window.print()}>
            <Download className="w-4 h-4 mr-2" /> Export Matrix
          </Button>
        </div>

      </div>
    </div>
  );
}
