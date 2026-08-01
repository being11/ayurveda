# Subagent 02 — Digestion & Sleep Question Data


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


**Your files:** `digestion.json` and `sleep.json` only.  
Do NOT touch any other file.

---

## Repository

```
/ayurveda/swadharma/apps/web/src/data/questions/
```

---

## Context

Read the Foundation task document to understand the canonical JSON schema.  
The Foundation task will have already migrated basic digestion and sleep questions from the old `questions.ts`.  
**Your job is to comprehensively expand both files.** The Foundation migration is a starting point — not the full set.

> Philosophy: Agni (digestive fire) is the cornerstone of Ayurvedic physiology. The digestion questions must be the most thorough section. A person's Agni type tells you more about their health than almost any other signal.

---

## File: `digestion.json`

Category: `digestion`. Cover every aspect of Agni and elimination.

### SubCategory: `agni`

**`dig_appetite`** — (Foundation may have this — verify and enhance if needed)
- "How would you describe your appetite on a typical day?"
- Single, importance: 3
- Options: `variable` (Vishama Agni, w:3), `strong` (Tikshna Agni, w:3), `low` (Manda Agni, w:3), `steady` (Sama Agni, w:2)
- Source: Charaka Samhita, Chikitsasthana 15.43-45

**`dig_hunger_timing`**
- "When does hunger hit you most strongly?"
- Single, importance: 2
- Options:
  - `unpredictable`: No pattern — it surprises me → obs: `"Vishama Agni"` w:2 dims `["agni:vishama", "dosha:vata"]`
  - `midday_intense`: Strong at midday, weak at other times → obs: `"Tikshna Agni"` w:2 dims `["agni:tikshna", "dosha:pitta"]`
  - `rarely`: Rarely feel true hunger → obs: `"Manda Agni"` w:2 dims `["agni:manda", "dosha:kapha"]`
  - `consistent_three`: Consistent hunger at three regular meals → obs: `"Sama Agni"` w:2 dims `["agni:sama"]`
- Source: Charaka Samhita, Sutrasthana 8.7

**`dig_after_meal_energy`**
- "How do you feel within an hour of eating a normal-sized meal?"
- Single, importance: 3
- Options:
  - `energized`: Energized and clear → no strong observation
  - `bloated_heavy`: Heavy, bloated, need to sit or lie down → obs: `"Manda Agni"` w:2, `"Kapha Ama accumulation"` w:2 dims `["agni:manda", "dosha:kapha", "srotas:annavaha"]`
  - `drowsy`: Very sleepy or drowsy → obs: `"Manda Agni"` w:2, `"Kapha Nidra tendency"` w:1 dims `["agni:manda", "dosha:kapha"]`
  - `acidic_burning`: Acidic sensation, burning → obs: `"Tikshna Agni"` w:2, `"Pitta in Amashaya"` w:3 dims `["agni:tikshna", "dosha:pitta", "srotas:annavaha"]`
  - `gassy_uncomfortable`: Gassy, distended, or uncomfortable → obs: `"Vishama Agni"` w:2 dims `["agni:vishama", "dosha:vata", "srotas:annavaha"]`
- Source: Charaka Samhita, Chikitsasthana 15.44

**`dig_acidity`** — (Foundation may have this — verify and enhance)
- "Do you frequently experience acidity, heartburn, or acid reflux?"
- Single, importance: 3
- Options:
  - `often`: Yes, quite often → obs: `"Pitta in Amashaya"` w:2 dims `["dosha:pitta", "srotas:annavaha"]`
  - `sometimes`: Sometimes, especially after certain foods → obs: `"Pitta in Amashaya"` w:1 dims `["dosha:pitta"]`
  - `rarely`: Rarely or never → no observations
- Source: Charaka Samhita, Nidanasthana 8 (Amlapitta)

**`dig_spicy_reaction`**
- "How does your stomach respond to spicy or very hot food?"
- Conditions: `[{ "questionId": "dig_acidity", "value": "often" }]`
- Single, importance: 2
- Options:
  - `immediate_burning`: Immediately causes burning or discomfort → obs: `"Tikshna Agni / Pitta aggravation"` w:3 dims `["agni:tikshna", "dosha:pitta"]`
  - `tolerates_somewhat`: I tolerate it despite general acidity → obs: `"Pitta in Amashaya"` w:1
  - `loves_spicy`: I crave spicy food, it feels good → obs: `"Tikshna Agni"` w:2 dims `["agni:tikshna", "dosha:pitta"]`
- Source: Ashtanga Hridayam, Nidanasthana 12.3

