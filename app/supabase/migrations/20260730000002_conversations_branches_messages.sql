-- Milestone 3: schema for future chat persistence (Milestone 4 wires up the
-- actual sync logic — this migration only prepares the tables).
--
-- Shape mirrors the client-side model in app/src/logic.js:
--   conversation = a chat tree (what the sidebar lists as one root chat)
--   branch       = one node in that tree; the root chat is itself a branch
--                   with parent_branch_id = null
--   message      = a single turn (user / assistant / merge-divider) inside
--                   a branch
--
-- No writes happen from the app yet — guests never touch these tables at
-- all (guest chats stay client-side, see CLAUDE.md / auth/services).

create table if not exists public.conversations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null default 'New chat',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.branches (
  id                        uuid primary key default gen_random_uuid(),
  conversation_id           uuid not null references public.conversations (id) on delete cascade,
  user_id                   uuid not null references auth.users (id) on delete cascade,
  parent_branch_id          uuid references public.branches (id) on delete cascade,
  -- Soft reference to messages.id (the message this branch forked from).
  -- Not a foreign key: messages.branch_id -> branches.id would make it a
  -- circular dependency, and the client already treats this as an opaque id
  -- (see branchPointId in logic.js) rather than an enforced relation.
  branch_point_message_id  uuid,
  name                      text not null default 'New chat',
  auto_named                boolean not null default false,
  branch_seed               text,
  quote                     text,
  is_temporary               boolean not null default false,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create table if not exists public.messages (
  id                    uuid primary key default gen_random_uuid(),
  branch_id             uuid not null references public.branches (id) on delete cascade,
  user_id               uuid not null references auth.users (id) on delete cascade,
  role                  text not null check (role in ('user', 'assistant', 'merge')),
  text                  text,
  topic                 text,
  starred               boolean not null default false,
  starred_at            timestamptz,
  -- Set when this row was copied in by a merge (see doMerge() in App.jsx);
  -- points at the branch the content was merged from.
  from_merge_branch_id  uuid references public.branches (id) on delete set null,
  created_at            timestamptz not null default now()
);

create index if not exists conversations_user_id_idx on public.conversations (user_id);
create index if not exists branches_conversation_id_idx on public.branches (conversation_id);
create index if not exists branches_parent_branch_id_idx on public.branches (parent_branch_id);
create index if not exists branches_user_id_idx on public.branches (user_id);
create index if not exists messages_branch_id_idx on public.messages (branch_id);
create index if not exists messages_user_id_idx on public.messages (user_id);

drop trigger if exists set_conversations_updated_at on public.conversations;
create trigger set_conversations_updated_at
  before update on public.conversations
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_branches_updated_at on public.branches;
create trigger set_branches_updated_at
  before update on public.branches
  for each row
  execute function public.set_updated_at();
