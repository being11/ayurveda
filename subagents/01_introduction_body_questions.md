
## Repository Location

```
/ayurveda/swadharma/
```

Monorepo:
- `apps/web/` — Next.js 16 app
- `packages/ui/` — Shared ShadCN/Tailwind library
- `packages/eslint-config/`, `packages/typescript-config/` — tooling

> **CRITICAL:** Read `apps/web/node_modules/next/dist/docs/` before writing any Next.js code.  
> This is **Next.js 16** with breaking changes. The monorepo `AGENTS.md` warns about this.

---

## Existing Files to Read Before Starting

| File | What it contains |
|---|---|
| `apps/web/src/types/assessment.ts` | Existing type definitions |
| `apps/web/src/engines/logic.ts` | Question routing engine |
| `apps/web/src/stores/assessmentStore.ts` | Zustand + IndexedDB store |
| `apps/web/src/data/questions.ts` | 5 existing categories as TypeScript |
| `apps/web/src/engines/recommendations.ts` | Recommendation engine |
| `apps/web/src/data/knowledge.ts` | Knowledge graph entries |
| `apps/web/src/components/AssessmentEngine.tsx` | Main quiz UI component |
| `apps/web/src/app/report/page.tsx` | Report page |

---


```
apps/web/src/data/
├── questions/
│   ├── introduction.json    <- identity questions 
│   ├── body.json            <- placeholder: []
│   ├── digestion.json       <- digestion questions 
│   ├── sleep.json           <- sleep questions 
│   ├── emotions.json        <- emotions questions 
│   ├── lifestyle.json       <- lifestyle questions 
│   ├── exercise.json        <- placeholder: []
│   ├── reproduction.json    <- placeholder: []
│   ├── skin_hair.json       <- placeholder: []
│   ├── appetite_senses.json <- placeholder: []
│   ├── mental.json          <- placeholder: []
│   ├── environment.json     <- placeholder: []
│   ├── spirituality.json    <- placeholder: []
│   ├── relationships.json   <- placeholder: []
│   ├── childhood.json       <- placeholder: []
│   └── aging.json           <- placeholder: []
├── knowledge/
│   └── core.json            <- 
├── recommendations/
│   └── core.json            <- 
└── index.ts                 <- barrel exporting categories[]
```

---



Every JSON file in `questions/` is an **array** of Question objects.  
write JSON following this exact schema.

```json
[
  {
    "id": "dig_appetite",
    "category": "digestion",
    "subCategory": "agni",
    "title": "How would you describe your appetite on a normal day?",
    "subtitle": "Think about patterns over the past few months, not just today.",
    "illustration": null,
    "type": "single",
    "importance": 3,
    "source": "Charaka Samhita, Chikitsasthana 15.43-45",
    "conditions": null,
    "nextQuestion": null,
    "options": [
      {
        "id": "variable",
        "label": "Variable — sometimes starving, sometimes I forget to eat",
        "sublabel": null,
        "nextQuestion": null,
        "observations": [
          {
            "observation": "Vishama Agni",
            "weight": 3,
            "dimensions": ["agni:vishama", "dosha:vata"]
          }
        ]
      },
      {
        "id": "strong",
        "label": "Strong — I get irritable if I miss a meal",
        "sublabel": null,
        "nextQuestion": null,
        "observations": [
          {
            "observation": "Tikshna Agni",
            "weight": 3,
            "dimensions": ["agni:tikshna", "dosha:pitta"]
          }
        ]
      }
    ]
  }
]
```

