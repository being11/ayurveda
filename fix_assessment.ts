import fs from 'fs';

const typesFile = 'swadharma/apps/web/src/types/assessment.ts';
let typesData = fs.readFileSync(typesFile, 'utf-8');

typesData = typesData.replace(/export interface SeasonAdjustment \{\n  name: string;\n  routines: Record<string, DoshaRoutine>;\n  seasons: Record<string, SeasonAdjustment>;\n\}/, `export interface SeasonAdjustment {
  name: string;
  doshaFocus: string;
  adjustment: string;
}`);

typesData = typesData.replace(/export interface AssessmentState \{\n  herbSearchQuery: string;\n  herbDoshaFilter: string \| null;\n  herbOrganFilter: string \| null;\n  setHerbSearchQuery: \(query: string\) => void;\n  currentCategoryIndex: number;/, `export interface AssessmentState {
  answers: Record<string, string | string[]>;
  observations: Record<string, number>;
  herbSearchQuery: string;
  herbDoshaFilter: string | null;
  herbOrganFilter: string | null;
  setHerbSearchQuery: (query: string) => void;
  setHerbDoshaFilter: (dosha: string | null) => void;
  setHerbOrganFilter: (organ: string | null) => void;
  currentCategoryIndex: number;`);
  
typesData = typesData.replace(/  step\?: string;\n  id: string;\n  task: string;\n  description: string;\n  step\?: string;/, `  id: string;\n  task: string;\n  description: string;\n  step?: string;`);


fs.writeFileSync(typesFile, typesData);
