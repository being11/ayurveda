# Subagent 10 — Report Engine & Report Page

## Repository Location

```
/ayurveda/swadharma/
```

Monorepo:
- `apps/web/` — Next.js 16 app
- `packages/ui/` — Shared ShadCN/Tailwind library
- `packages/eslint-config/`, `packages/typescript-config/` — tooling

> **CRITICAL:** Read `apps/web/node_modules/next/dist/docs/` before writing any Next.js code.  
> This is **Next.js 16** with breaking changes. The monorepo `AGENTS.md` warns about this.

---

## Existing Files to Read Before Starting

| File | What it contains |
|---|---|
| `apps/web/src/types/assessment.ts` | Existing type definitions |
| `apps/web/src/engines/logic.ts` | Question routing engine |
| `apps/web/src/stores/assessmentStore.ts` | Zustand + IndexedDB store |
| `apps/web/src/data/questions.ts` | 5 existing categories as TypeScript |
| `apps/web/src/engines/recommendations.ts` | Recommendation engine |
| `apps/web/src/data/knowledge.ts` | Knowledge graph entries |
| `apps/web/src/components/AssessmentEngine.tsx` | Main quiz UI component |
| `apps/web/src/app/report/page.tsx` | Report page |

---


```
apps/web/src/data/
├── questions/
│   ├── introduction.json    <- identity questions 
│   ├── body.json            <- placeholder: []
│   ├── digestion.json       <- digestion questions 
│   ├── sleep.json           <- sleep questions 
│   ├── emotions.json        <- emotions questions 
│   ├── lifestyle.json       <- lifestyle questions 
│   ├── exercise.json        <- placeholder: []
│   ├── reproduction.json    <- placeholder: []
│   ├── skin_hair.json       <- placeholder: []
│   ├── appetite_senses.json <- placeholder: []
│   ├── mental.json          <- placeholder: []
│   ├── environment.json     <- placeholder: []
│   ├── spirituality.json    <- placeholder: []
│   ├── relationships.json   <- placeholder: []
│   ├── childhood.json       <- placeholder: []
│   └── aging.json           <- placeholder: []
├── knowledge/
│   └── core.json            <- 
├── recommendations/
│   └── core.json            <- 
└── index.ts                 <- barrel exporting categories[]
```

---



Every JSON file in `questions/` is an **array** of Question objects.  
write JSON following this exact schema.

```json
[
  {
    "id": "dig_appetite",
    "category": "digestion",
    "subCategory": "agni",
    "title": "How would you describe your appetite on a normal day?",
    "subtitle": "Think about patterns over the past few months, not just today.",
    "illustration": null,
    "type": "single",
    "importance": 3,
    "source": "Charaka Samhita, Chikitsasthana 15.43-45",
    "conditions": null,
    "nextQuestion": null,
    "options": [
      {
        "id": "variable",
        "label": "Variable — sometimes starving, sometimes I forget to eat",
        "sublabel": null,
        "nextQuestion": null,
        "observations": [
          {
            "observation": "Vishama Agni",
            "weight": 3,
            "dimensions": ["agni:vishama", "dosha:vata"]
          }
        ]
      },
      {
        "id": "strong",
        "label": "Strong — I get irritable if I miss a meal",
        "sublabel": null,
        "nextQuestion": null,
        "observations": [
          {
            "observation": "Tikshna Agni",
            "weight": 3,
            "dimensions": ["agni:tikshna", "dosha:pitta"]
          }
        ]
      }
    ]
  }
]
```

**Schema rules to follow:**
- `id`: globally unique. Format: `categoryabbrev_descriptive` (e.g. `dig_appetite`, `slp_falling`, `env_heat_tolerance`)
- `category`: matches the JSON filename base (e.g. `"digestion"` for `digestion.json`)
- `subCategory`: finer grouping within the category (e.g. `"agni"`, `"bowel"`, `"nidra"`)
- `title`: conversational English, warm, NOT clinical. As if a wise teacher is asking.
- `type`: `"single"` (radio, auto-advances) or `"multiple"` (checkboxes, needs Continue button)
- `importance`: `1` = supplementary, `2` = moderate, `3` = critical for profile
- `source`: classical Ayurvedic reference (e.g. `"Charaka Samhita, Sutrasthana 1.57"`)
- `observations[].observation`: namespaced observation string. Examples:
  - `"Vishama Agni"`, `"Tikshna Agni"`, `"Manda Agni"`, `"Sama Agni"`
  - `"Vata Frame"`, `"Pitta Frame"`, `"Kapha Frame"`
  - `"Vata Nidra disturbance"`, `"Kapha Nidra tendency"`
  - `"Vata Manas (Rajasic)"`, `"Pitta Manas (Rajasic/Tikshna)"`
  - `"Pitta in Amashaya"`, `"Vata Aggravation tendency"`
