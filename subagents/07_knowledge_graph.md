# Subagent 07 — Knowledge Graph & Source Database


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

**Your files:** `apps/web/src/data/knowledge/core.json` only.  
Do NOT touch any other file.

---

## Repository

```
/ayurveda/swadharma/
```

---

## Context

Read these files first:
- `apps/web/src/data/knowledge.ts` — the existing (incomplete) knowledge graph to expand
- `subagents/foundation.md` — project context

The existing `knowledge.ts` has only 10 entries. Your job is to create a comprehensive JSON knowledge graph in `apps/web/src/data/knowledge/core.json` that covers **every observation string** used across all question JSON files.

This knowledge graph links each observation to:
1. Classical Ayurvedic sources (primary texts)
2. An explanation in plain English
3. The Ayurvedic principle being invoked
4. Practical implications

---

## The Knowledge Graph Schema

```json
[
  {
    "observation": "Vishama Agni",
    "principle": "Agni",
    "dosha": ["vata"],
    "classicalSources": [
      {
        "text": "Charaka Samhita",
        "chapter": "Chikitsasthana 15.44",
        "quote": "Vishamashchi chaturtho'gnirvayu kopanimittatah",
        "translation": "The fourth type of digestive fire, Vishama, arises from the aggravation of Vata dosha."
      }
    ],
    "description": "Variable digestion caused by Vata dosha irregularity. The digestive fire fluctuates between high and low states, leading to unpredictable appetite and absorption.",
    "plainEnglish": "Your digestive fire behaves like an irregular flame — sometimes burning bright, sometimes barely there. This is directly caused by an excess of Vata (air + ether) energy in the digestive system.",
    "implications": [
      "Appetite is unpredictable",
      "Gas and bloating are common",
      "Routine meal times are critical for stabilization",
      "Foods that are warm, cooked, and gently spiced help pacify this pattern"
    ]
  }
]
```

### Schema fields:

- `observation`: Exact string matching what question options produce (e.g. `"Vishama Agni"`)
- `principle`: The Ayurvedic concept (`"Agni"`, `"Dosha"`, `"Dhatu"`, `"Srotas"`, `"Manas"`, `"Ojas"`, `"Guna"`)
- `dosha`: Array of `"vata"`, `"pitta"`, `"kapha"` (can be multiple)
- `classicalSources`: Array of source objects with `text`, `chapter`, `quote` (Sanskrit), `translation`
- `description`: 1–2 sentence technical description
- `plainEnglish`: 1–2 sentence plain English explanation for users
- `implications`: Array of practical bullet points

---

## Complete List of Observations to Cover

Include every one of these observation strings. Add any additional ones you encounter in reading the question files once they're created (but you can work from this list):

### Agni Observations
- `"Vishama Agni"` — variable, Vata-driven
- `"Tikshna Agni"` — sharp, Pitta-driven
- `"Manda Agni"` — slow, Kapha-driven
- `"Sama Agni"` — balanced
- `"Pitta in Amashaya"` — Pitta excess in the stomach
- `"Kapha Ama accumulation"` — Kapha-type undigested material
- `"Manda Agni fat intolerance"` — specific Kapha fat intolerance
- `"Tikshna Agni fat aggravation"` — Pitta fat aggravation
- `"Tikshna Agni / Pitta aggravation"` — combined
- `"Vishama Agni (stress)"` — stress-induced variable Agni
- `"Vishama Agni seasonal sensitivity"` — seasonal variable Agni

### Nidra (Sleep) Observations
- `"Vata Nidra disturbance"` — light, disturbed sleep
- `"Pitta Nidra tendency"` — alert, moderate sleep
- `"Kapha Nidra tendency"` — heavy, deep sleep
- `"Sama Nidra"` — balanced sleep
- `"Vishama Nidra"` — irregular sleep
- `"Manda Nidra"` — heavy, excessive sleep
- `"Balanced Nidra"` — normal

### Manas (Mind) Observations
- `"Vata Manas (Rajasic)"` — anxious, racing, fearful
- `"Vata Manas (Chala)"` — mobile, distracted, creative
- `"Vata Manas (Chala/Laghu)"` — light and mobile mental quality
- `"Pitta Manas (Rajasic/Tikshna)"` — intense, sharp, angry
- `"Pitta Manas (Tikshna)"` — sharp, logical, analytical
- `"Kapha Manas (Tamasic/Manda)"` — heavy, withdrawn
- `"Kapha Manas (Sthira)"` — stable, steady
- `"Vata Manas disturbance"` — disturbed mental state
- `"Excessive Rajas in Manas"` — excess mental activation
- `"Moderate Rajas in Manas"` — moderate activation
- `"Sattvic Manas tendency"` — balanced, clear
- `"Manasika Ama"` — mental undigested content
- `"Vishama Manas pattern"` — variable mental state

### Dosha Frame & Constitution
- `"Vata Frame"` — slight, thin frame
- `"Pitta Frame"` — medium, athletic frame
- `"Kapha Frame"` — broad, sturdy frame
- `"High Metabolic Rate (Tikshna/Vata)"` — fast metabolism
- `"Stable Metabolism (Sama/Pitta)"` — balanced metabolism
- `"Slow Metabolic Rate (Manda/Kapha)"` — slow metabolism
- `"Vata Prakrti (childhood)"` — childhood Vata constitution
- `"Pitta Prakrti (childhood)"` — childhood Pitta constitution
- `"Kapha Prakrti (childhood)"` — childhood Kapha constitution

