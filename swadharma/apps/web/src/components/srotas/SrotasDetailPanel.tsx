'use client';

import React from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface SrotasData {
  id: string;
  name: string;
  translation: string;
  description: string;
  root: string;
  pathway: string;
  opening: string;
  imbalanceSigns: string[];
  therapies: string[];
}

interface SrotasDetailPanelProps {
  data: SrotasData | null;
  className?: string;
}

export function SrotasDetailPanel({ data, className }: SrotasDetailPanelProps) {
  if (!data) {
    return (
      <Card className={cn("h-full min-h-[400px] flex items-center justify-center bg-[#FBF8F2] border-[#4A7C59]/20", className)}>
        <CardContent className="text-center text-[#3D2B1F]/60">
          <p>Select a region on the body map to explore its channels.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("h-full flex flex-col bg-[#FBF8F2] border-[#4A7C59]/20 shadow-md", className)}>
      <CardHeader className="bg-[#4A7C59]/5 border-b border-[#4A7C59]/10 rounded-t-xl pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-[#3D2B1F]">{data.name}</CardTitle>
            <CardDescription className="text-[#E8973A] font-medium text-sm mt-1 uppercase tracking-wider">
              {data.translation}
            </CardDescription>
          </div>
        </div>
        <p className="text-[#3D2B1F]/80 text-sm mt-4 leading-relaxed">
          {data.description}
        </p>
      </CardHeader>
      
      <ScrollArea className="flex-1">
        <CardContent className="pt-6 space-y-6">
          
          {/* Anatomy Section */}
          <section>
            <h3 className="text-[#4A7C59] font-semibold text-sm uppercase tracking-wider mb-3">Anatomy</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex bg-white/50 p-2 rounded-md border border-[#4A7C59]/10">
                <span className="font-medium text-[#3D2B1F] w-24">Root (Mula):</span>
                <span className="text-[#3D2B1F]/80">{data.root}</span>
              </div>
              <div className="flex bg-white/50 p-2 rounded-md border border-[#4A7C59]/10">
                <span className="font-medium text-[#3D2B1F] w-24">Pathway:</span>
                <span className="text-[#3D2B1F]/80">{data.pathway}</span>
              </div>
              <div className="flex bg-white/50 p-2 rounded-md border border-[#4A7C59]/10">
                <span className="font-medium text-[#3D2B1F] w-24">Opening:</span>
                <span className="text-[#3D2B1F]/80">{data.opening}</span>
              </div>
            </div>
          </section>

          {/* Imbalances Section */}
          <section>
            <h3 className="text-[#E8973A] font-semibold text-sm uppercase tracking-wider mb-3">Signs of Imbalance</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#3D2B1F]/80 pl-2">
              {data.imbalanceSigns.map((sign, index) => (
                <li key={index}>{sign}</li>
              ))}
            </ul>
          </section>

          {/* Therapies Section */}
          <section>
            <h3 className="text-[#4A7C59] font-semibold text-sm uppercase tracking-wider mb-3">Recommended Therapies</h3>
            <div className="flex flex-wrap gap-2">
              {data.therapies.map((therapy, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20"
                >
                  {therapy}
                </span>
              ))}
            </div>
          </section>

        </CardContent>
      </ScrollArea>
    </Card>
  );
}
