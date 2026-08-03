with open('assessment.ts', 'r') as f:
    content = f.read()

# Fix duplicate Herb interface and duplicate AssessmentState fields

content = content.replace("""export interface Herb {
  id: string;
  sanskritName: string;
  commonName: string;
  botanicalName: string;
  rasa: string[];
  virya: string;
  vipaka: string;
  prabhava: string;
  doshaMatrix: {
    vata: string;
    pitta: string;
    kapha: string;
  };
  organSystems: string[];
  useCases: string[];
  description: string;
}""", "")

content = content.replace("""export interface Herb {
  id: string;
  sanskritName: string;
  commonName: string;
  botanicalName: string;
  rasa: string[];
  virya: string;
  vipaka: string;
  prabhava?: string;
  doshaMatrix: DoshaMatrix;
  organSystems: string[];
  useCases: string[];
  description: string;
}""", "")

content = content.replace("""export interface Herb {
  id: string;
  sanskritName: string;
  commonName: string;
  botanicalName: string;
  rasa: string[];
  virya: string;
  vipaka: string;
  prabhava: string;
  doshaMatrix: Record<string, string>;
  organSystems: string[];
  useCases?: string[];
  description?: string;
  traditionalUses?: string[];
  cautions?: string[];
}""", """export interface Herb {
  id: string;
  sanskritName: string;
  commonName: string;
  botanicalName: string;
  rasa: string[];
  virya: string;
  vipaka: string;
  prabhava: string;
  doshaMatrix: Record<string, string>;
  organSystems: string[];
  useCases?: string[];
  description?: string;
  traditionalUses?: string[];
  cautions?: string[];
}""")

content = content.replace("""  herbSearchQuery: string;
  herbDoshaFilter: string;
  herbOrganFilter: string;
  setHerbSearchQuery: (query: string) => void;
  setHerbDoshaFilter: (dosha: string) => void;
  setHerbOrganFilter: (organ: string) => void;""", "")

with open('assessment.ts', 'w') as f:
    f.write(content)
