---
name: branchscaipe-design
description: Use this skill to generate well-branded interfaces and assets for Branchscaipe, the premium AI chat assistant with Chat Branching — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, gradients, motion, assets, and a full UI-kit component library for prototyping calm, intelligent, aurora-toned interfaces.
user-invocable: true
---

# Branchscaipe Design System

Branchscaipe is a calm, intelligent, premium AI chat assistant whose signature feature is **chat branching** (branch any message, navigate a hierarchy, merge branches/responses back into a parent). The aesthetic is soft & rounded, atmospheric aurora gradients over rich charcoal/early-morning-sky neutrals, glass surfaces used selectively, and unhurried motion — quality bar of Apple, Linear, Arc, Stripe.

Read `README.md` first for the full guide (content voice, visual foundations, iconography), then explore:

- `styles.css` — the one stylesheet to link; `@import`s every token file in `tokens/`.
- `tokens/` — colors (light + dark), typography, spacing, radius, shadows, effects, motion, gradients, fonts.
- `components/` — React primitives (`core`, `forms`, `feedback`, `navigation`) + `ai` (UserMessage, AssistantMessage, Composer, BranchBreadcrumb, BranchIndicator, ContextBanner, MergeBanner, ThreadLineage, BranchNavigator, ToolCall, AIStatusIndicator). Each has a `.prompt.md` with usage.
- `ui_kits/branchscaipe-app/` — the full interactive chat app recreation.
- `guidelines/` — foundation specimen cards.
- `assets/fonts/` — Albert Sans (product) + Orbitron (brand) variable fonts.

## Working rules
- **Type:** Albert Sans everywhere; Orbitron ONLY for the logo / hero identity / rare major headings, always uppercase + tracked.
- **Color:** consume the semantic tokens (`--brand-primary`, `--surface-1`, `--text-primary`, …), never raw hex. Dark mode = add `class="dark"` to a wrapper.
- **Voice:** warm, plain, sentence case; "I" (assistant) to "you" (user); branch/parent/merge/thread lexicon; no emoji in chrome.
- **Soft everything:** radii 12–32 + pills, soft layered shadows, hairline translucent borders, calm 140/240/420ms motion.
- **Icons:** Lucide (CDN), 1.75 stroke. `git-branch` / `git-merge` are the product's signature glyphs.

## How to use
If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static HTML files for the user to view. For production code, copy assets and apply the rules here to design as an expert in this brand.

If invoked without guidance, ask what the user wants to build, ask a few clarifying questions, then act as an expert designer who outputs HTML artifacts or production code as needed.
