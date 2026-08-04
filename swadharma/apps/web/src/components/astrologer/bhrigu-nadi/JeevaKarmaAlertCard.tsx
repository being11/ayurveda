'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { TransitAlert } from '@/src/engines/astrologer/bhrigu-nadi';

interface Props {
  alerts: TransitAlert[];
}

export function JeevaKarmaAlertCard({ alerts }: Props) {
  if (alerts.length === 0) {
    return (
      <Card className="bg-white border-[#E8A838] shadow-sm mb-4">
        <CardContent className="p-6 text-center text-gray-500 font-sans">
          No significant Jeeva or Karma transit activations found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#FAF9F7] text-[#222222] border-[#E8A838] shadow-sm font-sans mb-4">
      <CardHeader>
        <CardTitle className="font-heading text-[#1B3A6B] text-2xl">Jeeva & Karma Activation Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {alerts.map((alert, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={
                      alert.type === 'Jeeva' 
                        ? 'border-green-600 text-green-700' 
                        : alert.type === 'Karma' 
                        ? 'border-red-600 text-red-700'
                        : 'border-[#E8A838] text-[#1B3A6B]'
                    }>
                      {alert.type} ({alert.transitPlanet})
                    </Badge>
                    <Badge className="bg-[#1B3A6B]">{alert.aspectType}</Badge>
                    <span className="font-bold text-sm text-[#E8A838]">Natal {alert.natalPlanet}</span>
                  </div>
                  <p className="text-sm font-medium">{alert.prediction}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
