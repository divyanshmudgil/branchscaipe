// Hand-written remote row shapes matching app/supabase/migrations/*.sql —
// this repo has no Supabase codegen, auth/types.ts is the precedent for
// hand-maintained types over generated ones.

export interface RemoteConversationRow {
  id: string;
  user_id: string;
  name: string;
}

export interface RemoteBranchRow {
  id: string;
  conversation_id: string;
  user_id: string;
  parent_branch_id: string | null;
  branch_point_message_id: string | null;
  name: string;
  auto_named: boolean;
  branch_seed: string | null;
  quote: string | null;
  is_temporary: boolean;
  // DB-defaulted (`default now()`), never sent on writes — read-only,
  // present when fetched, used to restore local sort order on hydration.
  created_at?: string;
}

export type RemoteMessageRole = "user" | "assistant" | "merge";

export interface RemoteMessageRow {
  id: string;
  branch_id: string;
  user_id: string;
  role: RemoteMessageRole;
  text: string | null;
  topic: string | null;
  starred: boolean;
  starred_at: string | null; // ISO
  // For role="user"/"assistant": which branch this message was merged in
  // from (mirrors local `fromMerge`). For role="merge" dividers: which
  // branch the merge pulled from (mirrors local `sourceId`) — both are
  // the same local concept (the merge's source branch id), one column.
  from_merge_branch_id: string | null;
  created_at: string; // ISO — client-derived, see mappers.ts
  merge_source_name: string | null; // divider-only: source branch's name snapshot
  merge_scope: "response" | "conversation" | null; // divider-only
}

export interface FetchAllResult {
  conversations: RemoteConversationRow[];
  branches: RemoteBranchRow[];
  messages: RemoteMessageRow[];
}

// ── Local model (mirrors the shape documented in app/src/logic.js) ────────

export interface LocalMessage {
  id: string;
  role: "user" | "assistant" | "merge";
  text?: string;
  topic?: string;
  starred?: boolean;
  starredAt?: number;
  fromMerge?: string;
  // merge-divider only:
  source?: string;
  sourceId?: string;
  scope?: "response" | "conversation";
  ts?: number;
}

export interface LocalBranch {
  id: string;
  name: string;
  autoNamed: boolean;
  parentId: string | null;
  branchPointId: string | null;
  branchSeed?: string | null;
  quote?: string | null;
  createdAt: number;
  messages: LocalMessage[];
  _temporary?: boolean;
}
