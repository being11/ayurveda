'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { PlanetPosition, getDirectionalGroupings } from '@/src/engines/astrologer/bhrigu-nadi';

interface Props {
  natalPlanets: PlanetPosition[];
  transitPlanets: PlanetPosition[];
}

export function NadiTransitMatrix({ natalPlanets, transitPlanets }: Props) {
  return (
    <Card className="bg-[#FAF9F7] text-[#222222] border-[#E8A838] shadow-sm font-sans mb-4">
      <CardHeader>
        <CardTitle className="font-heading text-[#1B3A6B] text-2xl">Bhrigu Nandi Nadi Transit Activation Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="space-y-6">
            {transitPlanets.map((transit, idx) => {
              const groupings = getDirectionalGroupings(transit.sign);
              
              const trinePlanets = natalPlanets.filter(n => groupings.trines.includes(n.sign));
              const adjacentPlanets = natalPlanets.filter(n => groupings.adjacencies.includes(n.sign));
              const oppositePlanets = natalPlanets.filter(n => groupings.oppositions.includes(n.sign));
              const conjunctPlanets = natalPlanets.filter(n => n.sign === transit.sign);
              
              return (
                <div key={idx} className="p-4 bg-white rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl text-[#1B3A6B]">{transit.planet} Transit</h3>
                    <Badge variant="outline" className="border-[#E8A838] text-[#1B3A6B] font-mono">Sign {transit.sign}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#FAF9F7] p-3 rounded">
                      <h4 className="font-bold text-sm mb-2 text-[#E8A838]">Conjunction (Sign {transit.sign})</h4>
                      <div className="flex flex-wrap gap-2">
                        {conjunctPlanets.length > 0 ? conjunctPlanets.map(p => (
                          <Badge key={p.planet} className="bg-[#1B3A6B] hover:bg-[#1B3A6B]/80">{p.planet}</Badge>
                        )) : <span className="text-sm text-gray-500 italic">None</span>}
                      </div>
                    </div>
                    
                    <div className="bg-[#FAF9F7] p-3 rounded">
                      <h4 className="font-bold text-sm mb-2 text-[#E8A838]">Trines (1-5-9)</h4>
                      <div className="flex flex-wrap gap-2">
                        {trinePlanets.length > 0 ? trinePlanets.map(p => (
                          <Badge key={p.planet} className="bg-[#1B3A6B] hover:bg-[#1B3A6B]/80">{p.planet}</Badge>
                        )) : <span className="text-sm text-gray-500 italic">None</span>}
                      </div>
                    </div>
                    
                    <div className="bg-[#FAF9F7] p-3 rounded">
                      <h4 className="font-bold text-sm mb-2 text-[#E8A838]">Adjacencies (2-12)</h4>
                      <div className="flex flex-wrap gap-2">
                        {adjacentPlanets.length > 0 ? adjacentPlanets.map(p => (
                          <Badge key={p.planet} className="bg-[#1B3A6B] hover:bg-[#1B3A6B]/80">{p.planet}</Badge>
                        )) : <span className="text-sm text-gray-500 italic">None</span>}
                      </div>
                    </div>
                    
                    <div className="bg-[#FAF9F7] p-3 rounded">
                      <h4 className="font-bold text-sm mb-2 text-[#E8A838]">Oppositions (3-7-11)</h4>
                      <div className="flex flex-wrap gap-2">
                        {oppositePlanets.length > 0 ? oppositePlanets.map(p => (
                          <Badge key={p.planet} className="bg-[#1B3A6B] hover:bg-[#1B3A6B]/80">{p.planet}</Badge>
                        )) : <span className="text-sm text-gray-500 italic">None</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
