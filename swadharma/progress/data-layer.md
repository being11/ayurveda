# Data & Sync Layer Module
**Completion:** 100%

- JSON-first question data architecture across 16 category files in `apps/web/src/data/questions/`.
- Centralized barrel `apps/web/src/data/index.ts` exporting canonical `categories[]`.
- State persistence via Zustand `persist` middleware with localStorage / IDB fallback.
- Full TypeScript typing for `Question`, `Option`, `ObservationMapping`, `AyurvedaProfile`, `DoshaProfile`, `ObservationResult`.
- Full reset action for storage and store state.
