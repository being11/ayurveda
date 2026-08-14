# P6-M10 Personalized Meal Planning Engine
**Phase**: P6  **Branch**: `feature/meal-planner-implementation`
**Scope**: `swadharma/apps/web/src/lib/meal-planner/`  `swadharma/apps/web/src/app/meals/`

## Objective
Generate a customized 7-day meal plan based on the user's dominant Prakriti dosha adhering to classical Pathya-Apathya food compatibility principles. Displays detailed daily breakfast, lunch, and dinner recipes alongside an aggregated shopping list generated entirely from static data.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/meal-planner/`
- `swadharma/apps/web/src/app/meals/page.tsx`

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
