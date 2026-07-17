'use client';

import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { categories } from '@/src/data/questions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RefreshCcw, Download } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Your Svadharma Profile
          </h1>
          <p className="text-lg text-stone-600 font-serif italic max-w-2xl mx-auto">
            This is a synthesis of your tendencies, strengths, and vulnerabilities based on Ayurvedic principles, not a rigid diagnostic label.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Dominant Observations</CardTitle>
              <CardDescription>The strongest patterns identified in your assessment.</CardDescription>
            </CardHeader>
            <CardContent>
              {sortedObservations.length > 0 ? (
                <ul className="space-y-3">
                  {sortedObservations.map(([observation, weight]) => (
                    <li key={observation} className="flex justify-between items-center p-3 bg-stone-100 rounded-lg">
                      <span className="font-medium text-stone-800">{observation}</span>
                      <span className="text-sm px-2 py-1 bg-stone-200 text-stone-700 rounded-full">
                        Weight: {weight}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-stone-500">Not enough data to form observations.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Agni (Digestion & Metabolism)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-stone-700">
              <p>
                Based on your answers, your digestive fire (Agni) shows specific tendencies.
                {sortedObservations.some(([obs]) => obs.includes('Vishama')) && " Variable digestion suggests a need for routine and warm, grounding foods."}
                {sortedObservations.some(([obs]) => obs.includes('Tikshna')) && " Strong, sharp digestion means you can handle heavier foods but must avoid excess heat and spice."}
                {sortedObservations.some(([obs]) => obs.includes('Manda')) && " Slower digestion suggests favoring warm, light, and spiced foods to stimulate the metabolism."}
                {sortedObservations.some(([obs]) => obs.includes('Sama')) && " Your digestion appears balanced. Maintain your current healthy habits."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Nidra (Sleep Patterns)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-stone-700">
              <p>
                Sleep is a pillar of health in Ayurveda.
                {sortedObservations.some(([obs]) => obs.includes('Vata Nidra')) && " Your sleep tends to be light or easily disturbed. Grounding evening routines, like oil massage, can help."}
                {sortedObservations.some(([obs]) => obs.includes('Pitta Nidra')) && " You may sleep soundly but wake up alert. Ensure your room is cool and avoid intense activities before bed."}
                {sortedObservations.some(([obs]) => obs.includes('Kapha Nidra')) && " You tend towards deep, heavy sleep. Waking up earlier, before sunrise, can prevent morning lethargy."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 pt-12 border-t border-stone-200">
          <Button variant="outline" onClick={resetAssessment} className="w-full sm:w-auto">
            <RefreshCcw className="w-4 h-4 mr-2" /> Retake Assessment
          </Button>
          <Button className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700" onClick={() => window.print()}>
            <Download className="w-4 h-4 mr-2" /> Export to PDF
          </Button>
        </div>

      </div>
    </div>
  );
}
