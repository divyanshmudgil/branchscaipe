// supabaseSyncService — the ONLY file in this app that calls
// `supabase.from(...)` for chat data (auth itself lives in
// app/src/auth/services/authService.ts). Every write here must carry
// `user_id` explicitly: unlike `profiles.id` (populated by a DB trigger),
// none of conversations/branches/messages have a server-side default for
// it, and RLS fails closed — a row missing `user_id` is rejected outright
// by the `with check (auth.uid() = user_id)` policies, not silently
// attributed to the wrong user. Callers must always pass the real
// `authProfile.id`.
import { supabase } from "../auth/supabaseClient";
import type { FetchAllResult, RemoteBranchRow, RemoteConversationRow, RemoteMessageRow } from "./types";

export async function fetchAllForUser(userId: string): Promise<FetchAllResult> {
  const [conversations, branches, messages] = await Promise.all([
    supabase.from("conversations").select("*").eq("user_id", userId),
    supabase.from("branches").select("*").eq("user_id", userId),
    supabase.from("messages").select("*").eq("user_id", userId),
  ]);
  if (conversations.error) throw conversations.error;
  if (branches.error) throw branches.error;
  if (messages.error) throw messages.error;
  return {
    conversations: (conversations.data ?? []) as RemoteConversationRow[],
    branches: (branches.data ?? []) as RemoteBranchRow[],
    messages: (messages.data ?? []) as RemoteMessageRow[],
  };
}

export async function upsertConversation(row: RemoteConversationRow): Promise<void> {
  const { error } = await supabase.from("conversations").upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function upsertBranch(row: RemoteBranchRow): Promise<void> {
  const { error } = await supabase.from("branches").upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function upsertMessagesForBranch(rows: RemoteMessageRow[]): Promise<void> {
  if (!rows.length) return;
  const { error } = await supabase.from("messages").upsert(rows, { onConflict: "id" });
  if (error) throw error;
}

// Deleting the conversations row cascades to its branches and their
// messages via the `on delete cascade` FKs already in the schema — one
// call is enough. No-op (0 rows affected, no error) if never synced.
export async function deleteConversationCascade(id: string): Promise<void> {
  const { error } = await supabase.from("conversations").delete().eq("id", id);
  if (error) throw error;
}

// Deleting a branch row cascades to descendant branches (parent_branch_id
// FK) and all their messages (branch_id FK) — one call. Same no-op safety
// as above if never synced.
export async function deleteBranchCascade(id: string): Promise<void> {
  const { error } = await supabase.from("branches").delete().eq("id", id);
  if (error) throw error;
}