**`dig_empty_stomach`**
- "How do you feel on an empty stomach for more than 3 hours?"
- Single, importance: 2
- Options:
  - `fine_can_wait`: Fine — I barely notice → obs: `"Manda Agni"` w:1 dims `["agni:manda", "dosha:kapha"]`
  - `anxious_scattered`: Anxious, scattered, shaky → obs: `"Vishama Agni"` w:2 dims `["agni:vishama", "dosha:vata"]`
  - `irritable_angry`: Irritable, headache, angry — I must eat → obs: `"Tikshna Agni"` w:3 dims `["agni:tikshna", "dosha:pitta"]`
  - `nauseous`: Nauseous or dizzy → obs: `"Vishama Agni"` w:2 dims `["agni:vishama", "dosha:vata"]`
- Source: Charaka Samhita, Chikitsasthana 15.43

**`dig_food_intolerance`**
- "Do you have foods that reliably disagree with you?"
- Multiple, importance: 2
- Options:
  - `cold_raw`: Cold or raw foods → obs: `"Manda Agni"` w:2 dims `["agni:manda", "dosha:kapha"]`
  - `oily_fried`: Oily or fried foods → obs: `"Manda Agni"` w:1, `"Kapha Ama accumulation"` w:1 dims `["agni:manda", "dosha:kapha"]`
  - `spicy_hot`: Spicy or very hot foods → obs: `"Pitta in Amashaya"` w:2 dims `["dosha:pitta"]`
  - `dairy`: Dairy products → obs: `"Kapha Ama accumulation"` w:2 dims `["dosha:kapha", "dhatu:rasa"]`
  - `legumes`: Legumes (dal, beans) → obs: `"Vishama Agni"` w:2 dims `["agni:vishama", "dosha:vata"]`
  - `none`: No particular intolerances → no observations
- Source: Charaka Samhita, Sutrasthana 8.25

**`dig_bloating`**
- "Do you experience bloating or abdominal distension?"
- Single, importance: 3
- Options:
  - `after_every_meal`: After almost every meal → obs: `"Vata in Annavaha Srotas"` w:3, `"Vishama Agni"` w:2 dims `["dosha:vata", "agni:vishama", "srotas:annavaha"]`
  - `sometimes`: Sometimes — especially with specific foods → obs: `"Vishama Agni"` w:1 dims `["agni:vishama", "dosha:vata"]`
  - `rarely`: Rarely → no observations
  - `gas_without_bloat`: Gas without bloating — frequent gas → obs: `"Vata in Annavaha Srotas"` w:2 dims `["dosha:vata", "srotas:annavaha"]`
- Source: Charaka Samhita, Nidanasthana 13.16 (Adhmana)

### SubCategory: `bowel`

**`dig_stool_frequency`**
- "How often do you have a bowel movement on a typical day?"
- Single, importance: 3
- Options:
  - `multiple`: Multiple times a day (3+ times) → obs: `"Tikshna Agni"` w:2, `"Pitta in Pakvashaya"` w:2 dims `["agni:tikshna", "dosha:pitta", "srotas:purishavaha"]`
  - `once_predictable`: Once — very regular, predictable time → obs: `"Sama Agni"` w:2 dims `["agni:sama"]`
  - `irregular`: Irregular — sometimes once, sometimes skip → obs: `"Vishama Agni"` w:3 dims `["agni:vishama", "dosha:vata", "srotas:purishavaha"]`
  - `every_two_days`: Every 2-3 days → obs: `"Manda Agni"` w:2, `"Vata in Purishavaha Srotas"` w:2 dims `["agni:manda", "dosha:kapha", "dosha:vata", "srotas:purishavaha"]`
  - `constipated`: Often constipated — 3+ days → obs: `"Vata Apana disturbance"` w:3 dims `["dosha:vata", "srotas:purishavaha"]`
- Source: Charaka Samhita, Sutrasthana 17.117 (Purishavaha Srotas), Ashtanga Hridayam Sutrasthana 12.4

