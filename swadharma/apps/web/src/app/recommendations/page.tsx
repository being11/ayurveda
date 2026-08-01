'use client';

import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { categories } from '@/src/data/index';
import { generateRecommendations, groupByCategory } from '@/src/engines/recommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { useEffect, useState } from 'react';
import { Leaf, Apple, Brain, Activity, Moon, Sun, Flame, Sparkles, Flower2, Dumbbell } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Bookmark, Printer } from 'lucide-react';
import Link from 'next/link';

export default function RecommendationsPage() {
  const [mounted, setMounted] = useState(false);
  const { answers, isComplete } = useAssessmentStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('swadharma_bookmarks');
    if (saved) {
      setSavedBookmarks(JSON.parse(saved));
    }
  }, []);

  if (!mounted) return null;

  const allQuestions = categories.flatMap(cat => cat.questions);
  const observations = calculateObservations(allQuestions, answers);
  const rankedRecs = generateRecommendations(observations);
  const groupedRecs = groupByCategory(rankedRecs);

  const availableCategories = Object.keys(groupedRecs);

  const toggleBookmark = (id: string) => {
    const newBookmarks = savedBookmarks.includes(id)
      ? savedBookmarks.filter(b => b !== id)
      : [...savedBookmarks, id];

    setSavedBookmarks(newBookmarks);
    localStorage.setItem('swadharma_bookmarks', JSON.stringify(newBookmarks));
  };

  const handlePrint = () => {
    window.print();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Diet': return <Apple className="w-5 h-5 text-amber-500" />;
      case 'Lifestyle': return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'Sleep': return <Moon className="w-5 h-5 text-indigo-500" />;
      case 'Mental': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'Exercise': return <Activity className="w-5 h-5 text-orange-500" />;
      case 'Seasonal': return <Sun className="w-5 h-5 text-yellow-600" />;
      case 'Spiritual': return <Flame className="w-5 h-5 text-amber-600" />;
      case 'Ojas': return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case "Women's Health": return <Flower2 className="w-5 h-5 text-rose-400" />;
      case "Men's Health": return <Dumbbell className="w-5 h-5 text-slate-500" />;
      default: return <Leaf className="w-5 h-5 text-stone-500" />;
    }
  };

  // Empty state handling
  if (!isComplete && rankedRecs.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center border-stone-200 shadow-sm p-8 bg-white">
          <p className="text-stone-700 text-lg mb-6">Complete your assessment to receive personalized guidance.</p>
          <Link href="/assessment">
            <Button className="bg-stone-800 hover:bg-stone-900 text-white">Begin Assessment →</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (isComplete && rankedRecs.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center border-stone-200 shadow-sm p-8 bg-white">
          <p className="text-stone-700 text-lg">Your assessment shows a remarkably balanced profile. Continue your current practices — and revisit seasonally.</p>
        </Card>
      </div>
    );
  }

  const displayedRecs = activeCategory === 'All'
    ? rankedRecs
    : groupedRecs[activeCategory] || [];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 relative">
          <h1 className="text-4xl font-serif font-bold text-stone-900">Your Personal Guidance</h1>
          <p className="text-lg text-stone-600 font-serif italic max-w-2xl mx-auto">
            Based on your assessment — not generic advice. Practical guidance rooted in Ayurvedic principles, tailored to your unique matrix.
          </p>
          <div className="absolute right-0 top-0 hidden sm:block">
            <Button variant="outline" size="sm" onClick={handlePrint} className="text-stone-600 border-stone-300">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        {availableCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center pb-4 border-b border-stone-200">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'All'
                  ? 'bg-stone-800 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              All
            </button>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeCategory === cat
                    ? 'bg-stone-800 text-white'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {getCategoryIcon(cat)}
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Recommendations List */}
        <div className="grid gap-6">
          {displayedRecs.map((item, index) => {
            const rec = 'recommendation' in item ? item.recommendation : item;
            const relevanceBadge = index < 3 && activeCategory === 'All' && ('relevanceScore' in item) ? (
              <span className="ml-auto text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full uppercase tracking-wider">
                Highly Relevant
              </span>
            ) : null;

            return (
              <Card key={rec.id} className="border-stone-200 shadow-sm bg-white overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3 border-b border-stone-100 flex flex-row items-center gap-3">
                  <div className="p-2 bg-stone-50 rounded-md border border-stone-100">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-serif text-stone-900">{rec.title}</CardTitle>
                    <p className="text-sm text-stone-500 font-medium">{rec.category}</p>
                  </div>
                  {relevanceBadge}
                  <button
                    onClick={() => toggleBookmark(rec.id)}
                    className="ml-auto md:ml-4 p-2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <Bookmark className={`w-5 h-5 ${savedBookmarks.includes(rec.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">

                  {rec.why && (
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wider">For you:</h4>
                      <p className="text-stone-700 italic border-l-2 border-stone-300 pl-4 py-1">{rec.why}</p>
                    </div>
                  )}

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wider">What to do:</h4>
                    <p className="text-stone-800 text-lg leading-relaxed">{rec.description}</p>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <details className="group border border-stone-200 rounded-lg bg-stone-50">
                      <summary className="font-medium cursor-pointer p-4 text-stone-700 select-none flex justify-between items-center">
                        <span>Classical Basis</span>
                        <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="px-4 pb-4 pt-1 border-t border-stone-200 text-stone-600 space-y-2">
                        <p>{rec.rationale}</p>
                        {rec.shastraRef && (
                          <p className="text-xs font-medium text-stone-500 uppercase mt-2">Source: {rec.shastraRef}</p>
                        )}
                      </div>
                    </details>

                    {rec.alternatives && rec.alternatives.length > 0 && (
                      <details className="group border border-stone-200 rounded-lg bg-white">
                        <summary className="font-medium cursor-pointer p-4 text-stone-700 select-none flex justify-between items-center">
                          <span>Alternatives</span>
                          <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <ul className="px-4 pb-4 pt-1 border-t border-stone-200 text-stone-600 list-disc list-inside space-y-1">
                          {rec.alternatives.map((alt, i) => (
                            <li key={i}>{alt}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 border-t border-stone-200">
          <Link href="/report">
            <Button variant="ghost" className="text-stone-600 hover:text-stone-900 hover:bg-stone-100">
              ← Back to Report
            </Button>
          </Link>
          <Link href="/knowledge-graph">
            <Button variant="ghost" className="text-stone-600 hover:text-stone-900 hover:bg-stone-100">
              View Knowledge Graph →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
