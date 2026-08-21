'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/src/components/ui/card';
import { Progress } from '@/src/components/ui/progress';
import { useHabitStore, HABITS } from '../../lib/habits/engine';
import { CheckCircle2, Circle } from 'lucide-react';

export function HabitTracker() {
  const [mounted, setMounted] = useState(false);
  const { dailyLogs, toggleHabit, getConsistencyScore, getHeatmapData } = useHabitStore();
  const todayStr = new Date().toISOString().split('T')[0] || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[400px]" />;

  const todayLogs = dailyLogs[todayStr] || {};
  const currentScore = getConsistencyScore(todayStr);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 29);
  const heatmap = getHeatmapData(startDate, 30);

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-12 px-4">
       <div className="text-center space-y-4">
          <h1 className="text-3xl font-serif text-[#1B3A6B]">Daily Dinacharya Adherence</h1>
          <p className="text-stone-600">Track your daily Ayurvedic habits to build long-term consistency and Ojas.</p>
       </div>

       <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 bg-white shadow-sm border-slate-200">
             <CardHeader>
               <CardTitle className="text-xl font-serif text-[#E8A838]">Today's Habits</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="space-y-4">
                   {HABITS.map(habit => {
                      const isChecked = !!todayLogs[habit.id];
                      return (
                         <button
                            key={habit.id}
                            onClick={() => toggleHabit(todayStr, habit.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                               isChecked ? 'border-[#4A7C59] bg-[#4A7C59]/5' : 'border-slate-100 hover:border-[#1B3A6B]/30'
                            }`}
                         >
                            <span className={`text-sm md:text-base font-medium ${isChecked ? 'text-stone-900' : 'text-stone-600'}`}>
                               {habit.name}
                            </span>
                            {isChecked ? (
                               <CheckCircle2 className="w-6 h-6 text-[#4A7C59]" />
                            ) : (
                               <Circle className="w-6 h-6 text-slate-300" />
                            )}
                         </button>
                      );
                   })}
                </div>
             </CardContent>
          </Card>

          <div className="space-y-8">
             <Card className="bg-white shadow-sm border-slate-200">
               <CardHeader>
                 <CardTitle className="text-lg font-serif text-[#1B3A6B]">Daily Score</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4 text-center">
                  <div className="text-5xl font-bold text-[#E8A838]">{Math.round(currentScore)}%</div>
                  <Progress value={currentScore} className="h-2 bg-stone-100" />
                  <p className="text-xs text-stone-500">Based on weighted importance of Na Vegān Dhāranīya principles.</p>
               </CardContent>
             </Card>

             <Card className="bg-white shadow-sm border-slate-200">
               <CardHeader>
                 <CardTitle className="text-lg font-serif text-[#1B3A6B]">30-Day Consistency</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="grid grid-cols-6 gap-2">
                     {heatmap.map((day, idx) => (
                        <div
                           key={idx}
                           className="w-full aspect-square rounded-sm"
                           style={{
                              backgroundColor: day.score === 0 ? '#f1f5f9' : `rgba(74, 124, 89, ${Math.max(0.2, day.score / 100)})`
                           }}
                           title={`${day.date}: ${Math.round(day.score)}%`}
                        />
                     ))}
                  </div>
               </CardContent>
             </Card>
          </div>
       </div>
    </div>
  );
}
