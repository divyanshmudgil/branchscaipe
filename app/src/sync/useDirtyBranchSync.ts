// useDirtyBranchSync — per-branch debounced push to Supabase. Streaming
// writes `branches` state on every token (many times/sec), so this
// deliberately does NOT watch the whole state tree; callers explicitly
// call `markDirty(branchId)` at real mutation points (see App.jsx), and
// each branch id gets its own independent debounce timer.
import { useCallback, useEffect, useRef } from "react";
import { lineage } from "../logic.js";
import { localBranchToRow, localConversationRow, localMessagesToRows } from "./mappers";
import { upsertBranch, upsertConversation, upsertMessagesForBranch } from "./supabaseSyncService";
import type { LocalBranch } from "./types";

const DEBOUNCE_MS = 900;

export function useDirtyBranchSync(opts: {
  enabled: boolean;
  userId: string | null;
  branchesRef: React.MutableRefObject<Record<string, LocalBranch>>;
  knownConversationIds?: Set<string>;
  knownBranchIds?: Set<string>;
  onError: (message: string) => void;
}) {
  const { enabled, userId, branchesRef, onError } = opts;
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const knownConv = useRef(new Set<string>());
  const knownBr = useRef(new Set<string>());

  // Reseed from hydration's known-id sets whenever they change (e.g. once
  // the initial fetch resolves after this hook is already mounted).
  useEffect(() => {
    if (opts.knownConversationIds) knownConv.current = new Set(opts.knownConversationIds);
    if (opts.knownBranchIds) knownBr.current = new Set(opts.knownBranchIds);
  }, [opts.knownConversationIds, opts.knownBranchIds]);

  const flush = useCallback(
    async (id: string) => {
      timers.current.delete(id);
      if (!userId) return;
      const branches = branchesRef.current;
      const branch = branches[id];
      if (!branch || branch._temporary) return;

      try {
        const chain = lineage(branches, id); // root ... target, inclusive
        const rootId = chain[0]?.id ?? id;

        if (!knownConv.current.has(rootId)) {
          const root = branches[rootId];
          if (root) {
            await upsertConversation(localConversationRow(root, userId));
            knownConv.current.add(rootId);
          }
        }

        // Ancestors only (exclude the target itself, upserted below
        // unconditionally since it's always the thing that's actually dirty).
        for (const ancestor of chain.slice(0, -1)) {
          if (knownBr.current.has(ancestor.id)) continue;
          await upsertBranch(localBranchToRow(ancestor, userId, rootId));
          knownBr.current.add(ancestor.id);
        }

        await upsertBranch(localBranchToRow(branch, userId, rootId));
        knownBr.current.add(branch.id);
        await upsertMessagesForBranch(localMessagesToRows(branch, userId));
      } catch (err: unknown) {
        onError(err instanceof Error ? err.message : "Couldn't save your changes to your account.");
      }
    },
    [userId, branchesRef, onError],
  );

  const markDirty = useCallback(
    (id: string) => {
      if (!enabled || !userId) return;
      if (branchesRef.current[id]?._temporary) return;
      const existing = timers.current.get(id);
      if (existing) clearTimeout(existing);
      timers.current.set(
        id,
        setTimeout(() => {
          void flush(id);
        }, DEBOUNCE_MS),
      );
    },
    [enabled, userId, branchesRef, flush],
  );

  // Used by delete: drop any pending timer for ids about to be deleted (so
  // a stale flush doesn't resurrect a row moments after its delete call),
  // and forget they were "known" so a re-created branch with the same id
  // (not expected in practice — ids are real UUIDs — but cheap to be safe)
  // would sync cleanly rather than skip itself as already-known.
  const cancelPending = useCallback((ids: string[]) => {
    for (const id of ids) {
      const t = timers.current.get(id);
      if (t) {
        clearTimeout(t);
        timers.current.delete(id);
      }
      knownConv.current.delete(id);
      knownBr.current.delete(id);
    }
  }, []);

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach(clearTimeout);
      map.clear();
    };
  }, []);

  return { markDirty, cancelPending };
}
