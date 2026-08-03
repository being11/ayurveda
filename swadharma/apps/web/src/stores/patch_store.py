with open('assessmentStore.ts', 'r') as f:
    content = f.read()

content = content.replace("import type { AssessmentState, PanchakarmaTherapy } from '../types/assessment';", "import type { AssessmentState } from '../types/assessment';")
content = content.replace("""      getRecommendedPanchakarma: () => {
        const state = get();
        const profile = computeProfile(state.observations, state.answers);
        const dominantDosha = getDominantDosha(profile.prakrtiDosha).toLowerCase();
        return (panchakarmaData as PanchakarmaTherapy[]).filter((therapy) =>
          therapy.indicatedDoshas.includes(dominantDosha)
        );
      },""", "")

with open('assessmentStore.ts', 'w') as f:
    f.write(content)
