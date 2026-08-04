# Supabase setup — Google Auth + Guest Mode (Milestone 3)

This is the setup guide for Branchscaipe's authentication layer: Supabase
Auth with Google as the only sign-in provider, plus Guest Mode (no account,
nothing persisted). It also covers running the database migrations that
prepare (but don't yet use) the schema for chat persistence.

Related reading: [`CLAUDE.md`](../CLAUDE.md) for the overall architecture,
`app/src/auth/` for the code this configures.

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. **New project** → pick an organization, name it (e.g. `branchscaipe`),
   set a database password (save it somewhere — you won't need it for this
   milestone, but you will for direct DB access later), pick a region close
   to your users, and create the project.
3. Wait for provisioning to finish, then open **Project Settings → API**.
   You'll need two values from this page shortly:
   - **Project URL** (`https://<ref>.supabase.co`)
   - **`anon` `public` API key**

Do not use the `service_role` key anywhere in this milestone — the app
never needs it. It must never be shipped to the client.

---

## 2. Enable Google Authentication

Google OAuth needs credentials from Google Cloud Console before Supabase
can use it.

### 2a. Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) →
   create a project (or reuse one).
2. **APIs & Services → OAuth consent screen**: configure it (External user
   type is fine for a personal/small app), fill in the required app
   info, and add your own Google account as a test user if the app is in
   "Testing" publishing status.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**
   - Name: anything, e.g. `Branchscaipe`
   - **Authorized redirect URIs**: add exactly one URL here, Supabase's own
     callback:
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
     (found on the Supabase **Authentication → Providers → Google** page —
     copy it from there rather than retyping it.) You do **not** list your
     app's own localhost/Vercel URLs in Google Cloud Console — only
     Supabase's callback URL goes here. Your app's URLs go in Supabase's
     redirect allow-list instead (step 3 below).
4. Save. Copy the generated **Client ID** and **Client Secret**.

### 2b. Supabase dashboard

1. **Authentication → Providers → Google** → toggle it on.
2. Paste in the **Client ID** and **Client Secret** from step 2a.
3. Save.

---

## 3. Configure redirect URLs (Supabase side)

Still in **Authentication → URL Configuration**:

- **Site URL**: your production URL, e.g. `https://branchscaipe.vercel.app`
- **Redirect URLs** (allow-list — add all of these, one per line):
  ```
  http://localhost:3000
  https://branchscaipe.vercel.app
  https://*.vercel.app
  ```
  The wildcard covers Vercel's per-PR/per-branch Preview deployment URLs
  (`https://branchscaipe-git-<branch>-<team>.vercel.app`, etc.). If your
  Supabase project doesn't support wildcard entries, add each preview URL
  you actually use individually, or promote a stable preview alias and use
  that instead.

The app requests `redirectTo: window.location.origin` when starting the
Google sign-in flow (see `app/src/auth/services/authService.ts`), so it
always returns to wherever it was launched from — as long as that origin is
in this allow-list.

---

## 4. Required environment variables

| Variable | Where it's used | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | `app/src/auth/supabaseClient.ts` | Project URL from step 1 |
| `VITE_SUPABASE_ANON_KEY` | `app/src/auth/supabaseClient.ts` | `anon public` key from step 1 |

Both are `VITE_`-prefixed so Vite exposes them to client-side code — same
convention the app already uses for its Vite build. Never commit these to
git; never use the `service_role` key here.

These are in addition to the existing AI-provider env vars documented in
[`CLAUDE.md`](../CLAUDE.md) (`GEMINI_API_KEY`, `GROQ_API_KEY`, `AI_PROVIDER`,
etc.) — this milestone doesn't touch those.

---

## 5. Local development

1. Create `app/.env.local` (already gitignored) with:
   ```
   VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```
   Or, if using the Vercel CLI's env sync (see `CLAUDE.md` → Local dev),
   add the same two vars via `vercel env add` for the Development
   environment and re-run `vercel env pull .env.local --environment=development`.
2. `npm run dev` (from `app/`) is enough to exercise the auth flow — it's
   pure client-side Supabase Auth, no `/api` function involved. Use
   `vercel dev --cwd app` if you need the AI chat endpoint working too.
3. Open `http://localhost:5173` (plain `npm run dev`) or `:3000`
   (`vercel dev`) and confirm `http://localhost:...` is in Supabase's
   redirect allow-list (step 3) — otherwise Google sign-in will bounce back
   with an error instead of completing.

---

## 6. Deployment on Vercel

Set the same two variables in the Vercel project (**Settings → Environment
Variables**), scoped to **all three environments** — Development, Preview,
and Production — the same way the existing `GEMINI_API_KEY` / `GROQ_API_KEY`
are set (see the "easy to set one and forget the other two" warning in
`CLAUDE.md`):

```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_URL preview
vercel env add VITE_SUPABASE_URL development

vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_SUPABASE_ANON_KEY preview
vercel env add VITE_SUPABASE_ANON_KEY development
```

Pushing to `main` auto-deploys as usual — no other deployment changes are
needed (no `vercel.json`, no new build step).

---

## 7. Run the database migrations

The SQL in `app/supabase/migrations/` prepares the schema for future chat
persistence (Milestone 4) and creates the `profiles` table + auto-creation
trigger used starting this milestone. Nothing in the app writes to
`conversations` / `branches` / `messages` yet — they're schema-only for now.

Apply them via the Supabase dashboard's **SQL Editor** (simplest — paste
and run each file in order), or with the Supabase CLI if you have it linked
to this project:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

Run them in this order (the filenames are already timestamp-sorted):

1. `20260730000001_profiles.sql` — `profiles` table + the trigger that
   creates a row automatically on first Google sign-in
2. `20260730000002_conversations_branches_messages.sql` — future
   chat-persistence schema
3. `20260730000003_row_level_security.sql` — enables RLS on all four
   tables and adds "own rows only" policies

After running them, sign in with Google once and confirm a row appeared in
**Table Editor → profiles** with your email, name, and avatar URL filled
in.

---

## Manual testing checklist

- [ ] Visiting the app with no session shows the Landing screen (logo,
      tagline, Continue with Google, Continue as Guest)
- [ ] **Continue as Guest** enters the chat UI immediately, no Supabase
      calls made (check Network tab), sidebar shows "Guest" with a generic
      icon (no avatar, no email)
- [ ] Guest chats persist across a reload of the same tab, but are gone
      after fully closing and reopening the browser (sessionStorage)
- [ ] **Continue with Google** redirects to Google, and returns signed in
      without a page flash back to the landing screen
- [ ] A `profiles` row exists for the signed-in user with the right email/
      name/avatar
- [ ] Sidebar shows avatar, name, and email for the signed-in user; profile
      dropdown's **Sign out** returns to the Landing screen
- [ ] Reloading the app while signed in skips the Landing screen entirely
      (session restoration)
- [ ] Temporary Chat still works identically for both guests and
      signed-in users, and is never written to `localStorage`/
      `sessionStorage` or Supabase
- [ ] Existing chat, branching, merge, retry, and streaming behavior is
      unchanged from before this milestone
