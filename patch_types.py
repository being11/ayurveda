with open('/app/swadharma/apps/web/src/types/assessment.ts', 'r') as f:
    content = f.read()

content = content.replace("""  isComplete: boolean;

  setAnswer: (questionId: string, value: string | string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  reset: () => void;
}""", """  isComplete: boolean;
  herbSearchQuery: string;
  herbDoshaFilter: string | null;

  setAnswer: (questionId: string, value: string | string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  reset: () => void;

  setHerbSearchQuery: (query: string) => void;
  setHerbDoshaFilter: (dosha: string | null) => void;
}""")

with open('/app/swadharma/apps/web/src/types/assessment.ts', 'w') as f:
    f.write(content)
