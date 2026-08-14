# SwaDharma Prakṛti - Project Roadmap

This document meticulously tracks the implementation of the comprehensive Ayurvedic self-discovery engine based on the original task descriptions.

## Phase 1: Core Foundation & Initial Implementation
- [x] Next.js Monorepo Setup (with ShadCN, Tailwind v4)
- [x] Core Logic Engines
    - [x] Question Engine (Routing, conditions, progression, history stack)
    - [x] Observation Engine (Weighted observation mapping & multi-dimensional aggregation)
- [x] UI Components
    - [x] Typeform-style assessment interface (Framer Motion, keyboard shortcuts, auto-advance)
    - [x] Comprehensive 12-section Report Page
- [x] Initial Categories (Data & Assessment)
    - [x] Identity / Baseline
    - [x] Digestion & Metabolism (Agni)
    - [x] Sleep Patterns (Nidra)
    - [x] Emotions / Mental State (Manas)
    - [x] Lifestyle & Routine (Vihara)
- [x] Final Report Generation
    - [x] Constitution Summary & Dosha Proportion Bar
    - [x] Digestion Profile (Agni)
    - [x] Sleep Profile (Nidra)
    - [x] Mental Profile (Manas)
    - [x] Lifestyle Profile (Vihara)
- [x] Knowledge Graph Core Integration
- [x] Recommendation Engine Core Integration
- [x] Data Layer State Persistence (Zustand + LocalStorage/IDB)

## Phase 2: Complete Assessment Data Entry (16 Categories Completed)
- [x] Implement complete JSON Question Data across all 16 categories:
    - [x] Identity / Baseline (`introduction.json`)
    - [x] Physical Constitution (`body.json`)
    - [x] Digestion & Metabolism (`digestion.json`)
    - [x] Sleep Patterns (`sleep.json`)
    - [x] Emotions & Mental State (`emotions.json`)
    - [x] Lifestyle & Routine (`lifestyle.json`)
    - [x] Physical Activity & Exercise (`exercise.json`)
    - [x] Reproductive & Hormonal Health with gender branching (`reproduction.json`)
    - [x] Skin, Hair & Sensory Health (`skin_hair.json`)
    - [x] Appetite, Cravings & Senses (`appetite_senses.json`)
    - [x] Mind, Memory & Stress (`mental.json`)
    - [x] Environment & Climate (`environment.json`)
    - [x] Spiritual Disposition (`spirituality.json`)
    - [x] Relationships & Communication (`relationships.json`)
    - [x] Childhood Patterns (`childhood.json`)
    - [x] Aging & Longevity (`aging.json`)

## Phase 3: Advanced Logic & Observation Mapping
- [x] Complete Observation Mappings for all 16 categories.
- [x] Implement conditional branching logic based on gender (`intro_gender`) and age (`intro_age_range`).
- [x] Source referencing linking every observation to authoritative Ayurvedic texts (Charaka, Sushruta, Vagbhata, Bhavaprakasha).

## Phase 4: Comprehensive Reporting & Guidance
- [x] Generate the complete, nuanced 12-section Final Report:
    - [x] Overall Balance & Dominant Qualities (Prakrti/Vikrti)
    - [x] Agni (Digestive Fire) profile & implications
    - [x] Nidra (Sleep) pattern classification
    - [x] Mental tendencies & Stress handling (Manas)
    - [x] Vihara (Lifestyle & Environment)
    - [x] Ojas (Vitality & Resilience visual gauge)
    - [x] Dhatu (Tissue-level insights)
    - [x] Diet Guide (Preferred tastes, foods to favor/moderate, meal timing)
    - [x] Exercise Profile (Ideal movement, intensity, recovery)
    - [x] Seasonal Guide (Ritucharya for Vata, Pitta, Kapha)
    - [x] Spiritual Profile (Meditation, Pranayama, Sadvritta)
    - [x] One-Page Printable Snapshot
- [x] Report Export & Print (`window.print()` styles)

## Phase 5: Knowledge Base & Recommendation Engine
- [x] Searchable, filterable Knowledge Graph page with 50+ classical text source entries.
- [x] Categorized Recommendation Engine with 60+ Shastra-backed recommendations across 10 categories.
- [x] Personalized "Why this for you" explanations and practical alternatives for every recommendation.
- [x] Ahara — Dosha-Specific Diet Plan Builder (`/diet` page, `SeasonalMenuCard`, `FoodCategoryGrid`).

