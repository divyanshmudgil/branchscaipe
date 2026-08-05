# Branchscaipe — project context

Read this before doing anything else in this repo. It's the accumulated context from
every session so far, so a fresh session doesn't have to re-derive it.

## What this is

Branchscaipe is an AI chat app whose signature feature is **chat branching**: from any
message you can branch off an alternate conversation path, navigate a hierarchy of
branches, and merge a branch (or a single response) back into its parent. It started as
a Claude-Design export (design tokens + a 28-component design system +
`ui_kits/branchscaipe-app/` — a Babel-standalone, no-build-step interactive prototype
with canned/fake AI replies) living at the repo root. That original design-project
source (`components/`, `tokens/`, `ui_kits/`, `styles.css`, `guidelines/`, etc.) is
still at the repo root for reference but is **not** the running app anymore — the real
app lives entirely in `app/`.

## Current architecture

```
Branchscaipe/
  app/                        ← THE APP. Deployed to Vercel as the whole project.
    src/                      ← React SPA (Vite). UI was originally ported pixel-for-
                               pixel from the design project and frozen — that changed
                               starting Milestone 5 (see "UI redesign" section below),
                               which explicitly reworked colors/sidebar/nav/motion.
                               Don't assume "frozen" still applies; check that section
                               for what's actually current before redesigning further.
    api/
      chat.js                 ← Vercel Function: POST /api/chat, streams NDJSON
    lib/server/               ← framework-agnostic backend logic (no Express, no
                               Vercel-specific code) — the actual "brain"
      config/env.js            reads/validates env vars, throws if a required key
                                is missing (fail-fast at cold start)
      providers/
        AIProvider.js           abstract base: streamChat(messages, opts) → async
                                generator of text chunks
        GeminiProvider.js       Gemini 3.6 Flash via @google/genai
        GroqProvider.js         Groq (Llama 3.3 70B by default) via groq-sdk,
                                OpenAI-compatible shape
        index.js                registry: AI_PROVIDER env var picks gemini | groq
      services/chat.service.js  thin seam between the function and the provider
  (repo root: original design-system source, kept for reference only)
```

There is **no separate backend server**. An earlier milestone built one (Express, in a
`server/` directory, run via `node server.js` on port 8787) — it has been **fully
retired and deleted**. Do not recreate it. Everything runs as a single Vercel project
with Root Directory = `app` (confirmed via `vercel project inspect branchscaipe`):
static frontend + serverless function, same origin, no CORS needed.

## How the pieces fit together

