# Subagent 12 — Knowledge Graph Page


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
- `apps/web/src/app/knowledge-graph/page.tsx` — full rebuild

Do NOT touch any engines, stores, types, or JSON data files.

---

## Repository

```
/ayurveda/swadharma/apps/web/
```

---

## Read First

1. `AGENTS.md` — Next.js 16 critical warning
2. `apps/web/src/app/knowledge-graph/page.tsx` — existing page to rebuild
3. `apps/web/src/data/knowledge/core.json` — knowledge graph database (written by Subagent 07)
4. `apps/web/src/stores/assessmentStore.ts` — to read user's current observations
5. `tasks/13graph.md` — knowledge graph spec

---

## Context

The Knowledge Graph page serves **two purposes**:

1. **For users who completed the assessment**: shows which classical Ayurvedic principles were activated by their specific answers — with sources, descriptions, and plain English explanations
2. **As a standalone resource**: a searchable, browsable classical Ayurvedic reference library that anyone can explore

> This page gives the application credibility and transparency. It shows that every inference is traceable to a specific chapter and verse of classical texts — not invented.

---

## Page Design

### Layout

```
Header:
  Icon: 📖 or an open book / mandala glyph
  Title: "Classical Knowledge Graph"
  Subtitle: "Every inference in your profile is grounded in classical Ayurvedic texts.
             Here is the evidence trail behind your assessment."

[If assessment complete: "Showing your activated observations"]
[If not complete: "Explore the full classical reference library"]

Search bar: [Search observations, principles, or texts...]

Filter pills:
  All | Agni | Dosha | Dhatu | Srotas | Manas | Ojas | Guna | Lifestyle

[User's observations (if assessment done) shown first with "YOUR PATTERN" badge]
[Rest of knowledge graph below]

Knowledge Node Cards:
  Each card shows one observation entry from core.json

Footer:
  Primary Sources reference list
```

### Knowledge Node Card Design

```
┌─────────────────────────────────────────────────────────────────┐
│  [Principle Badge: Agni]           [YOUR PATTERN ✓ if activated] │
│                                                                   │
│  Vishama Agni                                                     │
│  Variable Digestive Fire                                          │
│                                                                   │
│  Plain English:                                                   │
│  Your digestive fire behaves like an irregular flame...           │
│                                                                   │
│  Classical Basis:                           [↓ Expand]           │
│  Charaka Samhita, Chikitsasthana 15.44                           │
│                                                                   │
│  [+ Show Sanskrit quote]   [+ Practical Implications]            │
│                                                                   │
│  Dosha: Vata                                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Color Coding by Principle

- `Agni` → amber/fire `oklch(0.75 0.18 60)`
- `Dosha/Vata` → violet `oklch(0.55 0.15 280)`  
- `Dosha/Pitta` → saffron `oklch(0.65 0.15 55)`
- `Dosha/Kapha` → forest `oklch(0.50 0.12 160)`
- `Dhatu` → warm terracotta `oklch(0.60 0.12 30)`
- `Srotas` → teal `oklch(0.55 0.12 195)`
- `Manas` → deep indigo `oklch(0.45 0.15 275)`
- `Ojas` → gold `oklch(0.70 0.15 85)`
- `Guna` → soft rose `oklch(0.65 0.10 15)`

### Interaction

- **Search**: filters by `observation`, `principle`, `description`, `plainEnglish`, or `classicalSources[].text`
- **Filter pills**: filter by `principle` field
- **User's observations**: highlighted with a `"YOUR PATTERN"` badge — sorted first
- **Expand card**: reveals Sanskrit quote, full source details, and all implications
- **Hover**: subtle elevation shadow

---

## Implementation

### Data Loading

```tsx
// Load knowledge graph from JSON
import knowledgeData from '@/src/data/knowledge/core.json';
import type { KnowledgeNode } from '@/src/data/knowledge/types'; // or inline

// Load user's observations from store
const { answers } = useAssessmentStore();
const allQuestions = categories.flatMap(cat => cat.questions);
const observations = calculateObservations(allQuestions, answers);
const userObsKeys = new Set(Object.keys(observations));

// A knowledge node is "activated" if its observation matches a user observation
function isActivated(node: KnowledgeNode): boolean {
  return Array.from(userObsKeys).some(obsKey =>
    obsKey.toLowerCase().includes(node.observation.toLowerCase()) ||
    node.observation.toLowerCase().includes(obsKey.toLowerCase())
  );
}
```

### Search

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [activeFilter, setActiveFilter] = useState<string>('All');

const filtered = knowledgeData.filter(node => {
  const matchesPrinciple = activeFilter === 'All' || node.principle === activeFilter;
  const matchesSearch = searchQuery === '' || 
    node.observation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.plainEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.classicalSources.some(s => s.text.toLowerCase().includes(searchQuery.toLowerCase()));
  return matchesPrinciple && matchesSearch;
});

// Sort: activated nodes first, then alphabetical
const sorted = [...filtered].sort((a, b) => {
  const aActive = isActivated(a) ? -1 : 1;
  const bActive = isActivated(b) ? -1 : 1;
  if (aActive !== bActive) return aActive - bActive;
  return a.observation.localeCompare(b.observation);
});
```

### Primary Sources Reference Section

At the bottom, show a reference section for the primary Ayurvedic texts cited:

```
Primary Texts Referenced:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Charaka Samhita          Composed by Charaka, compiled by Dridhabala
                          Primary text covering medicine, physiology, and lifestyle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sushruta Samhita          Attributed to Sushruta
                          Primary text covering surgery, anatomy, and clinical medicine
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ashtanga Hridayam         By Vagbhata (~7th century CE)
                          Synthesis of Charaka and Sushruta traditions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bhavaprakasha             By Bhavamishra (~16th century CE)
                          Includes detailed Dravyaguna (herbal medicine)
```

---

## Standalone Mode (No Assessment Done)

If `Object.keys(answers).length === 0`:
- Show banner: "Complete the assessment to see which of these classical patterns apply to you."
- [Begin Assessment →] button
- Still show the full browsable library below

---

## SEO Metadata

```typescript
export const metadata = {
  title: 'Classical Ayurvedic Knowledge Graph | SwaDharma Prakrti',
  description: 'Every inference in your Ayurvedic assessment traced to Charaka Samhita, Sushruta Samhita, and Ashtanga Hridayam.'
};
```

---

## Definition of Done

- [ ] Page renders knowledge nodes from `core.json`
- [ ] Search filters work across `observation`, `plainEnglish`, source text
- [ ] Filter pills work by principle
- [ ] User's activated observations shown first with "YOUR PATTERN" badge
- [ ] Accordion expand reveals Sanskrit quote and full source details
- [ ] Color coding by principle
- [ ] Primary sources reference section at bottom
- [ ] Standalone mode (no assessment) shows appropriate banner
- [ ] Animated entry of cards
- [ ] No TypeScript errors
- [ ] Mobile responsive