- `observations[].weight`: `1` weak, `2` moderate, `3` strong signal
- `observations[].dimensions`: array of dimension tags:
  - Dosha: `"dosha:vata"`, `"dosha:pitta"`, `"dosha:kapha"`
  - Agni: `"agni:vishama"`, `"agni:tikshna"`, `"agni:manda"`, `"agni:sama"`
  - Dhatu: `"dhatu:rasa"`, `"dhatu:rakta"`, `"dhatu:mamsa"`, `"dhatu:meda"`, `"dhatu:asthi"`, `"dhatu:majja"`, `"dhatu:shukra"`
  - Srotas: `"srotas:annavaha"`, `"srotas:pranavaha"`, `"srotas:ambuvaha"`, `"srotas:manovaha"`
  - Manas: `"manas:rajasic"`, `"manas:tamasic"`, `"manas:sattvic"`
  - Ojas: `"ojas:low"`, `"ojas:moderate"`, `"ojas:high"`
- `conditions`: `null` or array of `{ "questionId": "...", "value": "..." }` — ALL must be met (AND logic)
- `nextQuestion`: `null` or a question ID to jump to (overrides sequential flow)
- `options[].nextQuestion`: `null` or ID — overrides the question-level `nextQuestion` for this specific option

---


**Your files:**
- `apps/web/src/engines/report.ts` — expand the scaffold
- `apps/web/src/app/report/page.tsx` — full rebuild
- `apps/web/src/engines/logic.ts` — read-only, do not modify

Do NOT touch question JSONs, the store, or types.

---

## Repository

```
/ayurveda/swadharma/apps/web/
```

---

## Read First

1. `AGENTS.md` — Next.js 16 critical warning
2. `apps/web/src/types/assessment.ts` — `AyurvedaProfile`, `DoshaProfile`, `ObservationResult`
3. `apps/web/src/engines/report.ts` — existing scaffold to expand
4. `apps/web/src/engines/logic.ts` — `calculateObservations()` function
5. `apps/web/src/stores/assessmentStore.ts` — how to read `answers` and `observations`
6. `apps/web/src/app/report/page.tsx` — existing report page to rebuild
7. `tasks/14report.md` — full report spec
8. `tasks/12scoring.md` — observation-based scoring (NOT direct dosha scoring)

---

## Context: What the Report Is

The report is NOT "You are 73% Vata." It is a **multi-dimensional profile** that maps the user's patterns across:

1. **Constitution Overview** — Prakrti tendencies (Vata/Pitta/Kapha balance)
2. **Current State** — Vikrti (current imbalance based on recent patterns)
3. **Agni (Digestive Fire)** — type + implications
4. **Nidra (Sleep)** — patterns + guidance
5. **Manas (Mind & Emotions)** — cognitive and emotional tendencies
6. **Vihara (Lifestyle)** — environmental sensitivities
7. **Ojas (Vitality)** — resilience and immunity profile
8. **Dhatu Insights** — tissue-level patterns observed
9. **Diet Guidance** — tastes, foods to favor, timing
10. **Exercise Profile** — ideal movement type and intensity
11. **Seasonal Guide (Ritucharya)** — how to adapt with seasons
12. **Spiritual Profile** — contemplative and Manas tendencies
13. **One-Page Snapshot** — condensed summary at top

---

## Task 1: Expand `engines/report.ts`

The Foundation task created a scaffold. Expand it with full computation:

