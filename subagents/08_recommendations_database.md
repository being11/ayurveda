# Subagent 08 — Recommendations Database

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


**Your file:** `apps/web/src/data/recommendations/core.json` only.  
Do NOT touch any other file.

---

## Repository

```
/ayurveda/swadharma/
```

---

## Read First

- `apps/web/src/engines/recommendations.ts` — existing recommendation engine and schema
- `apps/web/src/data/knowledge.ts` — to understand observation naming conventions
- `subagents/foundation.md` — project context

The existing `recommendations.ts` has only 5 recommendations. Your job is to create a comprehensive JSON database in `apps/web/src/data/recommendations/core.json` with **at minimum 60 recommendations** spanning all categories, all doshas, and all major observation patterns.

---

## The Recommendations JSON Schema

```json
[
  {
    "id": "rec_diet_vishama_agni_routine",
    "category": "Diet",
    "subCategory": "Agni",
    "title": "Establish Regular Meal Times",
    "description": "Eat warm, cooked, and grounding meals at consistent times every day. Favor healthy fats like ghee or sesame oil. Avoid cold, raw, or refrigerated foods.",
    "rationale": "Vishama Agni (variable digestion) is governed by Vata dosha. Consistency and warmth pacify Vata and stabilize the digestive fire (Agni).",
    "why": "Your answers indicate a variable digestive fire — one that fluctuates unpredictably. In Ayurveda, this is called Vishama Agni, directly caused by excess Vata (air/ether) in the digestive channel.",
    "shastraRef": "Charaka Samhita, Chikitsasthana 15.44",
    "alternatives": [
      "If warm meals are difficult, start by just fixing the meal time — even a protein bar eaten at the same time helps anchor Agni.",
      "Eat the largest meal at midday when digestive fire is naturally strongest."
    ],
    "triggerObservations": ["Vishama Agni", "Vishama Ahara Krama", "Meal Skipping Pattern"]
  }
]
```

### Schema fields:

- `id`: unique, snake_case, prefix `rec_category_description`
- `category`: `"Diet"`, `"Lifestyle"`, `"Mental"`, `"Exercise"`, `"Sleep"`, `"Seasonal"`, `"Spiritual"`, `"Women's Health"`, `"Men's Health"`, `"Ojas"`
- `subCategory`: finer grouping within category
- `title`: clear, actionable title (imperative sentence)
- `description`: what to do — concrete, practical, 2–4 sentences
- `rationale`: the Ayurvedic WHY — technical explanation
- `why`: plain-English explanation for the user — warm and personal tone
- `shastraRef`: primary classical reference
- `alternatives`: array of 1–3 alternative approaches if the main recommendation isn't feasible
- `triggerObservations`: array of observation strings that activate this recommendation

---

## Required Recommendations — Minimum 60 Entries

Organize your entries by category. Here is the full scope:

---

### Category: Diet (minimum 15 entries)

**Agni-based:**
- Vishama Agni → Establish regular meal times, warm foods, grounding fats
- Tikshna Agni → Cooling foods, no meal skipping, avoid excess spice
- Manda Agni → Light warm spiced foods, ginger before meals, avoid heavy/cold
- Sama Agni → Maintain current patterns, seasonal adjustments
- Pitta in Amashaya → Cooling diet, avoid sour/pungent, favor sweet/bitter/astringent
- Kapha Ama accumulation → Light dry foods, fasting protocol, avoid dairy/cold
- Meal Skipping Pattern → Fixed meal anchor, especially midday main meal

**Taste/craving:**
- Salty cravings → Address Vata, favor mineral-rich foods, reduce processed salts
- Sweet cravings (emotional) → Ojas-building foods (milk, ghee, dates, almonds)
- Spicy cravings → Pitta pattern — favor naturally warming foods over capsaicin heat
- Vata Salt Craving → Mineral replacement vs. processed salt

