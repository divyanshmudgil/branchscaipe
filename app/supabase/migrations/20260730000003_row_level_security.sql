-- Milestone 3: Row Level Security for every table above. Blanket rule for
-- the whole app: a user may only ever read or write their own rows.
-- No cross-user access exists anywhere, including for the future
-- conversations/branches/messages tables — merges only ever copy content
-- within a single user's own branches (see doMerge() in App.jsx), so no
-- policy needs to reason about a second user's rows.

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.branches enable row level security;
alter table public.messages enable row level security;

-- ── profiles ─────────────────────────────────────────────────────────────
-- Row creation is handled by the handle_new_user() trigger (security
-- definer, bypasses RLS). The insert policy below exists only as a
-- defensive fallback if a client ever needs to upsert its own profile row
-- directly.

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── conversations ────────────────────────────────────────────────────────

drop policy if exists "conversations_select_own" on public.conversations;
create policy "conversations_select_own"
  on public.conversations for select
  using (auth.uid() = user_id);

drop policy if exists "conversations_insert_own" on public.conversations;
create policy "conversations_insert_own"
  on public.conversations for insert
  with check (auth.uid() = user_id);

drop policy if exists "conversations_update_own" on public.conversations;
create policy "conversations_update_own"
  on public.conversations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "conversations_delete_own" on public.conversations;
create policy "conversations_delete_own"
  on public.conversations for delete
  using (auth.uid() = user_id);

-- ── branches ─────────────────────────────────────────────────────────────

drop policy if exists "branches_select_own" on public.branches;
create policy "branches_select_own"
  on public.branches for select
  using (auth.uid() = user_id);

drop policy if exists "branches_insert_own" on public.branches;
create policy "branches_insert_own"
  on public.branches for insert
  with check (auth.uid() = user_id);

drop policy if exists "branches_update_own" on public.branches;
create policy "branches_update_own"
  on public.branches for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "branches_delete_own" on public.branches;
create policy "branches_delete_own"
  on public.branches for delete
  using (auth.uid() = user_id);

-- ── messages ─────────────────────────────────────────────────────────────

drop policy if exists "messages_select_own" on public.messages;
create policy "messages_select_own"
  on public.messages for select
  using (auth.uid() = user_id);

drop policy if exists "messages_insert_own" on public.messages;
create policy "messages_insert_own"
  on public.messages for insert
  with check (auth.uid() = user_id);

drop policy if exists "messages_update_own" on public.messages;
create policy "messages_update_own"
  on public.messages for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "messages_delete_own" on public.messages;
create policy "messages_delete_own"
  on public.messages for delete
  using (auth.uid() = user_id);
