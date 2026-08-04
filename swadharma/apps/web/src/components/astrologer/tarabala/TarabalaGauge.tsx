import React from "react";

interface TarabalaGaugeProps {
  score: number; // 0, 50, or 100
}

export function TarabalaGauge({ score }: TarabalaGaugeProps) {
  // SVG details
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Government Blue #1B3A6B, Temple Gold #E8A838, Charcoal #222222
  let color = "#E8A838"; // Temple Gold (100)
  if (score === 50) color = "#1B3A6B"; // Mixed (50) - using Government Blue
  if (score === 0) color = "#222222"; // Bad (0) - using Charcoal
  
  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#e5e7eb" // gray-200 for background track
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="mt-4 text-2xl font-bold font-display" style={{ color: "#222222" }}>
        {score}%
      </div>
      <div className="text-sm font-medium text-gray-500 font-sans uppercase tracking-widest mt-1">
        Daily Strength
      </div>
    </div>
  );
}
