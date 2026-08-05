# P6-M03 Daily Check-in & Vikriti Pulse
**Phase**: P6  **Branch**: `feature/checkin-implementation`
**Scope**: `swadharma/apps/web/src/lib/checkin/`  `swadharma/apps/web/src/app/checkin/`

## Objective
Enable a fast 5-question daily symptom check-in to track real-time Vikriti fluctuations across digestion, sleep quality, energy, mood, and elimination. Responses are saved locally with timestamps to generate a rolling 7-day Vikriti trend chart.

## Deliverables
- [ ] TypeScript engine with core calculation logic
- [ ] React page component at the route
- [ ] Zustand store slice (only if new persistent state needed)
- [ ] Navigation link added if no route exists yet

## Scope Boundary
**Touch only:**
- `swadharma/apps/web/src/lib/checkin/`
- `swadharma/apps/web/src/app/checkin/page.tsx`

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
