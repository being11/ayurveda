import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import type { PanchakarmaTherapy } from '../../types/assessment';

interface PanchakarmaCardProps {
  therapy: PanchakarmaTherapy;
}

export function PanchakarmaCard({ therapy }: PanchakarmaCardProps) {
  return (
    <Card className="border-[#4A7C59]/20 bg-[#FBF8F2] shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#4A7C59] text-xl font-semibold">
          {therapy.name}
        </CardTitle>
        <div className="text-sm text-[#E8973A] font-medium mt-1">
          Target Dosha: {therapy.dosha}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-stone-800 mb-2">Benefits</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-stone-600">
            {therapy.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-stone-800 mb-2">Contraindications</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-stone-600">
            {therapy.contraindications.map((contra, idx) => (
              <li key={idx}>{contra}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-stone-200">
          <span className="font-semibold text-stone-800 text-sm">Duration: </span>
          <span className="text-sm text-stone-600">{therapy.duration}</span>
        </div>
      </CardContent>
    </Card>
  );
}
