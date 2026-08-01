# Subagent 13 — Landing Page & Navigation

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
- `apps/web/src/app/page.tsx` — rebuild the landing page
- `apps/web/src/app/layout.tsx` — update with navigation
- `apps/web/src/components/Navigation.tsx` — create a navigation component
- `apps/web/src/components/theme-provider.tsx` — ensure it exists (already does)

Do NOT touch any question JSONs, engines, store, or types.

---

## Repository

```
/ayurveda/swadharma/apps/web/
```

---

## Read First

1. `AGENTS.md` — Next.js 16 critical warning
2. `apps/web/src/app/page.tsx` — existing landing page
3. `apps/web/src/app/layout.tsx` — existing layout
4. `packages/ui/src/styles/globals.css` — design tokens
5. `tasks/01vision.md` — the vision that must be communicated on the landing page

---

## Context

The landing page is the first impression. It must:
1. Instantly communicate the **philosophy and depth** of this platform
2. Feel like a **premium, intentional experience** — not a generic wellness app
3. Be **visually stunning** while remaining calm and grounded
4. Compel the visitor to begin the assessment

The existing landing page has good copy ("Not every person needs another dosha quiz...") — keep and expand the tone.

---

## Task 1: Landing Page (`apps/web/src/app/page.tsx`)

### Above the Fold — Hero Section

```
[Full-screen, centered]

Background: warm, deep earth tones
  - Gradient from `oklch(0.12 0.04 60)` (deep warm dark) to `oklch(0.18 0.05 50)` (rich earth)
  - Subtle texture or grain overlay (via CSS background-image noise pattern)
  - OR a very subtle mandala/yantric pattern in low opacity

Sanskrit headline (golden, large):
  स्वधर्म
  "SwaDharma Prakṛti"

Subtitle (cream, serif, italic):
  "Know the Self before attempting to heal the Self."
  — Classical Ayurvedic principle

Separator: thin golden horizontal rule

Main description (light, smaller):
  "A comprehensive Ayurvedic self-identification system.
   Not a quiz that labels you. An inquiry that reveals you."

CTA Button:
  [Begin Self-Discovery →]  — warm gold, slightly large, rounded, hover glow effect

Secondary link (smaller, below):
  Already started? Continue your assessment →
  (only shows if assessment is in progress — use localStorage check)
```

### Scroll Section 1 — Philosophy

```
White/cream section, generous padding

Heading:
  "Not another dosha quiz."

3 paragraphs (keep existing copy + expand):
  "Not every person needs another dosha quiz that asks 'Do cold drinks upset your stomach?'
   and then declares, with spectacular confidence, 'Congratulations, 73% Vata.'"
  
  "Ayurveda deserves better than internet personality tests wearing Sanskrit as a costume."
  
  "Your constitution is not a label. It is a living, contextual understanding —
   shaped by your constitution, your current state, your age, your season, your geography,
   and your life stage. SwaDharma Prakṛti maps all of this."
```

### Scroll Section 2 — What It Assesses

```
Dark earth-toned section

Heading: "What we explore together"

Grid of assessment categories (16 icons in a grid):
  Each with an icon (lucide-react) and label:
  
  🔥 Agni (Digestive Fire)    💤 Nidra (Sleep)
  🧘 Manas (Mind)             🌿 Vihara (Lifestyle)
  ✨ Ojas (Vitality)           🌸 Artava / Shukra
  🫀 Dhatu (Tissues)          🔀 Srotas (Channels)
  🌤️ Climate Sensitivity      🍽️ Diet & Cravings
  💪 Physical Constitution    🧬 Genetic Tendencies
  🌺 Spiritual Disposition    👥 Relationships
  🌱 Childhood Patterns       📿 Seasonal Cycles
```

### Scroll Section 3 — How It Works