```typescript
// Full expanded report engine

import type { AyurvedaProfile, ObservationResult, DoshaProfile } from '../types/assessment';

// --- Constants ---
const DOSHA_KEYWORDS: Record<string, string[]> = {
  vata: ['vata', 'vishama agni', 'vata nidra', 'vata manas', 'vata frame', 'vata apana',
         'vata lifestyle', 'vata aggravation', 'vata bala', 'vata in', 'vata artava',
         'vata shukra', 'vata majja', 'vata rasa', 'vata prakrti', 'vata vriddha'],
  pitta: ['pitta', 'tikshna agni', 'pitta nidra', 'pitta manas', 'pitta frame',
          'pitta lifestyle', 'pitta aggravation', 'pitta in', 'pitta artava',
          'pitta rakta', 'pitta twak', 'pitta prakrti', 'pitta social'],
  kapha: ['kapha', 'manda agni', 'kapha nidra', 'kapha manas', 'kapha frame',
          'kapha lifestyle', 'kapha aggravation', 'kapha in', 'kapha ama',
          'kapha sedentary', 'kapha bala', 'kapha stiffness', 'kapha prakrti'],
};

const AGNI_KEYWORDS: Record<AyurvedaProfile['agni'], string[]> = {
  vishama: ['vishama agni', 'vishama ahara', 'vishama nidra', 'meal skipping'],
  tikshna: ['tikshna agni', 'pitta in amashaya', 'tikshna agni /'],
  manda:   ['manda agni', 'kapha ama accumulation', 'manda nidra'],
  sama:    ['sama agni', 'sama artava', 'sama nidra', 'balanced nidra'],
  unknown: [],
};

// Compute dosha totals from all observations
function computeDoshaProfile(observations: Record<string, number>): DoshaProfile {
  const totals = { vata: 0, pitta: 0, kapha: 0 };
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    for (const dosha of ['vata', 'pitta', 'kapha'] as const) {
      if (DOSHA_KEYWORDS[dosha].some(kw => lower.includes(kw))) {
        totals[dosha] += weight;
      }
    }
  });
  const total = totals.vata + totals.pitta + totals.kapha || 1;
  return {
    vata: Math.round((totals.vata / total) * 100) / 100,
    pitta: Math.round((totals.pitta / total) * 100) / 100,
    kapha: Math.round((totals.kapha / total) * 100) / 100,
  };
}

// Determine dominant Agni type
function computeAgni(observations: Record<string, number>): AyurvedaProfile['agni'] {
  const agniScores: Record<string, number> = { vishama: 0, tikshna: 0, manda: 0, sama: 0 };
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    for (const [agniType, keywords] of Object.entries(AGNI_KEYWORDS)) {
      if (agniType === 'unknown') continue;
      if (keywords.some(kw => lower.includes(kw))) {
        agniScores[agniType] += weight;
      }
    }
  });
  const dominant = Object.entries(agniScores).reduce((a, b) => a[1] >= b[1] ? a : b);
  return dominant[1] > 0 ? dominant[0] as AyurvedaProfile['agni'] : 'unknown';
}

// Compute Ojas level
function computeOjas(observations: Record<string, number>): AyurvedaProfile['ojas'] {
  let ojasScore = 0;
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    if (lower.includes('low ojas') || lower.includes('ojas depletion')) ojasScore -= weight;
    if (lower.includes('high ojas') || lower.includes('ojas strength')) ojasScore += weight;
  });
  if (ojasScore >= 3) return 'high';
  if (ojasScore <= -3) return 'low';
  return 'moderate';
}

// Compute Manas type
function computeManas(observations: Record<string, number>): AyurvedaProfile['manas'] {
  const scores = { vata_dominant: 0, pitta_dominant: 0, kapha_dominant: 0 };
  Object.entries(observations).forEach(([obsKey, weight]) => {
    const lower = obsKey.toLowerCase();
    if (lower.includes('vata manas')) scores.vata_dominant += weight;
    if (lower.includes('pitta manas')) scores.pitta_dominant += weight;
    if (lower.includes('kapha manas')) scores.kapha_dominant += weight;
  });
  const max = Math.max(...Object.values(scores));
  if (max === 0) return 'balanced';
  const dominant = Object.entries(scores).find(([, v]) => v === max);
  return dominant ? dominant[0] as AyurvedaProfile['manas'] : 'balanced';
}

// Main export
export function computeProfile(
  observations: Record<string, number>,
  answers: Record<string, string | string[]>
): AyurvedaProfile {
  const doshaProfile = computeDoshaProfile(observations);
  const agni = computeAgni(observations);
  const ojas = computeOjas(observations);
  const manas = computeManas(observations);
  const gender = (answers['intro_gender'] as AyurvedaProfile['gender']) ?? null;

  const obsResults: ObservationResult[] = Object.entries(observations)
    .sort(([, a], [, b]) => b - a)
    .map(([key, weight]) => ({ key, weight, dimensions: [] }));

  return {
    prakrtiDosha: doshaProfile,
    vikrtiDosha: doshaProfile, // Will differentiate in future version
    agni,
    dominantGunas: [],
    ojas,
    manas,
    observations: obsResults,
    gender,
  };
}

// Helper: get dominant dosha label
export function getDominantDosha(profile: DoshaProfile): string {
  const max = Math.max(profile.vata, profile.pitta, profile.kapha);
  if (max === 0) return 'Balanced';
  if (profile.vata === max) return 'Vata';
  if (profile.pitta === max) return 'Pitta';
  return 'Kapha';
}

// Helper: get constitution description
export function getConstitutionDescription(profile: DoshaProfile): string {
  const sorted = Object.entries(profile).sort(([, a], [, b]) => b - a);
  const [first, second] = sorted;
  const gap = (first[1] as number) - (second[1] as number);
  if (gap < 0.1) return `Tridoshic (balanced Vata, Pitta, Kapha)`;
  if (gap < 0.2) return `${capitalize(first[0] as string)}-${capitalize(second[0] as string)} (dual constitution)`;
  return `${capitalize(first[0] as string)}-predominant`;
}

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
```

