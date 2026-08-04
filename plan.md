1. **Create Saham Engine/Logic**:
   - `swadharma/apps/web/src/engines/sahams.ts`: Implement logic to calculate the 50 Sahams, Day/Night inversion logic, and Tajika Ithasala aspects. I'll include Punya, Vidya, Yashas, Karma, Bhratri, Pitri, and generate standard placeholders/others to hit 50.
2. **Create `SahamTable` Component**:
   - `swadharma/apps/web/src/components/astrologer/sahams/SahamTable.tsx`: Using Shadcn `Table`, `Badge`, etc., displaying Sahams with Sign, Degree, Lord, and House placement. Adhere to max 140 lines and color tokens.
3. **Create `SahamAspectCard` Component**:
   - `swadharma/apps/web/src/components/astrologer/sahams/SahamAspectCard.tsx`: Display active Tajika Ithasala aspects to Saham points using Shadcn `Card`, `Badge`. Adhere to max 140 lines.
4. **Create `page.tsx`**:
   - `swadharma/apps/web/src/app/[locale]/[mode]/astrologer/sahams/page.tsx`: The main page that will compose these components and fetch/pass the data to them.
5. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
6. **Build and Test**: Run `pnpm run build` and `pnpm vitest run` (if applicable) to make sure everything works perfectly.
7. **Submit Code**: Push to feature branch.
