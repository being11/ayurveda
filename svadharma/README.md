# Svadharma Prakṛti

A Personalized Ayurvedic Self-Discovery Engine.
*Know the Self before attempting to heal the Self.*

## Overview

This project implements a personalized Ayurvedic assessment platform that models patterns and context, rather than stereotyping individuals into rigid dosha labels. It dynamically assesses:
- Identity & Baseline
- Digestion (Agni)
- Sleep Patterns (Nidra)
*(With more categories planned in the roadmap)*

## Current State & Achievements

- **Next.js Monorepo:** Configured using ShadCN, Tailwind CSS, and Framer Motion.
- **Dynamic Assessment Engine:** A Typeform-style interface that asks one question at a time with smooth transitions.
- **Rule Engine & Logic:** Built with Zustand. Fully supports conditional questioning (e.g., branching based on gender or specific symptoms) and Maps answers to "Observations" rather than strict scores.
- **Report Generation:** Generates a dynamic summary of the user's tendencies based on Ayurvedic reasoning.

## How to Run

1. `cd svadharma`
2. `pnpm install`
3. `pnpm --filter web run dev`
4. Open `http://localhost:3000`

## Production Readiness & Next Steps

Please refer to `ROADMAP.md` for a comprehensive list of what needs to be implemented to reach full production readiness. Key upcoming tasks include:
- Expanding the knowledge graph with full classical source mappings.
- Adding remaining assessment categories (Emotions, Lifestyle, etc.).
- Implementing the PDF Export functionality.
- Syncing state with IndexedDB for cross-session longevity.
