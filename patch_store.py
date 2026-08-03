with open('/app/swadharma/apps/web/src/stores/assessmentStore.ts', 'r') as f:
    content = f.read()

content = content.replace("""      isComplete: false,

      setAnswer: (questionId, value) => {""", """      isComplete: false,
      herbSearchQuery: '',
      herbDoshaFilter: null,

      setHerbSearchQuery: (query) => set({ herbSearchQuery: query }),
      setHerbDoshaFilter: (dosha) => set({ herbDoshaFilter: dosha }),

      setAnswer: (questionId, value) => {""")

content = content.replace("""          isComplete: false,
        });
        try {
          useAssessmentStore.persist.clearStorage();
        } catch {}""", """          isComplete: false,
          herbSearchQuery: '',
          herbDoshaFilter: null,
        });
        try {
          useAssessmentStore.persist.clearStorage();
        } catch {}""")


with open('/app/swadharma/apps/web/src/stores/assessmentStore.ts', 'w') as f:
    f.write(content)
