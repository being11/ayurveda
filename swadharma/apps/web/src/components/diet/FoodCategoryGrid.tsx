'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/card';
import { Check, Minus, X, Droplet } from 'lucide-react';
import dietData from '@/src/data/diet.json';

interface FoodCategoryGridProps {
  dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Balanced';
}

export function FoodCategoryGrid({ dosha }: FoodCategoryGridProps) {
  const tastes = dietData.tastes[dosha];
  const foods = dietData.foods[dosha];

  return (
    <div className="space-y-8">
      {/* 6 Rasas (Tastes) Section */}
      <Card className="shadow-sm border-stone-200">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 bg-stone-100 rounded-full text-blue-500">
            <Droplet className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-serif">The 6 Rasas (Tastes)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-emerald-700 text-sm uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4" /> Tastes to Favor
            </h4>
            <ul className="list-disc list-inside text-stone-600">
              {tastes.favor.map((taste, i) => (
                <li key={i}>{taste}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-amber-600 text-sm uppercase tracking-wider flex items-center gap-2">
              <Minus className="w-4 h-4" /> Tastes to Reduce
            </h4>
            <ul className="list-disc list-inside text-stone-600">
              {tastes.reduce.map((taste, i) => (
                <li key={i}>{taste}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Food Lists Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-emerald-200 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" /> Favor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-stone-700">
              {foods.favor.map((food, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span> {food}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-amber-200 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
              <Minus className="w-5 h-5 text-amber-600" /> Reduce
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-stone-700">
              {foods.reduce.map((food, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span> {food}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-red-200 bg-red-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-red-800 flex items-center gap-2">
              <X className="w-5 h-5 text-red-500" /> Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-stone-700">
              {foods.avoid.map((food, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span> {food}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