```
Cream/light section

Heading: "One question at a time"

3-step visual:
  1. [Question] → You answer naturally, conversationally
  2. [Pattern Recognition] → The engine maps your answers to classical principles
  3. [Your Profile] → A nuanced, multi-dimensional report grounded in classical texts

Note: "Questions adapt to you — based on your gender, age, and previous answers.
       Average time: 20–40 minutes. Save and continue anytime."
```

### Scroll Section 4 — Classical Grounding

```
Very subtle textured section

Heading: "Rooted in 3,000 years of classical medicine"

Logos / text of primary sources:
  Charaka Saṃhitā  •  Suśruta Saṃhitā  •  Aṣṭāṅga Hṛdayam  •  Bhāvaprakāśa

Description:
  "Every inference in SwaDharma Prakṛti is traceable to a specific chapter and verse
   of classical Ayurvedic texts. This is not wellness content — it is classical medicine,
   made accessible."

[View Knowledge Graph →]
```

### Scroll Section 5 — Final CTA

```
Dark, full-width section

Heading: "Begin your inquiry"

"Your profile takes 20–40 minutes.
 No account required. Your data stays in your browser.
 Revisit and retake as seasons change."

[Begin Self-Discovery →]  (same CTA as hero)
```

---

## Task 2: Navigation Component (`Navigation.tsx`)

Create a minimal, elegant navigation bar that appears on all pages **except** the assessment page (to avoid distraction during the quiz).

```tsx
// Navigation.tsx
// 'use client'

// Shows on: / and /report and /recommendations and /knowledge-graph
// Hidden on: /assessment (full focus mode)

Links:
  SwaDharma Prakṛti (logo/home link)    [spaced right]    Report  |  Guidance  |  Sources
```

Visual design:
- Fixed top, glass-morphism `backdrop-blur-md` with `bg-background/80`
- Height: 56px
- Left: brand name in serif font
- Right: text links — minimal, no background buttons
- Show progress indicator (thin bar at very top) if assessment is in progress
- Does NOT show on `/assessment` route — use `usePathname()` to detect

---

## Task 3: Update `layout.tsx`

```tsx
import Navigation from '@/src/components/Navigation';

// Add Navigation above {children}
// Conditionally hide on /assessment using the Navigation component's internal logic
```

Also ensure:
- `suppressHydrationWarning` is on `<html>`
- Font variables are applied
- ThemeProvider wraps everything
- Add proper `<head>` metadata (default title, description, Open Graph)

---

## Landing Page Animations

Use Framer Motion for:
- Hero text: fade in + slight upward float on page load
- Section headings: animate in on scroll (use `whileInView`)
- Category grid icons: stagger animation (each card appears 50ms after the previous)
- CTA button: pulse glow on hover

---

## SEO for Landing Page

```typescript
// In layout.tsx or page.tsx
export const metadata = {
  title: 'SwaDharma Prakṛti — Ayurvedic Self-Discovery',
  description: 'The world\'s most comprehensive Ayurvedic self-identification system. Not a dosha quiz — a genuine inquiry into your constitution, grounded in classical texts.',
  keywords: ['Ayurveda', 'Prakriti', 'dosha', 'constitution', 'Charaka', 'Vata Pitta Kapha'],
  openGraph: {
    title: 'SwaDharma Prakṛti',
    description: 'A classical Ayurvedic self-discovery journey. One question at a time.',
    type: 'website',
  }
};
```

---

## Definition of Done

- [ ] Landing page hero section with Sanskrit heading, premium dark background
- [ ] 5 scroll sections implemented
- [ ] Assessment category grid with 16 items
- [ ] Navigation component with route-based show/hide
- [ ] Navigation hidden on `/assessment`
- [ ] Layout.tsx updated with Navigation + metadata
- [ ] Framer Motion scroll animations
- [ ] "Continue assessment" link shows only if assessment in progress
- [ ] Knowledge Graph link works
- [ ] No TypeScript errors
- [ ] Mobile responsive (hamburger menu or condensed nav on mobile)
