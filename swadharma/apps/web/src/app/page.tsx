'use client';

import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '../stores/assessmentStore';
import { useEffect, useState } from 'react';
import {
  Flame, Moon, Brain, Leaf, Sparkles, HeartPulse, Shield, Activity,
  CloudLightning, Utensils, BicepsFlexed, Dna, Flower2, Users,
  Baby, CalendarClock
} from 'lucide-react';

export default function Home() {
  const { isComplete, answers } = useAssessmentStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inProgress = mounted && Object.keys(answers).length > 0 && !isComplete;

  const categories = [
    { icon: Flame, label: 'Agni (Digestive Fire)' },
    { icon: Moon, label: 'Nidra (Sleep)' },
    { icon: Brain, label: 'Manas (Mind)' },
    { icon: Leaf, label: 'Vihara (Lifestyle)' },
    { icon: Sparkles, label: 'Ojas (Vitality)' },
    { icon: HeartPulse, label: 'Artava / Shukra' },
    { icon: Shield, label: 'Dhatu (Tissues)' },
    { icon: Activity, label: 'Srotas (Channels)' },
    { icon: CloudLightning, label: 'Climate Sensitivity' },
    { icon: Utensils, label: 'Diet & Cravings' },
    { icon: BicepsFlexed, label: 'Physical Constitution' },
    { icon: Dna, label: 'Genetic Tendencies' },
    { icon: Flower2, label: 'Spiritual Disposition' },
    { icon: Users, label: 'Relationships' },
    { icon: Baby, label: 'Childhood Patterns' },
    { icon: CalendarClock, label: 'Seasonal Cycles' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#1a1814] to-[#2e261f] text-stone-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl space-y-8 z-10"
        >
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-[#d4af37] drop-shadow-sm">
            स्वधर्म
          </h1>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#d4af37] drop-shadow-sm">
            SwaDharma Prakṛti
          </h2>

          <p className="text-xl md:text-2xl text-[#f5f5dc] font-serif italic max-w-2xl mx-auto">
            &quot;Know the Self before attempting to heal the Self.&quot;
          </p>
          <p className="text-sm md:text-base text-[#f5f5dc]/80">
            — Classical Ayurvedic principle
          </p>

          <div className="w-24 h-px bg-[#d4af37]/50 mx-auto my-8" />

          <p className="text-lg md:text-xl text-[#f5f5dc]/90 font-light max-w-2xl mx-auto pb-4">
            A comprehensive Ayurvedic self-identification system.<br/>
            Not a quiz that labels you. An inquiry that reveals you.
          </p>

          <div className="pt-8 flex flex-col items-center space-y-4">
            <Link href="/assessment">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-[#d4af37] text-stone-900 hover:bg-[#ebd074] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Begin Self-Discovery →
              </Button>
            </Link>

            {inProgress && (
              <Link href="/assessment" className="text-sm text-[#f5f5dc]/70 hover:text-[#d4af37] transition-colors underline underline-offset-4">
                Already started? Continue your assessment →
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 bg-[#fdfbf7] text-stone-900 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 text-center mb-12">
            Not another dosha quiz.
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-stone-700 leading-relaxed font-light">
            <p>
              Not every person needs another dosha quiz that asks &apos;Do cold drinks upset your stomach?&apos;
              and then declares, with spectacular confidence, &apos;Congratulations, 73% Vata.&apos;
            </p>
            <p>
              Ayurveda deserves better than internet personality tests wearing Sanskrit as a costume.
            </p>
            <p>
              Your constitution is not a label. It is a living, contextual understanding —
              shaped by your constitution, your current state, your age, your season, your geography,
              and your life stage. SwaDharma Prakṛti maps all of this.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="py-32 px-8 bg-stone-900 text-stone-100 flex justify-center">
        <div className="max-w-5xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-[#d4af37]"
          >
            What we explore together
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center text-center p-6 bg-stone-800/50 rounded-2xl border border-stone-700/50 hover:bg-stone-800 transition-colors"
              >
                <cat.icon className="w-8 h-8 mb-4 text-[#d4af37]" strokeWidth={1.5} />
                <span className="text-sm md:text-base font-medium text-stone-300">{cat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-8 bg-[#fdfbf7] text-stone-900 flex justify-center">
        <div className="max-w-5xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-stone-800"
          >
            One question at a time
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
            {[
              { step: '1', title: 'Question', desc: 'You answer naturally, conversationally.' },
              { step: '2', title: 'Pattern Recognition', desc: 'The engine maps your answers to classical principles.' },
              { step: '3', title: 'Your Profile', desc: 'A nuanced, multi-dimensional report grounded in classical texts.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-2xl font-serif font-bold text-[#d4af37] mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-stone-600 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center p-8 bg-stone-100 rounded-2xl text-stone-600 italic"
          >
            Questions adapt to you — based on your gender, age, and previous answers.
            <br className="hidden md:block"/> Average time: 20–40 minutes. Save and continue anytime.
          </motion.div>
        </div>
      </section>

      {/* Classical Grounding Section */}
      <section className="py-32 px-8 bg-[#f5f5f0] text-stone-900 flex justify-center border-y border-stone-200 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl text-center space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">
            Rooted in 3,000 years of classical medicine
          </h2>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-lg md:text-xl font-serif font-medium text-stone-600">
            <span>Charaka Saṃhitā</span>
            <span className="hidden md:inline">•</span>
            <span>Suśruta Saṃhitā</span>
            <span className="hidden md:inline">•</span>
            <span>Aṣṭāṅga Hṛdayam</span>
            <span className="hidden md:inline">•</span>
            <span>Bhāvaprakāśa</span>
          </div>

          <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Every inference in SwaDharma Prakṛti is traceable to a specific chapter and verse
            of classical Ayurvedic texts. This is not wellness content — it is classical medicine,
            made accessible.
          </p>

          <div>
            <Link href="/knowledge-graph" className="inline-block text-[#b38f20] hover:text-[#d4af37] font-medium transition-colors underline underline-offset-4">
              View Knowledge Graph →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-8 bg-[#1a1814] text-stone-100 flex justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-10"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#d4af37]">
            Begin your inquiry
          </h2>

          <div className="space-y-2 text-stone-300 font-light text-lg">
            <p>Your profile takes 20–40 minutes.</p>
            <p>No account required. Your data stays in your browser.</p>
            <p>Revisit and retake as seasons change.</p>
          </div>

          <div className="pt-4">
            <Link href="/assessment">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-[#d4af37] text-stone-900 hover:bg-[#ebd074] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Begin Self-Discovery →
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
