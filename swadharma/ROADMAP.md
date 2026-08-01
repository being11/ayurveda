# SwaDharma Prakṛti - Project Roadmap

This document meticulously tracks the implementation of the comprehensive Ayurvedic self-discovery engine based on the original task descriptions.

## Phase 1: Core Foundation & Initial Implementation (Current)
- [x] Next.js Monorepo Setup (with ShadCN, Tailwind)
- [x] Core Logic Engines
    - [x] Question Engine (Routing, conditions, progression)
    - [x] Observation Engine (Mapping answers to observations instead of strict scoring)
- [x] UI Components
    - [x] Typeform-style assessment interface (Framer Motion)
    - [x] Report rendering
- [x] Initial Categories (Data & Assessment)
    - [x] Identity / Baseline
    - [x] Digestion
    - [x] Sleep
    - [x] Emotions / Mental State
    - [x] Lifestyle & Routine
- [x] Final Report Generation (Initial Implementation)
    - [x] Constitution Summary
    - [x] Digestion Profile
    - [x] Sleep Profile
    - [x] Mental Profile
    - [x] Lifestyle Profile
- [x] Knowledge Graph MVP
- [x] Recommendation Engine MVP
- [x] Data Layer Migration to IndexedDB

## Phase 2: Complete Assessment Data Entry (Next Steps for Production Readiness)
- [ ] Implement remaining JSON Question Data
    - [ ] Exercise & Physical Characteristics
    - [ ] Reproduction (Women's Health / Men's Health branching)
    - [ ] Skin & Hair
    - [ ] Appetite & Senses
    - [ ] Environment / Climate
    - [ ] Spirituality & Relationships
    - [ ] Childhood & Aging

## Phase 3: Advanced Logic & Observation Mapping
- [ ] Complete Observation Mappings for all categories.
- [ ] Implement complex conditional logic based on multiple prior answers (e.g., specific combinations indicating Rasa imbalance).
- [ ] Implement source referencing (metadata linking observations to authoritative texts).

## Phase 4: Comprehensive Reporting
- [ ] Generate the complete, nuanced Final Report.
    - [ ] Overall Balance & Dominant Qualities
    - [ ] Mental tendencies & Stress handling
    - [ ] Diet (Preferred tastes, foods to favor/moderate, meal timing)
    - [ ] Seasonal Guide (Ritucharya)
    - [ ] Lifestyle (Dinacharya)
    - [ ] Exercise (Ideal movement, intensity, recovery)
    - [ ] Spiritual (Meditation, Pranayama, etc.)
    - [ ] Ojas (Supporting habits)
- [ ] Report Export (PDF)

## Phase 5: Future Enhancements
- [ ] IndexedDB synchronization.
- [ ] Profile persistence and comparison (tracking Prakṛti vs. Vikṛti over time).
- [ ] (Refer to `tasks/17expansion.md` for broader platform goals)
