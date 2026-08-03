with open('assessment.ts', 'r') as f:
    content = f.read()

content += """

export interface PanchakarmaTherapy {
  id: string;
  name: string;
  dosha: string;
  indicatedDoshas: string[];
  benefits: string[];
  contraindications: string[];
  duration: string;
}

export interface PurvakarmaStep {
  id: string;
  task: string;
  description: string;
}
"""

with open('assessment.ts', 'w') as f:
    f.write(content)
