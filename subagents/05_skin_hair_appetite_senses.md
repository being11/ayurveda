# Subagent 05 — Skin, Hair, Appetite & Senses Question Data


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

**Your files:** `skin_hair.json` and `appetite_senses.json` only.  
Do NOT touch any other file.

---

## Repository

```
/ayurveda/swadharma/apps/web/src/data/questions/
```

---

## Read First

- `subagents/foundation.md` — canonical JSON schema
- `apps/web/src/types/assessment.ts` — TypeScript types
- Note: `body.json` (Subagent 01) covers basic skin type, hair type, and eye type.  
  This file goes **deeper** into pathological tendencies, sensory health, and cravings. Do NOT duplicate what Subagent 01 covers.

---

## File: `skin_hair.json`

Category: `skin_hair`. Covers skin pathologies, hair health specifics, ENT/senses.

### SubCategory: `skin_pathology`

**`sh_skin_acne`**
- "Do you experience acne or skin breakouts?"
- Single, importance: 2
- Options:
  - `inflammatory_deep`: Inflammatory, deep, painful cysts → obs: `"Pitta in Rakta/Lasika"` w:3 dims `["dosha:pitta", "dhatu:rakta", "srotas:rasavaha"]`
  - `blackheads_whiteheads`: Blackheads, whiteheads, minor blemishes → obs: `"Kapha Meda in Twak"` w:2 dims `["dosha:kapha", "dhatu:meda"]`
  - `dry_rough_no_acne`: Dry skin, no acne → obs: `"Vata Skin Type"` w:1 dims `["dosha:vata"]`
  - `hormonal_cyclical`: Hormonal — appears at a predictable time each month → obs: `"Pitta Artava Rakta disturbance"` w:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `none`: No acne or breakouts → no observations
- Source: Charaka Samhita, Chikitsasthana 7 (Kushtha), Sushruta Samhita Nidanasthana 13

**`sh_skin_pigmentation`**
- "Do you have any skin discoloration or pigmentation concerns?"
- Multiple, importance: 1
- Options:
  - `hyperpigmentation_dark`: Dark patches or hyperpigmentation → obs: `"Pitta Rakta Blemish Pattern"` w:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `vitiligo`: White patches or vitiligo → obs: `"Bhrajaka Pitta disturbance"` w:3 dims `["dosha:pitta", "dhatu:mamsa"]`
  - `rashes_urticaria`: Rashes, hives, or eczema → obs: `"Pitta Kapha Twak Vikara"` w:3 dims `["dosha:pitta", "dosha:kapha", "dhatu:rakta"]`
  - `psoriasis`: Psoriasis or thick scaling patches → obs: `"Vata-Pitta Kushtha pattern"` w:3 dims `["dosha:vata", "dosha:pitta", "dhatu:rakta"]`
  - `none`: None → no observations
- Source: Charaka Samhita, Chikitsasthana 7 (Mahakushtha and Kshudrakushtha)

**`sh_skin_sensitivity`**
- "How sensitive is your skin to products, sun, or environmental changes?"
- Single, importance: 2
- Options:
  - `very_sensitive_many_reactions`: Very sensitive — reactions to many products or sun → obs: `"Pitta Twak Sensitivity"` w:3, `"Bhrajaka Pitta excess"` w:2 dims `["dosha:pitta", "dhatu:rakta"]`
  - `somewhat_sensitive`: Somewhat sensitive to a few specific things → obs: `"Pitta-Vata Twak tendency"` w:1 dims `["dosha:pitta"]`
  - `low_sensitivity`: Not particularly sensitive — skin is resilient → obs: `"Kapha Twak resilience"` w:1 dims `["dosha:kapha"]`
- Source: Ashtanga Hridayam, Sutrasthana 11.2-4

### SubCategory: `hair_deep`