**Schema rules to follow:**
- `id`: globally unique. Format: `categoryabbrev_descriptive` (e.g. `dig_appetite`, `slp_falling`, `env_heat_tolerance`)
- `category`: matches the JSON filename base (e.g. `"digestion"` for `digestion.json`)
- `subCategory`: finer grouping within the category (e.g. `"agni"`, `"bowel"`, `"nidra"`)
- `title`: conversational English, warm, NOT clinical. As if a wise teacher is asking.
- `type`: `"single"` (radio, auto-advances) or `"multiple"` (checkboxes, needs Continue button)
- `importance`: `1` = supplementary, `2` = moderate, `3` = critical for profile
- `source`: classical Ayurvedic reference (e.g. `"Charaka Samhita, Sutrasthana 1.57"`)
- `observations[].observation`: namespaced observation string. Examples:
  - `"Vishama Agni"`, `"Tikshna Agni"`, `"Manda Agni"`, `"Sama Agni"`
  - `"Vata Frame"`, `"Pitta Frame"`, `"Kapha Frame"`
  - `"Vata Nidra disturbance"`, `"Kapha Nidra tendency"`
  - `"Vata Manas (Rajasic)"`, `"Pitta Manas (Rajasic/Tikshna)"`
  - `"Pitta in Amashaya"`, `"Vata Aggravation tendency"`
- `observations[].weight`: `1` weak, `2` moderate, `3` strong signal
- `observations[].dimensions`: array of dimension tags:
  - Dosha: `"dosha:vata"`, `"dosha:pitta"`, `"dosha:kapha"`
  - Agni: `"agni:vishama"`, `"agni:tikshna"`, `"agni:manda"`, `"agni:sama"`
  - Dhatu: `"dhatu:rasa"`, `"dhatu:rakta"`, `"dhatu:mamsa"`, `"dhatu:meda"`, `"dhatu:asthi"`, `"dhatu:majja"`, `"dhatu:shukra"`
  - Srotas: `"srotas:annavaha"`, `"srotas:pranavaha"`, `"srotas:ambuvaha"`, `"srotas:manovaha"`
  - Manas: `"manas:rajasic"`, `"manas:tamasic"`, `"manas:sattvic"`
  - Ojas: `"ojas:low"`, `"ojas:moderate"`, `"ojas:high"`
- `conditions`: `null` or array of `{ "questionId": "...", "value": "..." }` — ALL must be met (AND logic)
- `nextQuestion`: `null` or a question ID to jump to (overrides sequential flow)
- `options[].nextQuestion`: `null` or ID — overrides the question-level `nextQuestion` for this specific option

---


# Subagent 01 — Introduction & Body Question Data

**Your files:** `introduction.json` and `body.json` only.  
Do NOT touch any other file.

---

## Repository

```
/ayurveda/swadharma/apps/web/src/data/questions/
```

---

## Context

Read the Foundation task first. It establishes the exact JSON schema every question must follow.  
Read `apps/web/src/types/assessment.ts` to understand the TypeScript types.  
The Foundation task will have already created `introduction.json` with a basic migration from the old `questions.ts`.  
**Your job is to expand both files with a comprehensive, deep, conversational set of questions.**

> Philosophy: The experience should feel like talking to an experienced Vaidya, not filling out a form.  
> Never ask clinical questions. Ask about lived experience.  
> Each answer must contribute to multiple Ayurvedic observations — not just a single dosha label.

---

## File: `introduction.json`

This category establishes identity, baseline demographics, and lifestyle context.  
The Foundation task has already migrated the basic identity questions. **Review** what was migrated and **expand** with the questions below.

Questions to include (expand each with proper observations, dimensions, sources):

### Category: `introduction`, SubCategory: `identity`

**`intro_gender`**
- "What is your sex assigned at birth?"
- Subtitle: "This helps us tailor specific physiological questions to your experience."
- Type: single
- Options: `male`, `female`, `other`
- No observations — used for conditional routing only
- Importance: 3
- Source: Charaka Samhita, Sharirasthana 3.3

