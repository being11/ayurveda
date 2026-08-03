with open('assessmentStore.ts', 'r') as f:
    content = f.read()

content = content.replace("""      selectedSrotas: null,

      setAnswer:""", """      selectedSrotas: null,
      
      currentSeasonId: null,
      autoDetectSeason: true,
      setCurrentSeasonId: (seasonId) => set({ currentSeasonId: seasonId }),
      setAutoDetectSeason: (autoDetect) => set({ autoDetectSeason: autoDetect }),

      setAnswer:""")

with open('assessmentStore.ts', 'w') as f:
    f.write(content)
