'use client';

import React from 'react';
import type { PoseFeedbackPayload, CorrectionArrow } from '../types/feedback.types';

interface PoseOverlayProps {
  feedback: PoseFeedbackPayload;
  videoDims: { width: number, height: number };
}

const renderArrowPath = (direction: CorrectionArrow['direction']) => {
  switch (direction) {
    case 'up': return "M12 20V4M5 11l7-7 7 7";
    case 'down': return "M12 4v16m7-7-7 7-7-7";
    case 'left': return "M20 12H4m7 7-7-7 7-7";
    case 'right': return "M4 12h16m-7-7 7 7-7 7";
    case 'rotate-clockwise': return "M20.49 15a9 9 0 1 1-2.12-9.36L23 10M23 10V4m0 6h-6";
    case 'rotate-counter-clockwise': return "M3.51 15a9 9 0 1 0 2.13-9.36L1 10M1 10V4m0 6h6";
    default: return "";
  }
};

export function PoseOverlay({ feedback, videoDims }: PoseOverlayProps) {
  const isCorrecting = feedback.state === 'correcting';
  const isCelebrating = feedback.state === 'celebrating';

  // Base styling for institutional light theme
  const containerClass = "absolute inset-0 pointer-events-none flex flex-col items-center justify-start p-4 z-10";

  // High contrast banner
  let bannerClass = "bg-white text-slate-900 border shadow-md px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ";

  if (isCorrecting) {
    bannerClass += "border-[#EF4444] text-[#EF4444]";
  } else if (isCelebrating) {
    bannerClass += "border-[#10B981] text-[#10B981]";
  } else {
    bannerClass += "border-gray-200 text-[#1B3A6B]"; // Default government blue
  }

  return (
    <div className={containerClass}>
       {feedback.message && (
          <div className={bannerClass}>
             {feedback.message} (Score: {Math.round(feedback.score)})
          </div>
       )}

       {/* SVG Overlay for Arrows */}
       {isCorrecting && feedback.arrows.length > 0 && (
         <svg
           className="absolute inset-0 w-full h-full pointer-events-none"
           xmlns="http://www.w3.org/2000/svg"
           viewBox={`0 0 ${videoDims.width} ${videoDims.height}`}
           preserveAspectRatio="xMidYMid slice"
         >
            {feedback.arrows.map((arrow) => (
               <g
                 key={arrow.id}
                 transform={`translate(${arrow.startX} ${arrow.startY})`}
                 className="animate-pulse"
               >
                 <path
                    d={renderArrowPath(arrow.direction)}
                    stroke="#EF4444"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    // Scale arrow based on magnitude for visual emphasis
                    transform={`scale(${Math.max(1, arrow.magnitude / 10)})`}
                 />
               </g>
            ))}
         </svg>
       )}

       {isCelebrating && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-4xl font-bold text-[#10B981] animate-bounce bg-white/80 px-8 py-4 rounded-xl shadow-lg border border-[#10B981]">
                 Excellent!
             </div>
          </div>
       )}
    </div>
  );
}
