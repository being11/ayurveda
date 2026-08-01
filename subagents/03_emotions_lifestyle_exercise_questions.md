# Subagent 03 — Emotions, Lifestyle & Exercise Question Data


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

**Your files:** `emotions.json`, `lifestyle.json`, and `exercise.json` only.  
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

The Foundation task will have migrated basic emotions and lifestyle questions. **Expand them comprehensively.**

---

## File: `emotions.json`

Category: `emotions`. Covers Manas (mind), Gunas, emotional patterns, stress, and personality.

### SubCategory: `manas`

**`emo_stress`** — (Foundation may have this — verify)
- "When you are under severe stress, what is your most common first reaction?"
- Single, importance: 3
- Options:
  - `anxiety_worry`: Anxiety, worry, overwhelm, fear, scatteredness → obs: `"Vata Manas (Rajasic)"` w:3 dims `["dosha:vata", "manas:rajasic", "srotas:manovaha"]`
  - `anger_frustration`: Irritability, anger, frustration, intense focus → obs: `"Pitta Manas (Rajasic/Tikshna)"` w:3 dims `["dosha:pitta", "manas:rajasic"]`
  - `withdrawal_depression`: Withdrawal, depression, lethargy, stubbornness → obs: `"Kapha Manas (Tamasic/Manda)"` w:3 dims `["dosha:kapha", "manas:tamasic"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`emo_memory`** — (Foundation may have this)
- "How would you describe your memory and how you learn new things?"
- Single, importance: 2
- Options:
  - `quick_learn_quick_forget`: Quick to grasp, quick to forget → obs: `"Vata Manas (Chala)"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `sharp_logical`: Sharp memory, good at logical deduction → obs: `"Pitta Manas (Tikshna)"` w:2 dims `["dosha:pitta"]`
  - `slow_never_forget`: Slow to learn but never forgets → obs: `"Kapha Manas (Sthira)"` w:2 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 8.5, Ashtanga Hridayam Sutrasthana 1.9

