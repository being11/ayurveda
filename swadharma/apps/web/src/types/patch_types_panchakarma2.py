with open('assessment.ts', 'r') as f:
    content = f.read()

content = content.replace("""export interface PanchakarmaTherapy {
  id: string;
  name: string;
  dosha: string;
  indicatedDoshas: string[];
  benefits: string[];
  contraindications: string[];
  duration: string;
}""", """export interface PanchakarmaTherapy {
  id: string;
  name: string;
  dosha: string;
  indicatedDoshas: string[];
  benefits: string[];
  contraindications: string[];
  duration: string;
  description?: string;
}""")

content = content.replace("""export interface PurvakarmaStep {
  id: string;
  task: string;
  description: string;
}""", """export interface PurvakarmaStep {
  id: string;
  step: string;
  task: string;
  description: string;
}""")

with open('assessment.ts', 'w') as f:
    f.write(content)
