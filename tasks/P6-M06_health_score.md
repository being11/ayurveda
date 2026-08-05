# P6-M06 Ayurveda Health Score
**Phase**: P6  **Branch**: `feature/health-score-implementation`
**Scope**: `swadharma/apps/web/src/lib/health-score/`  `swadharma/apps/web/src/app/score/`

## Objective
Compute and display a composite 0–100 Ayurvedic Health Score assessing alignment between daily lifestyle check-ins and ideal Prakriti balance. Categorizes scoring across five core Ayurvedic dimensions—Agni, Nidra, Manas, Vihara, and Ojas—with smooth score animations over time.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/health-score/`
- `swadharma/apps/web/src/app/score/page.tsx`

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
