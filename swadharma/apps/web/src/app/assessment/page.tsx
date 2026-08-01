import AssessmentEngine from '@/src/components/AssessmentEngine';

export const metadata = {
  title: 'Begin Your Self-Discovery | SwaDharma Prakrti',
  description: 'A comprehensive, classical Ayurvedic self-assessment. One thoughtful question at a time.'
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <AssessmentEngine />
    </main>
  );
}