**`dig_stool_consistency`**
- "What is your stool typically like?"
- Single, importance: 3
- Options:
  - `dry_hard_pellets`: Dry, hard, or pellet-like → obs: `"Vata Apana disturbance"` w:3 dims `["dosha:vata", "srotas:purishavaha"]`
  - `well_formed_easy`: Well-formed, smooth, passes easily → obs: `"Sama Agni"` w:2 dims `["agni:sama"]`
  - `loose_soft`: Loose or soft, sometimes mushy → obs: `"Tikshna Agni"` w:2 dims `["agni:tikshna", "dosha:pitta"]`
  - `watery_urgent`: Watery, urgent, or with mucus → obs: `"Pitta in Pakvashaya"` w:3, `"Tikshna Agni"` w:2 dims `["dosha:pitta", "agni:tikshna", "srotas:purishavaha"]`
  - `oily_sticky`: Oily or heavy-looking → obs: `"Manda Agni"` w:2, `"Kapha Ama accumulation"` w:2 dims `["agni:manda", "dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 17.117, Sushruta Samhita Chikitsasthana 6.5

**`dig_morning_ease`**
- "How easy is your morning bowel movement?"
- Single, importance: 2
- Options:
  - `easy_complete`: Easy, complete, satisfying → no observations
  - `straining`: Requires straining or effort → obs: `"Vata Apana disturbance"` w:2 dims `["dosha:vata", "srotas:purishavaha"]`
  - `incomplete`: Incomplete — feeling of unfinished → obs: `"Vishama Agni"` w:2, `"Vata Apana disturbance"` w:2 dims `["dosha:vata", "agni:vishama"]`
  - `no_morning_urge`: No urge in the morning → obs: `"Manda Agni"` w:1 dims `["agni:manda", "dosha:kapha"]`
- Source: Ashtanga Hridayam, Sutrasthana 2.1 (Dinacharya)

---

## File: `sleep.json`

Category: `sleep`. Cover every dimension of Nidra (sleep).

### SubCategory: `nidra`

**`slp_falling`** — (Foundation may have this — verify and enhance)
- "How easily do you fall asleep?"
- Single, importance: 3
- Options:
  - `difficult_racing_mind`: My mind races — takes a long time → obs: `"Vata in Manas"` w:2, `"Vata Nidra disturbance"` w:3 dims `["dosha:vata", "manas:rajasic", "srotas:manovaha"]`
  - `moderate_15_30min`: Usually within 15–30 minutes → obs: `"Balanced Nidra"` w:1
  - `immediately`: As soon as my head hits the pillow → obs: `"Kapha Nidra tendency"` w:2 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 21.36-39

**`slp_quality`** — (Foundation may have this)
- "What is the overall quality of your sleep?"
- Single, importance: 3
- Options:
  - `light_disturbed`: Light, easily disturbed, wake often → obs: `"Vata Nidra disturbance"` w:3 dims `["dosha:vata", "srotas:manovaha"]`
  - `sound_early_alert`: Sound, but wake up early and alert → obs: `"Pitta Nidra tendency"` w:2 dims `["dosha:pitta"]`
  - `heavy_hard_to_wake`: Deep, heavy, hard to wake → obs: `"Kapha Nidra tendency"` w:3 dims `["dosha:kapha"]`
  - `variable`: Varies a lot night to night → obs: `"Vishama Nidra"` w:2 dims `["dosha:vata", "agni:vishama"]`
- Source: Charaka Samhita, Sutrasthana 21.43-44

**`slp_hours`**
- "How many hours of sleep do you typically get, and how do you feel about it?"
- Single, importance: 2
- Options:
  - `less_5_feel_ok`: Less than 5 hours — I feel okay → obs: `"Pitta Nidra tendency"` w:2, `"Ojas strain"` w:1 dims `["dosha:pitta", "ojas:low"]`
  - `5_7_tired`: 5–7 hours but feel chronically tired → obs: `"Vata Nidra disturbance"` w:2, `"Low Ojas"` w:2 dims `["dosha:vata", "ojas:low"]`
  - `7_9_refreshed`: 7–9 hours and feel refreshed → obs: `"Sama Nidra"` w:2 dims `["agni:sama"]`
  - `9plus_still_tired`: 9+ hours but still feel tired → obs: `"Kapha Nidra tendency"` w:3, `"Manda Agni"` w:1 dims `["dosha:kapha", "agni:manda"]`
- Source: Ashtanga Hridayam, Sutrasthana 7.61 (Nidra)

**`slp_dreams`**
- "What are your dreams typically like?"
- Single, importance: 1
- Options:
  - `vivid_anxious_flying`: Vivid, anxious, running, flying → obs: `"Vata Swapna pattern"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `intense_conflict_fiery`: Intense, conflict, fire, heated → obs: `"Pitta Swapna pattern"` w:2 dims `["dosha:pitta", "manas:rajasic"]`
  - `pleasant_calm_water`: Calm, pleasant, water, nature → obs: `"Kapha Swapna pattern"` w:1 dims `["dosha:kapha"]`
  - `rarely_remember`: Rarely dream or remember dreams → obs: `"Manda Nidra"` w:1 dims `["dosha:kapha"]`
  - `nightmares_repetitive`: Nightmares, recurring fears → obs: `"Vata Manas disturbance"` w:3 dims `["dosha:vata", "manas:rajasic", "srotas:manovaha"]`
