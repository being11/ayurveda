'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { computeProfile } from '../../engines/report';
import { generateRoutine } from '../../engines/routine';
import { RoutineTimeline } from '../../components/routine/RoutineTimeline';
import { SeasonalAdjustmentCard } from '../../components/routine/SeasonalAdjustmentCard';
import Navigation from '../../components/Navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Activity } from 'lucide-react';

export default function RoutinePage() {
  const router = useRouter();
  const observations = useAssessmentStore((state) => state.observations);
  const answers = useAssessmentStore((state) => state.answers);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Hydration safety

  // Compute profile based on observations
  const profile = computeProfile(observations, answers);
  
  // Generate routine based on dosha profile
  const routineData = generateRoutine(profile.prakrtiDosha);

  return (
    <div className="min-h-screen bg-[#FBF8F2]">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24">
        
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-serif text-stone-900 tracking-tight sm:text-4xl mb-3">
            Your Dinacharya
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            A personalized Ayurvedic daily routine tailored to balance your dominant {routineData.dominantDosha} nature.
          </p>
        </header>

        <SeasonalAdjustmentCard adjustment={routineData.seasonalAdjustment} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <RoutineTimeline routine={routineData.dailyRoutine} />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-stone-200 shadow-sm bg-white sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-stone-800">
                  <Activity className="h-5 w-5 text-[#4A7C59]" />
                  Movement & Breath
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 text-sm uppercase tracking-wider">Recommended Asanas</h4>
                  <ul className="space-y-2">
                    {routineData.yoga.map((asana, idx) => (
                      <li key={idx} className="text-stone-600 text-sm flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#4A7C59] mt-2 shrink-0" />
                        <span>{asana}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 text-sm uppercase tracking-wider">Pranayama</h4>
                  <ul className="space-y-2">
                    {routineData.pranayama.map((pranayama, idx) => (
                      <li key={idx} className="text-stone-600 text-sm flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#E8973A] mt-2 shrink-0" />
                        <span>{pranayama}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
