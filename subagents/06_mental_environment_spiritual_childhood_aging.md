# Subagent 06 — Mental, Environment, Spirituality, Relationships, Childhood & Aging Questions

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


**Your files:** `mental.json`, `environment.json`, `spirituality.json`, `relationships.json`, `childhood.json`, `aging.json`  
Do NOT touch any other file.

---

## Repository

```
/ayurveda/swadharma/apps/web/src/data/questions/
```

---

## Read First

- `subagents/foundation.md` — canonical JSON schema (MUST follow)
- Note: `emotions.json` (Subagent 03) covers emotional reactions, personality, stress reactions.
  `mental.json` goes deeper into **cognitive function, memory, focus, and stress coping** — not personality.

---

## File: `mental.json`

Category: `mental`. Cognitive function, memory, attention, stress response, burnout, and decision-making depth.

### SubCategory: `cognitive`

**`men_focus`**
- "How is your ability to sustain focus on a single task?"
- Single, importance: 2
- Options:
  - `easily_distracted`: Easily distracted, mind jumps from topic to topic → obs: `"Vata Manas (Chala)"` w:3 dims `["dosha:vata", "manas:rajasic"]`
  - `hyperfocused_intense`: I can hyperfocus intensely but then crash → obs: `"Pitta Manas (Tikshna)"` w:2 dims `["dosha:pitta", "manas:rajasic"]`
  - `steady_sustained`: Steady, sustained focus without burning out → obs: `"Kapha Manas (Sthira)"` w:2 dims `["dosha:kapha"]`
  - `variable_depends`: Varies significantly day to day → obs: `"Vishama Manas pattern"` w:2 dims `["dosha:vata", "agni:vishama"]`
- Source: Charaka Samhita, Sutrasthana 8.5

**`men_learning_style`**
- "How do you prefer to learn or process new information?"
- Single, importance: 1
- Options:
  - `quick_overview_intuitive`: Quick overview is enough — I grasp intuitively → obs: `"Vata Manas (Chala)"` w:2 dims `["dosha:vata"]`
  - `structured_detailed`: Need structured, detailed, logical explanation → obs: `"Pitta Manas (Tikshna)"` w:2 dims `["dosha:pitta"]`
  - `repetition_practice`: Need repetition and practice — I learn by doing → obs: `"Kapha Manas (Sthira)"` w:2 dims `["dosha:kapha"]`
- Source: Ashtanga Hridayam, Sutrasthana 1.9