- **Branch isolation** (the product's core guarantee — a branch never sees a sibling
  branch's messages) is implemented in `app/src/logic.js`'s `contextMessages()`, which
  walks `lineage()` (parent chain) and truncates each ancestor at the exact message its
  child branched from. `App.jsx` sends this pre-scoped list to `/api/chat` — the
  branch-scoping logic was never duplicated server-side; it's entirely a
  what-gets-sent decision on the client.
- **Streaming**: `app/api/chat.js` returns a `ReadableStream` of NDJSON lines
  (`{"type":"token","text":"..."}`, then `{"type":"done"}` or
  `{"type":"error","message":"..."}`). `app/src/api.js` on the frontend parses this
  manually via `fetch()` + `response.body.getReader()` (not `EventSource`, since the
  request needs a POST body). `app/src/App.jsx`'s `runAssistantReply()` is the one
  function both `send()` and `retry()` funnel through.
- **Cancellation**: the composer's send button becomes a stop button while generating
  (`isGenerating` prop threading through `Screens.jsx`'s `AppComposer`). Clicking it
  aborts an `AbortController` tied to the fetch. Server-side, the `ReadableStream`'s
  `cancel()` callback (Web Streams standard — fires when the client actually stops
  reading) aborts the provider call too, so a cancelled request doesn't keep burning
  tokens. (An earlier Express version used `req.on("close")` for this and had a real
  bug — Express's request stream closes as soon as the body is *read*, not when the
  client disconnects, so it was aborting every request within milliseconds. Watch for
  this class of bug if a backend framework other than Vercel Functions is ever
  reintroduced.)
- **Markdown rendering**: `app/src/Markdown.jsx` wraps `react-markdown` +
  `remark-gfm` (tables/strikethrough) + `remark-math`/`rehype-katex` (real `√`,
  fractions, superscripts instead of literal `$\sqrt{2}$`), styled to the design
  system's CSS custom properties. Used by `Response.jsx` for assistant messages.

## Auth (Milestone 3) — Supabase, Google + Guest

Fully built and working (verified live on both localhost and production).

- `app/src/auth/` — `supabaseClient.ts` (the one client instance, reads
  `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`, throws fail-fast if missing),
  `contexts/AuthContext.tsx` (the state machine: `loading`/`authenticated`/
  `guest`/`unauthenticated`), `hooks/useAuth.ts`, `services/authService.ts`
  (Google OAuth + the guest sessionStorage flag), `components/GoogleSignInButton.tsx`.
- `app/src/Landing.tsx` + `LandingBackground.tsx` — shown when
  `status === "unauthenticated"`.
- `app/src/App.jsx`'s top-level `App()` is the auth gate; the actual app
  (renamed `AppShell`) only mounts once a session or guest choice exists,
  keyed by `profile?.id || "guest"` so sign-out/sign-in always gets a clean
  remount instead of stale state.
- **Guest mode is a hard client-side guarantee**: guests never call
  Supabase at all (not a runtime check — the call site itself never passes
  guests a user id). Guest chat data lives in `sessionStorage`, not
  `localStorage`, so it doesn't survive closing the tab.
- Supabase project is real and live: `qaogdataqlsccjbfelcr.supabase.co`.
  Google OAuth provider is enabled and redirect URLs are configured for
  localhost + production + `*.vercel.app` previews.
- DB schema (profiles, conversations, branches, messages) + RLS is live —
  see `app/supabase/migrations/`. Full setup doc: `docs/SUPABASE_SETUP.md`.

## Cloud sync + delete (Milestone 4)

Also fully built and working. `app/src/sync/` (`supabaseSyncService.ts`,
`mappers.ts`, `types.ts`, `useHydrateFromSupabase.ts`,
`useDirtyBranchSync.ts`, `guestImportService.ts`):

- Signed-in users: Supabase is the **source of truth** on load (fetched in
  `App()` before `AppShell` mounts, avoiding a stale-localStorage flash).
  Local `localStorage` write-through is kept as a write-only cache, never
  read back post-hydration.
- Writes are **debounced per-branch** (~900ms after the last touch, not a
  global "watch everything" — streaming tokens just reset the timer), and
  walk the branch's ancestor chain first so FK order is always satisfied
  even on a very first sync.
- `logic.js`'s `uid()` now emits real `crypto.randomUUID()`s (was a custom
  prefixed string before) — required so client ids can double as the
  schema's `uuid` primary keys with no translation layer.
- Guest→account import: if a user signs in and this tab still has leftover
  guest `sessionStorage` data, a dialog offers to import it once.
- **Delete chat/branch** (added on top of the original M4 scope, per user
  request): cascading delete both locally and remotely (Postgres `on
  delete cascade` already handles the remote side — no extra sync code
  needed there), reachable via right-click/hover-"⋯" on any sidebar chat or
  Branches-panel node.

## UI redesign (Milestone 5 — in progress, NOT yet merged to `main`)

**Branch state**: all work is on `explorations` (branched from `main`).
A `nav-light-gray-test` sub-branch existed temporarily for iterating on
the nav component with the user watching each round before approving —
it has since been consolidated back into `explorations` and deleted.
Important: **nothing has ever been committed** in this whole milestone —
every change (M3, M4, and all of this redesign) is still sitting as
*uncommitted working-tree changes* on `explorations`; the user commits
manually, never Claude, per standing instruction, and hasn't done so yet.
`explorations` has NOT been merged into `main`. If starting a fresh
session: `git status` will show a long list of modified/untracked files —
that's expected, not a sign something broke. Check `git branch
--show-current` (should be `explorations`) and `git log --oneline -3`
(tip should still be the pre-M3 commit `e01e30f add database storage`)
to confirm nothing unexpected happened to the branch/commit state.

This started as a literal Apple-Vision-Pro-inspired nav-only redesign
brief, then expanded into a full app-wide polish pass, then went through
several rounds of user feedback narrowing the exact visual language. The
**current, approved** design language is:

- **Colors**: unchanged palette (`design-system/tokens/colors.css`
  untouched) — only *which surface goes where* changed. Chat area uses
  `--surface-1` (brightest). Sidebar (`.bsc-sidebar` in `app.css`) uses a
  **sidebar-specific darker translucent glass** (`rgba(225,224,240,0.78)`
  light / `rgba(15,15,22,0.88)` dark — deliberately NOT the shared
  `--surface-glass` token, which read as too faint once tested) + backdrop
  blur. A very subtle fixed aurora radial wash sits behind the whole app
  shell (`body::before` in `app.css`) so that blur has something real to
  diffuse.
- **No strokes anywhere, fills instead**: `Button`'s `secondary` variant,
  `IconButton`'s `soft` variant, `Dialog`, `Menu`, `Sidebar`'s
  `ProfileMenu`, `Screens.jsx`'s `ContextMenu` all had their `border`
  dropped in favor of their existing background fill. NOT done
  exhaustively for every design-system component (Select/Switch/Tabs/Card
  untouched — not visible in the current app flow, deliberately
  out-of-scope, flagged to the user as a boundary not an oversight).
- **Sidebar**: divider lines removed (spacing only, per explicit request),
  glass background (above), width-expand/collapse is now a `framer-motion`
  spring instead of a CSS transition. The bottom profile row's "Guest"/
  "Not signed in" alignment bug (looked centered) was `text-align: center`
  inheriting from the `<button>`'s UA default — fixed with explicit
  `textAlign: "left"`, not a padding issue as first suspected.
  `SidebarItem`/`ChatListItem` use `whileTap` spring feedback.
  `ChatListItem`'s root is a `<div>` not `<button>` specifically so it can
  host a nested hover-reveal "⋯" options button (same reason
  `Panel.jsx`'s `BranchTree` row does the same).
- **Branch navigation — the centerpiece, `app/src/BranchNav.jsx` +
  `BranchTreeOverlay.jsx`**, replacing the old `LineageBar.jsx` (deleted).
  Current exact spec, confirmed correct by the user after several rounds:
  - `TopBar.jsx` uses a 3-column CSS grid (`1fr auto 1fr`) so
    Back+Nav+Merge reads as one truly-centered group regardless of what's
    in the side columns (hamburger on mobile, theme/temp toggles on the
    right).
  - Back button, the nav pill, and the Merge-to-parent button all share
    **the same height** (`BranchNav.NAV_PILL_HEIGHT = 44`, exported and
    imported by `TopBar.jsx` so they can't drift out of sync) and the
    same flat `var(--surface-2)` fill — no glass/blur on these three
    specifically (that was an earlier round's look, explicitly rejected).
  - Collapses to max 3 nodes + an animated ellipsis
    (`BranchNav.collapseNodes`, exported and unit-testable). Separator
    between names is a real arrow icon (`arrow-right`), not a small
    chevron.
  - **Persistent-path display** (a real bug fix, not styling): navigating
    to an ancestor no longer truncates descendants out of the pill. A
    `tipId` ref tracks "deepest node reached"; clicking an ancestor within
    the currently-displayed chain just moves which node is bold/current
    without shrinking the chain. Only navigating somewhere outside that
    chain (a different branch/chat entirely) resets the tip. See the
    file-header comment in `BranchNav.jsx` for the exact rule.
  - Active node: **no highlight box/stroke** — just `font-weight:700` +
    `color: var(--text-brand)` on the text. (An earlier round used a
    `layoutId`-shared filled pill between the collapsed view and the
    expanded tree; that was removed per explicit "no purple stroke/box"
    feedback — don't reintroduce it without being asked.)
  - A small **notch** (not a second row) hangs off the pill's bottom edge
    holding the down-chevron hint — keeps the pill from ever being taller
    than Back/Merge just to fit the hint.
  - Expanding the pill opens `BranchTreeOverlay`: shows the **full branch
    tree** (`logic.js`'s `branchTree()`, not just the lineage path),
    blur-only backdrop (never darkened), **anchored via `position:
    absolute` to the pill's own box** (not `position: fixed` centered in
    the viewport) so it visibly grows out of the pill — `transformOrigin:
    "top center"` + `scaleY` from a small value to 1, not a generic
    fade/scale. No "Branch hierarchy" title label (removed per request).
    Roving-tabindex keyboard nav (Arrow Up/Down/Enter/Escape); the
    purple focus ring only renders once the user actually presses an
    arrow key (`usedKeyboard` state) — it used to show by default on the
    active row since roving-focus starts there, which read as an unwanted
    second "current branch" indicator on top of the fill.
  - **The Back button, the pill itself, its notch, and the Merge button
    are all explicitly excluded from the backdrop blur** via `position:
    relative; zIndex: calc(var(--z-overlay) + 10)` on each of those four
    elements individually — without this they'd render blurred through the
    (mostly transparent) backdrop since it sits above them in the
    DOM/stacking order otherwise. (First pass only did Back+Merge and
    missed the pill itself, since the backdrop is a DOM descendant of the
    pill wrapper and — without its own elevated z-index — was painting on
    top of the pill; fixed by giving the pill's own `motion.div` and the
    notch's wrapping `<span>` the same treatment, not just their outer
    siblings.) If touching this again: don't give the *pill wrapper div*
    itself a competing z-index (tried, broke the stacking — since the
    backdrop is a descendant of that wrapper, raising the wrapper's
    z-index just traps the backdrop at the wrapper's level instead of
    letting it compare directly against Back/Merge; the fix is to elevate
    each visible element individually, not their shared container).
- **Motion**: `framer-motion` added as a real dependency (only place it's
  used — don't spread it into unrelated components speculatively). New
  messages fade+lift in on first mount only (not on every re-render/branch
  switch, since `initial`/`animate` only plays once per component
  instance — this is why it doesn't need `AnimatePresence` gymnastics).
  Switching branches crossfades the whole thread (`App.jsx`, `motion.div
  key={activeId}`). Theme toggle uses the native **View Transitions API**
  (`app/src/viewTransition.js` + `app.css`'s `::view-transition-*` rules)
  for a radial reveal from top-center of the window — centralized through
  one `setThemeAnimated`/`toggleTheme` in `App.jsx` so every trigger point
  (TopBar, sidebar menu, Settings) gets it for free.
- **Shadows → fog gradients**: `AppComposer` (`Screens.jsx`) no longer has
  a `box-shadow` — removed per request. `--gradient-fade-top` (existing,
  used by `ChatThread.jsx`'s sticky top-fade) and the new
  `--gradient-fade-bottom` (`design-system/tokens/gradients.css`, used
  above the composer in `App.jsx`) both had their opaque color stop
  corrected from a stale `var(--bg)` to `var(--surface-1)` — they'd drifted
  out of sync with the chat-area color swap above and were creating a
  visible seam that read as an unwanted shadow line.

**Not yet done / explicitly deferred**: a full border/stroke sweep of
every remaining design-system component; anything on `explorations` that
isn't listed above as changed. Don't assume the whole design system was
touched — it wasn't.

## Local API — FIXED via a dev-only Vite middleware (`npm run dev` now works)

**Current state: plain `npm run dev` now serves real, streaming AI
responses locally.** Verified end-to-end in the browser (real Groq
response received, correctly following the prompt). This is the
recommended way to run full-stack local dev now — simpler and faster than
`vercel dev`.

The fix: `app/vite.config.js` now has an `apiChatDevMiddleware` Vite
plugin (`configureServer` hook) that, dev-server-only, imports
`api/chat.js`'s handler directly and wires it to `/api/chat` by adapting
Node's `req`/`res` to/from the Web-standard `Request`/`Response` that
handler already uses (it's the modern `{ fetch(request) { ... } }` Vercel
Function shape, not classic Express-style `(req,res)` — that's what makes
this adapter simple: read the Node request into a `Request`, call
`.fetch()`, stream the `Response` body back out chunk-by-chunk via
`res.write()`). Also uses Vite's `loadEnv(mode, cwd, '')` (empty prefix =
load everything, not just `VITE_`-prefixed) to populate `process.env` with
`.env.local`'s contents before the handler's import chain
(`lib/server/config/env.js`) does its fail-fast env-var read — Vite does
NOT do this automatically for non-`VITE_` vars, which was the first thing
that broke when this was tried.

This does **not** violate the "no separate backend server" rule — it's
not a new process, just Vite's own existing dev server handling one more
route via a standard Vite plugin hook. `configureServer` never runs during
`vite build`, so production is completely unaffected — confirmed by
`npm run build` staying clean after adding it.

**Why this approach instead of fixing `vercel dev` directly**: `vercel
dev`'s hang was traced two layers deep and the *second* layer turned out
to be a real stall in `vercel-cli`'s own build orchestration, not
anything in this project — reproducibly stops dead right after
`@vercel/static-build` reports its Vite child "ready", before it ever
proceeds to build the `api/chat` function or open the outer `--listen`
port (confirmed via `--debug` logs: `Adding build match for "api/chat"`
appears, then nothing — the port opens in `LISTEN` state but never
answers a single HTTP request, even minutes later). That's very likely a
genuine incompatibility between this `vercel-cli` version and Vite 8's
dev-server readiness signal, not something fixable from inside this repo.
Given that, the direct Vite-middleware route was faster and now fully
works, so it was prioritized over continuing to debug `vercel dev`
itself.

**If `vercel dev` is ever revisited**: the *first* hang layer (`sh: yarn:
command not found` at "Creating initial build") IS fixed and worth
keeping — `vercel dev` unconditionally shells out to a bare `yarn`
regardless of this being an npm project. Fix (no `sudo`, nothing global
touched): a shim at `~/.local/bin/yarn` (`#!/bin/sh\nexec corepack yarn
"$@"` — `corepack` ships with Node and can run yarn with zero install).
Must prepend it to `PATH` since it's not there by default:
`PATH="$HOME/.local/bin:$PATH" vercel dev --cwd app --listen 3000 --yes`.
That gets past layer one; layer two (above) is still open.

## Provider notes (read before touching rate limits or model names again)

- **Gemini**: `gemini-2.5-flash` stopped being available to newly-created API keys in
  mid-2026 (full shutdown Oct 16 2026) — use `gemini-3.6-flash` (current default in
  `env.js`). Free tier is **5 RPM / 20 RPD** — confirmed directly from the user's
  AI Studio dashboard. Gemini 3's "thinking" is variable-length and shares the visible
  answer's token budget — `GeminiProvider.js` sets `thinkingConfig: { thinkingLevel:
  "MINIMAL" }` + `maxOutputTokens: 2048` because without this, some responses came back
  completely empty (the model spent the whole budget "thinking" and never emitted
  visible text). This was a real, reproduced bug — don't remove that config.
- **Groq**: added specifically because Gemini's free tier is too tight for real usage.
  Confirmed via Groq's own docs: **30 RPM**, RPD from 1,000 (70B/120B models) to 14,400
  (8B model), no credit card required. `AI_PROVIDER=groq` is the recommended
  production default; Gemini stays fully wired and switchable via the same env var.
  Default model: `llama-3.3-70b-versatile`.
- Researched and **rejected** as alternatives: Cerebras (its official current docs show
  5 RPM for free-trial models — same as Gemini right now, despite some 2026 blog posts
  claiming 30 RPM; also requires a payment method for trial credits), OpenRouter (only
  ~50 requests/day free), Mistral (generous volume but requires opting into data
  training on the free tier), Cohere (10–20 RPM, ~100/day). Revisit Cerebras later if
  its real numbers improve — its raw inference speed is the fastest of anything checked.

## Env vars (set via `vercel env add <NAME> <environment>`, not files committed to git)

`GEMINI_API_KEY`, `GROQ_API_KEY`, `AI_PROVIDER` (`gemini` | `groq`), `GEMINI_MODEL`,
`GROQ_MODEL` — needed in **Production, Preview, and Development** separately (Vercel
scopes them per-environment; it's easy to set one and forget the other two — this
happened at least once, causing a `FUNCTION_INVOCATION_FAILED` in production after
looking correct in `vercel env ls` for Development).

Also (Milestone 3, all three environments too): `VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY` — see `docs/SUPABASE_SETUP.md`. Both are already set in Vercel
and in `app/.env.local` — this was the exact same "forgot an environment" class of bug
the first time (production showed a blank white page because these were only ever set
locally, never in Vercel) — already fixed, just noting the failure mode again since it
already bit this project twice across two different env-var sets.

## Local dev

**`npm run dev` (bare Vite, `app-vite` in `.claude/launch.json`) is now the recommended
way to run full-stack local dev** — `/api/chat` works and streams real responses via the
dev-only middleware in `vite.config.js` (see "Local API — FIXED" section below for the
full writeup). This superseded the old advice to use `vercel dev` for that.

`vercel dev --cwd app` (registered as the `app` preview config, port 3000) still exists
and was the original intended way to match production's `api/` function exactly, but has
an unresolved internal stall in this environment — see "Local API — FIXED" below for
what was tried and how far it got. Not deleted/unregistered in case it starts working in
a future `vercel-cli` version; just not the recommended path right now.

## Deployment

Connected to GitHub (`divyanshmudgil/branchscaipe`, `main` branch) — pushing to `main`
auto-deploys to `https://branchscaipe.vercel.app`. No `vercel.json` exists or is needed
(the `api/` folder convention is zero-config as long as the files live under the
project's Root Directory, which is `app`).

## Testing approach used so far

For both Gemini and (pending, at the point this file was written) Groq: send real
prompts across deliberately varied domains — Krishna consciousness, finance,
mathematics, science, politics — plus a real branch-isolation check (branch off a
message mid-conversation, confirm the branch doesn't see sibling context) and an error-
path check (deliberately invalid key / hitting rate limits) to confirm the toast-based
error UI never crashes. Chase down anything that looks like a formatting regression in
`Markdown.jsx` (different model families format markdown differently — e.g. Gemini's
LaTeX-style math is why `remark-math`/`rehype-katex` exist at all).

## Things intentionally *not* done (don't assume they're bugs)

- No markdown rendering for **user** messages (only assistant) — matches the design's
  original intent; users don't typically type markdown.
- No per-branch loading state — `status` (`idle`/`thinking`/`streaming`) is one global
  piece of state in `App.jsx`, not scoped per branch. If a reply is still streaming in
  branch A and you navigate to branch B, the status indicator would (incorrectly) show
  in B too. This is a pre-existing limitation carried over from the original fake-reply
  design, not a new regression — hasn't been fixed because it wasn't in scope of any
  milestone so far.
- The `topic` field on messages (meant to drive a topic chip in the UI) is defined in
  the data model but nothing ever populates it — dead-but-harmless, inherited from the
  original design.
