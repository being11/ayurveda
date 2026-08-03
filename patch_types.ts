import fs from 'fs';

const file = 'swadharma/apps/web/src/types/assessment.ts';
let content = fs.readFileSync(file, 'utf-8');

if (!content.includes('export interface Herb')) {
content += `

export interface Herb {
  id: string;
  sanskritName: string;
  commonName: string;
  botanicalName: string;
  category?: string[];
  rasa: string[];
  virya: string;
  vipaka: string;
  prabhava: string;
  doshaMatrix: DoshaMatrix;
  organSystems: string[];
  benefits?: string[];
  contraindications?: string[];
  dosage?: string;
  useCases?: string[];
  description?: string;
}
`;
}

if (!content.includes('export interface RoutineData')) {
content += `

export interface RoutineData {
  routines: Record<string, DoshaRoutine>;
  seasons: Record<string, SeasonAdjustment>;
}
`;
}

fs.writeFileSync(file, content);
