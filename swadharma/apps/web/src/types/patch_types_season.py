with open('assessment.ts', 'r') as f:
    content = f.read()

content = content.replace("""  isComplete: boolean;

  activeNadiPoint: DoshaType | null;""", """  isComplete: boolean;

  activeNadiPoint: DoshaType | null;

  currentSeasonId: string | null;
  autoDetectSeason: boolean;
  setCurrentSeasonId: (seasonId: string | null) => void;
  setAutoDetectSeason: (autoDetect: boolean) => void;""")


with open('assessment.ts', 'w') as f:
    f.write(content)