**`men_overthinking`**
- "Do you experience excessive thinking or overthinking?"
- Single, importance: 3
- Options:
  - `constant_cant_stop`: Constant — I can't stop my mind even when I try → obs: `"Vata Manas (Chala/Laghu)"` w:3, `"Excessive Rajas in Manas"` w:2 dims `["dosha:vata", "manas:rajasic", "srotas:manovaha"]`
  - `occasional_manageable`: Occasionally, but I can redirect → obs: `"Moderate Rajas in Manas"` w:1 dims `["manas:rajasic"]`
  - `rarely_mostly_calm`: Rarely — my mind is generally calm → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic"]`
  - `cyclic_obsessive`: Cyclic — the same thoughts return obsessively → obs: `"Vata Manas disturbance"` w:3, `"Manasika Ama"` w:2 dims `["dosha:vata", "manas:rajasic", "srotas:manovaha"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`men_creativity`**
- "How naturally creative or imaginative are you?"
- Single, importance: 1
- Options:
  - `very_creative_ideas_flow`: Very creative — ideas flow constantly → obs: `"Vata Manas (creative)"` w:2 dims `["dosha:vata"]`
  - `analytical_precise`: More analytical and precise than creative → obs: `"Pitta Manas (Tikshna)"` w:1 dims `["dosha:pitta"]`
  - `practical_steady`: Practical and steady — not particularly creative → obs: `"Kapha Manas (Sthira)"` w:1 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 8.5

**`men_stress_coping`**
- "What do you most often do when you feel overwhelmed?"
- Multiple, importance: 3
- Options:
  - `physical_activity`: Go for a walk, exercise, or move → obs: `"Vata Grounding coping"` w:1 dims `["lifestyle:active"]`
  - `food_comfort`: Seek comfort food or overeat → obs: `"Emotional eating pattern"` w:2, `"Kapha Ama"` w:1 dims `["dosha:kapha", "ojas:low"]`
  - `social_talk`: Talk to someone, seek social support → obs: `"Pitta Social coping"` w:1 dims `["dosha:pitta"]`
  - `isolate`: Withdraw and isolate → obs: `"Kapha Manas (Tamasic) withdrawal"` w:2 dims `["dosha:kapha", "manas:tamasic"]`
  - `worry_overthink`: Worry and overthink endlessly → obs: `"Vata Manas (Rajasic)"` w:3 dims `["dosha:vata", "manas:rajasic"]`
  - `spiritual_prayer`: Prayer, meditation, or spiritual practice → obs: `"Sattvic Manas coping"` w:2 dims `["manas:sattvic"]`
  - `substance`: Use substances (alcohol, caffeine, etc.) → obs: `"Ojas Depletion risk"` w:3, `"Rajasic-Tamasic Manas"` w:2 dims `["ojas:low", "manas:rajasic", "manas:tamasic"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`men_burnout`**
- "Have you experienced burnout — persistent exhaustion that rest doesn't fix?"
- Single, importance: 3
- Options:
  - `currently_in_burnout`: Currently experiencing it → obs: `"Ojas Depletion"` w:3, `"Low Ojas"` w:3, `"Pitta Vata Manas excess"` w:2 dims `["ojas:low", "dosha:pitta", "dosha:vata", "manas:rajasic"]`
  - `recovering_from_burnout`: Recovering from a period of burnout → obs: `"Low Ojas"` w:2, `"Vata Rasa Kshaya"` w:2 dims `["ojas:low", "dhatu:rasa"]`
  - `experienced_past`: Have experienced it in the past → obs: `"Low Ojas history"` w:1 dims `["ojas:moderate"]`
  - `never`: Never experienced burnout → obs: `"High Ojas"` w:1 dims `["ojas:high"]`
- Source: Charaka Samhita, Chikitsasthana 2 (Rasayana — Ojas depletion), Sushruta Samhita Sharirasthana 15

---

## File: `environment.json`

Category: `environment`. Climate sensitivity, seasonal variation, altitude, nature preferences.

**`env_heat_tolerance`**
- "How do you tolerate high heat?"
- Single, importance: 2
- Options:
  - `hate_heat_wilts`: I wilt in heat — become irritable and weak → obs: `"Pitta Aggravation tendency"` w:3 dims `["dosha:pitta"]`
  - `love_warm_weather`: I thrive in warm weather → obs: `"Vata heat comfort"` w:1 dims `["dosha:vata"]`; also obs: `"Kapha heat comfort"` w:1 dims `["dosha:kapha"]`
  - `fine_in_any_heat`: Generally fine in any heat → obs: `"Kapha Sthira constitution"` w:1 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 6.3-8 (Ritucharya — Grishma)

**`env_cold_tolerance`**
- "How do you tolerate cold weather?"
- Single, importance: 2
- Options:
  - `very_sensitive_cold`: Very sensitive to cold — it goes right through me → obs: `"Vata Aggravation tendency"` w:3, `"Shita Guna excess"` w:2 dims `["dosha:vata", "dosha:kapha"]`
  - `comfortable_in_cold`: I actually prefer cold weather → obs: `"Pitta Agni seeking cooling"` w:2 dims `["dosha:pitta"]`
  - `tolerate_well`: I tolerate cold reasonably well → obs: `"Kapha Sthira"` w:1 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 6.3-8 (Ritucharya — Hemanta)

**`env_seasonal_impact`**
- "Which season consistently affects your health or mood the most?"
- Single, importance: 2
- Options:
  - `summer_worst`: Summer (excess heat) → obs: `"Pitta Aggravation tendency"` w:2 dims `["dosha:pitta"]`
  - `late_monsoon_autumn`: Late monsoon/rainy season or autumn → obs: `"Vata Aggravation tendency"` w:2 dims `["dosha:vata"]`
  - `winter_spring`: Winter or spring (cold, damp) → obs: `"Kapha Aggravation tendency"` w:2 dims `["dosha:kapha"]`
  - `affected_by_all_equally`: Every seasonal change affects me → obs: `"Vishama Agni seasonal sensitivity"` w:2 dims `["agni:vishama", "dosha:vata"]`
  - `not_much_affected`: Not significantly affected by seasons → obs: `"Sama Agni"` w:1
- Source: Charaka Samhita, Sutrasthana 6 (Ritucharya — Shadrita), Ashtanga Hridayam Sutrasthana 3.1-9

**`env_humidity`**
- "How do you feel in high humidity?"
- Single, importance: 1
- Options:
  - `love_humid`: Love humidity — my skin feels better → obs: `"Vata Snigdha affinity"` w:1 dims `["dosha:vata"]`
  - `hate_humid_lethargic`: Feel heavy, lethargic, or congested → obs: `"Kapha Aggravation tendency"` w:2 dims `["dosha:kapha"]`
  - `fine`: Generally fine → no strong observations
- Source: Charaka Samhita, Sutrasthana 6.3-8

---

## File: `spirituality.json`

Category: `spirituality`. Sattvic practices, spiritual disposition, meditation, purpose.

**`spi_meditation_practice`**
- "Do you have a meditation or contemplative practice?"
- Single, importance: 1
- Options:
  - `daily_consistent`: Daily, consistent practice → obs: `"Sattvic Manas tendency"` w:3 dims `["manas:sattvic"]`
  - `occasional`: Occasionally, not regular → obs: `"Moderate Sattvic Practice"` w:1 dims `["manas:sattvic"]`
  - `tried_cannot_sit_still`: I've tried but cannot sit still — the mind races → obs: `"Vata Manas (Chala)"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `no_interest`: No practice or interest → no strong observations
- Source: Charaka Samhita, Sutrasthana 1.58 (Sattvavajaya)

**`spi_purpose`**
- "Do you have a clear sense of your life's purpose or dharma?"
- Single, importance: 1
- Options:
  - `very_clear_living_it`: Very clear — I am living it → obs: `"High Ojas"` w:1, `"Sattvic Manas tendency"` w:2 dims `["ojas:high", "manas:sattvic"]`
  - `sense_of_purpose_not_fully`: I have a sense, but I'm not fully aligned → obs: `"Sattvic Manas seeking"` w:1
  - `searching_uncertain`: Still searching, feel uncertain → obs: `"Vata Manas existential"` w:1 dims `["dosha:vata"]`
  - `disconnected`: Feeling disconnected from purpose → obs: `"Kapha Manas (Tamasic)"` w:1, `"Low Ojas"` w:1 dims `["dosha:kapha", "ojas:low"]`
- Source: Charaka Samhita, Sutrasthana 8.5 (Sadvritta — Right Living)

**`spi_silence`**
- "How comfortable are you with silence and solitude?"
- Single, importance: 1
- Options:
  - `thrive_love_silence`: Thrive in silence — I seek it actively → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic"]`
  - `tolerate_occasional`: Can tolerate it but prefer company → obs: `"Pitta Social Pattern"` w:1 dims `["dosha:pitta"]`
  - `uncomfortable_avoid`: Uncomfortable — I fill every silence → obs: `"Vata Manas (Chala)"` w:2 dims `["dosha:vata", "manas:rajasic"]`
- Source: Charaka Samhita, Sutrasthana 8.18 (Sadvritta)

**`spi_ritual_discipline`**
- "Do you observe regular ritual or spiritual disciplines (prayer, puja, fasting, mantra, study)?"
- Multiple, importance: 1
- Options:
  - `prayer_puja`: Daily prayer or puja → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic", "lifestyle:regulated"]`
  - `mantra_japa`: Mantra or japa → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic"]`
  - `fasting`: Regular fasting → obs: `"Agni purification practice"` w:1 dims `["agni:sama"]`
  - `scriptural_study`: Study of scriptures or philosophical texts → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic"]`
  - `seva`: Regular selfless service → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic", "ojas:high"]`
  - `none`: No regular spiritual discipline → no observations
- Source: Charaka Samhita, Sutrasthana 8.18 (Sadvritta — Right Conduct)

---

## File: `relationships.json`

Category: `relationships`. Communication, attachment style, conflict response, empathy.

**`rel_communication`**
- "How do you naturally communicate in close relationships?"
- Single, importance: 1
- Options:
  - `expressive_talkative`: Expressive and talkative — share freely → obs: `"Vata Manas (Chala)"` w:1 dims `["dosha:vata"]`
  - `direct_assertive`: Direct and assertive — say what I mean → obs: `"Pitta Manas (Tikshna)"` w:1 dims `["dosha:pitta"]`
  - `quiet_reserved`: Quiet and reserved — express only when ready → obs: `"Kapha Manas (Sthira)"` w:1 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`rel_conflict`**
- "How do you handle conflict in relationships?"
- Single, importance: 2
- Options:
  - `avoid_flee`: Avoid it, flee, or get anxious → obs: `"Vata Manas conflict avoidance"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `confront_directly`: Confront it directly — I need to resolve it immediately → obs: `"Pitta Manas (Rajasic)"` w:2 dims `["dosha:pitta", "manas:rajasic"]`
  - `slow_process_forgive`: Process slowly but ultimately forgive → obs: `"Kapha Manas deliberate"` w:1 dims `["dosha:kapha"]`
  - `hold_grudge`: Hold on to grievances for a long time → obs: `"Kapha Manas (Tamasic)"` w:2 dims `["dosha:kapha", "manas:tamasic"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`rel_empathy`**
- "How strong is your natural empathy?"
- Single, importance: 1
- Options:
  - `deep_absorb_others`: Deep empathy — I absorb others' emotions easily → obs: `"Kapha Manas (deep empathy)"` w:1 dims `["dosha:kapha"]`; also obs: `"Vata emotional sensitivity"` w:1 dims `["dosha:vata"]`
  - `selective_appropriate`: Appropriate empathy — I connect when relevant → obs: `"Sattvic Manas tendency"` w:1 dims `["manas:sattvic"]`
  - `analytical_less_emotional`: More analytical — I understand problems, not always feelings → obs: `"Pitta Manas (Tikshna)"` w:1 dims `["dosha:pitta"]`
- Source: Charaka Samhita, Sutrasthana 8.5

---

## File: `childhood.json`

Category: `childhood`. Childhood Prakrti patterns — often reveal constitutional baseline.

**`chi_childhood_frame`**
- "As a child (before puberty), what was your natural body type?"
- Single, importance: 3
- Options:
  - `always_thin`: Always thin, hard to gain weight → obs: `"Vata Prakrti (childhood)"` w:3 dims `["dosha:vata"]`
  - `athletic_muscular`: Athletic or muscular, medium build → obs: `"Pitta Prakrti (childhood)"` w:3 dims `["dosha:pitta"]`
  - `heavier_stocky`: Heavier or stockier, gained weight easily → obs: `"Kapha Prakrti (childhood)"` w:3 dims `["dosha:kapha"]`
  - `changed_dramatically`: Changed dramatically between child and adult → obs: `"Mixed Prakrti"` w:1
- Source: Charaka Samhita, Sharirasthana 3 (Katidhapurusha Sharira — constitutional analysis)

**`chi_childhood_digestion`**
- "What was your digestion like as a child?"
- Single, importance: 2
- Options:
  - `frequent_stomach_aches`: Frequent stomach aches or gas → obs: `"Vata Agni tendency (childhood)"` w:2 dims `["dosha:vata", "agni:vishama"]`
  - `strong_always_hungry`: Strong appetite, always hungry → obs: `"Tikshna Agni tendency (childhood)"` w:2 dims `["agni:tikshna", "dosha:pitta"]`
  - `picky_slow_eater`: Picky eater, slow eater → obs: `"Manda Agni tendency (childhood)"` w:2 dims `["agni:manda", "dosha:kapha"]`
  - `no_particular_issues`: No significant digestive issues → obs: `"Sama Agni (childhood)"` w:1
- Source: Charaka Samhita, Sharirasthana 3.10-11

**`chi_childhood_activity`**
- "As a child, how were your activity levels?"
- Single, importance: 1
- Options:
  - `hyperactive_restless`: Hyperactive, always on the move, restless → obs: `"Vata Bala (high activity)"` w:2 dims `["dosha:vata"]`
  - `competitive_sporty`: Competitive, sporty, driven to win → obs: `"Pitta Bala (competitive)"` w:2 dims `["dosha:pitta"]`
  - `calm_preferred_sitting`: Calm, preferred quiet activities, sitting → obs: `"Kapha Bala (sedentary tendency)"` w:2 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sharirasthana 3.10

**`chi_childhood_illnesses`**
- "What illnesses did you frequently get as a child?"
- Multiple, importance: 2
- Options:
  - `colds_coughs_mucus`: Frequent colds, coughs, mucus → obs: `"Kapha Pranavaha Srotas tendency"` w:2 dims `["dosha:kapha", "srotas:pranavaha"]`
  - `fevers_infections`: Frequent fevers or infections → obs: `"Tikshna Agni / Pitta Rakta tendency"` w:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `constipation_gas`: Constipation or gas → obs: `"Vata Apana disturbance"` w:2 dims `["dosha:vata", "srotas:purishavaha"]`
  - `skin_rashes_eczema`: Skin rashes or eczema → obs: `"Pitta Twak tendency"` w:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `generally_healthy`: Generally healthy, rarely sick → obs: `"High Ojas (childhood)"` w:2 dims `["ojas:high"]`
- Source: Charaka Samhita, Sutrasthana 17 (Srotas — childhood vulnerabilities)

---

## File: `aging.json`

Category: `aging`. Aging patterns relevant only for those 40+ (use conditions on intro_age_range).

**`age_energy_changes`**
- "How has your energy changed compared to your 20s or 30s?"
- Single, importance: 2
- Conditions: `[{ "questionId": "intro_age_range", "value": "mature" }]`
- Options:
  - `significant_decline`: Significant decline — I tire much faster → obs: `"Vata Vriddha Kala"` w:3, `"Ojas Depletion"` w:2 dims `["dosha:vata", "ojas:low"]`
  - `moderate_decline`: Moderate — somewhat less energy but manageable → obs: `"Moderate Vata Vriddha"` w:2 dims `["dosha:vata"]`
  - `maintained_well`: I've maintained energy surprisingly well → obs: `"High Ojas (aging)"` w:2 dims `["ojas:high"]`
- Source: Charaka Samhita, Sutrasthana 30.10 (Kala — age stages)

**`age_memory_cognition`**
- "Have you noticed any changes in memory or cognitive sharpness with age?"
- Single, importance: 2
- Conditions: `[{ "questionId": "intro_age_range", "value": "mature" }]`
- Options:
  - `significant_forgetfulness`: Noticeable forgetfulness → obs: `"Vata Majja Dhatu Kshaya"` w:3 dims `["dosha:vata", "dhatu:majja"]`
  - `moderate_word_finding`: Occasional word-finding difficulty → obs: `"Vata Vriddha Manas"` w:2 dims `["dosha:vata"]`
  - `sharp_as_ever`: Sharp as ever → obs: `"High Ojas (aging)"` w:2 dims `["ojas:high", "dhatu:majja"]`
- Source: Charaka Samhita, Chikitsasthana 2 (Rasayana — cognitive aging)

**`age_mobility`**
- "How is your joint mobility and physical flexibility compared to younger years?"
- Single, importance: 2
- Conditions: `[{ "questionId": "intro_age_range", "value": "mature" }]`
- Options:
  - `significant_stiffness`: Significant stiffness or pain → obs: `"Vata in Asthivaha Srotas (aging)"` w:3 dims `["dosha:vata", "dhatu:asthi"]`
  - `some_stiffness`: Some stiffness, manageable → obs: `"Moderate Vata Asthi tendency"` w:2 dims `["dosha:vata"]`
  - `still_flexible`: Still quite flexible → obs: `"Kapha Shleshaka Kapha support"` w:1 dims `["dosha:kapha"]`
- Source: Sushruta Samhita, Sharirasthana 5.29 (Sandhi)

---

## ID Prefix Summary

- `men_` → mental.json
- `env_` → environment.json
- `spi_` → spirituality.json
- `rel_` → relationships.json
- `chi_` → childhood.json
- `age_` → aging.json

## Definition of Done

- [ ] All 6 JSON files created with valid JSON arrays
- [ ] `mental.json` has minimum 6 questions
- [ ] `environment.json` has minimum 4 questions
- [ ] `spirituality.json` has minimum 4 questions
- [ ] `relationships.json` has minimum 3 questions
- [ ] `childhood.json` has minimum 4 questions
- [ ] `aging.json` has minimum 3 questions (with age_range conditions)
- [ ] All JSON is valid
- [ ] No duplicate IDs with other subagents