**`intro_age_range`**
- "Which life stage best describes where you are right now?"
- Subtitle: "Ayurveda recognizes distinct phases of life (Bala, Madhya, Vriddha) that profoundly shape your constitution."
- Type: single
- Options:
  - `child_teen`: Under 20 → observations: `["Kapha Bala Phase tendency"]` weight:2, dims `["dhatu:kapha_dominant_phase"]`
  - `young_adult`: 20–35 → observations: `["Pitta Madhya Phase tendency"]` weight:2, dims `["dhatu:pitta_dominant_phase"]`
  - `middle`: 36–55 → observations: `["Pitta-Vata transition tendency"]` weight:2, dims `["dosha:pitta", "dosha:vata"]`
  - `mature`: 56+ → observations: `["Vata Vriddha Phase tendency"]` weight:2, dims `["dosha:vata", "dhatu:vata_dominant_phase"]`
- Importance: 3
- Source: Charaka Samhita, Sutrasthana 30.10, Ashtanga Hridayam Sutrasthana 1.8

**`intro_climate`**
- "What is the predominant climate where you live most of the year?"
- Type: single
- Options:
  - `hot_dry`: Hot and dry (desert, arid) → dims `["env:hot_dry"]` weight:1 obs:`"Hot Dry Climate Exposure"`
  - `hot_humid`: Hot and humid (tropical, coastal) → dims `["env:hot_humid"]` obs:`"Hot Humid Climate Exposure"`
  - `cold_dry`: Cold and dry (mountains, plains in winter) → dims `["env:cold_dry"]` obs:`"Cold Dry Climate Exposure"`
  - `cold_wet`: Cold and wet (rainy, temperate) → obs:`"Cold Wet Climate Exposure"`
  - `temperate`: Mild and variable → obs:`"Temperate Climate Exposure"`
- Importance: 2, Source: Charaka Samhita, Sutrasthana 6.3-8 (Ritucharya)

**`intro_occupation_type`**
- "Which best describes how you spend most of your working day?"
- Subtitle: "Not what your job title says — but what your body actually does most of the time."
- Type: single
- Options:
  - `sedentary_mental`: Mostly seated, mental work → obs: `"Sedentary Mental Occupation"` dims `["lifestyle:sedentary"]` weight:2
  - `active_physical`: Standing, walking, physical work → obs: `"Active Physical Occupation"` dims `["lifestyle:active"]` weight:2
  - `mixed`: Mix of both → obs: `"Mixed Occupation Pattern"` weight:1
  - `caregiving`: Care for others (children, elderly, patients) → obs: `"Caregiving Occupation"` weight:1
- Importance: 2, Source: Charaka Samhita, Sutrasthana 7.24

**`intro_meal_timing`**
- "How regular is the timing of your meals on most days?"
- Type: single
- Options:
  - `very_regular`: Same times every day, rarely skip → obs: `"Dinacharya Adherent"` weight:2 dims `["lifestyle:regulated"]`
  - `mostly_regular`: Usually on time, occasionally irregular → obs: `"Moderate Routine Adherence"` weight:1
  - `irregular`: Eat when I can — no fixed pattern → obs: `"Vishama Ahara Krama"` weight:2 dims `["agni:vishama", "dosha:vata"]`
  - `skip_often`: Often skip meals or eat very late → obs: `"Meal Skipping Pattern"` weight:3 dims `["agni:vishama", "dosha:vata"]`
- Importance: 3, Source: Charaka Samhita, Sutrasthana 8.25 (Ashta Ahara Vidhi Visheshayatana)

---

## File: `body.json`

Category: `body`. This maps the physical Prakrti — frame, bone structure, skin, hair, eyes, nails, etc.

### SubCategory: `frame`

**`body_frame`**
- "How would you describe your natural physical frame — the body you were born with, independent of any weight changes?"
- Subtitle: "Think of your skeletal structure, not your current weight."
- Options:
  - `slight`: Slight and thin — narrow shoulders, prominent joints, visible veins → obs: `"Vata Frame"` weight:3 dims `["dosha:vata", "dhatu:asthi"]`
  - `moderate`: Medium and proportionate — well-developed musculature → obs: `"Pitta Frame"` weight:3 dims `["dosha:pitta", "dhatu:mamsa"]`
  - `broad`: Broad and sturdy — wide shoulders, large bone structure → obs: `"Kapha Frame"` weight:3 dims `["dosha:kapha", "dhatu:meda"]`
