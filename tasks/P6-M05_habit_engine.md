# P6-M05 Habit & Consistency Engine
**Phase**: P6  **Branch**: `feature/habits-implementation`
**Scope**: `swadharma/apps/web/src/lib/habits/`  `swadharma/apps/web/src/app/habits/`

## Objective
Display personalized Dinacharya habits as an interactive daily checklist with streak tracking and classical textual citations (Charaka/Vagbhata). Tracks daily completion history in localStorage and renders a visual 30-day consistency heatmap to promote adherence.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/habits/`
- `swadharma/apps/web/src/app/habits/page.tsx`

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
