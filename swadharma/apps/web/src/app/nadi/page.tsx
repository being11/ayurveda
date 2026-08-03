import * as React from "react";
import nadiData from "../../data/nadi.json";
import { NadiDiagramCard } from "../../components/nadi/NadiDiagramCard";
import { PulseQualityTable } from "../../components/nadi/PulseQualityTable";

export default function NadiParikshaPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#4A7C59]">
            {nadiData.title}
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {nadiData.description}
          </p>
        </header>

        {/* Interactive Diagram Component */}
        <section>
          <NadiDiagramCard doshas={nadiData.doshas} />
        </section>

        {/* Detailed Table Component */}
        <section>
          <PulseQualityTable doshas={nadiData.doshas} />
        </section>

      </div>
    </main>
  );
}
