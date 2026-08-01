'use client';

import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { categories } from '@/src/data/index';
import { generateRecommendations } from '@/src/engines/recommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { useEffect, useState } from 'react';
import { Leaf, Apple, Brain, Activity } from 'lucide-react';

export default function RecommendationsPage() {
  const [mounted, setMounted] = useState(false);
  const { answers } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allQuestions = categories.flatMap(cat => cat.questions);
  const observations = calculateObservations(allQuestions, answers);
  const recommendations = generateRecommendations(observations);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Diet': return <Apple className="w-5 h-5 text-red-500" />;
      case 'Lifestyle': return <Leaf className="w-5 h-5 text-green-500" />;
      case 'Mental': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'Exercise': return <Activity className="w-5 h-5 text-orange-500" />;
      default: return <Leaf className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-stone-900">Personalized Recommendations</h1>
          <p className="text-lg text-stone-600 font-serif italic">
            Practical guidance rooted in Ayurvedic principles, tailored to your unique matrix.
          </p>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-stone-200">
                <CardHeader className="pb-2 flex flex-row items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-md">
                    {getIcon(rec.category)}
                  </div>
                  <CardTitle className="text-xl">{rec.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <p className="text-stone-800 text-lg leading-relaxed">{rec.description}</p>
                  <div className="bg-stone-100 p-4 rounded-lg border border-stone-200">
                    <p className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-1">The Ayurvedic Rationale</p>
                    <p className="text-stone-700 italic">{rec.rationale}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-xl border border-stone-200 shadow-sm">
            <p className="text-stone-600 text-lg">
              Complete the assessment to receive personalized recommendations based on your unique tendencies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