- Importance: 3, Source: Charaka Samhita, Vimansthana 8.96, Sushruta Samhita Sharirasthana 4.63

**`body_weight_tendency`**
- "How does your body naturally respond to weight — regardless of what you eat?"
- Options:
  - `lose_easily`: Hard to gain weight, lose it very easily → obs: `"High Metabolic Rate (Tikshna/Vata)"` weight:2 dims `["agni:tikshna", "dosha:vata"]`
  - `stable`: Relatively stable — I can gain or lose if I try → obs: `"Stable Metabolism (Sama/Pitta)"` weight:2 dims `["agni:sama", "dosha:pitta"]`
  - `gain_easily`: Very easy to gain, extremely hard to lose → obs: `"Slow Metabolic Rate (Manda/Kapha)"` weight:2 dims `["agni:manda", "dosha:kapha"]`
- Importance: 3, Source: Charaka Samhita, Sutrasthana 21.18

### SubCategory: `skin`

**`body_skin_type`**
- "What is your skin naturally like throughout the year?"
- Options:
  - `dry_rough`: Dry, rough, or flaky — especially in winter → obs: `"Vata Skin Type"` weight:3 dims `["dosha:vata", "dhatu:rasa"]`
  - `sensitive_redness`: Sensitive, prone to redness, acne, or irritation → obs: `"Pitta Skin Type"` weight:3 dims `["dosha:pitta", "dhatu:rakta"]`
  - `oily_thick`: Oily, thick, and smooth — rarely gets dry → obs: `"Kapha Skin Type"` weight:3 dims `["dosha:kapha", "dhatu:meda"]`
  - `combination`: Combination — oily in some places, dry in others → obs: `"Vata-Pitta Skin Type"` weight:2 dims `["dosha:vata", "dosha:pitta"]`
- Importance: 2, Source: Ashtanga Hridayam, Sutrasthana 11.2-4

**`body_skin_healing`**
- "When you get a cut or wound, how does your skin typically heal?"
- Options:
  - `slow_dry`: Slowly, skin stays dry, may crack → obs: `"Vata Tissue Healing"` weight:2 dims `["dosha:vata", "dhatu:rasa"]`
  - `inflamed_fast`: Quickly but often with redness or inflammation → obs: `"Pitta Tissue Healing"` weight:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `slow_moist`: Slowly, skin stays moist and soft → obs: `"Kapha Tissue Healing"` weight:2 dims `["dosha:kapha", "dhatu:meda"]`
  - `normal`: Heals normally without any notable pattern → no observations
- Importance: 1, Source: Sushruta Samhita, Sutrasthana 17 (Vrana classification)

### SubCategory: `hair`

**`body_hair_type`**
- "What is your hair naturally like when left untreated?"
- Options:
  - `dry_thin_frizzy`: Dry, thin, frizzy, or prone to splitting → obs: `"Vata Hair Type"` weight:3 dims `["dosha:vata"]`
  - `fine_oily_early_grey`: Fine, slightly oily, or prone to premature greying → obs: `"Pitta Hair Type"` weight:3 dims `["dosha:pitta", "dhatu:rakta"]`
  - `thick_lustrous_wavy`: Thick, lustrous, wavy, grows slowly → obs: `"Kapha Hair Type"` weight:3 dims `["dosha:kapha"]`
- Importance: 2, Source: Charaka Samhita, Sharirasthana 7.15

**`body_hair_loss`**
- "Do you experience noticeable hair thinning or loss?"
- Options:
  - `significant`: Yes — significant thinning or patchy loss → obs: `"Pitta Rakta Dhatu Disturbance"` weight:3 dims `["dosha:pitta", "dhatu:rakta"]`; also obs: `"Excessive Vata in Shirah"` weight:2 dims `["dosha:vata"]`
  - `some`: Some seasonal shedding but not excessive → obs: `"Seasonal Hair Loss Pattern"` weight:1
  - `none`: None — hair remains full → no observations
