'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAssessmentStore } from '../../stores/assessmentStore';
import { DoshaType } from '../../types/assessment';
import { cn } from '@workspace/ui/lib/utils';

/**
 * NadiDiagramCard Component
 * 
 * Interactive SVG representing the hand and the pulse points.
 * Allows users to select a dosha point on the wrist to view details.
 * Integrates with AssessmentStore to share the selected activeNadiPoint.
 *
 * @returns {JSX.Element | null} The interactive diagram card.
 */
export function NadiDiagramCard() {
  const [mounted, setMounted] = useState(false);
  const activeNadiPoint = useAssessmentStore((state) => state.activeNadiPoint);
  const setActiveNadiPoint = useAssessmentStore((state) => state.setActiveNadiPoint);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const points: { dosha: DoshaType; label: string; cx: string; cy: string; color: string; finger: string }[] = [
    { dosha: 'vata', label: 'Vata', cx: '180', cy: '120', color: 'bg-[#4A7C59]', finger: 'Index' },
    { dosha: 'pitta', label: 'Pitta', cx: '230', cy: '140', color: 'bg-[#E8973A]', finger: 'Middle' },
    { dosha: 'kapha', label: 'Kapha', cx: '280', cy: '170', color: 'bg-[#FBF8F2]', finger: 'Ring' }
  ];

  return (
    <Card className="border-[#4A7C59]/20 shadow-md bg-white">
      <CardHeader className="bg-[#FBF8F2] border-b border-[#4A7C59]/10 rounded-t-lg">
        <CardTitle className="text-[#4A7C59] text-xl text-center">Nadi Pariksha Points</CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-full max-w-sm aspect-square mb-6 border border-stone-200 rounded-lg overflow-hidden bg-stone-50 flex items-center justify-center">
          {/* Abstract Hand Representation */}
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-80">
             {/* Arm / Wrist */}
            <path d="M 120 400 L 250 400 L 280 250 L 150 250 Z" fill="#e5d0ba" />
             {/* Palm */}
            <path d="M 150 250 C 130 180, 280 180, 280 250 Z" fill="#e5d0ba" />
             {/* Fingers Base (Thumb left out for simplicity of radial points) */}
            <path d="M 160 180 C 160 100, 200 100, 200 180 Z" fill="#e5d0ba" />
            <path d="M 210 180 C 210 80, 250 80, 250 180 Z" fill="#e5d0ba" />
            <path d="M 260 180 C 260 110, 290 110, 290 180 Z" fill="#e5d0ba" />
            
            {/* Pulse Points on Wrist (Radial Artery positions) */}
            {points.map((p) => (
              <g key={p.dosha} onClick={() => setActiveNadiPoint(p.dosha)} className="cursor-pointer transition-transform hover:scale-110 origin-center">
                <circle 
                  cx={p.cx} 
                  cy={p.cy} 
                  r="20" 
                  fill={activeNadiPoint === p.dosha ? (p.dosha === 'vata' ? '#4A7C59' : p.dosha === 'pitta' ? '#E8973A' : '#d4cbb3') : '#ffffff'} 
                  stroke={p.dosha === 'vata' ? '#4A7C59' : p.dosha === 'pitta' ? '#E8973A' : '#a39b82'}
                  strokeWidth="4"
                  className="transition-colors duration-300"
                />
                <text 
                  x={p.cx} 
                  y={p.cy} 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  fill={activeNadiPoint === p.dosha ? (p.dosha === 'kapha' ? '#4A7C59' : '#ffffff') : '#333333'}
                  fontSize="12"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {p.dosha.charAt(0).toUpperCase()}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="flex gap-4 justify-center w-full">
          {points.map((p) => (
            <Button
              key={p.dosha}
              variant={activeNadiPoint === p.dosha ? "default" : "outline"}
              onClick={() => setActiveNadiPoint(p.dosha)}
              className={cn(
                "flex-1",
                activeNadiPoint === p.dosha && p.dosha === 'vata' ? "bg-[#4A7C59] hover:bg-[#4A7C59]/90 text-white" : "",
                activeNadiPoint === p.dosha && p.dosha === 'pitta' ? "bg-[#E8973A] hover:bg-[#E8973A]/90 text-white" : "",
                activeNadiPoint === p.dosha && p.dosha === 'kapha' ? "bg-[#FBF8F2] hover:bg-[#FBF8F2]/90 text-[#4A7C59] border-[#4A7C59]" : ""
              )}
            >
              <div className="flex flex-col items-center">
                <span className="font-bold">{p.label}</span>
                <span className="text-[10px] opacity-80">{p.finger}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
