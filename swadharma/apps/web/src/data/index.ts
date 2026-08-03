import introductionQs from './questions/introduction.json';
import bodyQs from './questions/body.json';
import digestionQs from './questions/digestion.json';
import sleepQs from './questions/sleep.json';
import emotionsQs from './questions/emotions.json';
import lifestyleQs from './questions/lifestyle.json';
import exerciseQs from './questions/exercise.json';
import reproductionQs from './questions/reproduction.json';
import skinHairQs from './questions/skin_hair.json';
import appetiteSensesQs from './questions/appetite_senses.json';
import mentalQs from './questions/mental.json';
import environmentQs from './questions/environment.json';
import spiritualityQs from './questions/spirituality.json';
import relationshipsQs from './questions/relationships.json';
import childhoodQs from './questions/childhood.json';
import agingQs from './questions/aging.json';
import type { Question, QuestionCategory } from '../types/assessment';

function makeCategory(
  id: string,
  title: string,
  questions: unknown[],
  description?: string
): QuestionCategory {
  return { id, title, ...(description && { description }), questions: questions as Question[] };
}

export const categories: QuestionCategory[] = [
  makeCategory('introduction', 'Identity & Baseline', introductionQs),
  makeCategory('body', 'Physical Constitution', bodyQs),
  makeCategory('digestion', 'Digestion & Metabolism (Agni)', digestionQs,
    'Understanding your Agni is the foundation of Ayurvedic assessment.'),
  makeCategory('sleep', 'Sleep Patterns (Nidra)', sleepQs),
  makeCategory('emotions', 'Emotions & Mental State (Manas)', emotionsQs),
  makeCategory('lifestyle', 'Lifestyle & Routine (Vihara)', lifestyleQs),
  makeCategory('exercise', 'Physical Activity & Exercise', exerciseQs),
  makeCategory('reproduction', 'Reproductive & Hormonal Health', reproductionQs),
  makeCategory('skin_hair', 'Skin, Hair & Sensory Health', skinHairQs),
  makeCategory('appetite_senses', 'Appetite, Cravings & Senses', appetiteSensesQs),
  makeCategory('mental', 'Mind, Memory & Stress', mentalQs),
  makeCategory('environment', 'Environment & Climate', environmentQs),
  makeCategory('spirituality', 'Spiritual Disposition', spiritualityQs),
  makeCategory('relationships', 'Relationships & Communication', relationshipsQs),
  makeCategory('childhood', 'Childhood Patterns', childhoodQs),
  makeCategory('aging', 'Aging & Longevity', agingQs),
].filter(cat => cat.questions.length > 0);
