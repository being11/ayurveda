import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { PanchakarmaTherapy } from '../types/assessment';

interface PanchakarmaCardProps {
  therapy: PanchakarmaTherapy;
}

export function PanchakarmaCard({ therapy }: PanchakarmaCardProps) {
  return (
    <Card className="border-stone-200 bg-[#FBF8F2] shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-[#3D2B1F]">{therapy.name}</CardTitle>
            <CardDescription className="text-[#4A7C59] font-medium mt-1">
              Duration: {therapy.duration}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-stone-700">
          <p>{therapy.description}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#3D2B1F] uppercase tracking-wider mb-2">
            Benefits
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-stone-600">
            {therapy.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        {therapy.contraindications.length > 0 && (
          <div className="mt-4 p-3 bg-red-50/50 rounded-md border border-red-100">
            <h4 className="text-sm font-semibold text-red-800 uppercase tracking-wider mb-2">
              Contraindications
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              {therapy.contraindications.map((contra, i) => (
                <li key={i}>{contra}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
