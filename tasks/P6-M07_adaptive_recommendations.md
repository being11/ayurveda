# P6-M07 Adaptive Recommendation Engine
**Phase**: P6  **Branch**: `feature/adaptive-recommendations-implementation`
**Scope**: `swadharma/apps/web/src/lib/adaptive-recommendations/`  `swadharma/apps/web/src/app/recommendations/`

## Objective
Dynamically recalculate and prioritize Ayurvedic recommendations based on real-time symptom trends from daily check-ins. Adds an 'Adaptive' view tab to automatically elevate targeted interventions (e.g., Nidra support after consecutive poor sleep reports).

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/adaptive-recommendations/`
- `swadharma/apps/web/src/app/recommendations/page.tsx`

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
