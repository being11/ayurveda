# P6-M01 Dinacharya Daily Routine Engine
**Phase**: P6  **Branch**: `feature/dinacharya-implementation`
**Scope**: `swadharma/apps/web/src/lib/dinacharya/`  `swadharma/apps/web/src/app/routine/`

## Objective
Provide a personalized daily routine schedule mapped to the user's Prakriti dosha based on Charaka Sutrasthana Ch.5. Users view time-blocked recommendations for morning, midday, evening, and night routines including optimal wake time, meal windows, exercise timing, and wind-down practices.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/dinacharya/`
- `swadharma/apps/web/src/app/routine/page.tsx`

**Do NOT touch:**
- `src/types/assessment.ts` (escalate if you need changes here)
- `src/stores/assessmentStore.ts` (escalate if you need new state fields)
- Any other existing pages or components

## Quality Gate
```bash
pnpm --filter web build   # from swadharma/ — must exit 0, zero TS errors
```

## Escalate to Antigravity if:
- Ayurvedic data model is ambiguous (e.g., which shastra text to follow)
- You need a shared type change in `types/assessment.ts`
- Build fails after 2 different fix attempts
