import * as React from "react";
import { SahamTable } from "../../../../../components/astrologer/sahams/SahamTable";
import { SahamAspectCard } from "../../../../../components/astrologer/sahams/SahamAspectCard";
import {
  calculateAllSahams,
  calculateTajikaAspects,
  PlanetPositions,
} from "../../../../../engines/sahams";

// Mock data (since we don't have a real DB/store connection in this slice)
const mockPlanets: PlanetPositions = {
  Sun: 15, // Aries 15
  Moon: 135, // Leo 15
  Mars: 45, // Taurus 15
  Mercury: 10, // Aries 10
  Jupiter: 200, // Libra 20
  Venus: 350, // Pisces 20
  Saturn: 275, // Capricorn 5
  Ascendant: 0, // Aries 0
};
const isDayBirth = true; // Hardcoded for this feature demo

export default function SahamsPage() {
  const sahams = calculateAllSahams(mockPlanets, isDayBirth);
  const aspects = calculateTajikaAspects(sahams, mockPlanets);

  return (
    <div className="min-h-screen bg-[#FAF9F7] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="font-heading text-4xl text-[#1B3A6B] mb-2">
            Varshaphala Saham Calculator
          </h1>
          <p className="font-sans text-lg text-[#222222]/80">
            50 Sensitive Longitude Points (Sahams) based on the Tajika System.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SahamTable sahams={sahams} />
          </div>
          <div className="lg:col-span-1">
            <SahamAspectCard aspects={aspects} />
          </div>
        </div>
      </div>
    </div>
  );
}
