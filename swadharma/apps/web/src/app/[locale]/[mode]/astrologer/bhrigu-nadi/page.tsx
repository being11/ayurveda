'use client';

import React, { useState } from 'react';
import { NadiTransitMatrix } from '@/src/components/astrologer/bhrigu-nadi/NadiTransitMatrix';
import { JeevaKarmaAlertCard } from '@/src/components/astrologer/bhrigu-nadi/JeevaKarmaAlertCard';
import { calculateTransitAlerts, PlanetPosition } from '@/src/engines/astrologer/bhrigu-nadi';

// Mock data for demonstration purposes
const MOCK_NATAL_PLANETS: PlanetPosition[] = [
  { planet: 'Sun', sign: 1, degree: 15 },
  { planet: 'Moon', sign: 5, degree: 10 },
  { planet: 'Mars', sign: 9, degree: 5 },
  { planet: 'Mercury', sign: 2, degree: 20 },
  { planet: 'Jupiter', sign: 7, degree: 25 },
  { planet: 'Venus', sign: 12, degree: 30 },
  { planet: 'Saturn', sign: 11, degree: 12 },
  { planet: 'Rahu', sign: 3, degree: 18 },
  { planet: 'Ketu', sign: 9, degree: 18 },
];

const MOCK_TRANSIT_PLANETS: PlanetPosition[] = [
  { planet: 'Jupiter', sign: 1, degree: 10 }, // Transit Jupiter in Aries
  { planet: 'Saturn', sign: 11, degree: 5 },  // Transit Saturn in Aquarius
  { planet: 'Rahu', sign: 12, degree: 2 },
  { planet: 'Ketu', sign: 6, degree: 2 },
];

export default function BhriguNadiPage() {
  const [natalPlanets] = useState<PlanetPosition[]>(MOCK_NATAL_PLANETS);
  const [transitPlanets] = useState<PlanetPosition[]>(MOCK_TRANSIT_PLANETS);
  
  const transitJupiter = transitPlanets.find(p => p.planet === 'Jupiter')!;
  const transitSaturn = transitPlanets.find(p => p.planet === 'Saturn')!;
  
  const alerts = calculateTransitAlerts(natalPlanets, transitJupiter, transitSaturn);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl bg-[#FAF9F7] min-h-screen text-[#222222]">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-4xl text-[#1B3A6B] mb-2">Bhrigu Nandi Nadi</h1>
        <p className="font-sans text-lg text-gray-600">Transit Activation Analysis</p>
      </div>
      
      <NadiTransitMatrix 
        natalPlanets={natalPlanets} 
        transitPlanets={transitPlanets} 
      />
      
      <JeevaKarmaAlertCard alerts={alerts} />
    </div>
  );
}
