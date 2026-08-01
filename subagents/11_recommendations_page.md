# Subagent 11 — Recommendations Page & Engine Integration


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
- `apps/web/src/engines/recommendations.ts` — expand the engine
- `apps/web/src/app/recommendations/page.tsx` — full rebuild

Do NOT touch question JSONs, the store, types, or the report engine.

---

## Repository

```
/ayurveda/swadharma/apps/web/
```

---

## Read First

1. `AGENTS.md` — Next.js 16 critical warning
2. `apps/web/src/engines/recommendations.ts` — existing engine
3. `apps/web/src/app/recommendations/page.tsx` — existing page
4. `apps/web/src/data/recommendations/core.json` — the recommendations database (written by Subagent 08)
5. `apps/web/src/types/assessment.ts` — types

> **Note:** If `apps/web/src/data/recommendations/core.json` doesn't exist yet (Subagent 08 may not be done), create it with at minimum 5 entries following the schema from Subagent 08's task, then the full file will be replaced by Subagent 08.

---

## Context

The Recommendations page shows the user **personalized, explained, actionable guidance** based on their assessment. It is NOT a list of generic Ayurvedic tips. Every recommendation is directly triggered by specific observations from their answers.

> Philosophy from `tasks/15recommendation.md`: Not "Eat ginger." Instead: **Why → Evidence → Shastra → Practical advice → Alternatives.**

---

## Task 1: Expand `engines/recommendations.ts`

Replace the existing engine with one that reads from JSON and has richer logic:

```typescript
// apps/web/src/engines/recommendations.ts

export interface Recommendation {
  id: string;
  category: 'Diet' | 'Lifestyle' | 'Mental' | 'Exercise' | 'Sleep' | 
            'Seasonal' | 'Spiritual' | "Women's Health" | "Men's Health" | 'Ojas';
  subCategory?: string;
  title: string;
  description: string;
  rationale: string;
  why: string;
  shastraRef?: string;
  alternatives?: string[];
  triggerObservations: string[];
}

// Load from JSON (Subagent 08 creates this file)
// If JSON doesn't exist yet, fall back to inline data
let recommendationsDB: Recommendation[] = [];
try {
  const data = require('../data/recommendations/core.json');
  recommendationsDB = data;
} catch {
  // Fallback minimal DB
  recommendationsDB = [
    {
      id: 'rec_diet_vishama_routine',
      category: 'Diet',
      title: 'Establish Regular Meal Times',
      description: 'Eat warm, cooked, grounding meals at consistent times. Favor ghee or sesame oil.',
      rationale: 'Vishama Agni is governed by Vata. Consistency and warmth pacify Vata and stabilize Agni.',
      why: 'Your digestive fire fluctuates unpredictably — a hallmark of Vishama Agni from Vata imbalance.',
      shastraRef: 'Charaka Samhita, Chikitsasthana 15.44',
      alternatives: ['Start by fixing meal time, even with simple food.'],
      triggerObservations: ['Vishama Agni']
    }
  ];
}

export { recommendationsDB };

// Priority scoring: observations with higher weight = higher-priority recommendations
export function generateRecommendations(
  observations: Record<string, number>
): { recommendation: Recommendation; relevanceScore: number }[] {
  const results: { recommendation: Recommendation; relevanceScore: number }[] = [];

  recommendationsDB.forEach(rec => {
    let relevanceScore = 0;
    
    rec.triggerObservations.forEach(trigger => {
      // Exact match: full score
      const exactMatch = observations[trigger];
      if (exactMatch) {
        relevanceScore += exactMatch * 2;
        return;
      }
      
      // Fuzzy match: partial string match
      const fuzzyMatch = Object.entries(observations).find(([obsKey]) =>
        obsKey.toLowerCase().includes(trigger.toLowerCase()) ||
        trigger.toLowerCase().includes(obsKey.toLowerCase())
      );
      if (fuzzyMatch) {
        relevanceScore += fuzzyMatch[1];
      }
    });

    if (relevanceScore > 0) {
      results.push({ recommendation: rec, relevanceScore });
    }
  });

  // Sort by relevance score descending
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Group recommendations by category
export function groupByCategory(
  recs: { recommendation: Recommendation; relevanceScore: number }[]
): Record<string, { recommendation: Recommendation; relevanceScore: number }[]> {
  const grouped: Record<string, typeof recs> = {};
  recs.forEach(item => {
    const cat = item.recommendation.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });
  return grouped;
}
```

