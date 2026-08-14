# P6-M08 Ojas & Vitality Reserve Builder
**Phase**: P6  **Branch**: `feature/ojas-implementation`
**Scope**: `swadharma/apps/web/src/lib/ojas/`  `swadharma/apps/web/src/app/ojas/`

## Objective
Assess current Ojas (vital energy reserve) based on check-in inputs and baseline Prakriti, mapping symptoms to the 8 classic signs of Ojas status per Charaka. Provides a structured 21-day Ojas-building protocol containing targeted ahara (foods), dravya (herbs), and vihara (practices).

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/ojas/`
- `swadharma/apps/web/src/app/ojas/page.tsx`

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
