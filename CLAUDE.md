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
    src/                      ← React SPA (Vite). UI is intentionally frozen —
                               it was ported pixel-for-pixel from the design project
                               and should not be redesigned without being asked.
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

## Local dev

`vercel dev --cwd app` (registered in `.claude/launch.json` as the `app` preview
config, port 3000) — this runs the Vite frontend *and* the `api/` function together on
one port, matching production. Needs `vercel link` done once (already linked to the
`branchscaipe` project) and `app/.env.local` populated via
`vercel env pull .env.local --environment=development`. Plain `npm run dev` (bare Vite,
no functions) still works for pure UI iteration but `/api/chat` will 404 under it —
there is intentionally no dev-proxy fallback anymore (an earlier version proxied to the
now-deleted Express server; that's gone).

**Known open issue**: `vercel dev` was observed hanging at "Creating initial build" /
`sh: yarn: command not found` in this environment and never came up on port 3000 within
a reasonable wait. Not yet root-caused — deploying via `git push` (real Vercel build
infra) and testing against the live URL was used as the workaround. Worth investigating
if local full-stack dev is needed again.

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
