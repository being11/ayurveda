# SwaDharma Prakrti — Jules Developer Guide

## This Repo
This is the TPM working repo for **SwaDharma Prakrti**, a personalized Ayurvedic self-discovery engine. The Next.js monorepo codebase lives in `swadharma/`. Task specs live in `tasks/`.

## Your Job
Read the task spec assigned to you from `tasks/`. Implement it on your feature branch. Push when the quality gate passes. That's it.

You do NOT need to read any file in this repo except:
- Your task spec (`tasks/IXX_*.md`)
- The codebase files your task spec references

## Hard Constraints — Read Before Writing a Single Line

- **Scope**: Only touch files explicitly listed in your task spec. Nothing else.
- **Files**: Do NOT rename or delete existing files or directories.
- **Routing**: Do NOT add or change routes unless your spec explicitly says to.
- **Packages**: Do NOT add npm/pnpm packages without listing them in your commit message with justification.
- **Types**: Do NOT modify `apps/web/src/types/assessment.ts` without escalating first — it's shared across all modules.
- **TypeScript**: Strict mode. Zero `any`. No exceptions.
- **Theme**: Light theme only. No `dark:` Tailwind classes. Background `#ffffff` or `bg-white`.
- **Quality gate**: Run `pnpm --filter web build` from the `swadharma/` directory. It must exit 0 with zero TypeScript errors before you push.

## Escalate to Antigravity ONLY if:
- The Ayurvedic data model is genuinely ambiguous and your spec doesn't resolve it
- You need to modify `types/assessment.ts` in a way that will affect other modules
- The build fails after 2 different fix attempts
- There is a file conflict with another module's work

## Do NOT escalate for:
- Implementation approach choices within your module scope
- TypeScript errors you can debug yourself
- UI/layout decisions within the existing design system
- Picking between two valid data structures for your module

## Stack Reference
- **Framework**: Next.js 16 App Router, React 19, TypeScript strict
- **Styling**: Tailwind v4, shadcn/ui primitives
- **State**: Zustand with `persist` middleware
- **Monorepo**: pnpm workspaces — always run build as `pnpm --filter web build` from `swadharma/`
- **Design**: White/stone theme. Google Font: DM Serif Display (headings), Inter (body). Ayurvedic green `#4A7C59`, amber `#E8973A`.
