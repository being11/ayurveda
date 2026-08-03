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
