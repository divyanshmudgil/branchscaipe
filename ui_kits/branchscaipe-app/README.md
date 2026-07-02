# Branchscaipe App — UI Kit

An interactive, high-fidelity recreation of the Branchscaipe AI chat assistant, composed from the design system's primitives and AI components.

## Run
Open `index.html`. It loads `styles.css` + the compiled `_ds_bundle.js`, then the app scripts.

## What's covered
- **Icon rail** (`Rail.jsx`) — 72px glass sidebar: panel toggle, new chat, search, knowledge base, settings.
- **Top bar** (`TopBar.jsx`) — centered title in the main thread; in a branch it swaps to **Back**, the **branch breadcrumb**, and **Merge chat to parent**. Theme toggle + share + more + avatar on the right.
- **Chat thread** (`ChatThread.jsx`) — user bubbles, assistant messages with the signature hover action bar (Copy · Branch · Retry · Merge · More), topic chips, branch/merge context dividers, and the live AI status indicator.
- **Composer** — glass input with Tools + gradient send; shows a "Branching from …" chip inside a branch.
- **Empty / new-chat state** (`Screens.jsx`) — aurora hero, wordmark, suggested prompts.
- **Branch navigator drawer** — the live branch hierarchy; click to switch branches.
- **Merge dialog** — confirm + "Choose parent" picker.
- **Search palette** & **Settings** dialogs (theme, density).

## Interactions to try
1. Type a prompt (or click a suggestion) and send — watch the thinking indicator, then a reply.
2. Hover an assistant message → **Branch**. You jump into a new branch (parent stays intact); the composer shows "Branching from …".
3. **Merge chat to parent** (top bar) → choose a parent → confirm. A "Merge from: …" divider appears in the parent and a toast confirms.
4. Toggle **dark mode** (top bar sun/moon) — a first-class theme, not an inversion.
5. Open the **branch navigator** (rail panel icon) to jump across the hierarchy.

## Notes
- Replies are canned (`data.js` / `BSC_REPLIES`) — this is a visual + interaction recreation, not a real model.
- Icons are Lucide via CDN (`Icon.jsx` wraps `lucide.createIcons`).
