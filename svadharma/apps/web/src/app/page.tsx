import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-stone-50 text-stone-900">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-stone-800">
          Svadharma Prakṛti
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 font-serif italic">
          Know the Self before attempting to heal the Self.
        </p>

        <div className="pt-8 space-y-6 text-lg text-stone-700 max-w-2xl mx-auto">
          <p>
            Not every person needs another dosha quiz that asks "Do cold drinks upset the stomach?" and then declares, with spectacular confidence, "Congratulations, 73% Vata."
          </p>
          <p>
            Ayurveda deserves better than internet personality tests wearing Sanskrit as a costume.
          </p>
        </div>

        <div className="pt-12">
          <Link href="/assessment">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-stone-800 hover:bg-stone-700">
              Begin Self-Discovery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
