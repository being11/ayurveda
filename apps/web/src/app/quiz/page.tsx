import { QuizEngine } from '@/src/components/quiz/QuizEngine';

export const metadata = {
  title: 'Dosha Quiz | SwaDharma Prakrti',
  description: 'Interactive multi-step dosha assessment quiz.'
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F2]">
      <QuizEngine />
    </main>
  );
}