---

## Task 2: Rebuild `apps/web/src/app/report/page.tsx`

This is the centerpiece of the app. Make it stunning, comprehensive, and deeply Ayurvedic.

### Visual Design

- Full-page layout with a warm earthy background
- Top: large heading "Your SwaDharma Profile" in serif font
- Constitution bar: a visual dosha percentage bar (Vata/Pitta/Kapha proportions)
- Each section is a card with an icon, title, and prose content
- Use warm accent colors:
  - Vata: indigo/violet `oklch(0.55 0.15 280)`
  - Pitta: amber/saffron `oklch(0.65 0.15 60)`
  - Kapha: forest green `oklch(0.50 0.12 160)`
- Ojas indicator: a visual gauge from low to high
- Print-friendly: on `@media print`, simplify layout for PDF export

### Sections to Render

**Section 1: Constitution Summary (above the fold)**
- Dosha proportion bar (visual — not numbers)
- Dominant constitution label
- 2-sentence constitution summary
- Current state (Vikrti) note

**Section 2: Agni (Digestive Fire)**
- Icon: 🔥 or flame icon
- Agni type label (Vishama/Tikshna/Manda/Sama)
- What this means for your digestion
- Key food habits to support this Agni

**Section 3: Nidra (Sleep)**
- Icon: 🌙 or moon icon
- Sleep pattern classification
- Observations summary
- Key improvement suggestions

**Section 4: Manas (Mind & Emotions)**
- Icon: 🧘 or lotus icon
- Dominant mental pattern
- Cognitive tendencies
- Emotional tendencies
- Stress response pattern

**Section 5: Vihara (Lifestyle & Environment)**
- Icon: 🌿 or leaf icon
- Environmental sensitivities
- Lifestyle pattern observations

**Section 6: Ojas (Vitality & Immunity)**
- Icon: ✨ or spark icon
- Ojas level indicator (visual gauge)
- What this means
- Key supporting habits

**Section 7: Dhatu Insights**
- Show any Dhatu-specific observations from the profile
- Only render if observations contain Dhatu keywords

**Section 8: Diet Guide**
- Preferred tastes based on constitution
- Foods to favor
- Foods to moderate
- Meal timing guidance

**Section 9: Exercise Profile**
- Ideal movement type
- Recommended intensity
- Recovery needs

**Section 10: Seasonal Guide (Ritucharya)**
- Brief seasonal adaptation for each season based on constitution

**Section 11: Spiritual Profile**
- Manas type → suitable practices
- Meditation style suggestions
- Pranayama suggestions

**Section 12: One-Page Snapshot**
- At the very bottom, a printable summary card
- Name (not collected — just says "Your Profile")
- Date
- Constitution, Agni, Ojas, Manas as 4 key values
- Top 5 observations by weight
- Top 3 recommendations (link to /recommendations page)

### Actions at Bottom
- **Retake Assessment** (reset store, return to home)
- **View Recommendations** (link to /recommendations page)  
- **View Knowledge Graph** (link to /knowledge-graph page)
- **Export / Print** — `window.print()` triggers print CSS

### Data Flow

```typescript
'use client'

const { answers, observations, isComplete } = useAssessmentStore();
const allQuestions = categories.flatMap(cat => cat.questions);
const calculatedObs = calculateObservations(allQuestions, answers);
const profile = computeProfile(calculatedObs, answers);
```

If `!isComplete && Object.keys(answers).length === 0` → redirect to home.

---

## SEO Metadata

```typescript
export const metadata = {
  title: 'Your Ayurvedic Profile | SwaDharma Prakrti',
  description: 'Your comprehensive, classically-grounded Ayurvedic constitution and tendency report.'
};
```

---

## Definition of Done

- [ ] `engines/report.ts` has full `computeProfile()`, `getDominantDosha()`, `getConstitutionDescription()`
- [ ] `report/page.tsx` renders all 12 sections
- [ ] Dosha proportion bar is visual (not just numbers)
- [ ] Ojas indicator is visual (gauge or bar)
- [ ] Print/export styles work with `window.print()`
- [ ] No TypeScript errors
- [ ] Graceful empty states (when not enough data for a section)
- [ ] Links to `/recommendations` and `/knowledge-graph` work
- [ ] Mobile responsive
