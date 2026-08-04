import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { Saham } from "../../../engines/sahams";

interface SahamTableProps {
  sahams: Saham[];
}

export function SahamTable({ sahams }: SahamTableProps) {
  return (
    <div className="rounded-md border border-[#FAF9F7]/10 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-[#FAF9F7]">
          <TableRow className="border-b-[#222222]/10 hover:bg-transparent">
            <TableHead className="font-heading text-[#1B3A6B] font-semibold w-[200px]">
              Saham Point
            </TableHead>
            <TableHead className="font-heading text-[#1B3A6B] font-semibold">
              Sign
            </TableHead>
            <TableHead className="font-heading text-[#1B3A6B] font-semibold text-right">
              Degree
            </TableHead>
            <TableHead className="font-heading text-[#1B3A6B] font-semibold">
              Lord
            </TableHead>
            <TableHead className="font-heading text-[#1B3A6B] font-semibold text-center">
              House
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sahams.map((saham, idx) => (
            <TableRow
              key={idx}
              className="border-b-[#222222]/5 hover:bg-[#FAF9F7]/50 transition-colors"
            >
              <TableCell className="font-sans font-medium text-[#222222]">
                {saham.name}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="font-sans text-[#1B3A6B] border-[#1B3A6B]/20 bg-[#FAF9F7]"
                >
                  {saham.sign}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-[#222222]/80">
                {saham.degree.toFixed(2)}°
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="font-sans text-[#E8A838] bg-[#E8A838]/10 hover:bg-[#E8A838]/20"
                >
                  {saham.lord}
                </Badge>
              </TableCell>
              <TableCell className="text-center font-mono font-semibold text-[#1B3A6B]">
                {Math.round(saham.house)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
