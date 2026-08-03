'use client';

import React from 'react';
import { useSeasonsStore } from '../stores/seasonsStore';
import type { Season } from '../types/seasons';

export default function SeasonalCalendarWheel() {
  const { currentSeasonId, seasons, setCurrentSeasonId } = useSeasonsStore();

  const handleSeasonClick = (id: string) => {
    setCurrentSeasonId(id);
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'Vata': return 'fill-[#E8973A]'; // Saffron
      case 'Pitta': return 'fill-[#4A7C59]'; // Warm Green
      case 'Kapha': return 'fill-[#8B5A2B]'; // Earthy Brown (using a different earthy tone, or stick to cream)
      default: return 'fill-[#FBF8F2]';
    }
  };

  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
        <circle cx="200" cy="200" r="180" className="fill-[#FBF8F2] stroke-[#4A7C59] stroke-2" />
        
        {seasons.map((season: Season, index: number) => {
          const totalSeasons = seasons.length;
          const anglePerSeason = 360 / totalSeasons;
          const startAngle = index * anglePerSeason - 90; // Start at top
          const endAngle = startAngle + anglePerSeason;
          
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          
          const x1 = 200 + 180 * Math.cos(startRad);
          const y1 = 200 + 180 * Math.sin(startRad);
          const x2 = 200 + 180 * Math.cos(endRad);
          const y2 = 200 + 180 * Math.sin(endRad);

          const isCurrent = currentSeasonId === season.id;
          
          return (
            <g key={season.id} onClick={() => handleSeasonClick(season.id)} className="cursor-pointer transition-transform hover:scale-[1.02] origin-center">
              <path
                d={`M 200 200 L ${x1} ${y1} A 180 180 0 0 1 ${x2} ${y2} Z`}
                className={`stroke-white stroke-2 transition-colors duration-300 ${isCurrent ? getDoshaColor(season.dominantDosha) : 'fill-[#FBF8F2] hover:fill-[#f0ece1]'}`}
              />
              
              {/* Text placement logic */}
              <text
                x={200 + 120 * Math.cos((startRad + endRad) / 2)}
                y={200 + 120 * Math.sin((startRad + endRad) / 2)}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`text-sm font-semibold pointer-events-none ${isCurrent ? 'fill-white' : 'fill-stone-800'}`}
                transform={`rotate(${(startAngle + endAngle) / 2 + 90}, ${200 + 120 * Math.cos((startRad + endRad) / 2)}, ${200 + 120 * Math.sin((startRad + endRad) / 2)})`}
              >
                {season.sanskritName}
              </text>
            </g>
          );
        })}
        
        <circle cx="200" cy="200" r="50" className="fill-white stroke-[#4A7C59] stroke-2" />
        <text x="200" y="205" textAnchor="middle" className="text-[#4A7C59] font-bold text-sm pointer-events-none">
          Ritucharya
        </text>
      </svg>
    </div>
  );
}
