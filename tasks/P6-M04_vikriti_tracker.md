# P6-M04 Vikriti Progress Tracker
**Phase**: P6  **Branch**: `feature/vikriti-tracker-implementation`
**Scope**: `swadharma/apps/web/src/lib/vikriti-tracker/`  `swadharma/apps/web/src/app/progress/`

## Objective
Visualize longitudinal shifts in the user's dosha imbalance (Vikriti) relative to their baseline Prakriti using historical daily check-in data. Presents a dynamic dosha balance timeline and highlights alert states whenever Vikriti deviates by more than 20% from Prakriti baseline.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/vikriti-tracker/`
- `swadharma/apps/web/src/app/progress/page.tsx`

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
