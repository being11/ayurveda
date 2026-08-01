import coreKnowledge from './knowledge/core.json';

export interface KnowledgeNode {
  observation: string;
  classicalSource: string;
  description: string;
}

export const knowledgeGraph: KnowledgeNode[] = coreKnowledge as KnowledgeNode[];
