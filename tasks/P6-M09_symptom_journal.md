# P6-M09 Observation Journal Engine
**Phase**: P6  **Branch**: `feature/journal-implementation`
**Scope**: `swadharma/apps/web/src/lib/journal/`  `swadharma/apps/web/src/app/journal/`

## Objective
Provide a timestamped personal log for tracking physical symptoms, dietary intake, mood, and subjective energy levels. Enables tagging entries with foundational Ayurvedic concepts (Vata, Pitta, Kapha, Ama, Agni) and stores entries in localStorage with filterable tag search.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/journal/`
- `swadharma/apps/web/src/app/journal/page.tsx`

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
