# P6-M02 Ritucharya Seasonal Adaptation Engine
**Phase**: P6  **Branch**: `feature/ritucharya-implementation`
**Scope**: `swadharma/apps/web/src/lib/ritucharya/`  `swadharma/apps/web/src/app/seasons/`

## Objective
Enhance the existing seasonal guidance page with a complete 6-ritu (Vedic season) calendar tailored to the user's dominant dosha. Users can see seasonal dosha aggravation risks, recommended diet and lifestyle adjustments, and prescribed seasonal therapies like Abhyanga and Nasya.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/ritucharya/`
- `swadharma/apps/web/src/app/seasons/page.tsx`

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