## Phase 6: Continuous Intelligence & Adaptive Health Companion
- [ ] P6-M01: Daily Dinacharya Engine (`swadharma/apps/web/src/lib/dinacharya/`)
- [ ] P6-M02: Ritucharya Engine (`swadharma/apps/web/src/lib/ritucharya/`)
- [ ] P6-M03: Daily Check-in Engine (`swadharma/apps/web/src/components/checkin/`)
- [ ] P6-M04: Vikriti Progress Tracker (`swadharma/apps/web/src/components/vikriti-tracker/`)
- [ ] P6-M05: Habit & Consistency Engine (`swadharma/apps/web/src/lib/habits/`)
- [ ] P6-M06: Ayurveda Health Score (`swadharma/apps/web/src/lib/health-score/`)
- [ ] P6-M07: Adaptive Recommendation Engine (`swadharma/apps/web/src/lib/adaptive-recommendations/`)
- [ ] P6-M08: Goal-Based Personalization Engine (`swadharma/apps/web/src/lib/goals/`)
- [ ] P6-M09: Symptom Timeline Engine (`swadharma/apps/web/src/components/symptom-timeline/`)
- [ ] P6-M10: Trigger Discovery Engine (`swadharma/apps/web/src/lib/triggers/`)
- [ ] P6-M11: Personalized Meal Planning Engine (`swadharma/apps/web/src/lib/meal-planner/`)
- [ ] P6-M12: Herb Planning & Monitoring Engine (`swadharma/apps/web/src/lib/herb-planner/`)
- [ ] P6-M13: Observation Journal Engine (`swadharma/apps/web/src/components/journal/`)
- [ ] P6-M14: Context-Aware Reminder Engine (`swadharma/apps/web/src/lib/reminders/`)
- [ ] P6-M15: Family Health Engine (`swadharma/apps/web/src/components/family/`)
- [ ] P6-M16: Practitioner Mode (`swadharma/apps/web/src/components/practitioner/`)
- [ ] P6-M17: Explainability & Evidence Engine (`swadharma/apps/web/src/components/explainability/`)
- [ ] P6-M18: Recommendation Feedback Engine (`swadharma/apps/web/src/lib/feedback/`)
- [ ] P6-M19: Predictive Imbalance Engine (`swadharma/apps/web/src/lib/predictive/`)
- [ ] P6-M20: Personal Ayurveda Knowledge Graph (`swadharma/apps/web/src/components/personal-graph/`)


- [ ] P6-M21: P6-M21: Agni-Bala & Kostha Profiling Engine (`swadharma/apps/web/src/lib/agni-kostha`)
- [ ] P6-M22: P6-M22: Dhatu Poshana & Tissue Vitality Engine (`swadharma/apps/web/src/lib/dhatu-poshana`)
- [ ] P6-M23: P6-M23: Srotas Flow & Channel Diagnostics (`swadharma/apps/web/src/lib/srotas-diagnostics`)
- [ ] P6-M24: P6-M24: Ama & Metabolic Toxins Engine (`swadharma/apps/web/src/lib/ama-assessment`)
- [ ] P6-M25: P6-M25: Ojas & Vitality Reserve Index (`swadharma/apps/web/src/lib/ojas-vitality`)
- [ ] P6-M26: P6-M26: Manas Guna & Mental Constitution Engine (`swadharma/apps/web/src/lib/manas-guna`)
- [ ] P6-M27: P6-M27: Prana, Tejas, Ojas Subtle Triad Engine (`swadharma/apps/web/src/lib/subtle-triad`)
- [ ] P6-M28: P6-M28: Pathya-Apathya Classical Diet Matrix (`swadharma/apps/web/src/lib/pathya-apathya`)
- [ ] P6-M29: P6-M29: Viruddha Ahara Incompatible Food Engine (`swadharma/apps/web/src/lib/viruddha-ahara`)
- [ ] P6-M30: P6-M30: Panchakarma Readiness & Detox Evaluator (`swadharma/apps/web/src/lib/panchakarma-readiness`)
- [ ] P6-M31: P6-M31: Nadi Pariksha Digital Proxy Engine (`swadharma/apps/web/src/lib/nadi-pariksha`)
- [ ] P6-M32: P6-M32: Shad Rasa Thermal & Post-Digestive Engine (`swadharma/apps/web/src/lib/shad-rasa`)
- [ ] P6-M33: P6-M33: Vihara & Environmental Ergonomics Engine (`swadharma/apps/web/src/lib/vihara-ergonomics`)
- [ ] P6-M34: P6-M34: Yogic Asana & Pranayama Adaptability Engine (`swadharma/apps/web/src/lib/yoga-pranayama`)
- [ ] P6-M35: P6-M35: Sadvritta & Behavioral Hygiene Engine (`swadharma/apps/web/src/lib/sadvritta`)
- [ ] P6-M36: P6-M36: Ritu Sandhi Seasonal Transition Engine (`swadharma/apps/web/src/lib/ritu-sandhi`)
- [ ] P6-M37: P6-M37: Women's Artava Chakra Health Engine (`swadharma/apps/web/src/lib/artava-chakra`)
- [ ] P6-M38: P6-M38: Men's Shukra Dhatu Vitality Engine (`swadharma/apps/web/src/lib/shukra-dhatu`)
- [ ] P6-M39: P6-M39: Rasayana Rejuvenation Protocol Engine (`swadharma/apps/web/src/lib/rasayana`)
- [ ] P6-M40: P6-M40: Nidra-Vichara Sleep Architecture Engine (`swadharma/apps/web/src/lib/nidra-architecture`)
