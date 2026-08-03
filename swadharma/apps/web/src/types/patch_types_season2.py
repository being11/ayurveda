with open('assessment.ts', 'r') as f:
    content = f.read()

content = content.replace("""  autoDetectSeason: boolean;
  setCurrentSeasonId: (seasonId: string | null) => void;
  setAutoDetectSeason: (autoDetect: boolean) => void;""", """  autoDetectSeason: () => void;
  setCurrentSeasonId: (seasonId: string | null) => void;""")

with open('assessment.ts', 'w') as f:
    f.write(content)
