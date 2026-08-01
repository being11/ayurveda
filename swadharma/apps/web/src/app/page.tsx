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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-8 text-center bg-[#faf8f5] text-stone-900 overflow-hidden border-b border-stone-200/80">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl space-y-8 z-10"
        >
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-[#967414]">
            स्वधर्म
          </h1>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#7a5e0f]">
            SwaDharma Prakṛti
          </h2>

          <p className="text-xl md:text-2xl font-serif italic text-stone-600 max-w-2xl mx-auto">
            &ldquo;Know the Self before attempting to heal the Self.&rdquo;
          </p>

          <div className="w-24 h-px bg-[#967414]/30 mx-auto my-8" />

          <p className="text-lg md:text-xl text-stone-700 max-w-2xl mx-auto font-light leading-relaxed">
            A comprehensive, classical Ayurvedic self-identification system. Not a quiz that labels you — an inquiry that reveals you.
          </p>

          <div className="pt-4">
            <Link href="/assessment">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-[#967414] text-white hover:bg-[#7a5e0f] shadow-md hover:shadow-lg transition-all duration-300"
              >
                Begin Self-Discovery →
              </Button>
            </Link>
          </div>

          {mounted && inProgress && (
            <p className="text-sm text-stone-500 pt-2">
              Assessment in progress.{' '}
              <Link href="/assessment" className="text-[#967414] hover:underline font-medium">
                Continue where you left off →
              </Link>
            </p>
          )}
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-8 bg-white text-stone-900 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Not another dosha quiz.
          </h2>

          <div className="space-y-6 text-lg text-stone-700 leading-relaxed font-light text-left md:text-center">
            <p>
              Not every person needs another online test that asks &ldquo;Do cold drinks upset your stomach?&rdquo; and then declares, with spectacular confidence, &ldquo;Congratulations, 73% Vata.&rdquo;
            </p>
            <p>
              Ayurveda deserves better than internet personality tests wearing Sanskrit as a costume.
            </p>
            <p className="font-serif italic text-xl text-[#967414]">
              Your constitution is not a label. It is a living, contextual understanding — shaped by your baseline Prakṛti, your current Vikṛti, your age, your environment, your stress, and your life stage.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-8 bg-[#f5f2eb] text-stone-900 flex justify-center border-y border-stone-200/80">
        <div className="max-w-5xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-stone-900"
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
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:border-[#967414]/40 hover:shadow-md transition-all"
              >
                <cat.icon className="w-8 h-8 mb-4 text-[#967414]" strokeWidth={1.5} />
                <span className="text-sm md:text-base font-medium text-stone-800">{cat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-8 bg-white text-stone-900 flex justify-center">
        <div className="max-w-5xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-stone-900"
          >
            One question at a time
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-[#faf8f5] rounded-2xl border border-stone-200/80 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#967414]/10 flex items-center justify-center text-xl font-serif font-bold text-[#967414]">
                1
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">Conversational Inquiry</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Respond to deep, experiential questions crafted to feel like a consultation with a classical Vaidya.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-[#faf8f5] rounded-2xl border border-stone-200/80 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#967414]/10 flex items-center justify-center text-xl font-serif font-bold text-[#967414]">
                2
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">Multi-Dimensional Scoring</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Answers map to observations across Agni, Nidra, Manas, Dhatu, and Srotas — not simple dosha checkboxes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-[#faf8f5] rounded-2xl border border-stone-200/80 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#967414]/10 flex items-center justify-center text-xl font-serif font-bold text-[#967414]">
                3
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">Textual Grounding</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Every insight is linked directly to primary sources: Charaka, Sushruta, and Vagbhata.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-stone-500 text-sm italic">
              Questions dynamically adapt based on your gender, age, and previous answers.
            </p>
          </div>
        </div>
      </section>

      {/* Classical Grounding Section */}
      <section className="py-24 px-8 bg-[#f5f2eb] text-stone-900 flex justify-center text-center border-y border-stone-200/80">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
            Rooted in Classical Shastra
          </h2>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-serif font-medium text-stone-700">
            <span className="px-4 py-2 bg-white rounded-full border border-stone-300/60 shadow-xs">
              Charaka Saṃhitā
            </span>
            <span className="px-4 py-2 bg-white rounded-full border border-stone-300/60 shadow-xs">
              Suśruta Saṃhitā
            </span>
            <span className="px-4 py-2 bg-white rounded-full border border-stone-300/60 shadow-xs">
              Aṣṭāṅga Hṛdayam
            </span>
            <span className="px-4 py-2 bg-white rounded-full border border-stone-300/60 shadow-xs">
              Bhāvaprakāśa
            </span>
          </div>

          <p className="text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
            We provide full transparency into the classical evidence behind your report. Explore our open Knowledge Graph to trace every observation back to its original verse.
          </p>

          <div>
            <Link href="/knowledge-graph" className="inline-block text-[#967414] hover:text-[#7a5e0f] font-medium transition-colors underline underline-offset-4">
              View Knowledge Graph →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-8 bg-white text-stone-900 flex justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Begin your inquiry
          </h2>

          <div className="space-y-2 text-stone-600 font-light text-lg">
            <p>Your profile takes 20–40 minutes.</p>
            <p>No account required. Your data stays in your browser.</p>
            <p>Revisit and retake as seasons change.</p>
          </div>

          <div className="pt-4">
            <Link href="/assessment">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-[#967414] text-white hover:bg-[#7a5e0f] shadow-md hover:shadow-lg transition-all duration-300"
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