- Importance: 2, Source: Charaka Samhita, Chikitsasthana 26 (Khalitya nidana)

### SubCategory: `eyes`

**`body_eyes_type`**
- "How would you describe your eyes most of the time?"
- Options:
  - `dry_small_active`: Small, active, dry, or frequently blinking → obs: `"Vata Eye Type"` weight:2 dims `["dosha:vata", "srotas:annavaha"]`
  - `sharp_sensitive_light`: Sharp, sensitive to light, prone to redness → obs: `"Pitta Eye Type"` weight:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `large_moist_calm`: Large, moist, calm, beautiful → obs: `"Kapha Eye Type"` weight:2 dims `["dosha:kapha"]`
- Importance: 1, Source: Ashtanga Hridayam, Sutrasthana 11.3-6

### SubCategory: `joints`

**`body_joints`**
- "How do your joints generally feel?"
- Options:
  - `cracking_dry`: They crack or pop easily, feel dry → obs: `"Vata in Asthivaha Srotas"` weight:3 dims `["dosha:vata", "dhatu:asthi", "srotas:asthivaha"]`
  - `inflamed_warm`: Sometimes feel warm, swollen, or tender → obs: `"Pitta in Rakta/Sandhi"` weight:3 dims `["dosha:pitta", "dhatu:rakta"]`
  - `stiff_heavy`: Feel stiff, especially in the morning, tend to feel heavy → obs: `"Kapha in Asthivaha Srotas"` weight:2 dims `["dosha:kapha", "dhatu:asthi"]`
  - `flexible_no_issues`: Flexible and pain-free → no observations
- Importance: 2, Source: Charaka Samhita, Chikitsasthana 28 (Vatarakta)

### SubCategory: `nails`

**`body_nails`**
- "What are your nails typically like?"
- Options:
  - `brittle_dry`: Brittle, dry, breaking, or cracking easily → obs: `"Vata Nail Tendency"` weight:2 dims `["dosha:vata"]`
  - `pink_soft_medium`: Pink, soft, medium strength → obs: `"Pitta Nail Tendency"` weight:2 dims `["dosha:pitta"]`
  - `thick_strong_smooth`: Thick, strong, smooth, and slow-growing → obs: `"Kapha Nail Tendency"` weight:2 dims `["dosha:kapha"]`
- Importance: 1, Source: Charaka Samhita, Sharirasthana 7.15

### SubCategory: `voice`

**`body_voice`**
- "How would you naturally describe your speaking voice?"
- Options:
  - `low_quick_talkative`: Low volume but fast, talkative, often trailing off → obs: `"Vata Voice Pattern"` weight:1 dims `["dosha:vata"]`
  - `sharp_commanding_clear`: Clear, sharp, commanding, or loud → obs: `"Pitta Voice Pattern"` weight:1 dims `["dosha:pitta"]`
  - `deep_slow_melodic`: Deep, slow, melodic, or resonant → obs: `"Kapha Voice Pattern"` weight:1 dims `["dosha:kapha"]`
- Importance: 1, Source: Charaka Samhita, Vimansthana 8.96

---

## Output Requirements

1. Write valid JSON arrays in each file.
2. Every question must have `"importance"`, `"source"`, `"category"`, `"subCategory"`.
3. Every option with observations must have both `"observation"` and `"dimensions"`.
4. Do NOT reference any other JSON file or import anything — pure data.
5. Use real, accurate Ayurvedic classical sources for each question's `source` field.
6. Questions should be warm, conversational, and accessible — no Sanskrit jargon in the question text itself.

## Definition of Done

- [ ] `introduction.json` contains at minimum 8 questions (expand beyond what Foundation migrated)
- [ ] `body.json` contains at minimum 10 questions across frame, skin, hair, eyes, joints, nails, voice
- [ ] All questions follow the exact schema
- [ ] JSON is valid (run `cat introduction.json | python3 -m json.tool` to verify)
- [ ] No duplicate question IDs across the two files
