import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Aspect } from "../../../engines/sahams";

interface SahamAspectCardProps {
  aspects: Aspect[];
}

export function SahamAspectCard({ aspects }: SahamAspectCardProps) {
  if (!aspects || aspects.length === 0) {
    return (
      <Card className="bg-white border-[#FAF9F7]/20 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1B3A6B]">Tajika Ithasala Aspects</CardTitle>
          <CardDescription className="font-sans text-[#222222]/60">
            Active applying aspects to Saham points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-sans text-[#222222]/80 text-sm italic">
            No active applying (Ithasala) aspects detected.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-[#FAF9F7]/20 shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#1B3A6B]">Tajika Ithasala Aspects</CardTitle>
        <CardDescription className="font-sans text-[#222222]/60">
          Active applying aspects to Saham points
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aspects.map((aspect, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-md bg-[#FAF9F7] border border-[#222222]/5"
            >
              <div className="flex flex-col gap-1">
                <span className="font-heading text-[#1B3A6B] text-base">
                  {aspect.sahamName}
                </span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="font-sans text-[#E8A838] border-[#E8A838]/30 bg-white"
                  >
                    {aspect.aspectType}
                  </Badge>
                  <span className="font-sans text-sm text-[#222222]/70">
                    with {aspect.planet}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge className="font-sans bg-[#1B3A6B] hover:bg-[#1B3A6B]/90 text-white">
                  Ithasala
                </Badge>
                <span className="font-mono text-xs text-[#222222]/50">
                  Orb: {aspect.orb.toFixed(2)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
