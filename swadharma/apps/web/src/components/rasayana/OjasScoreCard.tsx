import React from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { AyurvedaProfile } from '../../types/assessment';

interface OjasScoreCardProps {
  ojasLevel: AyurvedaProfile['ojas'];
  className?: string;
}

export function OjasScoreCard({ ojasLevel, className }: OjasScoreCardProps) {
  let config = {
    color: 'text-stone-500',
    bgColor: 'bg-stone-100',
    borderColor: 'border-stone-200',
    icon: Shield,
    label: 'Unknown',
    description: 'Complete the assessment to reveal your Ojas level.',
  };

  if (ojasLevel === 'high') {
    config = {
      color: 'text-[#4A7C59]', // Green
      bgColor: 'bg-[#4A7C59]/10',
      borderColor: 'border-[#4A7C59]/30',
      icon: ShieldCheck,
      label: 'High (Excellent)',
      description: 'Your vitality and immunity are strong. Your body has excellent resilience and reserves.',
    };
  } else if (ojasLevel === 'moderate') {
    config = {
      color: 'text-[#E8973A]', // Saffron
      bgColor: 'bg-[#E8973A]/10',
      borderColor: 'border-[#E8973A]/30',
      icon: Shield,
      label: 'Moderate (Balanced)',
      description: 'Your vitality is stable, but can be depleted under prolonged stress. Consistent routines are key.',
    };
  } else if (ojasLevel === 'low') {
    config = {
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
      borderColor: 'border-rose-200',
      icon: ShieldAlert,
      label: 'Low (Depleted)',
      description: 'Your reserves are low. You need immediate grounding, nourishment, and restorative rest.',
    };
  }

  const Icon = config.icon;

  return (
    <div className={cn("p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300", config.bgColor, config.borderColor, className)}>
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl bg-white shadow-sm", config.color)}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-stone-500">Ojas (Vitality) Level</h3>
          <p className={cn("text-xl font-serif font-medium", config.color)}>{config.label}</p>
          <p className="text-stone-700 mt-2 text-sm leading-relaxed">{config.description}</p>
        </div>
      </div>
    </div>
  );
}
