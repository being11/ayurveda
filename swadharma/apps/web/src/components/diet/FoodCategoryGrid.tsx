/** @fileoverview Food category grid UI for dietary recommendations */
import React from 'react';
import { getFoodsForDosha } from '../../engines/diet';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Check, X, AlertOctagon } from 'lucide-react';

interface FoodCategoryGridProps {
  dosha: string;
}

export function FoodCategoryGrid({ dosha }: FoodCategoryGridProps) {
  const foods = getFoodsForDosha(dosha);

  if (!foods || foods.length === 0) {
    return <div className="p-4 text-center text-stone-500">No food data available for {dosha}.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map((category) => (
        <Card key={category.category} className="overflow-hidden border-stone-200 bg-[#FBF8F2] shadow-sm">
          <CardHeader className="bg-[#4A7C59]/10 pb-3">
            <CardTitle className="text-lg font-serif text-[#3D2B1F]">
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold flex items-center text-[#4A7C59] mb-2">
                <Check className="w-4 h-4 mr-1" /> Favor
              </h4>
              <ul className="text-sm text-stone-600 space-y-1">
                {category.favor.length > 0 ? (
                  category.favor.map((food, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-[#4A7C59]">•</span>
                      <span>{food}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-stone-400 italic">None specified</li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold flex items-center text-[#E8973A] mb-2">
                <X className="w-4 h-4 mr-1" /> Reduce
              </h4>
              <ul className="text-sm text-stone-600 space-y-1">
                {category.reduce.length > 0 ? (
                  category.reduce.map((food, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-[#E8973A]">•</span>
                      <span>{food}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-stone-400 italic">None specified</li>
                )}
              </ul>
            </div>

            {category.avoid && category.avoid.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold flex items-center text-red-700 mb-2">
                  <AlertOctagon className="w-4 h-4 mr-1" /> Avoid
                </h4>
                <ul className="text-sm text-stone-600 space-y-1">
                  {category.avoid.map((food, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-red-700">•</span>
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