**`emo_fear`**
- "How does fear typically show up for you?"
- Single, importance: 2
- Options:
  - `constant_anxiety`: Persistent, low-grade anxiety even when nothing is wrong → obs: `"Vata Manas (Rajasic)"` w:3, `"Excessive Rajas in Manas"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `specific_triggers`: Only in genuinely threatening situations → obs: `"Balanced Fear Response"` w:1 dims `["manas:sattvic"]`
  - `anger_instead`: I rarely feel fear — it comes out as anger → obs: `"Pitta Manas (Rajasic/Tikshna)"` w:2 dims `["dosha:pitta", "manas:rajasic"]`
  - `avoidance_paralysis`: I avoid situations that might cause fear → obs: `"Kapha Manas (Tamasic/Manda)"` w:2 dims `["dosha:kapha", "manas:tamasic"]`
- Source: Charaka Samhita, Sutrasthana 1.57 (Manasa Dosha)

**`emo_anger`**
- "How do you handle anger?"
- Single, importance: 2
- Options:
  - `explode_release_forget`: Explode quickly, release it, then move on → obs: `"Pitta Manas (Rajasic/Tikshna)"` w:3 dims `["dosha:pitta", "manas:rajasic"]`
  - `suppress_boil`: Suppress it, but it simmers inside → obs: `"Pitta Manas (Rajasic/Tikshna)"` w:2, `"Vata Apana suppression pattern"` w:1 dims `["dosha:pitta", "dosha:vata"]`
  - `rarely_calm`: Rarely feel anger — generally calm → obs: `"Kapha Manas (Sthira)"` w:2, `"Sattvic Manas tendency"` w:1 dims `["dosha:kapha", "manas:sattvic"]`
  - `anxiety_not_anger`: I feel anxiety rather than anger → obs: `"Vata Manas (Rajasic)"` w:2 dims `["dosha:vata", "manas:rajasic"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`emo_grief_loss`**
- "When you experience loss or grief, how do you process it?"
- Single, importance: 2
- Options:
  - `process_then_release`: I feel it fully, process it, and release it → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic"]`
  - `long_rumination`: I ruminate and it stays with me for a very long time → obs: `"Kapha Manas (Tamasic/Manda)"` w:2 dims `["dosha:kapha", "manas:tamasic"]`
  - `scattered_anxious`: I get scattered, anxious, lose sleep over it → obs: `"Vata Manas (Rajasic)"` w:2 dims `["dosha:vata", "manas:rajasic"]`
  - `intensely_focused`: I intensely focus on solving or understanding it → obs: `"Pitta Manas (Rajasic/Tikshna)"` w:2 dims `["dosha:pitta", "manas:rajasic"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`emo_forgiveness`**
- "How quickly do you forgive — truly forgive, not just say you have?"
- Single, importance: 1
- Options:
  - `naturally_quick`: Naturally and quickly — I don't hold grudges → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic"]`
  - `slow_but_manage`: Slow, but I manage to let go eventually → obs: `"Kapha Manas (Sthira)"` w:1 dims `["dosha:kapha"]`
  - `very_difficult`: Very difficult — I remember hurts for a long time → obs: `"Pitta Manas (Rajasic/Tikshna)"` w:2 dims `["dosha:pitta", "manas:rajasic"]`
  - `flip_flop`: I say I forgive, then get triggered again → obs: `"Vata Manas (Rajasic)"` w:1 dims `["dosha:vata"]`
- Source: Charaka Samhita, Sutrasthana 8.5 (Sattva Bala)

### SubCategory: `personality`

**`emo_decision_making`**
- "How do you make decisions?"
- Single, importance: 2
- Options:
  - `impulsive_change_mind`: Impulsively, and I often change my mind → obs: `"Vata Manas (Chala)"` w:3 dims `["dosha:vata", "manas:rajasic"]`
  - `quick_decisive`: Quickly and confidently, rarely second-guess → obs: `"Pitta Manas (Tikshna)"` w:3 dims `["dosha:pitta"]`
  - `slow_deliberate`: Slowly, after much deliberation → obs: `"Kapha Manas (Sthira)"` w:2 dims `["dosha:kapha"]`
  - `research_plan`: Research extensively, then decide → obs: `"Pitta Manas (Tikshna)"` w:2 dims `["dosha:pitta"]`
- Source: Ashtanga Hridayam, Sutrasthana 1.9

**`emo_social_energy`**
- "How do social interactions affect your energy?"
- Single, importance: 1
- Options:
  - `energized_by_people`: People energize me — I thrive socially → obs: `"Pitta Social Pattern"` w:1, `"Kapha Attachment tendency"` w:1 dims `["dosha:pitta", "dosha:kapha"]`
  - `drained_need_alone`: Social interactions drain me — I need recovery time → obs: `"Vata Manas (Rajasic)"` w:2 dims `["dosha:vata"]`
  - `variable`: Depends entirely on the people and context → obs: `"Vishama Manas pattern"` w:1 dims `["dosha:vata"]`
- Source: Charaka Samhita, Sutrasthana 1.57

**`emo_attachment`**
- "How do you relate to attachment in relationships and material things?"
- Single, importance: 1
- Options:
  - `deeply_attached_possessive`: Deeply attached, struggle to let go → obs: `"Kapha Attachment tendency"` w:3 dims `["dosha:kapha", "manas:tamasic"]`
  - `passionate_intense`: Passionate but can let go when needed → obs: `"Pitta Manas (Rajasic/Tikshna)"` w:1 dims `["dosha:pitta"]`
  - `detached_non_attachment`: Naturally non-attached, move on easily → obs: `"Sattvic Manas tendency"` w:2 dims `["manas:sattvic"]`
  - `inconsistent_anxious`: Anxious attachment — fear of loss → obs: `"Vata Manas (Rajasic)"` w:2 dims `["dosha:vata", "manas:rajasic"]`
- Source: Charaka Samhita, Sutrasthana 8.5

---

## File: `lifestyle.json`

Category: `lifestyle`. Covers dinacharya (daily routine) adherence and lifestyle patterns.

### SubCategory: `routine`

**`life_routine`** — (Foundation may have this — expand)
- "How do you relate to daily routines?"
- Single, importance: 2
- Options:
  - `dislike_spontaneity`: Dislike routine, prefer spontaneity, often forget scheduled things → obs: `"Vata Lifestyle"` w:2 dims `["dosha:vata"]`
  - `list_driven_rigid`: Driven by lists and schedules, get annoyed if disrupted → obs: `"Pitta Lifestyle"` w:2 dims `["dosha:pitta"]`
  - `comfortable_stable`: Comfortable with routine, resist change → obs: `"Kapha Lifestyle"` w:2 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 8.18 (Dinacharya)

**`life_wake_time`**
- "What time do you naturally wake up without an alarm?"
- Single, importance: 2
- Options:
  - `before_6am`: Before 6am, naturally → obs: `"Dinacharya Brahma Muhurta adherence"` w:2 dims `["lifestyle:regulated"]`
  - `6_to_8am`: Between 6am and 8am → obs: `"Moderate Dinacharya"` w:1
  - `after_8am`: After 8am, I need an alarm → obs: `"Kapha Morning Tendency"` w:2 dims `["dosha:kapha"]`
  - `highly_variable`: Completely variable depending on the day → obs: `"Vata Lifestyle"` w:2 dims `["dosha:vata"]`
- Source: Ashtanga Hridayam, Sutrasthana 2.1 (Dinacharya)

**`life_screen_time`**
- "How much screen time (phone/computer) do you have in the 2 hours before bed?"
- Single, importance: 2
- Options:
  - `none_or_minimal`: Minimal or none — I wind down without screens → obs: `"Dinacharya Adherent"` w:1 dims `["lifestyle:regulated"]`
  - `one_hour`: About one hour → no strong observations
  - `two_plus`: 2+ hours — I'm usually on screens until I sleep → obs: `"Vata Nidra disturbance risk"` w:2, `"Rajasic Manas activation"` w:1 dims `["dosha:vata", "manas:rajasic"]`
- Source: Ashtanga Hridayam, Sutrasthana 7.61 (Nidra)

**`life_nature_exposure`**
- "How much time do you typically spend outdoors in nature each week?"
- Single, importance: 1
- Options:
  - `daily`: Daily — at least an hour → obs: `"Sattvic Lifestyle"` w:1 dims `["manas:sattvic"]`
  - `few_times_week`: A few times a week → obs: `"Moderate Sattvic Practice"` w:1
  - `rarely`: Rarely — mostly indoors → obs: `"Kapha Sedentary Pattern"` w:1 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 8.18

**`life_climate`** — (Foundation may have this — expand)
- "Which type of weather do you feel worst in?"
- Single, importance: 2
- Options:
  - `cold_windy`: Cold, windy, dry weather → obs: `"Vata Aggravation tendency"` w:2 dims `["dosha:vata"]`
  - `hot_humid`: Hot, humid weather → obs: `"Pitta Aggravation tendency"` w:2 dims `["dosha:pitta"]`
  - `cold_damp_overcast`: Cold, damp, cloudy weather → obs: `"Kapha Aggravation tendency"` w:2 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 6.3-8 (Ritucharya)

**`life_travel`**
- "How does frequent travel or irregular schedule affect you?"
- Single, importance: 1
- Options:
  - `thrives_loves_it`: I thrive on it — variety energizes me → obs: `"Vata Lifestyle"` w:1 dims `["dosha:vata"]`
  - `manageable_adaptable`: Manageable — I adapt reasonably well → obs: `"Pitta Lifestyle"` w:1 dims `["dosha:pitta"]`
  - `disrupts_significantly`: It significantly disrupts my digestion, sleep, and mood → obs: `"Vata Aggravation tendency"` w:2 dims `["dosha:vata", "agni:vishama"]`
  - `strongly_dislike`: I strongly dislike disruption — prefer my stable routine → obs: `"Kapha Lifestyle"` w:2 dims `["dosha:kapha"]`
- Source: Charaka Samhita, Sutrasthana 7.24

---

## File: `exercise.json`

Category: `exercise`. Covers physical activity, stamina, recovery, and exercise tendencies.

### SubCategory: `physical`

**`ex_endurance`**
- "How is your natural physical endurance or stamina?"
- Single, importance: 2
- Options:
  - `low_tires_quickly`: Low — I tire quickly and need long recovery → obs: `"Vata Bala (low stamina)"` w:2 dims `["dosha:vata", "dhatu:mamsa"]`
  - `moderate_average`: Moderate — average for my age → obs: `"Pitta Bala (moderate stamina)"` w:1 dims `["dosha:pitta"]`
  - `high_can_keep_going`: High — I can sustain physical effort for a long time → obs: `"Kapha Bala (high stamina)"` w:2 dims `["dosha:kapha", "dhatu:mamsa"]`
- Source: Charaka Samhita, Sutrasthana 21.18 (Bala)

**`ex_recovery`**
- "After intense physical exercise, how long do you need to fully recover?"
- Single, importance: 2
- Options:
  - `1_to_2_days`: 1–2 days before I feel ready again → obs: `"Vata Bala (slow recovery)"` w:2 dims `["dosha:vata", "ojas:low"]`
  - `same_day_or_next`: Same day or next morning — I bounce back fast → obs: `"Pitta Bala (fast recovery)"` w:2 dims `["dosha:pitta", "agni:tikshna"]`
  - `3_plus_days`: 3+ days — I get sore very easily → obs: `"Vata Bala (slow recovery)"` w:3, `"Low Ojas"` w:1 dims `["dosha:vata", "ojas:low"]`
  - `never_exercise`: I rarely exercise vigorously → obs: `"Kapha Sedentary Pattern"` w:2 dims `["dosha:kapha", "lifestyle:sedentary"]`
- Source: Charaka Samhita, Sutrasthana 21.18

**`ex_preferred_type`**
- "What kind of physical movement feels most natural or enjoyable to you?"
- Multiple, importance: 1
- Options:
  - `walking_nature`: Walking, especially in nature → obs: `"Sattvic Exercise Pattern"` w:1 dims `["manas:sattvic"]`
  - `yoga_stretching`: Yoga or stretching → obs: `"Vata Balancing Exercise"` w:1 dims `["lifestyle:regulated"]`
  - `high_intensity`: High-intensity training, running, CrossFit → obs: `"Pitta Exercise Pattern"` w:2 dims `["dosha:pitta"]`
  - `team_sports`: Team sports → obs: `"Pitta Social Pattern"` w:1 dims `["dosha:pitta"]`
  - `swimming`: Swimming or water activities → obs: `"Pitta Cooling Pattern"` w:1 dims `["dosha:pitta"]`
  - `nothing_dislike_exercise`: I avoid exercise — I generally dislike it → obs: `"Kapha Sedentary Pattern"` w:3 dims `["dosha:kapha", "lifestyle:sedentary"]`
- Source: Ashtanga Hridayam, Sutrasthana 2.10 (Vyayama)

**`ex_morning_vs_evening`**
- "When do you naturally feel most physically energized?"
- Single, importance: 1
- Options:
  - `morning`: Morning — full of energy early in the day → obs: `"Pitta Morning Pattern"` w:1 dims `["dosha:pitta"]`
  - `afternoon`: Afternoon — peak around 2–4pm → obs: `"Pitta Afternoon Pattern"` w:1 dims `["dosha:pitta"]`
  - `evening`: Evening — I warm up as the day goes on → obs: `"Kapha Late Energy Pattern"` w:1 dims `["dosha:kapha"]`
  - `variable_unpredictable`: Completely variable — energy spikes and crashes → obs: `"Vata Energy Pattern"` w:2 dims `["dosha:vata", "agni:vishama"]`
- Source: Charaka Samhita, Sutrasthana 30.10 (Tridosha Kala)

**`ex_joint_flexibility`**
- "How flexible are your joints?"
- Single, importance: 1
- Options:
  - `very_flexible_hypermobile`: Very flexible — sometimes hypermobile → obs: `"Vata Shleshaka Kapha disturbance"` w:2 dims `["dosha:vata", "dosha:kapha"]`
  - `average_flexibility`: Average → no strong observations
  - `stiff_needs_warmup`: Stiff — especially before warming up → obs: `"Kapha Stiffness Pattern"` w:2 dims `["dosha:kapha", "dhatu:asthi"]`
  - `pain_with_movement`: Movement causes pain or discomfort → obs: `"Vata in Asthivaha Srotas"` w:3 dims `["dosha:vata", "dhatu:asthi", "srotas:asthivaha"]`
- Source: Sushruta Samhita, Sharirasthana 5.29 (Sandhi)

**`ex_breath_capacity`**
- "When you do aerobic exercise, how is your breathing?"
- Single, importance: 2
- Options:
  - `get_breathless_quickly`: I get breathless very quickly → obs: `"Vata in Pranavaha Srotas"` w:2 dims `["dosha:vata", "srotas:pranavaha"]`
  - `moderate_endurance`: Moderate endurance, breathe normally → no strong observations
  - `strong_sustained`: Strong sustained breathing capacity → obs: `"Kapha Pranavaha Srotas strength"` w:2 dims `["dosha:kapha", "srotas:pranavaha"]`
- Source: Charaka Samhita, Sutrasthana 17.116 (Pranavaha Srotas)

---

## Output Requirements

1. Valid JSON arrays.
2. Every question must have all required fields including `importance`, `source`, `category`, `subCategory`.
3. All observations must have `observation`, `weight`, and `dimensions`.
4. IDs must be unique: prefix `emo_`, `life_`, `ex_`.
5. Validate JSON after writing.

## Definition of Done

- [ ] `emotions.json` has minimum 10 questions covering stress, fear, anger, grief, forgiveness, personality
- [ ] `lifestyle.json` has minimum 7 questions covering routine, wake time, climate, travel, screen time
- [ ] `exercise.json` has minimum 6 questions covering stamina, recovery, preference, flexibility, breath
- [ ] All JSON is valid
- [ ] No ID conflicts with other subagents' prefixes
