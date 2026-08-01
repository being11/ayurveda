'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { computeProfile, getDominantDosha, getConstitutionDescription } from '@/src/engines/report';
import { categories } from '@/src/data/index';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Activity, Moon, Sparkles, Shield, Flame, Brain, Leaf, Battery, Search, Apple, ActivitySquare, Calendar, Flower2, RefreshCcw, BookOpen, Download, Network } from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { answers, isComplete, reset } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isComplete && Object.keys(answers).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl mb-4 font-serif">No assessment data found.</h2>
        <Button onClick={() => router.push('/')}>Start Assessment</Button>
      </div>
    );
  }

  const allQuestions = categories.flatMap(cat => cat.questions);
  const observations = calculateObservations(allQuestions, answers);
  const profile = computeProfile(observations, answers);

  const { prakrtiDosha, agni, manas, ojas, observations: obsList } = profile;
  const domDosha = getDominantDosha(prakrtiDosha);
  const constitutionDesc = getConstitutionDescription(prakrtiDosha);

  const hasDhatu = obsList.some(o => o.key.toLowerCase().includes('dhatu'));

  const topObs = [...obsList].slice(0, 5);

  const handleRetake = () => {
    reset();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 print:pt-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Your SwaDharma Profile
          </h1>
          <p className="text-lg md:text-xl text-stone-600 font-serif italic max-w-2xl mx-auto">
            A comprehensive, classically-grounded view of your unique constitution and tendencies.
          </p>
        </div>

        {/* Section 1: Constitution Summary */}
        <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-serif">Constitution Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-xl font-medium text-stone-800">{domDosha} Dominant</span>
              <p className="text-stone-600">{constitutionDesc}</p>
            </div>

            {/* Visual Dosha Proportion Bar */}
            <div className="h-4 w-full flex rounded-full overflow-hidden bg-stone-200">
              <div
                className="h-full transition-all duration-1000"
                style={{ width: `${prakrtiDosha.vata * 100}%`, backgroundColor: 'oklch(0.55 0.15 280)' }}
                title={`Vata: ${Math.round(prakrtiDosha.vata * 100)}%`}
              />
              <div
                className="h-full transition-all duration-1000"
                style={{ width: `${prakrtiDosha.pitta * 100}%`, backgroundColor: 'oklch(0.65 0.15 60)' }}
                title={`Pitta: ${Math.round(prakrtiDosha.pitta * 100)}%`}
              />
              <div
                className="h-full transition-all duration-1000"
                style={{ width: `${prakrtiDosha.kapha * 100}%`, backgroundColor: 'oklch(0.50 0.12 160)' }}
                title={`Kapha: ${Math.round(prakrtiDosha.kapha * 100)}%`}
              />
            </div>
            <div className="flex justify-between text-sm text-stone-500 font-medium px-1">
              <span style={{ color: 'oklch(0.55 0.15 280)' }}>Vata</span>
              <span style={{ color: 'oklch(0.65 0.15 60)' }}>Pitta</span>
              <span style={{ color: 'oklch(0.50 0.12 160)' }}>Kapha</span>
            </div>
            <p className="text-sm text-stone-500 text-center italic mt-4">
              Note: Current state (Vikrti) may slightly differ from your baseline Prakrti based on recent lifestyle patterns.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1 print:gap-6">
          {/* Section 2: Agni */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-orange-500"><Flame className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Agni (Digestive Fire)</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-stone-800 capitalize mb-2">{agni} Agni</h4>
              <p className="text-stone-600 mb-4">
                {agni === 'vishama' && "Your digestion is variable—sometimes strong, sometimes weak. Prone to gas or bloating."}
                {agni === 'tikshna' && "Your digestion is sharp and intense. You process food quickly but may experience acidity or heat."}
                {agni === 'manda' && "Your digestion is slow and steady. You may feel heavy or lethargic after eating."}
                {agni === 'sama' && "Your digestion is balanced and stable. You easily process meals without discomfort."}
                {agni === 'unknown' && "Not enough data to determine your dominant Agni type."}
              </p>
              <p className="text-sm text-stone-700 bg-stone-100 p-3 rounded-md">
                <strong>Key Habit:</strong>{' '}
                {agni === 'vishama' && "Eat warm, grounding meals at consistent times daily."}
                {agni === 'tikshna' && "Avoid overly spicy or sour foods; favor cooling, satisfying meals."}
                {agni === 'manda' && "Incorporate warming spices like ginger; favor light, easily digestible foods."}
                {agni === 'sama' && "Maintain your current healthy routines and mindful eating practices."}
                {agni === 'unknown' && "Listen to your body and eat when naturally hungry."}
              </p>
            </CardContent>
          </Card>

          {/* Section 3: Nidra */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-indigo-500"><Moon className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Nidra (Sleep)</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-stone-800 mb-2">Sleep Pattern</h4>
              <p className="text-stone-600 mb-4">
                {obsList.some(o => o.key.toLowerCase().includes('vata nidra'))
                  ? "Your sleep tends to be light, elusive, or easily disturbed. Your mind may race at night."
                  : obsList.some(o => o.key.toLowerCase().includes('pitta nidra'))
                  ? "You typically sleep well but may wake up hot or highly alert in the middle of the night."
                  : obsList.some(o => o.key.toLowerCase().includes('kapha nidra'))
                  ? "Your sleep is deep and heavy. You may struggle to wake up and feel groggy in the mornings."
                  : "Your sleep patterns appear relatively balanced or mixed."}
              </p>
              <p className="text-sm text-stone-700 bg-stone-100 p-3 rounded-md">
                <strong>Suggestion:</strong>{' '}
                {obsList.some(o => o.key.toLowerCase().includes('vata nidra'))
                  ? "Grounding evening routines, like warm oil massage (Abhyanga) or warm milk, can help anchor the mind."
                  : obsList.some(o => o.key.toLowerCase().includes('pitta nidra'))
                  ? "Ensure your room is cool and avoid intense, stimulating activities before bed."
                  : obsList.some(o => o.key.toLowerCase().includes('kapha nidra'))
                  ? "Waking up earlier, ideally before sunrise (Brahmamuhurta), can prevent morning sluggishness."
                  : "Maintain a consistent sleep-wake cycle."}
              </p>
            </CardContent>
          </Card>

          {/* Section 4: Manas */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-purple-500"><Brain className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Manas (Mind & Emotions)</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-stone-800 mb-2 capitalize">{manas.replace('_', ' ')}</h4>
              <p className="text-stone-600 mb-4">
                {manas === 'vata_dominant' && "Your mind is quick, creative, and enthusiastic, but prone to overthinking, anxiety, and scattered energy under stress."}
                {manas === 'pitta_dominant' && "Your mind is sharp, focused, and logical, but prone to irritability, frustration, and critical thoughts under stress."}
                {manas === 'kapha_dominant' && "Your mind is calm, steady, and compassionate, but prone to stubbornness, attachment, or mental lethargy under stress."}
                {manas === 'balanced' && "Your mental state is adaptable and relatively balanced among the mental tendencies."}
                {manas === 'unknown' && "Not enough data to classify mental tendencies."}
              </p>
              <p className="text-sm text-stone-700 bg-stone-100 p-3 rounded-md">
                <strong>Stress Response:</strong>{' '}
                {manas === 'vata_dominant' && "Requires grounding, routine, and slowing down."}
                {manas === 'pitta_dominant' && "Requires cooling down, stepping back, and relaxing expectations."}
                {manas === 'kapha_dominant' && "Requires gentle stimulation, new experiences, and movement."}
                {manas === 'balanced' && "Maintain mindful awareness during challenges."}
                {manas === 'unknown' && "Practice general mindfulness and self-compassion."}
              </p>
            </CardContent>
          </Card>

          {/* Section 5: Vihara */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-emerald-500"><Leaf className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Vihara (Lifestyle)</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-stone-800 mb-2">Environmental Sensitivities</h4>
              <p className="text-stone-600 mb-4">
                {prakrtiDosha.vata > 0.4 && "You are likely sensitive to cold, wind, and dry environments. Irregular routines can quickly unground you."}
                {prakrtiDosha.pitta > 0.4 && "You are likely sensitive to heat, humidity, and intense sun. Over-scheduling can easily lead to burnout."}
                {prakrtiDosha.kapha > 0.4 && "You are likely sensitive to cold, damp, and cloudy weather. Stagnation or excessive comfort can lead to lethargy."}
                {prakrtiDosha.vata <= 0.4 && prakrtiDosha.pitta <= 0.4 && prakrtiDosha.kapha <= 0.4 && "You have a balanced resilience to various environments."}
              </p>
              <p className="text-sm text-stone-700 bg-stone-100 p-3 rounded-md">
                <strong>Observation:</strong> Focus on maintaining daily rhythms (Dinacharya) that counter your sensitivities.
              </p>
            </CardContent>
          </Card>

          {/* Section 6: Ojas */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300 md:col-span-2">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-yellow-500"><Battery className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Ojas (Vitality & Immunity)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <h4 className="font-semibold text-stone-800 capitalize">Level: {ojas}</h4>
                <p className="text-stone-600">
                  {ojas === 'high' && "Your vitality and resilience appear strong. You likely have good endurance and stable immunity."}
                  {ojas === 'moderate' && "Your vitality is stable but may fluctuate with stress or poor routines. Building reserves is beneficial."}
                  {ojas === 'low' && "Your vitality appears depleted. You may feel exhausted, easily overwhelmed, or susceptible to illness."}
                  {ojas === 'unknown' && "Not enough data to determine Ojas levels."}
                </p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="w-full h-4 bg-stone-200 rounded-full overflow-hidden flex">
                    <div className={`h-full transition-all duration-1000 ${ojas === 'low' ? 'w-1/3 bg-red-400' : ojas === 'moderate' ? 'w-2/3 bg-yellow-400' : ojas === 'high' ? 'w-full bg-green-500' : 'w-0'}`} />
                </div>
                <div className="flex justify-between w-full text-xs text-stone-500 mt-1 px-1">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Dhatu Insights (Conditional) */}
          {hasDhatu && (
            <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300 md:col-span-2">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-2 bg-stone-100 rounded-full text-teal-500"><Search className="w-6 h-6" /></div>
                <CardTitle className="text-xl font-serif">Dhatu (Tissue) Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  {obsList
                    .filter(o => o.key.toLowerCase().includes('dhatu') || o.key.toLowerCase().includes('rasa') || o.key.toLowerCase().includes('rakta') || o.key.toLowerCase().includes('mamsa') || o.key.toLowerCase().includes('meda') || o.key.toLowerCase().includes('asthi') || o.key.toLowerCase().includes('majja') || o.key.toLowerCase().includes('shukra') || o.key.toLowerCase().includes('artava'))
                    .map((obs, i) => (
                      <li key={i}>{obs.key.replace(/dhatu/i, 'Tissue (Dhatu)')}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Section 8: Diet Guide */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-red-400"><Apple className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Diet Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-stone-800 text-sm uppercase tracking-wider">Tastes to Favor</h4>
                  <p className="text-stone-600">
                    {domDosha === 'Vata' && "Sweet, Sour, Salty (warm, heavy, moist)."}
                    {domDosha === 'Pitta' && "Sweet, Bitter, Astringent (cool, refreshing, dry)."}
                    {domDosha === 'Kapha' && "Pungent, Bitter, Astringent (warm, light, dry)."}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 text-sm uppercase tracking-wider">Meal Timing</h4>
                  <p className="text-stone-600">
                    {domDosha === 'Vata' && "Regular small meals to stabilize energy."}
                    {domDosha === 'Pitta' && "Never skip meals; largest meal at noon."}
                    {domDosha === 'Kapha' && "Two meals a day is often enough; light dinner."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 9: Exercise Profile */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-blue-500"><ActivitySquare className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Exercise Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-stone-800 text-sm uppercase tracking-wider">Ideal Movement</h4>
                  <p className="text-stone-600">
                    {domDosha === 'Vata' && "Gentle, grounding: Walking, gentle Yoga, Tai Chi. Avoid depletion."}
                    {domDosha === 'Pitta' && "Moderate, cooling: Swimming, cycling, brisk walking. Avoid excessive competition."}
                    {domDosha === 'Kapha' && "Vigorous, stimulating: Running, aerobics, vinyasa flow. Break a sweat daily."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 10: Seasonal Guide */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-orange-400"><Calendar className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Seasonal Adaptation (Ritucharya)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-stone-600 mb-2">Ayurveda adjusts habits based on the seasons to maintain balance.</p>
              <ul className="space-y-2 text-stone-700 text-sm">
                <li><strong>Summer:</strong> {domDosha === 'Pitta' ? "Crucial time to stay cool and hydrated." : "Enjoy the warmth, but stay hydrated."}</li>
                <li><strong>Autumn/Early Winter:</strong> {domDosha === 'Vata' ? "Crucial time for warm routines and oil massage." : "Focus on grounding."}</li>
                <li><strong>Late Winter/Spring:</strong> {domDosha === 'Kapha' ? "Crucial time for cleansing and vigorous exercise." : "Lighten the diet slightly."}</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 11: Spiritual Profile */}
          <Card className="border-stone-200 shadow-sm print:shadow-none print:border-stone-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-stone-100 rounded-full text-violet-500"><Flower2 className="w-6 h-6" /></div>
              <CardTitle className="text-xl font-serif">Spiritual Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-stone-800 text-sm uppercase tracking-wider">Contemplative Practice</h4>
                  <p className="text-stone-600">
                    {manas === 'vata_dominant' && "Focus on mantra and guided meditation to anchor the wandering mind."}
                    {manas === 'pitta_dominant' && "Focus on loving-kindness (Metta) and silent observation to cool intensity."}
                    {manas === 'kapha_dominant' && "Focus on active visualization or walking meditation to maintain alertness."}
                    {manas === 'balanced' && "Self-inquiry and silent sitting."}
                    {manas === 'unknown' && "Mindfulness of breath."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 12: One-Page Snapshot (Print only visually, or at bottom) */}
        <div className="mt-16 pt-8 border-t border-stone-200 print:break-before-page">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-stone-900">Snapshot Summary</h2>
            <p className="text-stone-500">{new Date().toLocaleDateString()}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
            <div className="p-4 bg-stone-100 rounded-lg print:border print:border-stone-300">
              <p className="text-sm text-stone-500 uppercase tracking-wide">Constitution</p>
              <p className="font-serif font-bold text-xl text-stone-800">{domDosha}</p>
            </div>
            <div className="p-4 bg-stone-100 rounded-lg print:border print:border-stone-300">
              <p className="text-sm text-stone-500 uppercase tracking-wide">Agni</p>
              <p className="font-serif font-bold text-xl text-stone-800 capitalize">{agni}</p>
            </div>
            <div className="p-4 bg-stone-100 rounded-lg print:border print:border-stone-300">
              <p className="text-sm text-stone-500 uppercase tracking-wide">Ojas</p>
              <p className="font-serif font-bold text-xl text-stone-800 capitalize">{ojas}</p>
            </div>
            <div className="p-4 bg-stone-100 rounded-lg print:border print:border-stone-300">
              <p className="text-sm text-stone-500 uppercase tracking-wide">Manas</p>
              <p className="font-serif font-bold text-xl text-stone-800 capitalize">{manas.replace('_', ' ')}</p>
            </div>
          </div>

          <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
            <h3 className="font-serif font-bold text-lg mb-4">Top Physiological Observations</h3>
            <ul className="space-y-2">
              {topObs.map((obs, i) => (
                <li key={i} className="flex justify-between items-center border-b border-stone-200 pb-2 last:border-0">
                  <span className="text-stone-700">{obs.key}</span>
                  <span className="text-xs bg-stone-200 text-stone-600 px-2 py-1 rounded-full">Weight: {obs.weight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-4 pt-12 pb-24 print:hidden">
          <Button variant="outline" onClick={handleRetake} size="lg" className="px-6">
            <RefreshCcw className="w-4 h-4 mr-2" /> Retake Assessment
          </Button>
          <Button variant="outline" onClick={() => router.push('/recommendations')} size="lg" className="px-6">
            <BookOpen className="w-4 h-4 mr-2" /> Recommendations
          </Button>
          <Button variant="outline" onClick={() => router.push('/knowledge-graph')} size="lg" className="px-6">
            <Network className="w-4 h-4 mr-2" /> Knowledge Graph
          </Button>
          <Button size="lg" className="px-6 bg-stone-800 hover:bg-stone-700 text-white" onClick={() => window.print()}>
            <Download className="w-4 h-4 mr-2" /> Print / Export PDF
          </Button>
        </div>

      </div>
    </div>
  );
}
