"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { calculateTarabala, calculateChandrabala, calculateCombinedScore } from "../../../../../engines/tarabala";
import { TaraCategoryBadge } from "../../../../../components/astrologer/tarabala/TaraCategoryBadge";
import { TarabalaGauge } from "../../../../../components/astrologer/tarabala/TarabalaGauge";

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", 
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "P. Phalguni", "U. Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "P. Ashadha", "U. Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "P. Bhadrapada", "U. Bhadrapada", "Revati"
];

const RASHIS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function TarabalaPage() {
  const [nNakshatra, setNNakshatra] = useState("1");
  const [tNakshatra, setTNakshatra] = useState("1");
  const [nMoon, setNMoon] = useState("1");
  const [tMoon, setTMoon] = useState("1");

  const taraResult = calculateTarabala(parseInt(nNakshatra), parseInt(tNakshatra));
  const chandraAusp = calculateChandrabala(parseInt(nMoon), parseInt(tMoon));
  const combined = calculateCombinedScore(taraResult.isAuspicious, chandraAusp);

  return (
    <div className="min-h-screen bg-[#FAF9F7] p-8 text-[#222222]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-display text-[#1B3A6B]">Tarabala & Chandrabala</h1>
          <p className="mt-2 text-lg font-sans text-gray-600">Daily Strength Finder</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-[#E8A838]">Input Positions</CardTitle>
              <CardDescription className="font-sans">Enter Natal and Transit details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 font-sans">
              <div className="space-y-4">
                <h3 className="font-bold text-[#1B3A6B]">Nakshatra (Stars)</h3>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Natal Nakshatra</label>
                  <Select value={nNakshatra} onValueChange={setNNakshatra}>
                    <SelectTrigger><SelectValue placeholder="Natal Nakshatra" /></SelectTrigger>
                    <SelectContent>
                      {NAKSHATRAS.map((n, i) => (<SelectItem key={i+1} value={(i+1).toString()}>{i+1}. {n}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Transit Nakshatra</label>
                  <Select value={tNakshatra} onValueChange={setTNakshatra}>
                    <SelectTrigger><SelectValue placeholder="Transit Nakshatra" /></SelectTrigger>
                    <SelectContent>
                      {NAKSHATRAS.map((n, i) => (<SelectItem key={i+1} value={(i+1).toString()}>{i+1}. {n}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-bold text-[#1B3A6B]">Moon Sign (Rashi)</h3>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Natal Moon Sign</label>
                  <Select value={nMoon} onValueChange={setNMoon}>
                    <SelectTrigger><SelectValue placeholder="Natal Moon Sign" /></SelectTrigger>
                    <SelectContent>
                      {RASHIS.map((r, i) => (<SelectItem key={i+1} value={(i+1).toString()}>{i+1}. {r}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">Transit Moon Sign</label>
                  <Select value={tMoon} onValueChange={setTMoon}>
                    <SelectTrigger><SelectValue placeholder="Transit Moon Sign" /></SelectTrigger>
                    <SelectContent>
                      {RASHIS.map((r, i) => (<SelectItem key={i+1} value={(i+1).toString()}>{i+1}. {r}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-[#E8A838]">Daily Strength Results</CardTitle>
              <CardDescription className="font-sans">Combined Tarabala and Chandrabala.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-8 h-[400px]">
              <TarabalaGauge score={combined} />
              
              <div className="w-full space-y-4 font-sans text-center mt-4">
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Tarabala (Nakshatra)</div>
                  <div className="flex flex-col items-center gap-1">
                    <TaraCategoryBadge categoryName={taraResult.name} isAuspicious={taraResult.isAuspicious} />
                    <span className="text-xs text-gray-500 mt-1">{taraResult.description}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Chandrabala (Moon)</div>
                  <div className={`font-semibold ${chandraAusp ? 'text-[#E8A838]' : 'text-[#1B3A6B]'}`}>
                    {chandraAusp ? "Auspicious Transit" : "Inauspicious Transit"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
