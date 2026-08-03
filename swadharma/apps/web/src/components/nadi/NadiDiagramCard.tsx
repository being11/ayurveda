"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { cn } from "@workspace/ui/lib/utils";

interface NadiDosha {
  id: string;
  name: string;
  finger: string;
  position: string;
  animal: string;
}

interface NadiDiagramCardProps {
  doshas: NadiDosha[];
}

export function NadiDiagramCard({ doshas }: NadiDiagramCardProps) {
  const [activeDosha, setActiveDosha] = React.useState<string | null>(null);

  return (
    <Card className="bg-[#FBF8F2] border-[#4A7C59]/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-[#4A7C59]">Nadi Pulse Points</CardTitle>
        <CardDescription className="text-stone-600">
          Hover over or tap the pulse points to explore the corresponding dosha.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-full max-w-[300px] aspect-[3/4] mx-auto">
          {/* Conceptual SVG of an Arm/Hand for Pulse points */}
          <svg
            viewBox="0 0 200 300"
            className="w-full h-full drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wrist & Arm Base */}
            <path
              d="M70,300 C60,250 50,150 55,100 C60,50 90,30 100,30 C110,30 140,50 145,100 C150,150 140,250 130,300 Z"
              fill="#F4E9D8"
              stroke="#D2B48C"
              strokeWidth="2"
            />
            {/* Thumb outline */}
            <path
              d="M55,120 C30,110 20,80 30,60 C40,40 60,50 70,80"
              fill="#F4E9D8"
              stroke="#D2B48C"
              strokeWidth="2"
            />

            {/* Pulse Point: Vata (Index Finger) */}
            <g
              onMouseEnter={() => setActiveDosha("vata")}
              onMouseLeave={() => setActiveDosha(null)}
              onClick={() => setActiveDosha("vata")}
              className="cursor-pointer transition-transform hover:scale-110 origin-center"
              style={{ transformOrigin: "85px 140px" }}
            >
              <circle cx="85" cy="140" r="12" fill={activeDosha === "vata" ? "#E8973A" : "#4A7C59"} opacity="0.8" />
              <text x="85" y="144" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">V</text>
            </g>

            {/* Pulse Point: Pitta (Middle Finger) */}
            <g
              onMouseEnter={() => setActiveDosha("pitta")}
              onMouseLeave={() => setActiveDosha(null)}
              onClick={() => setActiveDosha("pitta")}
              className="cursor-pointer transition-transform hover:scale-110 origin-center"
              style={{ transformOrigin: "100px 155px" }}
            >
              <circle cx="100" cy="155" r="12" fill={activeDosha === "pitta" ? "#E8973A" : "#4A7C59"} opacity="0.8" />
              <text x="100" y="159" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">P</text>
            </g>

            {/* Pulse Point: Kapha (Ring Finger) */}
            <g
              onMouseEnter={() => setActiveDosha("kapha")}
              onMouseLeave={() => setActiveDosha(null)}
              onClick={() => setActiveDosha("kapha")}
              className="cursor-pointer transition-transform hover:scale-110 origin-center"
              style={{ transformOrigin: "115px 170px" }}
            >
              <circle cx="115" cy="170" r="12" fill={activeDosha === "kapha" ? "#E8973A" : "#4A7C59"} opacity="0.8" />
              <text x="115" y="174" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">K</text>
            </g>
          </svg>
        </div>

        <div className="flex-1 flex flex-col gap-4 w-full">
          {doshas.map((dosha) => (
            <div
              key={dosha.id}
              className={cn(
                "p-4 rounded-lg border transition-all duration-300",
                activeDosha === dosha.id || activeDosha === null
                  ? "border-[#E8973A] bg-white shadow-sm"
                  : "border-transparent opacity-50 grayscale"
              )}
            >
              <h3 className="text-lg font-heading font-semibold text-[#4A7C59] mb-1">
                {dosha.name} ({dosha.finger})
              </h3>
              <p className="text-sm text-stone-600 mb-1">
                <strong>Position:</strong> {dosha.position}
              </p>
              <p className="text-sm text-stone-600">
                <strong>Metaphor:</strong> {dosha.animal}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
