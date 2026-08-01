import coreKnowledge from './knowledge/core.json';

export interface ClassicalSource {
  text: string;
  chapter: string;
  quote: string;
  translation: string;
}

export interface KnowledgeNode {
  observation: string;
  principle: string;
  dosha: string[];
  classicalSources: ClassicalSource[];
  description: string;
  plainEnglish: string;
  implications: string[];
}

export const knowledgeGraph: KnowledgeNode[] = coreKnowledge as KnowledgeNode[];
