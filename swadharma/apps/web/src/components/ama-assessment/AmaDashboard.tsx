'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Progress } from '@workspace/ui/components/progress';
import { Badge } from '@workspace/ui/components/badge';
import { Separator } from '@workspace/ui/components/separator';
import { Button } from '@workspace/ui/components/button';
import { useAmaStore } from '../../lib/ama-assessment/engine';
import { AmaAssessment } from './AmaAssessment';

export function AmaDashboard() {
  const [mounted, setMounted] = useState(false);
  const { metrics, lastUpdated, resetAssessment } = useAmaStore();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Niraama': return 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/20';
      case 'Alpa-Saama': return 'bg-[#E8973A]/10 text-[#E8973A] border-[#E8973A]/20';
      case 'Saama': return 'bg-[#E8A838]/10 text-[#E8A838] border-[#E8A838]/20';
      case 'Maha-Saama': return 'bg-[#1B3A6B]/10 text-[#1B3A6B] border-[#1B3A6B]/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 bg-[#FAF9F7] min-h-screen">
      <AmaAssessment />

      {lastUpdated && (
        <Card className="bg-white border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#222222] flex justify-between items-center">
              <span>Assessment Results</span>
              <Badge variant="outline" className={getStatusColor(metrics.status)}>
                {metrics.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#222222]">Ama Level (Toxin Load)</span>
                <span className="text-sm font-bold text-[#222222]">{metrics.score}/100</span>
              </div>
              <Progress value={metrics.score} className="h-2" />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-[#222222]">Recommendations</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#222222]">
                {metrics.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={resetAssessment}
                className="text-[#1B3A6B] border-[#1B3A6B] hover:bg-[#1B3A6B]/10"
              >
                Reset Assessment
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Last assessed: {new Date(lastUpdated).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
