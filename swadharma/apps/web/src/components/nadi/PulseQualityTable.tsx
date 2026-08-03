import React from 'react';
import nadiData from '../../data/nadi.json';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { NadiData } from '../../types/assessment';

const data = nadiData as unknown as NadiData;

/**
 * PulseQualityTable Component
 * 
 * Displays a comparative table of dosha pulse qualities (Vata, Pitta, Kapha)
 * and detailed sections for sub-dosha pulses. Data is fetched from `nadi.json`.
 *
 * @returns {JSX.Element} The table displaying pulse characteristics.
 */
export function PulseQualityTable() {
  return (
    <Card className="border-[#E8973A]/20 shadow-md bg-white">
      <CardHeader className="bg-[#FBF8F2] border-b border-[#E8973A]/10 rounded-t-lg">
        <CardTitle className="text-[#E8973A] text-xl text-center">Pulse Characteristics & Sub-Doshas</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-stone-700">
            <thead className="text-xs uppercase bg-stone-50 text-stone-600">
              <tr>
                <th className="px-6 py-3">Dosha</th>
                <th className="px-6 py-3">Quality (Animal)</th>
                <th className="px-6 py-3">Movement</th>
                <th className="px-6 py-3">Characteristics</th>
              </tr>
            </thead>
            <tbody>
              {data.pulses.map((pulse, i) => (
                <tr key={pulse.dosha} className={i !== data.pulses.length - 1 ? "border-b border-stone-100" : ""}>
                  <td className="px-6 py-4 font-bold capitalize text-stone-800">
                    {pulse.dosha}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{pulse.quality.animal}</div>
                  </td>
                  <td className="px-6 py-4">
                    {pulse.quality.movement}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pulse.quality.characteristics.map(char => (
                        <span key={char} className="bg-stone-100 px-2 py-1 rounded text-xs">
                          {char}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 space-y-6">
          <h3 className="font-bold text-lg text-stone-800 border-b border-stone-200 pb-2">Sub-Dosha Pulses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.pulses.map(pulse => (
              <div key={`sub-${pulse.dosha}`} className="space-y-3">
                <h4 className="font-bold capitalize text-[#4A7C59]">{pulse.dosha} Sub-Doshas</h4>
                <div className="space-y-4">
                  {pulse.subDoshas.map(sub => (
                    <div key={sub.name} className="text-sm">
                      <div className="font-semibold text-stone-800">{sub.name}</div>
                      <div className="text-stone-500 text-xs mt-1">Loc: {sub.location}</div>
                      <div className="text-stone-600 mt-1">{sub.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