**Elimination:**
- Vata Apana disturbance → Warm water in morning, cooked vegetables, oils
- Pitta in Pakvashaya → Cooling foods, bitter greens, avoid alcohol/spice
- Manda Agni fat intolerance → Digestive herbs (trikatu), small amounts only

**Water/hydration:**
- Pitta Ambuvaha excess → Room-temperature water, cooling herbs (coriander), avoid ice
- Kapha Ambuvaha suppression → Warm water with ginger, regular sipping throughout day

---

### Category: Lifestyle / Dinacharya (minimum 12 entries)

- Vata Lifestyle → Morning Abhyanga (oil massage), fixed daily routine, early sleep
- Kapha Lifestyle → Wake before sunrise, vigorous exercise, reduce day sleep
- Pitta Lifestyle → Non-competitive downtime, cooling environments, limit evening work
- Vata Aggravation tendency → Warmth, oiliness, grounding, avoid travel/excessive change
- Pitta Aggravation tendency → Cooling, moonlight walks, reduce midday sun exposure
- Kapha Aggravation tendency → Active mornings, dry brushing, reducing damp/cold environments
- Dinacharya Adherent → Maintain and refine — add Nasya, Gandusha
- Sedentary Mental Occupation → Movement breaks every 45 minutes, eye rest, outdoor lunch
- Vata Nidra disturbance risk → Screen-free hour before bed, warm oil on head/feet
- Rajasic Manas activation → Reduce news/social media input before bed
- Sutika Kala (postpartum Vata) → Warm oil massage, nutrient-dense warming foods, rest
- Vishama Ahara Krama → Meal timing anchor — phone reminders, fixed eating window

---

### Category: Sleep (minimum 8 entries)

- Vata Nidra disturbance → Warm oil foot massage, nutmeg in warm milk, early bed
- Kapha Nidra tendency → Wake before 6am, no snoozing, vigorous morning practice
- Pitta Nidra tendency → Cool room, avoid evening problem-solving, Sheetali pranayama
- Sama Nidra → Maintain, enhance with Brahmi oil on scalp weekly
- Vishama Nidra → Fixed sleep/wake time regardless of how well you slept
- Vata Manas disturbance (nightmares) → Calming routine, ashwagandha with milk
- Low Ojas (sleep) → 8+ hours as non-negotiable, Shatavari or ashwagandha
- Kapha Morning Tendency → Cold splash, surya namaskar immediately on waking

---

### Category: Mental / Manas (minimum 10 entries)

- Vata Manas (Rajasic) → Grounding practices, schedule, meditation, abhyanga, ashwagandha
- Pitta Manas (Rajasic/Tikshna) → Surrender practice, cooling pranayama (Sheetali/Sitali), nature
- Kapha Manas (Tamasic/Manda) → Stimulating movement, new experiences, kapalabhati
- Excessive Rajas in Manas → Digital detox, nature immersion, mouna (silence practice)
- Manasika Ama → Journaling, Sattvic diet, Vipassana or contemplative practice
- Emotional eating pattern → Pre-meal breathing (3 deep breaths before eating)
- Vata Manas conflict avoidance → Vacha (calamus) herb, communication training
- Kapha Manas (Tamasic) withdrawal → Satsanga, social engagement, accountability partner
- Low Ojas (mental) → Brahmi ghee, daily Brahmi intake, Medhya Rasayana protocol
- Sattvic Manas tendency → Deepen: increase satsanga, scriptural study, dana (giving)

---

### Category: Exercise / Bala (minimum 6 entries)

- Vata Bala (low stamina) → Yoga, walking, swimming, NOT high-intensity; oil massage before exercise
- Pitta Bala (competitive) → Cooling exercises (swimming, yoga, cycling), avoid midday sun
- Kapha Sedentary Pattern → Daily vigorous exercise mandatory; sun salutations, cardio
- Kapha Stiffness Pattern → Warm-up essential, hot water bath before exercise
- Vata in Asthivaha Srotas → Joint-supporting exercises (not high impact), warm sesame oil on joints
- Low Ojas (exercise) → Reduce intensity temporarily, focus on restoration: yoga nidra, naps