**`sh_hair_texture`**
- "What is the texture of your hair?"
- Single, importance: 1
- Options:
  - `dry_brittle_split_ends`: Dry, brittle, prone to split ends → obs: `"Vata Kesha Kshaya"` w:2 dims `["dosha:vata", "dhatu:asthi"]`
  - `oily_limp`: Oily, limp, or flat → obs: `"Kapha Meda in Kesha"` w:2 dims `["dosha:kapha", "dhatu:meda"]`
  - `normal_healthy`: Normal, healthy texture → no observations
  - `premature_grey`: Premature greying (before 35) → obs: `"Pitta Rakta excess"` w:3, `"Bhrajaka Pitta burning Kesha Dhatu"` w:2 dims `["dosha:pitta", "dhatu:rakta"]`
- Source: Charaka Samhita, Sharirasthana 7.15

**`sh_scalp`**
- "What is your scalp typically like?"
- Single, importance: 1
- Options:
  - `very_dry_flaky`: Very dry or flaky — dandruff is common → obs: `"Vata Twak in Shirah"` w:2 dims `["dosha:vata"]`
  - `oily_itchy`: Oily or itchy → obs: `"Kapha Pitta in Shirah"` w:2 dims `["dosha:kapha", "dosha:pitta"]`
  - `normal`: Normal — no significant scalp issues → no observations
- Source: Charaka Samhita, Chikitsasthana 26 (Darunaka)

### SubCategory: `ent_senses`

**`sh_ears`**
- "Do you experience any ear-related concerns?"
- Multiple, importance: 1
- Options:
  - `tinnitus_ringing`: Ringing or noise in the ears → obs: `"Vata in Shrotrendriya"` w:3 dims `["dosha:vata", "srotas:pranavaha"]`
  - `excess_wax`: Excessive ear wax → obs: `"Kapha in Shrotas"` w:2 dims `["dosha:kapha"]`
  - `sensitivity_noise`: Sensitivity to loud sounds → obs: `"Vata Manas sensitivity"` w:2 dims `["dosha:vata", "srotas:manovaha"]`
  - `hearing_challenges`: Hearing challenges or muffled hearing → obs: `"Kapha Avarana in Shrotas"` w:2 dims `["dosha:kapha"]`
  - `none`: None → no observations
- Source: Charaka Samhita, Sutrasthana 17.116 (Shrotavaha Srotas)

**`sh_nose_sinus`**
- "Do you experience nasal or sinus issues?"
- Multiple, importance: 1
- Options:
  - `chronic_congestion`: Chronic congestion or blocked nose → obs: `"Kapha in Pranavaha Srotas"` w:3 dims `["dosha:kapha", "srotas:pranavaha"]`
  - `frequent_colds`: Frequent colds and rhinitis → obs: `"Low Ojas"` w:2, `"Kapha Pranavaha"` w:2 dims `["ojas:low", "dosha:kapha"]`
  - `nosebleeds`: Frequent nosebleeds → obs: `"Pitta Rakta Urdhva Gati"` w:3 dims `["dosha:pitta", "dhatu:rakta"]`
  - `dry_cracked_nose`: Dry or cracked nasal passages → obs: `"Vata in Nasika"` w:2 dims `["dosha:vata"]`
  - `sinusitis_headaches`: Sinus headaches or pressure → obs: `"Kapha Pitta in Shiro Pranavaha"` w:2 dims `["dosha:kapha", "dosha:pitta"]`
  - `none`: None → no observations
- Source: Charaka Samhita, Sutrasthana 17.116

**`sh_vision`**
- "How is your vision and eye health?"
- Multiple, importance: 1
- Options:
  - `dry_eyes_burning`: Dry eyes or burning sensation → obs: `"Vata-Pitta in Drishti"` w:2, `"Alochaka Pitta disturbance"` w:2 dims `["dosha:vata", "dosha:pitta", "dhatu:rakta"]`
  - `watery_eyes`: Excessively watery eyes → obs: `"Kapha in Akshi"` w:2 dims `["dosha:kapha"]`
  - `light_sensitivity`: Sensitivity to bright light → obs: `"Pitta Alochaka sensitivity"` w:2 dims `["dosha:pitta"]`
  - `blurring_strain`: Blurring or eye strain → obs: `"Vata in Akshi"` w:2 dims `["dosha:vata"]`
  - `no_issues`: No significant vision issues → no observations
- Source: Charaka Samhita, Sutrasthana 17.116 (Chakshuvaha Srotas)

