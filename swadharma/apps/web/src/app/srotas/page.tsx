'use client';

import React, { useEffect, useState } from 'react';
import { SrotasBodyMap } from '../../components/srotas/SrotasBodyMap';
import { SrotasDetailPanel } from '../../components/srotas/SrotasDetailPanel';
import srotasData from '../../data/srotas.json';
import { Card } from '../../components/ui/card';
import { ScrollArea } from '../../components/ui/scroll-area';
import { useAssessmentStore } from '../../stores/assessmentStore';

export default function SrotasPage() {
  const [mounted, setMounted] = useState(false);
  const { selectedSrotas, setSelectedSrotas } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const selectedData = selectedSrotas 
    ? srotasData.find(s => s.id === selectedSrotas) || null 
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen bg-[#FBF8F2]">
      
      {/* Header */}
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D2B1F] mb-4">
          Srotas Explorer
        </h1>
        <p className="text-lg text-[#3D2B1F]/70 leading-relaxed">
          Discover the Ayurvedic channel systems that transport prana, nutrients, and waste throughout the body.
        </p>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Srotas List (Nav) */}
        <div className="lg:col-span-3">
          <Card className="bg-white/60 border-[#4A7C59]/20 shadow-sm h-[600px] flex flex-col">
            <div className="p-4 border-b border-[#4A7C59]/10 bg-[#4A7C59]/5 font-semibold text-[#3D2B1F]">
              The 13 Channels
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {srotasData.map((srotas) => (
                  <button
                    key={srotas.id}
                    onClick={() => setSelectedSrotas(srotas.id)}
                    className={`w-full text-left px-4 py-3 rounded-md text-sm transition-colors ${
                      selectedSrotas === srotas.id
                        ? 'bg-[#E8973A]/20 text-[#3D2B1F] font-medium border border-[#E8973A]/30'
                        : 'text-[#3D2B1F]/80 hover:bg-[#4A7C59]/10 hover:text-[#3D2B1F]'
                    }`}
                  >
                    <div className="font-medium">{srotas.name}</div>
                    <div className="text-xs opacity-70 truncate">{srotas.translation}</div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Center Column: Interactive Body Map */}
        <div className="lg:col-span-4 flex justify-center">
          <SrotasBodyMap 
            selectedId={selectedSrotas} 
            onSelect={setSelectedSrotas} 
          />
        </div>

        {/* Right Column: Detail Panel */}
        <div className="lg:col-span-5 h-[600px]">
          <SrotasDetailPanel data={selectedData} />
        </div>

      </div>
    </div>
  );
}
