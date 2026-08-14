'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@workspace/ui/components/table';
import { getSamsarjanaProtocol, type ShuddhiLevel } from '../engines/paschatkarma';
import type { PaschatkarmaProtocol } from '../types/assessment';

export function PaschatkarmaDashboard() {
  const [level, setLevel] = React.useState<ShuddhiLevel>('madhyama');
  const [protocol, setProtocol] = React.useState<PaschatkarmaProtocol | null>(null);

  React.useEffect(() => {
    setProtocol(getSamsarjanaProtocol(level));
  }, [level]);

  if (!protocol) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white border-gov-blue/10">
      <CardHeader className="bg-gov-blue/5 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-gov-blue font-serif mb-2">
              Paschatkarma Dietetic Schedule
            </CardTitle>
            <p className="text-charcoal/70 text-sm">
              Samsarjana Krama post-purification rehabilitation diet
            </p>
          </div>
          <Badge variant="outline" className="text-temple-gold border-temple-gold bg-temple-gold/5">
            {protocol.durationDays} Days / {protocol.meals} Meals
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs value={level} onValueChange={(v) => setLevel(v as ShuddhiLevel)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gov-blue/5 p-1">
            <TabsTrigger value="avara" className="data-[state=active]:bg-white data-[state=active]:text-gov-blue">Avara Shuddhi</TabsTrigger>
            <TabsTrigger value="madhyama" className="data-[state=active]:bg-white data-[state=active]:text-gov-blue">Madhyama Shuddhi</TabsTrigger>
            <TabsTrigger value="pravara" className="data-[state=active]:bg-white data-[state=active]:text-gov-blue">Pravara Shuddhi</TabsTrigger>
          </TabsList>

          <div className="mt-6 border rounded-lg overflow-hidden border-gov-blue/10">
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader className="bg-gov-blue/5">
                  <TableRow>
                    <TableHead className="w-[100px] text-gov-blue font-semibold">Meal #</TableHead>
                    <TableHead className="w-[100px] text-gov-blue font-semibold">Day</TableHead>
                    <TableHead className="w-[150px] text-gov-blue font-semibold">Time</TableHead>
                    <TableHead className="w-[200px] text-gov-blue font-semibold">Diet Type</TableHead>
                    <TableHead className="text-gov-blue font-semibold">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {protocol.schedule.map((meal) => (
                    <TableRow key={meal.mealIndex} className="hover:bg-gov-blue/5">
                      <TableCell className="font-medium text-charcoal">{meal.mealIndex}</TableCell>
                      <TableCell className="text-charcoal">Day {meal.day}</TableCell>
                      <TableCell className="text-charcoal">{meal.time}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-temple-gold/10 text-gov-blue hover:bg-temple-gold/20">
                          {meal.diet}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-charcoal/80">{meal.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
