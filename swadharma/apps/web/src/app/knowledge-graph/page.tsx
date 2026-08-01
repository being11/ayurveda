'use client';

import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { categories } from '@/src/data/questions';
import { knowledgeGraph } from '@/src/data/knowledge';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function KnowledgeGraphPage() {
  const [mounted, setMounted] = useState(false);
  const { answers } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allQuestions = categories.flatMap(cat => cat.questions);
  const observations = calculateObservations(allQuestions, answers);

  const matchedKnowledge = knowledgeGraph.filter(node =>
    Object.keys(observations).some(obs => obs.includes(node.observation))
  );

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-stone-900">Knowledge Graph</h1>
          <p className="text-lg text-stone-600 font-serif italic">
            Connecting your assessment to classical Ayurvedic sources.
          </p>
        </div>

        {matchedKnowledge.length > 0 ? (
          <div className="grid gap-6">
            {matchedKnowledge.map((node, index) => (
              <Card key={index} className="border-stone-200">
                <CardHeader className="pb-2 flex flex-row items-center gap-3">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <CardTitle className="text-lg">{node.observation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-700 font-medium mb-1">Source: {node.classicalSource}</p>
                  <p className="text-stone-600">{node.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-xl border border-stone-200 shadow-sm">
            <p className="text-stone-600 text-lg">
              Complete the assessment to see classical source mappings based on your observations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
