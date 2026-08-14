'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@workspace/ui/components/select';
import { useAmaStore } from '../../lib/ama-assessment/engine';
import { AmaSymptoms } from '../../types/ama-assessment';

export function AmaAssessment() {
  const [mounted, setMounted] = useState(false);
  const { symptoms, setSymptoms, calculateMetrics } = useAmaStore();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const handleSymptomChange = (key: keyof AmaSymptoms, value: string) => {
    setSymptoms({ [key]: value } as Partial<AmaSymptoms>);
  };

  const handleCalculate = () => {
    calculateMetrics();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-[#222222]">Ama (Metabolic Toxin) Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Tongue Coating</label>
            <Select value={symptoms.tongueCoating} onValueChange={(v) => handleSymptomChange('tongueCoating', v)}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Clear)</SelectItem>
                <SelectItem value="thin">Thin White</SelectItem>
                <SelectItem value="thick">Thick White</SelectItem>
                <SelectItem value="yellowish">Yellowish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Heaviness in Body</label>
            <Select value={symptoms.heaviness} onValueChange={(v) => handleSymptomChange('heaviness', v)}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Foul Odor (Breath/Sweat)</label>
            <Select value={symptoms.foulOdor} onValueChange={(v) => handleSymptomChange('foulOdor', v)}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Sluggishness</label>
            <Select value={symptoms.sluggishness} onValueChange={(v) => handleSymptomChange('sluggishness', v)}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Lethargy</label>
            <Select value={symptoms.lethargy} onValueChange={(v) => handleSymptomChange('lethargy', v)}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Indigestion</label>
            <Select value={symptoms.indigestion} onValueChange={(v) => handleSymptomChange('indigestion', v)}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleCalculate}
          className="w-full bg-[#1B3A6B] hover:bg-[#1B3A6B]/90 text-white"
        >
          Assess Ama Level
        </Button>
      </CardContent>
    </Card>
  );
}