---

## Task 2: Rebuild `apps/web/src/app/recommendations/page.tsx`

### Visual Design

**Theme:** Personal, warm, like a letter from a wise teacher.

- White/cream background cards on warm stone background
- Each recommendation is a card with:
  - Category badge (colored by category)
  - Title (bold, clear)
  - **"Why this for you"** section (from `why` field — personalized)
  - **What to do** (from `description`)
  - **Classical basis** (from `rationale` + `shastraRef` — collapsible)
  - **Alternatives** (collapsible dropdown)
- Categories shown as tabs or accordion sections
- Relevance indicators — most relevant at top

### Page Structure

```
Header:
  "Your Personal Guidance"
  subtitle: "Based on your assessment — not generic advice."

Category Filter Tabs:
  All | Diet | Lifestyle | Sleep | Mental | Exercise | Seasonal | Spiritual | Ojas
  (+ Women's Health / Men's Health if relevant to user's gender)

Recommendation Cards:
  [sorted by relevance within category]
  
  ┌─────────────────────────────────────────────────┐
  │  🍽️ Diet  [most relevant badge if top 3]        │
  │                                                  │
  │  Establish Regular Meal Times                    │
  │                                                  │
  │  For you:                                        │
  │  Your digestive fire fluctuates unpredictably... │
  │                                                  │
  │  What to do:                                     │
  │  Eat warm, cooked meals at the same times...     │
  │                                                  │
  │  [+ Classical Basis]    [+ Alternatives]         │
  └─────────────────────────────────────────────────┘

Footer:
  [← Back to Report]    [View Knowledge Graph →]
```

### Category Icons/Colors

```
Diet          → 🍽️  amber/saffron
Lifestyle     → 🌿  forest green
Sleep         → 🌙  indigo
Mental        → 🧘  violet/purple
Exercise      → ⚡  orange
Seasonal      → 🍂  warm brown
Spiritual     → 🕯️  warm gold
Ojas          → ✨  champagne/gold
Women's Health → 🌸  rose
Men's Health   → 💪  slate blue
```

### Interactive Elements

- Category tabs filter the visible recommendations
- "Classical Basis" accordion reveals `rationale` + `shastraRef`
- "Alternatives" accordion reveals the alternatives list
- Bookmark icon (locally stored in `localStorage`) to save favorites
- Print button to export recommendations

### Data Flow

```tsx
'use client'

import { useAssessmentStore } from '@/src/stores/assessmentStore';
import { calculateObservations } from '@/src/engines/logic';
import { generateRecommendations, groupByCategory } from '@/src/engines/recommendations';
import { categories } from '@/src/data/index';

const { answers, isComplete } = useAssessmentStore();
const allQuestions = categories.flatMap(cat => cat.questions);
const observations = calculateObservations(allQuestions, answers);
const rankedRecs = generateRecommendations(observations);
const grouped = groupByCategory(rankedRecs);
```

### Empty State

If no recommendations are generated (e.g. assessment not complete):
```
Centered card:
"Complete your assessment to receive personalized guidance."
[Begin Assessment →]
```

If assessment done but no recs match:
```
"Your assessment shows a remarkably balanced profile.
Continue your current practices — and revisit seasonally."
```

---

## SEO Metadata

```typescript
export const metadata = {
  title: 'Your Personalized Ayurvedic Guidance | SwaDharma Prakrti',
  description: 'Personalized Ayurvedic recommendations based on your unique constitutional assessment.'
};
```

---

## Definition of Done

- [ ] `engines/recommendations.ts` reads from JSON and implements fuzzy + exact matching
- [ ] `generateRecommendations()` returns ranked results with relevance scores
- [ ] `groupByCategory()` works correctly
- [ ] `recommendations/page.tsx` renders category tabs
- [ ] Cards show `why`, `description`, collapsible `rationale`, collapsible `alternatives`
- [ ] Category filter tabs work
- [ ] Empty states handled
- [ ] Print/bookmark functionality works
- [ ] No TypeScript errors
- [ ] Mobile responsive
