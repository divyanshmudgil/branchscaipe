# Branchscaipe — Design System

**Branchscaipe** is a premium AI chat assistant whose core differentiator is **Chat Branching**: from any message you can spin off an alternate conversation path, navigate a hierarchy of branches, and merge a branch — or a single response — back into its parent. The product's job is to make complex, multi-path conversations feel **calm, intelligent, and effortless**.

This repository is the complete design language for that product: tokens, foundations, reusable components, AI-specific components, and a full chat UI kit.

> **Design vision:** calm · intelligent · trustworthy · elegant · premium · focused · human-centered.
> Quality bar: Apple, Linear, Arc, Stripe, Notion, Lovable. Avoid generic-AI aesthetics, visual noise, and trend-chasing that hurts usability.

---

## Sources

- **Figma:** `branchscaipe.fig` — a low-fidelity wireframe set (9 frames on Page 1: Main thread, Branch view, Post-merge view, Components, logo lockup). It defines the **product structure & flows** — branching, breadcrumb lineage, merge-to-parent, thread tree — and is treated as a *directional input*, not a visual template. The grayscale wireframes were re-skinned into the premium aurora system documented here.
- **Brand fonts (uploaded):** `Albert Sans` (product) + `Orbitron` (brand) variable fonts, in `assets/fonts/`.
- The visual language (color, gradient, motion, glass, dark mode) is defined by the design brief, not the wireframes.

---

## How it's organized

| Path | What |
|---|---|
| `styles.css` | Global entry point — `@import` manifest only. Consumers link this one file. |
| `tokens/` | CSS custom properties: `colors`, `typography`, `spacing`, `radius`, `shadows`, `effects`, `motion`, `gradients`, `fonts`, `base`. |
| `components/` | Reusable React UI primitives, grouped by concern (`core/`, `forms/`, `feedback/`, `navigation/`, `ai/`). |
| `ui_kits/branchscaipe-app/` | Full interactive recreation of the chat app. |
| `guidelines/` | Foundation specimen cards (Design System tab). |
| `assets/` | Fonts, logos, icons. |
| `SKILL.md` | Agent-Skill manifest for downstream use. |

---

## Content fundamentals

How Branchscaipe writes copy:

- **Voice:** warm, plain, quietly intelligent. Never hypey, never robotic. It explains, it doesn't sell.
- **Person:** the assistant speaks as **"I"** to the user as **"you"** ("Got it — I'll respond as a React expert."). UI chrome and labels are impersonal and terse ("Merge chat to parent", "Branch from: Hooks").
- **Casing:** **Sentence case everywhere** — buttons, menus, headings, banners ("Merge response to parent", not "Merge Response To Parent"). The only all-caps is the **BRANCHSCAIPE** wordmark (Orbitron) and rare micro eyebrow labels.
- **Buttons & actions:** short imperative verbs — *Branch · Retry · Copy · Merge · Back · Send*. One or two words.
- **Branch / merge language is the product's signature vocabulary:** "Branch from: Hooks", "Merge from: Closure", "Merge chat to parent", "Merge response to parent", "Choose parent", "Continue conversation". Keep this lexicon consistent — *branch*, *parent*, *merge*, *thread*, *lineage*.
- **Placeholders & helpers** are gentle and inviting: "Ask me anything…", "AI can make mistakes".
- **Em dashes** are used for the assistant's natural, conversational asides ("Got it—I'll respond…").
- **Emoji:** not used in product chrome. The assistant may mirror a user's tone but the interface itself stays emoji-free.
- **Tone test:** if a line sounds like a startup landing page or a sci-fi terminal, rewrite it calmer and plainer.

---

## Visual foundations

**Overall vibe.** Soft, atmospheric, premium. Light mode reads like an *early-morning sky*; dark mode is *rich charcoal lit by ambient aurora*. Everything is rounded, low-contrast, and unhurried.

