import { ReactNode, Suspense } from 'react';

export const metadata = {
  title: 'Your Personalized Ayurvedic Guidance | SwaDharma Prakrti',
  description: 'Personalized Ayurvedic recommendations based on your unique constitutional assessment.'
};

export default function RecommendationsLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 py-12 flex justify-center"><p className="text-stone-500">Loading guidance...</p></div>}>
      {children}
    </Suspense>
  );
}
