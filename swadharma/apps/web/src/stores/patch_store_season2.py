with open('assessmentStore.ts', 'r') as f:
    content = f.read()

content = content.replace("""      autoDetectSeason: true,
      setCurrentSeasonId: (seasonId) => set({ currentSeasonId: seasonId }),
      setAutoDetectSeason: (autoDetect) => set({ autoDetectSeason: autoDetect }),""", """      autoDetectSeason: () => {
        const month = new Date().getMonth();
        // 0-1: Shishira, 2-3: Vasanta, 4-5: Grishma, 6-7: Varsha, 8-9: Sharad, 10-11: Hemanta
        let seasonId = 'season_hemanta';
        if (month === 0 || month === 1) seasonId = 'season_shishira';
        if (month === 2 || month === 3) seasonId = 'season_vasanta';
        if (month === 4 || month === 5) seasonId = 'season_grishma';
        if (month === 6 || month === 7) seasonId = 'season_varsha';
        if (month === 8 || month === 9) seasonId = 'season_sharad';
        set({ currentSeasonId: seasonId });
      },
      setCurrentSeasonId: (seasonId) => set({ currentSeasonId: seasonId }),""")

with open('assessmentStore.ts', 'w') as f:
    f.write(content)
