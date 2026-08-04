// useHydrateFromSupabase — fetches a signed-in user's chats once on
// mount/userId-change. Passing `null` (guest, or auth not yet resolved)
// short-circuits before any Supabase call — this is the hard guarantee
// that guests never touch Supabase, enforced at the call site in App.jsx
// rather than only inside this hook.
import { useEffect, useState } from "react";
import { fetchAllForUser } from "./supabaseSyncService";
import { remoteRowsToLocalBranches } from "./mappers";
import type { LocalBranch } from "./types";

export type HydrationStatus = "idle" | "loading" | "ready" | "error";

export interface HydrationResult {
  status: HydrationStatus;
  branches: Record<string, LocalBranch> | null;
  error: string | null;
  knownConversationIds: Set<string>;
  knownBranchIds: Set<string>;
}

const IDLE: HydrationResult = {
  status: "idle",
  branches: null,
  error: null,
  knownConversationIds: new Set(),
  knownBranchIds: new Set(),
};

export function useHydrateFromSupabase(userId: string | null): HydrationResult {
  const [result, setResult] = useState<HydrationResult>(IDLE);

  useEffect(() => {
    if (!userId) {
      setResult(IDLE);
      return;
    }

    let cancelled = false;
    setResult({ ...IDLE, status: "loading" });

    fetchAllForUser(userId).then(
      (data) => {
        if (cancelled) return;
        setResult({
          status: "ready",
          branches: remoteRowsToLocalBranches(data),
          error: null,
          knownConversationIds: new Set(data.conversations.map((c) => c.id)),
          knownBranchIds: new Set(data.branches.map((b) => b.id)),
        });
      },
      (err) => {
        if (cancelled) return;
        setResult({
          status: "error",
          branches: {},
          error: err?.message ?? "Couldn't load your chats.",
          knownConversationIds: new Set(),
          knownBranchIds: new Set(),
        });
      },
    );

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return result;
}