- Source: Charaka Samhita, Indriyasthana 5.4-8 (Swapna Darshana)

**`slp_waking_feel`**
- "How do you feel when you wake up in the morning?"
- Single, importance: 3
- Options:
  - `exhausted_unrefreshed`: Exhausted, even after a full night → obs: `"Kapha Nidra tendency"` w:3, `"Low Ojas"` w:2 dims `["dosha:kapha", "ojas:low"]`
  - `anxious_rushed`: Anxious, mind immediately racing → obs: `"Vata Nidra disturbance"` w:2, `"Vata in Manas"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `alert_but_warm`: Alert and ready, but sometimes too warm → obs: `"Pitta Nidra tendency"` w:2 dims `["dosha:pitta"]`
  - `refreshed_calm`: Refreshed, clear, and calm → obs: `"Sama Nidra"` w:2 dims `["agni:sama"]`
  - `groggy_foggy`: Groggy, foggy, need coffee immediately → obs: `"Kapha Nidra tendency"` w:2, `"Manda Agni"` w:1 dims `["dosha:kapha", "agni:manda"]`
- Source: Charaka Samhita, Sutrasthana 21.55, Ashtanga Hridayam Sutrasthana 2.1

**`slp_interruptions`**
- "Do you wake up during the night?"
- Single, importance: 3
- Options:
  - `multiple_times`: Yes — multiple times most nights → obs: `"Vata Nidra disturbance"` w:3 dims `["dosha:vata", "srotas:manovaha"]`
  - `once_bathroom`: Usually once, often for the bathroom → obs: `"Ambuvaha Srotas disturbance"` w:1 dims `["srotas:ambuvaha"]`
  - `rarely`: Rarely wake up → no observations
  - `awakened_by_thoughts`: Awakened by thoughts or anxiety → obs: `"Vata Manas disturbance"` w:3 dims `["dosha:vata", "manas:rajasic"]`
- Source: Charaka Samhita, Sutrasthana 21.39

**`slp_daytime`**
- "Do you feel sleepy during the day, especially after meals?"
- Single, importance: 2
- Options:
  - `very_sleepy_post_meal`: Very sleepy after meals — can't resist → obs: `"Kapha Nidra tendency"` w:3, `"Manda Agni"` w:2 dims `["dosha:kapha", "agni:manda"]`
  - `mild_afternoon`: Mild afternoon dip but manageable → obs: `"Manda Agni"` w:1 dims `["agni:manda"]`
  - `alert_all_day`: Alert throughout the day → no strong observations
  - `exhausted_unpredictably`: Sudden waves of exhaustion unpredictably → obs: `"Vishama Agni"` w:2, `"Low Ojas"` w:2 dims `["agni:vishama", "dosha:vata", "ojas:low"]`
- Source: Ashtanga Hridayam, Sutrasthana 7.61

**`slp_bedtime`**
- "What time do you naturally want to go to sleep?"
- Single, importance: 2
- Options:
  - `before_10pm`: Before 10pm — I can't stay up late → obs: `"Kapha Nidra tendency"` w:1 dims `["dosha:kapha"]`
  - `10pm_midnight`: Between 10pm and midnight → obs: `"Balanced Nidra"` w:1
  - `after_midnight`: After midnight — I'm a night person → obs: `"Vata Nidra disturbance"` w:2, `"Pitta Nidra tendency"` w:1 dims `["dosha:vata", "dosha:pitta"]`
  - `highly_variable`: Varies — no consistent pattern → obs: `"Vishama Nidra"` w:2 dims `["dosha:vata", "agni:vishama"]`
- Source: Charaka Samhita, Sutrasthana 21.36, Ashtanga Hridayam Sutrasthana 2.1 (Dinacharya)

---

## Output Requirements

1. Valid JSON arrays only.
2. Every question has `id`, `category`, `subCategory`, `title`, `type`, `importance`, `source`, `options`.
3. Every observation has `observation`, `weight`, and `dimensions` array.
4. Conditions use exact format: `[{ "questionId": "dig_acidity", "value": "often" }]`.
5. All `null` values in optional fields must be written as JSON `null`.
6. Validate JSON: `cat digestion.json | python3 -m json.tool`

## Definition of Done

- [ ] `digestion.json` has at minimum 12 questions covering agni, appetite, bloating, elimination
- [ ] `sleep.json` has at minimum 8 questions covering falling asleep, quality, dreams, waking, daytime
- [ ] All questions follow the exact schema
- [ ] JSON is valid
- [ ] No duplicate IDs with the Introduction/Body categories (prefix: `dig_`, `slp_`)
