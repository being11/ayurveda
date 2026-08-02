'use client';

import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { categories } from '@/src/data/index';
import { knowledgeGraph } from '@/src/data/knowledge';
import { Card, CardTitle } from '@/src/components/ui/card';
import { useEffect, useState } from 'react';
import { BookOpen, Search, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';



// Derived logic to map core.json observations to principles/colors
const getPrinciple = (observation: string): string => {
  if (observation.includes('Agni')) return 'Agni';
  if (observation.includes('Dhatu')) return 'Dhatu';
  if (observation.includes('Srotas')) return 'Srotas';
  if (observation.includes('Manas')) return 'Manas';
  if (observation.includes('Ojas')) return 'Ojas';
  if (observation.includes('Guna')) return 'Guna';
  if (observation.includes('Lifestyle') || observation.includes('Vihara')) return 'Lifestyle';

  // Default to Dosha if specific dosha names are present but not covered above
  if (observation.includes('Vata') || observation.includes('Pitta') || observation.includes('Kapha')) {
    return 'Dosha';
  }

  return 'All';
};

const getPrincipleColor = (observation: string): string => {
  const obsLower = observation.toLowerCase();

  if (obsLower.includes('agni')) return 'oklch(0.75 0.18 60)'; // Amber/fire

  if (obsLower.includes('vata')) return 'oklch(0.55 0.15 280)'; // Violet
  if (obsLower.includes('pitta')) return 'oklch(0.65 0.15 55)'; // Saffron
  if (obsLower.includes('kapha')) return 'oklch(0.50 0.12 160)'; // Forest

  if (obsLower.includes('dhatu')) return 'oklch(0.60 0.12 30)'; // Warm terracotta
  if (obsLower.includes('srotas')) return 'oklch(0.55 0.12 195)'; // Teal
  if (obsLower.includes('manas')) return 'oklch(0.45 0.15 275)'; // Deep indigo
  if (obsLower.includes('ojas')) return 'oklch(0.70 0.15 85)'; // Gold
  if (obsLower.includes('guna')) return 'oklch(0.65 0.10 15)'; // Soft rose

  return 'oklch(0.70 0.05 250)'; // Default neutral
};

// Filter pills definition
const FILTER_PILLS = ['All', 'Agni', 'Dosha', 'Dhatu', 'Srotas', 'Manas', 'Ojas', 'Guna', 'Lifestyle'];

export default function KnowledgeGraphPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const { answers } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allQuestions = categories.flatMap(cat => cat.questions);
  const observations = calculateObservations(allQuestions, answers);
  const userObsKeys = new Set(Object.keys(observations));
  const hasAnswers = Object.keys(answers).length > 0;

  // Enhance knowledge graph nodes with derived fields
  const enhancedKnowledge = knowledgeGraph.map(node => ({
    ...node,
    principle: getPrinciple(node.observation),
    color: getPrincipleColor(node.observation),
    isActivated: Array.from(userObsKeys).some(obsKey =>
      obsKey.toLowerCase().includes(node.observation.toLowerCase()) ||
      node.observation.toLowerCase().includes(obsKey.toLowerCase())
    )
  }));

  // Filtering
  const filteredKnowledge = enhancedKnowledge.filter(node => {
    const matchesPrinciple = activeFilter === 'All' || node.principle === activeFilter ||
      (activeFilter === 'Dosha' && (node.observation.includes('Vata') || node.observation.includes('Pitta') || node.observation.includes('Kapha')));

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      node.observation.toLowerCase().includes(searchLower) ||
      node.description.toLowerCase().includes(searchLower) ||
      node.classicalSources?.some(s => s.text.toLowerCase().includes(searchLower) || s.chapter.toLowerCase().includes(searchLower));

    return matchesPrinciple && matchesSearch;
  });

  // Sorting: Activated first, then alphabetical by observation
  const sortedKnowledge = [...filteredKnowledge].sort((a, b) => {
    if (a.isActivated && !b.isActivated) return -1;
    if (!a.isActivated && b.isActivated) return 1;
    return a.observation.localeCompare(b.observation);
  });

  const toggleExpand = (observation: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(observation)) {
      newExpanded.delete(observation);
    } else {
      newExpanded.add(observation);
    }
    setExpandedNodes(newExpanded);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-amber-100 rounded-full">
              <BookOpen className="w-8 h-8 text-amber-800" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">Classical Knowledge Graph</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Every inference in your profile is grounded in classical Ayurvedic texts. Here is the evidence trail behind your assessment.
          </p>

          <div className="pt-4 font-medium text-stone-700">
            {hasAnswers
              ? "Showing your activated observations"
              : "Explore the full classical reference library"}
          </div>
        </div>

        {/* Standalone Banner */}
        {!hasAnswers && (
          <div className="bg-white border-2 border-amber-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-stone-700 text-lg mb-4 font-serif italic">
              Complete the assessment to see which of these classical patterns apply to you.
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-amber-600 text-white shadow hover:bg-amber-700 h-10 px-6 py-2"
            >
              Begin Assessment &rarr;
            </Link>
          </div>
        )}

        {/* Search and Filters */}
        <div className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search observations, principles, or texts..."
              className="block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {FILTER_PILLS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeFilter === filter
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge Nodes Grid */}
        <div className="grid gap-6">
          <AnimatePresence>
            {sortedKnowledge.map((node, index) => {
              const isExpanded = expandedNodes.has(node.observation);

              return (
                <motion.div
                  key={node.observation}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <Card className="border-stone-200 hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white">
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: node.color }}
                    />

                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border"
                              style={{
                                color: node.color,
                                borderColor: node.color,
                                backgroundColor: `color-mix(in srgb, ${node.color} 10%, transparent)`
                              }}
                            >
                              {node.principle}
                            </span>
                            {node.isActivated && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <Check className="w-3 h-3" />
                                YOUR PATTERN
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-2xl font-serif text-stone-900">
                            {node.observation}
                          </CardTitle>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-1">Plain English</h4>
                          <p className="text-stone-700 leading-relaxed">{node.description}</p>
                        </div>

                        <div className="pt-2 border-t border-stone-100">
                          <button
                            onClick={() => toggleExpand(node.observation)}
                            className="flex items-center justify-between w-full text-left focus:outline-none group"
                          >
                            <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide group-hover:text-stone-700 transition-colors">Classical Basis</h4>
                            <div className="text-stone-400 group-hover:text-stone-600 transition-colors flex items-center text-sm gap-1">
                              {isExpanded ? (
                                <><span>Collapse</span><ChevronUp className="w-4 h-4" /></>
                              ) : (
                                <><span>Expand</span><ChevronDown className="w-4 h-4" /></>
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 p-4 bg-stone-50 rounded-lg border border-stone-200">
                                  <p className="text-stone-800 font-medium font-serif">
                                    {node.classicalSources && node.classicalSources.length > 0
                                      ? `${node.classicalSources[0]?.text}, ${node.classicalSources[0]?.chapter}`
                                      : 'Classical Source'}
                                  </p>
                                  <div className="mt-3 flex items-center gap-2">
                                    <span className="text-xs font-semibold text-stone-500">Related Dosha:</span>
                                    <span className="text-xs px-2 py-1 bg-white border border-stone-200 rounded text-stone-700">
                                      {node.observation.includes('Vata') ? 'Vata' :
                                       node.observation.includes('Pitta') ? 'Pitta' :
                                       node.observation.includes('Kapha') ? 'Kapha' :
                                       'Tridoshic / Varies'}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {sortedKnowledge.length === 0 && (
            <div className="text-center p-12 bg-white rounded-xl border border-stone-200 shadow-sm">
              <p className="text-stone-600 text-lg">
                No classical principles found matching your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* Footer: Primary Sources */}
        <div className="mt-16 pt-8 border-t border-stone-200">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 text-center">Primary Texts Referenced</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Charaka Samhita</h4>
              <p className="text-sm text-stone-600 mb-2 italic">Composed by Charaka, compiled by Dridhabala</p>
              <p className="text-sm text-stone-700">Primary text covering medicine, physiology, and lifestyle.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Sushruta Samhita</h4>
              <p className="text-sm text-stone-600 mb-2 italic">Attributed to Sushruta</p>
              <p className="text-sm text-stone-700">Primary text covering surgery, anatomy, and clinical medicine.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Ashtanga Hridayam</h4>
              <p className="text-sm text-stone-600 mb-2 italic">By Vagbhata (~7th century CE)</p>
              <p className="text-sm text-stone-700">Synthesis of Charaka and Sushruta traditions.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Bhavaprakasha</h4>
              <p className="text-sm text-stone-600 mb-2 italic">By Bhavamishra (~16th century CE)</p>
              <p className="text-sm text-stone-700">Includes detailed Dravyaguna (herbal medicine).</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