### Lifestyle Observations
- `"Vata Lifestyle"` — irregular, spontaneous
- `"Pitta Lifestyle"` — scheduled, structured
- `"Kapha Lifestyle"` — routine, resistant to change
- `"Vata Aggravation tendency"` — sensitive to Vata
- `"Pitta Aggravation tendency"` — sensitive to Pitta
- `"Kapha Aggravation tendency"` — sensitive to Kapha
- `"Dinacharya Adherent"` — regular daily routine
- `"Dinacharya Brahma Muhurta adherence"` — wakes at ideal time

### Ojas Observations
- `"High Ojas"` — strong immunity, vitality
- `"Moderate Ojas"` — average vitality
- `"Low Ojas"` — depleted immunity
- `"Ojas Depletion"` — severe depletion
- `"Ojas Strength"` — robust constitution
- `"Ojas seeking"` — body seeking Ojas replenishment

### Srotas (Channel) Observations
- `"Vata in Annavaha Srotas"` — Vata in digestive channels
- `"Vata in Asthivaha Srotas"` — Vata in bone channels
- `"Vata in Pranavaha Srotas"` — Vata in respiratory channels
- `"Pitta in Amashaya"` — Pitta in stomach
- `"Pitta in Pakvashaya"` — Pitta in intestines
- `"Kapha in Pranavaha Srotas"` — Kapha in respiratory
- `"Kapha Avarana in Shrotas"` — Kapha blocking channels
- `"Vata Apana disturbance"` — Apana Vata disruption
- `"Balanced Mutravaha"` — normal urinary
- `"Vata in Mutravaha Srotas"` — Vata in urinary
- `"Pitta in Mutravaha Srotas"` — Pitta in urinary
- `"Kapha in Mutravaha Srotas"` — Kapha in urinary

### Dhatu (Tissue) Observations
- `"Vata Rasa Kshaya"` — Vata depleting Rasa dhatu
- `"Pitta Rakta Dhatu Disturbance"` — Pitta in blood tissue
- `"Vata Shukra Dhatu disturbance"` — Vata affecting reproductive tissue
- `"Strong Shukra Dhatu"` — robust reproductive tissue
- `"Vata Shukra Kshaya"` — depleted reproductive tissue
- `"Vata Majja Dhatu Kshaya"` — Vata depleting nervous tissue

### Artava (Reproductive for Women) Observations
- `"Sama Artava (balanced cycle)"` — balanced menstrual cycle
- `"Vishama Artava (Vata)"` — irregular cycle from Vata
- `"Pitta Artava (excess)"` — excess/heavy cycle from Pitta
- `"Vata Artava Kshaya"` — scanty or absent cycle
- `"Kashtartava (painful periods)"` — painful menstruation
- `"Pitta in Artava"` — Pitta in menstrual flow
- `"Pitta Artava excess"` — heavy, clotted Pitta flow
- `"Vata PMS Pattern"` — anxiety, insomnia PMS
- `"Pitta PMS Pattern"` — anger, irritability PMS
- `"Kapha PMS Pattern"` — depression, withdrawal PMS
- `"Sutika Kala (postpartum Vata)"` — postpartum Vata state
- `"Vata Rajonivritti (perimenopausal)"` — perimenopausal Vata
- `"Pitta Urdhva Gati in Rajonivritti"` — hot flashes (Pitta rising)

### Skin Observations
- `"Vata Skin Type"` — dry, rough skin
- `"Pitta Skin Type"` — sensitive, reactive skin
- `"Kapha Skin Type"` — oily, thick skin
- `"Pitta Twak Sensitivity"` — Pitta skin sensitivity
- `"Kapha Meda in Twak"` — Kapha excess in skin
- `"Pitta Rakta Blemish Pattern"` — Pitta pigmentation
- `"Pitta Kapha Twak Vikara"` — combined skin disorder
- `"Vata-Pitta Kushtha pattern"` — psoriatic tendency

### Lifestyle / Physical Observations
- `"Sedentary Mental Occupation"` — desk/mental work
- `"Active Physical Occupation"` — physical work
- `"Vishama Ahara Krama"` — irregular eating pattern
- `"Meal Skipping Pattern"` — frequent meal skipping
- `"Vata Energy Pattern"` — erratic energy
- `"Pitta Morning Pattern"` — morning peak
- `"Kapha Sedentary Pattern"` — sedentary tendency
- `"Emotional eating pattern"` — stress-driven eating

---

## Implementation

For every observation, write a complete entry following the schema. The file will be large — that is expected. Aim for **comprehensive accuracy over brevity**.

For classical quotes:
- Use Sanskrit text in Devanagari OR IAST transliteration
- Provide accurate chapter/verse numbers  
- Translations should be accurate, not paraphrased
- Primary sources: Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam, Ashtanga Sangraha

The knowledge graph is not shown directly to users during the quiz — it powers the `knowledge-graph` page and gives transparency to the report's classical grounding.

---

## Definition of Done

- [ ] `apps/web/src/data/knowledge/core.json` exists
- [ ] Minimum 50 observation entries
- [ ] Every Agni, Nidra, Manas, and Dosha Frame observation is covered
- [ ] Every entry has at minimum 1 classical source with chapter reference
- [ ] JSON is valid: `cat core.json | python3 -m json.tool`
