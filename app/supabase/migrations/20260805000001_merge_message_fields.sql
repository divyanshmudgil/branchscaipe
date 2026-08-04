-- Milestone 4: merge-divider messages (role = 'merge') carry a snapshot of
-- the source branch's name and the merge scope at the moment of merging —
-- see doMerge() in App.jsx, which builds { source: src.name, scope }.
-- Neither existing column fits: `text` is meant for real message content,
-- `topic` is a dead/unused field inherited from the original design. This
-- migration is purely additive (nullable, no backfill) and safe against
-- the already-live, currently-empty `messages` table.

alter table public.messages
  add column if not exists merge_source_name text,
  add column if not exists merge_scope text check (merge_scope in ('response', 'conversation'));
