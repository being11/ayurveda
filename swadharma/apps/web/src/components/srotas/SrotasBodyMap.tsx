'use client';

import React from 'react';
import { cn } from '@workspace/ui/lib/utils';

interface SrotasBodyMapProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SrotasBodyMap({ selectedId, onSelect }: SrotasBodyMapProps) {
  // A simplified SVG placeholder for a human body mapping
  // In a real app, this would be a complex SVG with path coordinates for each srotas.
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[1/2] bg-[#FBF8F2] rounded-xl border border-[#4A7C59]/20 p-4 shadow-sm flex items-center justify-center">
      <div className="text-center mb-8 absolute top-4 text-[#3D2B1F]/60 text-sm italic">
        Srotas Body Map (Interactive)
      </div>
      
      {/* Abstract representation of the body regions */}
      <div className="relative w-3/4 h-3/4 flex flex-col items-center justify-between">
        
        {/* Head / Respiratory / Nervous */}
        <button 
          onClick={() => onSelect('pranavaha')}
          className={cn(
            "w-20 h-20 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center",
            selectedId === 'pranavaha' 
              ? "bg-[#E8973A]/20 border-[#E8973A] shadow-md z-10" 
              : "bg-white/50 border-[#4A7C59]/30 hover:border-[#4A7C59]"
          )}
          title="Pranavaha Srotas"
        >
          <span className="text-xs font-semibold text-[#3D2B1F]">Head/Breath</span>
        </button>

        {/* Chest / Heart / Plasma / Blood */}
        <button 
          onClick={() => onSelect('rasavaha')}
          className={cn(
            "w-32 h-24 rounded-3xl border-2 transition-all hover:scale-105 flex items-center justify-center",
            selectedId === 'rasavaha' 
              ? "bg-[#E8973A]/20 border-[#E8973A] shadow-md z-10" 
              : "bg-white/50 border-[#4A7C59]/30 hover:border-[#4A7C59]"
          )}
          title="Rasavaha Srotas"
        >
          <span className="text-xs font-semibold text-[#3D2B1F]">Chest/Heart</span>
        </button>

        {/* Abdomen / Digestive / Water */}
        <button 
          onClick={() => onSelect('annavaha')}
          className={cn(
            "w-28 h-28 rounded-full border-2 transition-all hover:scale-105 flex items-center justify-center",
            selectedId === 'annavaha' 
              ? "bg-[#E8973A]/20 border-[#E8973A] shadow-md z-10" 
              : "bg-white/50 border-[#4A7C59]/30 hover:border-[#4A7C59]"
          )}
          title="Annavaha Srotas"
        >
          <span className="text-xs font-semibold text-[#3D2B1F]">Digestive Core</span>
        </button>
        
        {/* Pelvis / Reproductive / Excretory */}
        <button 
          onClick={() => onSelect('mutravaha')}
          className={cn(
            "w-32 h-20 rounded-[2rem] border-2 transition-all hover:scale-105 flex items-center justify-center",
            selectedId === 'mutravaha' 
              ? "bg-[#E8973A]/20 border-[#E8973A] shadow-md z-10" 
              : "bg-white/50 border-[#4A7C59]/30 hover:border-[#4A7C59]"
          )}
          title="Mutravaha Srotas"
        >
          <span className="text-xs font-semibold text-[#3D2B1F]">Pelvic Region</span>
        </button>

      </div>
      
      {/* Decorative connecting line (Spine/Central channel) */}
      <div className="absolute inset-y-[15%] w-1 bg-[#4A7C59]/10 -z-10 rounded-full" />
    </div>
  );
}