---

## File: `appetite_senses.json`

Category: `appetite_senses`. Covers cravings, tastes, sensory preferences, and thirst patterns.

### SubCategory: `taste_cravings`

**`as_taste_preference`**
- "Which taste or flavor do you naturally crave or enjoy most?"
- Multiple, importance: 2
- Options:
  - `sweet`: Sweet (fruits, honey, dairy, starchy) → obs: `"Kapha/Ojas taste craving"` w:1 dims `["dosha:kapha", "ojas:moderate"]`
  - `salty`: Salty (cured, pickled, processed) → obs: `"Vata Salt Craving"` w:2 dims `["dosha:vata", "agni:vishama"]`
  - `sour`: Sour (fermented, citrus, tamarind) → obs: `"Pitta-Vata Sour Craving"` w:2 dims `["dosha:pitta", "dosha:vata", "agni:tikshna"]`
  - `bitter`: Bitter (coffee, kale, bitter gourd) → obs: `"Pitta Cleansing tendency"` w:1 dims `["dosha:pitta"]`
  - `spicy_pungent`: Spicy or pungent (chili, pepper, ginger) → obs: `"Pitta Pungent Craving"` w:2, `"Tikshna Agni"` w:1 dims `["dosha:pitta", "agni:tikshna"]`
  - `astringent`: Astringent (pomegranate, beans, unripe fruit) → obs: `"Vata Ruksha tendency"` w:1 dims `["dosha:vata"]`
- Source: Charaka Samhita, Sutrasthana 26 (Dravya Guna — Shad Rasa)