---

### Category: Seasonal / Ritucharya (minimum 5 entries)

- Pitta Aggravation tendency (summer) → Pitta-pacifying Ritucharya: coconut oil, cooling herbs, midday rest
- Vata Aggravation tendency (autumn) → Vata-pacifying Ritucharya: warm, unctuous foods, oil massage
- Kapha Aggravation tendency (winter/spring) → Kapha-pacifying Ritucharya: light foods, exercise, dry massage
- Vishama Agni seasonal sensitivity → Seasonal digestive herbs (Trikatu in winter, Chandanadi in summer)
- Sama Agni (seasonal) → Seasonal Rasayana for each season

---

### Category: Spiritual (minimum 5 entries)

- Sattvic Manas tendency → Deepen practice: Shravana, Manana, Nididhyasana
- Vata Manas existential searching → Karma Yoga — find practice in action, not just contemplation
- Kapha Manas (Tamasic) disconnected → Community practice, regular Satsanga, volunteer work
- Ojas Depletion → Brahmacharya (energy conservation), reduced social media, content reduction
- Rajasic-Tamasic Manas → Sattvic diet strictly, reduce stimulants, increase nature time

---

### Category: Ojas (minimum 5 entries)

- Low Ojas → Ojas-building protocol: ashwagandha, shatavari, warm milk, ghee, dates, early sleep
- Ojas Depletion → Complete rest protocol + rasayana: chyawanprash, Amalaki, Brahmi
- High Ojas → Maintain: preserve with early sleep, sattvic food, brahmacharya in speech and mind
- Sutika Kala (postpartum Vata) → Postpartum Ojas rebuilding: ghee, milk, dates, rest 40 days
- Ojas seeking (cravings) → Address root: sweet Ojas-building foods, not processed sweets

---

### Category: Women's Health (minimum 5 entries)

- Vishama Artava (Vata) → Warm castor oil lower belly massage, warm foods, Shatavari
- Pitta Artava (excess) → Cooling herbs (Lodhra, Praval pishti), avoid heating foods during cycle
- Kashtartava (painful periods) → Warm castor oil pack, Dashamula decoction, ginger tea
- Vata PMS Pattern → Ashwagandha, regular schedule, reduced Vata foods in luteal phase
- Pitta PMS Pattern → Shatavari milk, cooling foods, reduced spice in premenstrual week
- Vata Rajonivritti (perimenopausal) → Shatavari + ashwagandha, sesame oil, cooling and grounding

---

### Category: Men's Health (minimum 3 entries)

- Vata Shukra Kshaya → Vajikarana diet: ashwagandha, shilajit, milk, ghee, dates, reduced overexertion
- Ojas Depletion (male) → Energy conservation, brahmacharya, reduced screen time at night, deep sleep
- Pitta Rakta excess → Cooling blood-purifying herbs (Manjistha, Neem), reduced alcohol/spice

---

## Critical Implementation Notes

1. The `triggerObservations` array must contain **exact observation strings** as they appear in the question JSON files. Spelling must match exactly.
2. The `why` field is shown directly to users — write it warmly, conversationally.
3. The `rationale` field explains the Ayurvedic mechanism — technical but not jargon-heavy.
4. The `alternatives` array addresses "I can't do the main recommendation" — make them practical and achievable.
5. Multiple recommendations can share the same `triggerObservations` — that's correct. The engine shows all matching recommendations.
6. One observation can trigger multiple recommendations (Diet + Lifestyle + Mental for the same Agni type).

---

## Definition of Done

- [ ] `apps/web/src/data/recommendations/core.json` exists
- [ ] Minimum 60 recommendation entries
- [ ] All major observation patterns have at least 1 recommendation
- [ ] All entries have `triggerObservations` that match known observation strings
- [ ] JSON is valid: `cat core.json | python3 -m json.tool`
- [ ] All 8 categories represented
