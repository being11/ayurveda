import React from 'react';
import { NadiDiagramCard } from '../../components/nadi/NadiDiagramCard';
import { PulseQualityTable } from '../../components/nadi/PulseQualityTable';
import nadiData from '../../data/nadi.json';

export const metadata = {
  title: 'Nadi Pariksha Educational Guide',
  description: 'Learn the ancient Ayurvedic technique of pulse diagnosis.',
};

/**
 * NadiParikshaPage Component
 * 
 * Renders the educational guide for Nadi Pariksha (Pulse Diagnosis).
 * Displays the interactive Nadi Diagram Card and the Pulse Quality Table.
 *
 * @returns {JSX.Element} The Nadi Pariksha educational page.
 */
export default function NadiParikshaPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#4A7C59] font-serif tracking-tight">
            {nadiData.title}
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {nadiData.description}
          </p>
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* Interactive Nadi Diagram */}
          <section className="flex justify-center">
            <div className="w-full max-w-md">
              <NadiDiagramCard />
            </div>
          </section>

          {/* Pulse Characteristics Table */}
          <section>
            <PulseQualityTable />
          </section>

        </div>
        
        {/* Educational Note */}
        <section className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-sm text-stone-500 text-center">
          <p>
            * Note: Nadi Pariksha is a deep science that requires years of practice under a trained Vaidya (Ayurvedic physician). 
            This guide is intended for educational purposes to help you understand the fundamental concepts.
          </p>
        </section>

      </div>
    </div>
  );
}