**`as_craving_types`**
- "What do you crave most when you're emotionally stressed or depleted?"
- Multiple, importance: 2
- Options:
  - `sweets_comfort`: Sweets and comfort foods → obs: `"Emotional eating pattern"` w:2, `"Ojas seeking"` w:1 dims `["ojas:low", "dosha:kapha"]`
  - `salty_crunchy`: Salty or crunchy foods → obs: `"Vata Manas craving"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `caffeine_stimulants`: Caffeine or stimulants → obs: `"Rajas stimulation seeking"` w:2, `"Low Ojas"` w:1 dims `["manas:rajasic", "ojas:low", "dosha:vata"]`
  - `no_appetite_at_all`: My appetite disappears entirely → obs: `"Vishama Agni (stress)"` w:2 dims `["agni:vishama", "dosha:vata"]`
  - `spicy_or_heavy`: Spicy or very heavy foods → obs: `"Pitta Manas craving"` w:1 dims `["dosha:pitta", "manas:rajasic"]`
- Source: Charaka Samhita, Sutrasthana 8.25 (Pathya-Apathya)

**`as_thirst`**
- "How is your thirst throughout the day?"
- Single, importance: 2
- Options:
  - `very_thirsty_always`: Very thirsty — always reaching for water → obs: `"Pitta Ambuvaha excess"` w:2, `"Tikshna Agni"` w:1 dims `["dosha:pitta", "srotas:ambuvaha", "agni:tikshna"]`
  - `moderate_normal`: Moderate — drink a normal amount → obs: `"Balanced Ambuvaha"` w:1 dims `["srotas:ambuvaha"]`
  - `rarely_thirsty`: Rarely feel thirsty — often forget to drink → obs: `"Manda Agni"` w:1, `"Kapha Ambuvaha suppression"` w:1 dims `["agni:manda", "dosha:kapha", "srotas:ambuvaha"]`
  - `variable_intense_spells`: Variable — periods of intense thirst then none → obs: `"Vishama Ambuvaha"` w:2 dims `["dosha:vata", "srotas:ambuvaha"]`
- Source: Charaka Samhita, Sutrasthana 17.117 (Ambuvaha Srotas)

**`as_ghee_oil_tolerance`**
- "How do you tolerate dietary fats — ghee, oils, and fatty foods?"
- Single, importance: 2
- Options:
  - `love_handle_well`: Love them and digest them well → obs: `"Sama Agni tolerance"` w:1, `"Vata Snehana affinity"` w:1 dims `["agni:sama", "dosha:vata"]`
  - `feel_heavy_nauseous`: Feel heavy, nauseous, or sluggish after → obs: `"Manda Agni fat intolerance"` w:2 dims `["agni:manda", "dosha:kapha"]`
  - `heartburn_reflux`: Cause heartburn or reflux → obs: `"Tikshna Agni fat aggravation"` w:2, `"Pitta in Amashaya"` w:1 dims `["agni:tikshna", "dosha:pitta"]`
  - `no_preference`: No particular feeling either way → no observations
- Source: Charaka Samhita, Sutrasthana 13 (Snehana)

**`as_milk_dairy`**
- "How does your body respond to dairy (milk, yogurt, cheese)?"
- Single, importance: 1
- Options:
  - `digests_well_enjoy`: Digests well, I enjoy it → obs: `"Kapha Snigdha affinity"` w:1 dims `["dosha:kapha"]`
  - `causes_mucus_congestion`: Causes mucus, congestion, or heaviness → obs: `"Kapha Ama accumulation"` w:2 dims `["dosha:kapha", "srotas:pranavaha"]`
  - `causes_gas_bloat`: Causes gas or bloating → obs: `"Vata Annavaha Srotas dairy sensitivity"` w:2 dims `["dosha:vata", "srotas:annavaha"]`
  - `avoid_all_dairy`: I avoid all dairy → obs: `"Kapha Ama Accumulation avoidance"` w:1 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 27 (Annapanavidhi)

**`as_satiety`**
- "How is your sense of satisfaction after meals?"
- Single, importance: 2
- Options:
  - `often_unsatisfied`: I often feel unsatisfied even after eating → obs: `"Vishama Agni"` w:2, `"Vata Manas restlessness"` w:1 dims `["agni:vishama", "dosha:vata"]`
  - `satisfied_normal`: I feel satisfied and stop naturally → obs: `"Sama Agni"` w:1
  - `overeat_before_satisfied`: I tend to overeat before feeling full → obs: `"Manda Agni delayed satiety"` w:2, `"Kapha Ama"` w:1 dims `["agni:manda", "dosha:kapha"]`
  - `satisfied_quickly_small`: I feel full very quickly — can eat very little → obs: `"Manda Agni"` w:2 dims `["agni:manda", "dosha:kapha"]`; also obs: `"Vishama Agni"` w:1 dims `["agni:vishama"]`
- Source: Charaka Samhita, Sutrasthana 8.7 (Ashtau Ahara Visheshayatana)

### SubCategory: `urine`

**`as_urine_color`**
- "What color is your urine typically?"
- Single, importance: 1
- Options:
  - `pale_clear`: Pale or clear → obs: `"Kapha Ambuvaha excess"` w:1 dims `["dosha:kapha", "srotas:ambuvaha"]`
  - `light_yellow_normal`: Light yellow — normal → obs: `"Balanced Mutravaha"` w:1
  - `dark_yellow_amber`: Dark yellow or amber → obs: `"Pitta Ambuvaha dehydration"` w:2, `"Tikshna Agni"` w:1 dims `["dosha:pitta", "agni:tikshna"]`
  - `very_dark_strong_odor`: Very dark with strong odor → obs: `"Pitta Mutravaha excess"` w:3 dims `["dosha:pitta", "srotas:mutravaha"]`
- Source: Charaka Samhita, Sutrasthana 17.118 (Mutravaha Srotas), Sushruta Samhita Sharirasthana 6

---

## Output Requirements

1. Valid JSON arrays for both files.
2. IDs prefixed `sh_` (skin_hair) and `as_` (appetite_senses).
3. Do NOT duplicate questions covered by `body.json` (Subagent 01) which covers basic skin type, hair type, eye type.
4. All observations include `observation`, `weight`, `dimensions`.
5. Validate JSON after writing.

## Definition of Done

- [ ] `skin_hair.json` has minimum 8 questions covering skin pathology, hair deep, ENT/senses
- [ ] `appetite_senses.json` has minimum 7 questions covering cravings, tastes, thirst, satiety, urine
- [ ] No duplicate IDs with other subagents
- [ ] JSON is valid
