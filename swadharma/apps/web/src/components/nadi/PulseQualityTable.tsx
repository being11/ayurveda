import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

interface SubDosha {
  name: string;
  description: string;
}

interface NadiDosha {
  id: string;
  name: string;
  finger: string;
  position: string;
  animal: string;
  movement: string;
  rate: string;
  subDoshas: SubDosha[];
}

interface PulseQualityTableProps {
  doshas: NadiDosha[];
}

export function PulseQualityTable({ doshas }: PulseQualityTableProps) {
  return (
    <Card className="bg-white border-[#4A7C59]/20 shadow-sm mt-8">
      <CardHeader>
        <CardTitle className="text-[#4A7C59]">Pulse Qualities & Sub-doshas</CardTitle>
        <CardDescription className="text-stone-600">
          A detailed comparison of pulse characteristics and corresponding physiological functions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-[#FBF8F2] text-[#4A7C59] font-heading">
              <tr>
                <th className="p-3 border-b border-[#4A7C59]/20">Dosha</th>
                <th className="p-3 border-b border-[#4A7C59]/20">Movement (Gati)</th>
                <th className="p-3 border-b border-[#4A7C59]/20">Rate</th>
                <th className="p-3 border-b border-[#4A7C59]/20">Sub-doshas</th>
              </tr>
            </thead>
            <tbody>
              {doshas.map((dosha) => (
                <tr key={dosha.id} className="border-b border-stone-200 hover:bg-[#FBF8F2]/50 transition-colors">
                  <td className="p-3 align-top">
                    <strong className="block text-[#E8973A] text-lg">{dosha.name}</strong>
                    <span className="text-stone-500 italic">{dosha.animal}</span>
                  </td>
                  <td className="p-3 align-top text-stone-700 max-w-[200px]">
                    {dosha.movement}
                  </td>
                  <td className="p-3 align-top text-stone-700 whitespace-nowrap">
                    {dosha.rate}
                  </td>
                  <td className="p-3 align-top">
                    <ul className="list-disc list-inside text-stone-700 space-y-1">
                      {dosha.subDoshas.map((sub, idx) => (
                        <li key={idx}>
                          <strong className="text-stone-900">{sub.name}:</strong> {sub.description}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
