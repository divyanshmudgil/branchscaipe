// mappers — pure local<->remote conversion, no Supabase calls. Every
// function here is deterministic and side-effect-free so it's trivial to
// reason about independent of network/timing concerns (those live in
// supabaseSyncService.ts and the sync hooks instead).
import type {
  FetchAllResult,
  LocalBranch,
  LocalMessage,
  RemoteBranchRow,
  RemoteConversationRow,
  RemoteMessageRow,
} from "./types";

export function localConversationRow(branch: LocalBranch, userId: string): RemoteConversationRow {
  return { id: branch.id, user_id: userId, name: branch.name };
}

export function localBranchToRow(branch: LocalBranch, userId: string, conversationId: string): RemoteBranchRow {
  return {
    id: branch.id,
    conversation_id: conversationId,
    user_id: userId,
    parent_branch_id: branch.parentId,
    branch_point_message_id: branch.branchPointId,
    name: branch.name,
    auto_named: branch.autoNamed,
    branch_seed: branch.branchSeed ?? null,
    quote: branch.quote ?? null,
    // Temporary branches never reach this mapper — markDirty() guards them
    // out before any sync call is made — so this is always false here.
    is_temporary: false,
  };
}

// Local messages have no per-message timestamp (only merge dividers carry
// a `ts`). `created_at = branch.createdAt + index` gives every row a
// stable, deterministic, monotonically-increasing value so `order by
// created_at` reconstructs the original append order after a reload.
// Trade-off: a merge divider's displayed relative time ("5m ago") will be
// exact during the live session but drift to an approximation after a
// reload+refetch round-trip, since `ts` gets rebuilt from this synthetic
// value rather than the real merge moment. Cosmetic only — not a bug.
export function localMessagesToRows(branch: LocalBranch, userId: string): RemoteMessageRow[] {
  return branch.messages.map((m, i) => ({
    id: m.id,
    branch_id: branch.id,
    user_id: userId,
    role: m.role,
    text: m.role === "merge" ? null : m.text ?? null,
    topic: m.role === "merge" ? null : m.topic ?? null,
    starred: !!m.starred,
    starred_at: m.starredAt ? new Date(m.starredAt).toISOString() : null,
    from_merge_branch_id: m.role === "merge" ? m.sourceId ?? null : m.fromMerge ?? null,
    created_at: new Date(branch.createdAt + i).toISOString(),
    merge_source_name: m.role === "merge" ? m.source ?? null : null,
    merge_scope: m.role === "merge" ? m.scope ?? null : null,
  }));
}

function remoteMessageRowToLocal(row: RemoteMessageRow): LocalMessage {
  if (row.role === "merge") {
    return {
      id: row.id,
      role: "merge",
      source: row.merge_source_name ?? undefined,
      sourceId: row.from_merge_branch_id ?? undefined,
      scope: row.merge_scope ?? undefined,
      ts: Date.parse(row.created_at),
    };
  }
  return {
    id: row.id,
    role: row.role,
    text: row.text ?? "",
    topic: row.topic ?? undefined,
    starred: row.starred,
    starredAt: row.starred_at ? Date.parse(row.starred_at) : undefined,
    fromMerge: row.from_merge_branch_id ?? undefined,
  };
}

export function remoteRowsToLocalBranches(result: FetchAllResult): Record<string, LocalBranch> {
  const messagesByBranch = new Map<string, RemoteMessageRow[]>();
  for (const row of result.messages) {
    const list = messagesByBranch.get(row.branch_id) ?? [];
    list.push(row);
    messagesByBranch.set(row.branch_id, list);
  }
  for (const list of messagesByBranch.values()) {
    list.sort((a, b) => (a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : a.id < b.id ? -1 : 1));
  }

  const out: Record<string, LocalBranch> = {};
  for (const row of result.branches) {
    out[row.id] = {
      id: row.id,
      name: row.name,
      autoNamed: row.auto_named,
      parentId: row.parent_branch_id,
      branchPointId: row.branch_point_message_id,
      branchSeed: row.branch_seed ?? null,
      quote: row.quote ?? null,
      // Sidebar/history ordering depends on this being the real creation
      // moment, not the fetch moment — read from the DB-defaulted column.
      createdAt: row.created_at ? Date.parse(row.created_at) : Date.now(),
      messages: (messagesByBranch.get(row.id) ?? []).map(remoteMessageRowToLocal),
    };
  }
  return out;
}
