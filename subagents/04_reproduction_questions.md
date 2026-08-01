# Subagent 04 — Reproduction Question Data (Gender-Conditional Branching)


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

**Your file:** `reproduction.json` only.  
Do NOT touch any other file.

---

## Repository

```
/ayurveda/swadharma/apps/web/src/data/questions/
```

---

## Read First

- `subagents/foundation.md` — canonical JSON schema (MUST follow exactly)
- `apps/web/src/types/assessment.ts` — TypeScript types
- Understand the `conditions` field: it means the question ONLY appears when those prior answers were given

---

## Context

This is the most complex category because it **branches based on gender**.

Female pathway: menstrual cycle → regularity → flow → pain → PMS → pregnancy history → breastfeeding → menopause → PCOS  
Male pathway: libido → reproductive strength → prostate → urinary → fertility  
Shared: general hormonal questions that apply to both

All questions that are gender-specific MUST have a `conditions` field pointing to `intro_gender`.

> Classical Ayurveda devotes extensive attention to Stri Roga (women's health) in Charaka's Sharirasthana and Sushruta's specialized chapters. These questions should reflect deep classical understanding, not just modern gynecology.

---

## File: `reproduction.json`

Category: `reproduction`

### SubCategory: `shared_hormonal` (no conditions required)

**`rep_libido`**
- "How would you describe your general vitality and desire for life?"
- Subtitle: "This includes physical desire, but also your appetite for experience, work, and connection."
- Single, importance: 2
- Options:
  - `strong_consistent`: Strong and consistent → obs: `"Ojas Strength"` w:2 dims `["ojas:high", "dhatu:shukra"]`
  - `moderate_fluctuating`: Moderate but fluctuating → obs: `"Moderate Ojas"` w:1 dims `["ojas:moderate"]`
  - `low_diminished`: Low or significantly diminished → obs: `"Ojas Depletion"` w:3, `"Vata Shukra Dhatu disturbance"` w:2 dims `["ojas:low", "dhatu:shukra", "dosha:vata"]`
  - `high_exhausting`: Very high but exhausting — scattered energy → obs: `"Pitta Shukra excess / Rajas"` w:2 dims `["dosha:pitta", "manas:rajasic"]`
- Source: Charaka Samhita, Chikitsasthana 2 (Rasayana), Sushruta Samhita Sharirasthana 2.33

**`rep_ojas_resilience`**
- "How would you describe your overall resilience — your ability to bounce back from illness, stress, or depletion?"
- Single, importance: 3
- Options:
  - `very_resilient`: I recover quickly, rarely stay depleted → obs: `"High Ojas"` w:3 dims `["ojas:high"]`
  - `moderate_recovery`: I recover at an average pace → obs: `"Moderate Ojas"` w:1 dims `["ojas:moderate"]`
  - `slow_prolonged`: Recovery takes a long time, I feel depleted easily → obs: `"Low Ojas"` w:3, `"Ojas Depletion"` w:2 dims `["ojas:low", "dhatu:rasa"]`
  - `depends_on_sleep`: Depends entirely on whether I sleep well → obs: `"Vata Nidra disturbance"` w:1, `"Moderate Ojas"` w:1 dims `["ojas:moderate", "dosha:vata"]`
- Source: Charaka Samhita, Sutrasthana 17.73 (Ojas), Ashtanga Hridayam Sutrasthana 11.37-38

---

### SubCategory: `female_cycle`
**Condition for ALL questions in this subCategory:** `[{ "questionId": "intro_gender", "value": "female" }]`

**`rep_cycle_regularity`**
- "How regular is your menstrual cycle?"
- Single, importance: 3
- Conditions: `[{ "questionId": "intro_gender", "value": "female" }]`
- Options:
  - `very_regular_28_30`: Very regular — roughly 28–30 days every cycle → obs: `"Sama Artava (balanced cycle)"` w:2 dims `["dosha:kapha", "dhatu:rakta"]`
  - `regular_but_varies_5days`: Regular with some variation (±5 days) → obs: `"Moderate Artava balance"` w:1 dims `["dhatu:rakta"]`
  - `irregular_skips`: Irregular — frequently skips months or comes early/late → obs: `"Vishama Artava (Vata)"` w:3 dims `["dosha:vata", "dhatu:rakta", "srotas:artavavaha"]`
  - `very_heavy_frequent`: Comes too frequently or is very heavy → obs: `"Pitta Artava (excess)"` w:3 dims `["dosha:pitta", "dhatu:rakta", "srotas:artavavaha"]`
  - `absent_amenorrhea`: Absent or suppressed (not due to pregnancy) → obs: `"Vata Artava Kshaya"` w:3 dims `["dosha:vata", "dhatu:rakta", "ojas:low"]`
- Source: Charaka Samhita, Sharirasthana 4.10-12 (Artava), Sushruta Samhita Sharirasthana 3.5-8

**`rep_flow_heaviness`**
- "How heavy is your menstrual flow?"
- Single, importance: 3
- Conditions: `[{ "questionId": "intro_gender", "value": "female" }]`
- Options:
  - `very_light_spotting`: Very light — almost spotting → obs: `"Vata Artava Kshaya"` w:3 dims `["dosha:vata", "dhatu:rakta"]`
  - `moderate_normal`: Moderate and predictable → obs: `"Sama Artava"` w:2 dims `["dhatu:rakta"]`
  - `heavy_clots`: Heavy with clots → obs: `"Pitta Artava excess"` w:3, `"Kapha Ama in Artava"` w:2 dims `["dosha:pitta", "dosha:kapha", "dhatu:rakta", "srotas:artavavaha"]`
  - `extremely_heavy`: Extremely heavy — soaking through protection → obs: `"Pitta Rakta Dhatu disturbance"` w:3 dims `["dosha:pitta", "dhatu:rakta"]`
- Source: Charaka Samhita, Sharirasthana 4.10-12, Ashtanga Hridayam Sharirasthana 1.22

**`rep_cycle_pain`**
- "Do you experience pain during your period?"
- Single, importance: 3
- Conditions: `[{ "questionId": "intro_gender", "value": "female" }]`
- Options:
  - `severe_cramping`: Severe cramping that disrupts daily life → obs: `"Vata Apana Vayu disturbance"` w:3, `"Kashtartava (painful periods)"` w:3 dims `["dosha:vata", "srotas:artavavaha", "srotas:purishavaha"]`
  - `moderate_manageable`: Moderate pain, manageable → obs: `"Vata-Pitta Artava imbalance"` w:2 dims `["dosha:vata", "dosha:pitta"]`
  - `mild_or_none`: Mild or none → obs: `"Sama Artava"` w:1 dims `["dhatu:rakta"]`
  - `burning_inflammation`: Burning sensation or intense heat with periods → obs: `"Pitta in Artava"` w:3 dims `["dosha:pitta", "dhatu:rakta"]`
- Source: Sushruta Samhita, Uttaratantra 38 (Yonivyapad), Charaka Samhita Chikitsasthana 30

**`rep_pms`**
- "In the week before your period, what do you typically experience?"
- Multiple, importance: 2
- Conditions: `[{ "questionId": "intro_gender", "value": "female" }]`
- Options:
  - `anxiety_insomnia`: Anxiety, restlessness, insomnia → obs: `"Vata PMS Pattern"` w:3 dims `["dosha:vata", "manas:rajasic"]`
  - `anger_irritability`: Anger, irritability, intensity → obs: `"Pitta PMS Pattern"` w:3 dims `["dosha:pitta", "manas:rajasic"]`
  - `depression_withdrawal`: Depression, crying, withdrawal → obs: `"Kapha PMS Pattern"` w:3 dims `["dosha:kapha", "manas:tamasic"]`
  - `bloating_water_retention`: Bloating or water retention → obs: `"Kapha-Vata Artava Purva"` w:2 dims `["dosha:kapha", "dosha:vata"]`
  - `cravings_sugar_sweet`: Intense sweet cravings → obs: `"Ojas Seeking Pattern"` w:1 dims `["ojas:low", "dosha:kapha"]`
  - `no_pms`: I have minimal or no premenstrual symptoms → obs: `"Sama Artava"` w:2 dims `["dhatu:rakta"]`
- Source: Charaka Samhita, Chikitsasthana 30.12-15

**`rep_pregnancy_history`**
- "Have you experienced pregnancy or pregnancy-related changes?"
- Single, importance: 1
- Conditions: `[{ "questionId": "intro_gender", "value": "female" }]`
- Options:
  - `pregnant_now`: I am currently pregnant → no observations (note: limits some recommendations)
  - `postpartum_within_year`: I gave birth within the last year → obs: `"Sutika Kala (postpartum Vata)"` w:3 dims `["dosha:vata", "ojas:low"]`
  - `history_no_current`: History of pregnancy, not currently → obs: `"Stri Garbhashaya history"` w:1
  - `never_pregnant`: Never been pregnant → no observations
  - `fertility_challenges`: Have faced fertility challenges → obs: `"Vandhyatva tendency"` w:2 dims `["dosha:vata", "dhatu:shukra", "ojas:low"]`
- Source: Charaka Samhita, Sharirasthana 4.2 (Garbhavakranti), Kashyapa Samhita

**`rep_menopause_status`**
- "Are you in perimenopause or menopause?"
- Single, importance: 2
- Conditions: `[{ "questionId": "intro_gender", "value": "female" }]`
- Options:
  - `perimenopausal`: Yes — perimenopause (cycles becoming irregular, symptoms beginning) → obs: `"Vata Rajonivritti (perimenopausal)"` w:3 dims `["dosha:vata", "dosha:pitta", "dhatu:rakta"]`
  - `postmenopausal`: Yes — post-menopause (no cycle for 12+ months) → obs: `"Vata Vriddha Kala"` w:2 dims `["dosha:vata", "ojas:low"]`
  - `not_applicable`: No — not in this phase → no observations
- Source: Ashtanga Hridayam, Sharirasthana 1.22 (Rajonivritti)

**`rep_menopause_symptoms`**
- "Which symptoms are you currently experiencing?"
- Multiple, importance: 3
- Conditions: `[{ "questionId": "rep_menopause_status", "value": "perimenopausal" }]`
- Options:
  - `hot_flashes`: Hot flashes or night sweats → obs: `"Pitta Urdhva Gati in Rajonivritti"` w:3 dims `["dosha:pitta", "srotas:rasavaha"]`
  - `insomnia`: Insomnia or disrupted sleep → obs: `"Vata Nidra disturbance"` w:3 dims `["dosha:vata", "srotas:manovaha"]`
  - `mood_swings`: Mood swings or irritability → obs: `"Pitta-Vata Manas disturbance"` w:2 dims `["dosha:pitta", "dosha:vata", "manas:rajasic"]`
  - `vaginal_dryness`: Vaginal dryness → obs: `"Vata Rasa Dhatu Kshaya"` w:3 dims `["dosha:vata", "dhatu:rasa"]`
  - `bone_joint_aches`: Bone or joint aches → obs: `"Vata in Asthivaha Srotas"` w:2 dims `["dosha:vata", "dhatu:asthi"]`
  - `weight_gain`: Weight gain, especially around the middle → obs: `"Kapha Meda Dhatu accumulation"` w:2 dims `["dosha:kapha", "dhatu:meda"]`
- Source: Charaka Samhita, Sharirasthana 4.10, Ashtanga Hridayam Sharirasthana 1.22

---

### SubCategory: `male_reproductive`
**Condition for ALL questions in this subCategory:** `[{ "questionId": "intro_gender", "value": "male" }]`

**`rep_male_vitality`**
- "How would you describe your current physical vitality and strength?"
- Single, importance: 3
- Conditions: `[{ "questionId": "intro_gender", "value": "male" }]`
- Options:
  - `strong_building`: Strong and building — I feel at my peak → obs: `"High Ojas"` w:2, `"Strong Shukra Dhatu"` w:2 dims `["ojas:high", "dhatu:shukra"]`
  - `moderate_maintaining`: Moderate — maintaining but not building → obs: `"Moderate Ojas"` w:1 dims `["ojas:moderate"]`
  - `declining_noticeable`: Noticeable decline from my peak → obs: `"Vata Shukra Kshaya"` w:2 dims `["dosha:vata", "dhatu:shukra", "ojas:low"]`
  - `very_depleted`: Very depleted — I feel significantly weaker → obs: `"Ojas Depletion"` w:3, `"Vata Shukra Kshaya"` w:3 dims `["ojas:low", "dhatu:shukra", "dosha:vata"]`
- Source: Charaka Samhita, Chikitsasthana 2 (Rasayana/Vajikarana), Sushruta Samhita Chikitsasthana 26

**`rep_male_urination`**
- "How is your urination typically?"
- Single, importance: 2
- Conditions: `[{ "questionId": "intro_gender", "value": "male" }]`
- Options:
  - `normal_clear`: Normal frequency, clear or light yellow → obs: `"Balanced Mutravaha Srotas"` w:1 dims `["srotas:mutravaha"]`
  - `frequent_nighttime`: Frequent, especially at night → obs: `"Vata in Mutravaha Srotas"` w:2 dims `["dosha:vata", "srotas:mutravaha"]`
  - `difficulty_stream`: Difficulty initiating or weak stream → obs: `"Kapha in Mutravaha Srotas"` w:2 dims `["dosha:kapha", "srotas:mutravaha"]`
  - `burning_discomfort`: Burning or discomfort → obs: `"Pitta in Mutravaha Srotas"` w:3 dims `["dosha:pitta", "srotas:mutravaha"]`
- Source: Charaka Samhita, Sutrasthana 17.118 (Mutravaha Srotas)

**`rep_male_hair_pattern`**
- "Have you noticed significant hair thinning or male pattern baldness?"
- Single, importance: 1
- Conditions: `[{ "questionId": "intro_gender", "value": "male" }]`
- Options:
  - `significant_early`: Significant hair loss, began before 35 → obs: `"Pitta Rakta Dhatu excess"` w:3, `"Premature aging pattern"` w:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `moderate_age_appropriate`: Moderate, age-appropriate → obs: `"Pitta Rakta tendency"` w:1 dims `["dosha:pitta"]`
  - `minimal`: Minimal or none → no observations
- Source: Charaka Samhita, Chikitsasthana 26 (Khalitya)

---

## Output Requirements

1. Valid JSON array.
2. All gender-conditional questions MUST have `"conditions": [{ "questionId": "intro_gender", "value": "female" }]` or `"male"`.
3. Questions with sub-conditions (like menopause symptoms) chain the conditions.
4. IDs must be unique with prefix `rep_`.
5. Validate JSON: `cat reproduction.json | python3 -m json.tool`

## Definition of Done

- [ ] `reproduction.json` has minimum 14 questions
- [ ] Female pathway has minimum 7 questions with correct `intro_gender = female` conditions
- [ ] Male pathway has minimum 3 questions with correct `intro_gender = male` conditions
- [ ] Shared questions have no conditions (or both pathways)
- [ ] All JSON is valid
