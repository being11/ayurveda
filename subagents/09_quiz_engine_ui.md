# Subagent 09 — Quiz Engine (AssessmentEngine.tsx Rebuild)


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
- `apps/web/src/components/AssessmentEngine.tsx` — full rebuild
- `apps/web/src/app/assessment/page.tsx` — update to use rebuilt component

Do NOT touch any question JSON files, the store, engines, or types.

---

## Repository

```
/ayurveda/swadharma/apps/web/
```

---

## Read First

1. `AGENTS.md` inside the monorepo — critical Next.js 16 warning
2. Read `apps/web/node_modules/next/dist/docs/` before any Next.js code
3. `apps/web/src/components/AssessmentEngine.tsx` — existing component to rebuild
4. `apps/web/src/stores/assessmentStore.ts` — the Zustand store (do not modify)
5. `apps/web/src/types/assessment.ts` — types (do not modify)
6. `apps/web/src/data/index.ts` — the barrel (do not modify)
7. `packages/ui/src/styles/globals.css` — design tokens (CSS variables available)

---

## Context: What the Engine Does

The **Quiz Engine** is the heart of the application. It presents one question at a time in a Typeform-style experience:
- One question occupies the full screen
- Single-choice questions auto-advance on selection (400ms delay for animation)
- Multiple-choice questions show a "Continue" button
- Questions animate in/out with Framer Motion
- The user can go Back to the previous question
- Conditional questions (with `conditions` field) are automatically skipped if conditions are not met
- Progress is shown by category, not by individual question count
- Categories are shown as breadcrumbs or a step indicator

---

## Design Requirements

This should feel **premium, calm, and intentional** — like a guided meditation, not a survey.

**Visual design:**
- Full-screen per question, vertically centered
- Background: warm parchment/earth tones — think Sanskrit manuscript meets modern design
  - Primary background: a warm off-white/cream `oklch(0.97 0.02 80)` (earthy warm white)
  - Text: deep charcoal `oklch(0.15 0.01 60)`
- Progress: subtle top bar — minimal, elegant
- Category indicator: small uppercase label above the question
- Question text: large serif font (`--font-heading`, Roboto Slab), 32–48px, centered or left-aligned
- Answer options: full-width cards with generous padding, border-radius, smooth hover transitions
- Selected option: accent color highlight with gentle scale animation
- Back button: minimal text link, top-left
- Letter prefixes: A, B, C, D on option cards

**Animations (Framer Motion):**
- Question enters: `opacity: 0 → 1, y: 30 → 0` over `0.4s ease-out`
- Question exits: `opacity: 1 → 0, y: 0 → -20` over `0.3s ease-in`
- Option hover: `scale: 1.01` with `border-color` transition
- Option selection: immediate visual feedback + `scale: 0.98` tap
- Auto-advance: 400ms delay after single-choice selection, then next question animates in
- Use `AnimatePresence` with `mode="wait"` so questions don't overlap

**Category progress:**
- Show category name + current category number / total categories at top
- Show a thin progress bar (height: 3px) below category label
- Show estimated time remaining (calculate: remaining questions * ~8 seconds avg)

---

## Complete Component Specification

### `AssessmentEngine.tsx`

```
'use client'

Props: none (reads from Zustand store)

Internal state:
- mounted: boolean (for hydration safety)
- isTransitioning: boolean (prevent double-clicks during animation)

Store values used:
- currentCategoryIndex
- currentQuestionId
- answers
- setAnswer
- nextQuestion
- prevQuestion
- isComplete
- history

Rendering modes:
1. Loading (mounted === false): render null or skeleton
2. Complete: full-screen completion card with animation
3. Active: main quiz UI

Quiz UI layout:
┌─────────────────────────────────────────────────────────┐
│  [← Back]          [Category: Sleep · 3 of 7]           │
│  ══════════════════════════════════════════════(40%)     │
│                                                         │
│                                                         │
│          How easily do you fall asleep?                 │
│                                                         │
│    Context: Think about your typical pattern...         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  A  My mind races — takes a long time             │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  B  Usually within 15–30 minutes                  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  C  Immediately                                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│                                    [Continue →]         │
│                                    (only for multiple)  │
└─────────────────────────────────────────────────────────┘
```

### Keyboard Support
- Number keys `1`, `2`, `3`, `4`, `5` select options A, B, C, D, E
- `Enter` on single-choice confirms and advances
- `Backspace` or `←` goes back
- `Space` toggles multiple-choice options

### Completion Screen
When `isComplete === true`:
```
Full screen, centered

[Animated checkmark or lotus icon]

"Assessment Complete"
subtitle: "Your answers have been thoughtfully woven together."

[Generate My Report →]    [← Review Answers]
```

### Handling Category Transition
When moving to a new category:
- Show a brief "section transition" card with category title and description (1.5s), then advance
- This gives users a moment to understand they're entering a new domain

---

## Implementation Notes

1. Import `categories` from `@/src/data/index` (not the old `questions.ts`)
2. Import store from `@/src/stores/assessmentStore`
3. The `conditions` check is handled in the store's `nextQuestion` action — you don't need to implement it in the component
4. For the multiple-choice "Continue" button — it should be disabled if no options are selected
5. The `isTransitioning` state prevents rapid-clicking through questions
6. Estimate time display: `Math.ceil(remainingQuestions * 8 / 60)` minutes

---

## Styling Constraints

- Use only TailwindCSS v4 utility classes (already configured via `packages/ui/src/styles/globals.css`)
- Use `cn()` from `@workspace/ui/lib/utils` for conditional classes
- Use CSS variable tokens: `--background`, `--foreground`, `--primary`, `--border`, `--muted`, `--muted-foreground`
- Import ShadCN `Button`, `Progress` components from `@/src/components/ui/`
- Custom styles can go in `<style jsx>` blocks or inline Tailwind

---

## `assessment/page.tsx`

Keep it simple — just a wrapper that renders AssessmentEngine:

```tsx
import AssessmentEngine from '@/src/components/AssessmentEngine';

export default function AssessmentPage() {
  return <AssessmentEngine />;
}
```

Add SEO metadata:
```ts
export const metadata = {
  title: 'Begin Your Self-Discovery | SwaDharma Prakrti',
  description: 'A comprehensive, classical Ayurvedic self-assessment. One thoughtful question at a time.'
};
```

---

## Definition of Done

- [ ] `AssessmentEngine.tsx` renders all question types correctly
- [ ] Single-choice questions auto-advance after 400ms
- [ ] Multiple-choice questions require explicit Continue click
- [ ] Back navigation works (uses history stack from store)
- [ ] Keyboard shortcuts work (number keys, Enter, Backspace)
- [ ] Category transition card shows between categories
- [ ] Completion screen renders and links to `/report`
- [ ] Framer Motion animations are smooth
- [ ] `assessment/page.tsx` has SEO metadata
- [ ] No TypeScript errors
- [ ] Works on mobile (touch-first design)