- **Color.** Cool blue-grey neutrals (ink), an **iris** primary (`#6F6BE2`), a **sky** secondary, and a soft **aurora** accent family (iris · peri · sky · mint · blush · peach · lilac). Desaturated, never neon, never cyberpunk. Status colors are muted (soft green / amber / coral / sky). The emotional target is *calm intelligence*.
- **Gradients.** A signature **aurora field** (layered radial pastels) used only as ambient backdrop, plus a **dawn** vertical wash and a **brand "intelligence"** gradient (iris→sky) reserved for the primary CTA and logo glow. Gradients are extremely soft, wide-stopped, and drift slowly (`aurora-drift`, 18s) — atmospheric, never distracting. Never use a hard bluish-purple gradient as a button fill.
- **Type.** Two families only. **Albert Sans** for the entire product (UI, body, controls). **Orbitron** strictly for brand moments — logo, hero identity, occasional major section headers — and used *sparingly*. Body tracking is a touch open (`0.02em`); the Orbitron lockup is widely tracked (`0.12em`).
- **Spacing.** 4px grid, generous rhythm. Reading column caps at ~760px. The left icon rail is 72px (from the wireframe).
- **Backgrounds.** Mostly flat surface color; aurora gradients appear as soft ambient washes behind hero/empty states and beneath glass panels — never full-bleed loud. No photography, no textures, no hand illustration.
- **Corner radii.** Soft throughout: `12 / 16 / 20 / 24 / 32`, plus 8 for tiny chips and full pills for bubbles, inputs, and the composer. **No harsh geometry, no 0-radius corners.**
- **Cards & surfaces.** Layered: `surface-1` (white / charcoal) for panels, `surface-2` for recessed message pills and wells. Borders are hairline and translucent (`rgba(ink,0.06–0.16)`). Cards lean on **soft shadow over heavy borders**; elevation comes from the multi-layer shadow ramp (`xs→xl`), cool-tinted in light mode and glow-based in dark.
- **Shadows.** Soft, diffuse, multi-layer, low-opacity (≈0.05–0.16). A **brand glow** (`--shadow-glow`) marks primary actions and the active branch node. Dark mode trades drop-shadows for ambient iris glow + crisp hairlines.
- **Glass.** Used *selectively* — sidebar, floating panels, command menu, context overlays, the composer. Recipe: `--surface-glass` + `backdrop-filter: saturate(1.5) blur(16px)` + hairline border + optional top sheen. Subtle blur, high readability; never murky, never over-transparent.
- **Borders.** Almost always hairline and translucent. A 1.5px `--border-brand` marks focused/active branch surfaces. Focus uses a 3px iris ring (`--ring-focus`) + 2px outline.
- **Hover / press.** Hover lifts to `--surface-hover` (and for primary, darkens to `--brand-primary-hover`). Press settles to `--surface-active` / `--brand-primary-active` with a tiny `scale(0.98)` and a 0.98 opacity dip. All transitions are fast (140ms) and calm-eased.
- **Motion.** *Alive but calm.* Durations fast/medium/slow = 140/240/420ms. Signature easing `--ease-calm` (soft settle); `--ease-spring` for gentle overshoot, used sparingly (branch creation, success). Aurora backgrounds drift over 18s. Respects `prefers-reduced-motion`.
- **Imagery temperature.** Cool, soft, luminous. Avatars and accents skew pastel (the wireframe's mint avatar lives on as `aurora-mint`).

---

## Iconography

- **System:** [**Lucide**](https://lucide.dev) — a clean, rounded, consistent 1.75–2px stroke set that matches Branchscaipe's soft geometry. Loaded from CDN (`lucide@latest`) in cards and the UI kit; the `IconButton` and components accept any Lucide node.
- **Why Lucide:** the wireframes use simple rounded line icons (menu, new-chat, search, settings, share, more-vertical, plus, sliders, send) plus **git-branch** and **git-merge** glyphs for the product's signature branch/merge actions — all of which exist in Lucide with the right stroke weight. This avoids hand-rolling SVGs.
- **Key product icons:** `git-branch` (branch), `git-merge` / `git-pull-request` (merge), `rotate-ccw` (retry), `copy`, `more-horizontal` / `more-vertical`, `arrow-left` (back), `arrow-up` / `send` (send), `sliders-horizontal` (tools), `plus`, `panel-left` (sidebar), `search`, `settings`, `share-2`.
- **Stroke & size:** default 20px in chrome, 16px inline, stroke 1.75. Icons inherit `currentColor`.
- **No emoji** in product chrome. No unicode glyph hacks. SVG only, via Lucide.
- If a needed glyph is missing from Lucide, substitute the nearest Lucide match at the same stroke weight and note it — do not mix icon families.

---

## Index / manifest

- **Tokens** — `tokens/*.css` (10 files: fonts, colors, typography, spacing, radius, shadows, effects, motion, gradients, base). Start at `styles.css`. 263 tokens across a light default + a first-class `.dark` theme.
- **Foundations (Design System tab)** — 12 `guidelines/*.card.html` cards grouped *Type · Colors · Spacing · Effects · Motion · Brand*.
- **Components (28)** — `components/core` (Button, IconButton, Card, Badge, Pill, Avatar, Switch, Tabs), `components/forms` (Input, Textarea, Select), `components/feedback` (Tooltip, Menu, Toast, Dialog, Drawer), `components/navigation` (Breadcrumb), and `components/ai` (UserMessage, AssistantMessage, Composer, ToolCall, BranchIndicator, BranchNavigator, BranchBreadcrumb, ContextBanner, MergeBanner, ThreadLineage, AIStatusIndicator). Each ships `<Name>.jsx` + `.d.ts` + `.prompt.md`, with one `@dsCard` per directory.
- **UI kit** — `ui_kits/branchscaipe-app/` — interactive chat app recreation (`index.html`): chat, branch, merge-to-parent, branch navigator, search, settings, dark mode.
- **Skill** — `SKILL.md`.

> Namespace for `@dsCard` HTML: `window.BranchscaipeDesignSystem_0d3c10`.
