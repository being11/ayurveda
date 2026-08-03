import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import type { DoshaDiet, FoodCategory } from '../../types/diet';

interface FoodCategoryGridProps {
  doshaDiet: DoshaDiet;
}

export function FoodCategoryGrid({ doshaDiet }: FoodCategoryGridProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-heading font-semibold text-[#3D2B1F] mb-2 capitalize">
          {doshaDiet.dosha} Diet Guidelines
        </h3>
        <p className="text-muted-foreground">{doshaDiet.description}</p>
        <div className="mt-4 flex gap-4 text-sm">
          <div>
            <span className="font-semibold text-[#4A7C59]">Favor Tastes:</span>{' '}
            <span className="capitalize">{doshaDiet.rasasToFavor.join(', ')}</span>
          </div>
          <div>
            <span className="font-semibold text-[#E8973A]">Reduce Tastes:</span>{' '}
            <span className="capitalize">{doshaDiet.rasasToReduce.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {doshaDiet.foodCategories.map((category: FoodCategory) => (
          <Card key={category.categoryName} className="bg-[#FBF8F2] border-[#4A7C59]/20 shadow-sm">
            <CardHeader className="pb-3 border-b border-[#4A7C59]/10">
              <CardTitle className="text-[#3D2B1F] text-base">{category.categoryName}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A7C59] mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#4A7C59] mr-2"></span>
                  Favor
                </h4>
                <ul className="text-sm space-y-1 text-[#3D2B1F]/80">
                  {category.favor.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8973A] mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#E8973A] mr-2"></span>
                  Reduce
                </h4>
                <ul className="text-sm space-y-1 text-[#3D2B1F]/80">
                  {category.reduce.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-red-700/80 mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-700/80 mr-2"></span>
                  Avoid
                </h4>
                <ul className="text-sm space-y-1 text-[#3D2B1F]/80">
                  {category.avoid.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
