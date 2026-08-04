import React from "react";
import { Badge } from "@workspace/ui/components/badge";

interface TaraCategoryBadgeProps {
  categoryName: string;
  isAuspicious: boolean;
}

export function TaraCategoryBadge({ categoryName, isAuspicious }: TaraCategoryBadgeProps) {
  // Use government blue (#1B3A6B) for inauspicious and temple gold (#E8A838) for auspicious
  // Text is cream (#FAF9F7)
  const bgColor = isAuspicious ? "bg-[#E8A838]" : "bg-[#1B3A6B]";
  const textColor = "text-[#FAF9F7]";
  
  return (
    <Badge className={`${bgColor} ${textColor} font-sans hover:opacity-90 px-3 py-1 text-sm rounded-md`}>
      {categoryName} ({isAuspicious ? "Auspicious" : "Inauspicious"})
    </Badge>
  );
}
