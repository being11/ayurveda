import React from 'react';
import { Card } from '@workspace/ui/components/card';
import type { SubdoshaDetail } from '../../types/assessment';

interface SubdoshaMatrixGridProps {
  subdoshas: SubdoshaDetail[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const doshaColors = {
  vata: {
    bg: 'bg-stone-50',
    hover: 'hover:bg-stone-100',
    active: 'bg-stone-100 border-stone-400',
    border: 'border-stone-200',
    text: 'text-stone-700'
  },
  pitta: {
    bg: 'bg-red-50',
    hover: 'hover:bg-red-100/50',
    active: 'bg-red-100 border-red-300',
    border: 'border-red-100',
    text: 'text-red-700'
  },
  kapha: {
    bg: 'bg-green-50',
    hover: 'hover:bg-green-100/50',
    active: 'bg-green-100 border-green-300',
    border: 'border-green-100',
    text: 'text-green-700'
  }
};

export function SubdoshaMatrixGrid({ subdoshas, selectedId, onSelect }: SubdoshaMatrixGridProps) {
  const vataSubdoshas = subdoshas.filter(s => s.dosha === 'vata');
  const pittaSubdoshas = subdoshas.filter(s => s.dosha === 'pitta');
  const kaphaSubdoshas = subdoshas.filter(s => s.dosha === 'kapha');

  const renderColumn = (title: string, items: SubdoshaDetail[], dosha: 'vata' | 'pitta' | 'kapha') => {
    const colors = doshaColors[dosha];
    
    return (
      <div className="flex flex-col gap-3">
        <h3 className={`font-semibold text-lg ${colors.text} text-center mb-2`}>{title}</h3>
        {items.map((subdosha) => {
          const isSelected = selectedId === subdosha.id;
          return (
            <Card 
              key={subdosha.id}
              className={`p-4 cursor-pointer transition-all duration-200 border ${isSelected ? colors.active : `${colors.bg} ${colors.border} ${colors.hover}`} shadow-sm`}
              onClick={() => onSelect(subdosha.id)}
            >
              <div className="text-center">
                <h4 className={`font-medium ${isSelected ? 'text-stone-900' : 'text-stone-700'}`}>
                  {subdosha.name}
                </h4>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {renderColumn('Vata', vataSubdoshas, 'vata')}
      {renderColumn('Pitta', pittaSubdoshas, 'pitta')}
      {renderColumn('Kapha', kaphaSubdoshas, 'kapha')}
    </div>
  );
}
