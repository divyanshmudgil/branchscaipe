// App — Branchscaipe. Hardened interaction model v4.
// Key changes: empty initial state, null-safe activeId, temporary chat,
// auto-create chat on first send, AppComposer, profile actions, visual cleanup.
import React from "react";
import { motion } from "framer-motion";
import { Button, IconButton } from "./design-system/components/core/index.js";
import { Dialog, Toast, Tooltip } from "./design-system/components/feedback/index.js";
import { Icon as I } from "./Icon.jsx";
import { uid, lineage, contextMessages, autoName } from "./logic.js";
import { streamChat } from "./api.js";
import { useViewport } from "./useViewport.js";
import { Sidebar } from "./Sidebar.jsx";
import { Panel } from "./Panel.jsx";
import { TopBar } from "./TopBar.jsx";
import { ChatThread } from "./ChatThread.jsx";
import {
  EmptyState, AppComposer, CommandPalette, SettingsBody, ShortcutsBody,
  MergeBody, ContextMenu, SelectionMenu,
} from "./Screens.jsx";
import { useAuth } from "./auth/hooks/useAuth.ts";
import { Landing } from "./Landing.tsx";
import { useHydrateFromSupabase } from "./sync/useHydrateFromSupabase.ts";
import { useDirtyBranchSync } from "./sync/useDirtyBranchSync.ts";
import * as guestImportService from "./sync/guestImportService.ts";
import { deleteConversationCascade, deleteBranchCascade } from "./sync/supabaseSyncService.ts";
import { withViewTransition } from "./viewTransition.js";

const LS_KEY = "bsc.app.v4"; // bumped to clear stale hardcoded data

// Shared by both loading gates below so the visual is defined once.
function BlankLoading() {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", background: "var(--bg)" }} />;
}

// ── App — auth gate ──
// Loads once auth status resolves: an authenticated session or a chosen
// Guest mode both mount AppShell (guest chats live in sessionStorage
// instead of localStorage — see AppShell below — so they don't outlive the
// tab). Anything else shows the Landing screen. AppShell is remounted
// (fresh `key`) whenever the underlying identity changes, so a sign-out
// never carries stale in-memory state into the next session.
//
// For authenticated users, chat data is fetched from Supabase here —
// before AppShell mounts, not inside it — so there's exactly one clean
// paint instead of a flash of stale localStorage content. Guests never
// reach useHydrateFromSupabase with a real id, so they never touch
// Supabase at all (enforced at this call site, not just inside the hook).
export function App() {
  const { status, isGuest, user, profile, signOut } = useAuth();
  const [gateToast, setGateToast] = React.useState(null);
  const hydration = useHydrateFromSupabase(status === "authenticated" ? (user?.id ?? null) : null);

  React.useEffect(() => {
    if (gateToast) { const t = setTimeout(() => setGateToast(null), 3400); return () => clearTimeout(t); }
  }, [gateToast]);

  if (status === "loading") return <BlankLoading />;

  if (status === "unauthenticated") {
    return (
      <>
        <Landing onToast={setGateToast} />
        {gateToast && (
          <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: "var(--z-toast)" }}>
            <Toast tone={gateToast.tone} icon={<I name={gateToast.icon} size={18} />} title={gateToast.title} description={gateToast.desc} onClose={() => setGateToast(null)} />
          </div>
        )}
      </>
    );
  }

  if (status === "authenticated" && hydration.status !== "ready" && hydration.status !== "error") {
    return <BlankLoading />;
  }

  return (
    <AppShell
      key={profile?.id || "guest"}
      isGuest={isGuest} authProfile={profile} onSignOut={signOut}
      userId={status === "authenticated" ? (user?.id ?? null) : null}
      initialBranches={status === "authenticated" && hydration.status === "ready" ? hydration.branches : null}
      hydrationError={status === "authenticated" ? hydration.error : null}
      knownConversationIds={hydration.knownConversationIds}
      knownBranchIds={hydration.knownBranchIds}
    />
  );
}

function AppShell({
  isGuest, authProfile, onSignOut, userId,
  initialBranches, hydrationError, knownConversationIds, knownBranchIds,
}) {
  // Guest data is intentionally session-scoped (sessionStorage): it should
  // not survive closing the tab/browser, per the Guest Mode spec. Signed-in
  // users keep the existing localStorage persistence as a local cache —
  // Supabase is the source of truth for reads (via initialBranches below),
  // this local copy is now write-only-on-the-way-out, never read back
  // post-hydration.
  const storage = isGuest ? window.sessionStorage : window.localStorage;

  // ── persistence ──
  const load = () => { try { return JSON.parse(storage.getItem(LS_KEY) || "null"); } catch { return null; } };
  const saved = load();

  const [branches, setBranches] = React.useState(() => initialBranches || (saved && saved.branches) || {});
  const [activeId, setActiveId] = React.useState(() => {
    const pool = initialBranches || (saved && saved.branches);
    if (saved && saved.activeId && pool && pool[saved.activeId]) return saved.activeId;
    return null;
  });
  const [theme, setTheme] = React.useState(() => (saved && saved.theme) || "light");
  // Every theme change goes through here so the radial reveal (app.css)
  // applies no matter which trigger fired it (TopBar, sidebar menu, Settings).
  const setThemeAnimated = React.useCallback((next) => {
    withViewTransition(() => setTheme(next));
  }, []);
  const toggleTheme = React.useCallback(() => {
    setThemeAnimated((t) => (t === "dark" ? "light" : "dark"));
  }, [setThemeAnimated]);
  const [density, setDensity] = React.useState(() => (saved && saved.density) || "comfortable");
  const [confirmMergePref, setConfirmMergePref] = React.useState(() => (saved ? saved.confirmMergePref !== false : true));
  const [sidebarExpanded, setSidebarExpanded] = React.useState(() => (saved ? !!saved.sidebarExpanded : false));
  const [isTemporary, setIsTemporary] = React.useState(false);

  const [input, setInput] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const [activePanel, setActivePanel] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);
  const [merge, setMerge] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [ctxMenu, setCtxMenu] = React.useState(null);
  const [selMenu, setSelMenu] = React.useState(null);
  const [highlightId, setHighlightId] = React.useState(null);
  const [treeEditId, setTreeEditId] = React.useState(null);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const { isMobile, isTouch } = useViewport();

  const scrollRef = React.useRef(null);
  const msgNodes = React.useRef({});
  const abortRef = React.useRef(null);
  const pendingJump = React.useRef(null);
  const branchesRef = React.useRef(branches);
  branchesRef.current = branches;

  const dirtySync = useDirtyBranchSync({
    enabled: !isGuest,
    userId,
    branchesRef,
    knownConversationIds,
    knownBranchIds,
    onError: (message) => setToast({ tone: "error", icon: "alert-triangle", title: "Couldn't save to your account", desc: message }),
  });

  // Surface a failed initial fetch without blocking the app — it stays
  // fully usable locally and self-heals as the user makes new changes.
  React.useEffect(() => {
    if (hydrationError) {
      setToast({ tone: "error", icon: "alert-triangle", title: "Couldn't load your chats", desc: hydrationError });
    }
  }, []); // eslint-disable-line -- hydrationError is fixed for this AppShell's whole lifetime (see key={profile?.id} in App())

  // Guest → account import: offered once per sign-in if this tab still has
  // leftover guest chat data in sessionStorage from before signing in.
  const [guestImportOffer, setGuestImportOffer] = React.useState(null);
  React.useEffect(() => {
    if (!isGuest && guestImportService.hasGuestSnapshot()) {
      setGuestImportOffer(guestImportService.readGuestSnapshot());
    }
  }, []); // eslint-disable-line -- once per AppShell mount, i.e. once per sign-in

  const importGuestData = (offer) => {
    if (!offer) return;
    setBranches((bs) => ({ ...bs, ...offer.branches }));
    Object.keys(offer.branches).forEach((id) => dirtySync.markDirty(id));
    if (offer.activeId && offer.branches[offer.activeId]) setActiveId(offer.activeId);
    guestImportService.clearGuestSnapshot();
    setGuestImportOffer(null);
    setToast({ tone: "success", icon: "check", title: "Guest chats imported", desc: null });
  };

  const registerMsgRef = (id, node) => { if (node) msgNodes.current[id] = node; else delete msgNodes.current[id]; };

  React.useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);

  React.useEffect(() => {
    if (isTemporary) return; // never persist temporary chats
    const saveable = Object.fromEntries(Object.entries(branches).filter(([, b]) => !b._temporary));
    const data = { branches: saveable, activeId, theme, density, confirmMergePref, sidebarExpanded };
    try { storage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
  }, [branches, activeId, theme, density, confirmMergePref, sidebarExpanded, isTemporary]);

  React.useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3400); return () => clearTimeout(t); } }, [toast]);

  // Drop the off-canvas drawer state if the viewport grows past mobile.
  React.useEffect(() => { if (!isMobile) setMobileNavOpen(false); }, [isMobile]);

  React.useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  // ── derived state (all null-safe) ──
  const branch = activeId ? branches[activeId] : null;
  const chain = branch ? lineage(branches, activeId) : [];
  const nodes = chain.map((b) => ({ id: b.id, name: b.name }));
  const inBranch = branch ? !!branch.parentId : false;
  const realMsgs = branch ? branch.messages.filter((m) => m.role === "user" || m.role === "assistant") : [];
  const isEmpty = !branch || (realMsgs.length === 0 && !inBranch);
  const threadBranch = branch
    ? { ...branch, _parentName: branch.parentId ? (branches[branch.parentId] || {}).name : null }
    : null;

  // Root chat of the current active branch (used for sidebar highlighting + Branches panel)
  const rootChatId = branch ? (lineage(branches, activeId)[0]?.id ?? activeId) : null;

  // Root conversations (non-temporary) sorted newest-first — shown in sidebar
  const rootChats = Object.values(branches)
    .filter(b => !b.parentId && !b._temporary)
    .sort((a, b) => b.createdAt - a.createdAt);

  // Branch count within current conversation tree (for sidebar badge)
  const convBranchCount = rootChatId
    ? Object.values(branches).filter(b => {
        if (!b.parentId) return false;
        return (lineage(branches, b.id)[0]?.id) === rootChatId;
      }).length
    : 0;

  // All starred messages across all branches
  const starred = [];
  Object.values(branches).forEach((b) => b.messages.forEach((m) => {
    if (m.starred) starred.push({ branchId: b.id, branchName: b.name, messageId: m.id, text: m.text, topic: m.topic, ts: m.starredAt || b.createdAt });
  }));
  starred.sort((a, b) => b.ts - a.ts);

  // ── helpers ──
  // Funnels toggleStar/renameBranch/onUnstar — marking dirty here once
  // covers all three call sites.
  const setBranch = (id, fn) => { setBranches((bs) => ({ ...bs, [id]: fn(bs[id]) })); dirtySync.markDirty(id); };

  // ── assistant streaming — shared by send() and retry() ──
  // Streams a reply scoped to exactly this branch's own context (contextMessages
  // already excludes sibling branches and anything past the fork point — see
  // logic.js) and writes tokens into `assistantMsgId` as they arrive. If
  // `isNewMessage` is false, the first token replaces that message's existing
  // text instead of appending a new bubble (used by retry).
  const runAssistantReply = (targetId, assistantMsgId, isNewMessage, stopBeforeMsgId) => {
    // Only one generation at a time — starting a new one (e.g. Retry while a
    // send is still streaming) cancels whatever was in flight first.
    abortRef.current?.abort();

    const full = contextMessages(branchesRef.current, targetId);
    // Retry: send everything up to (but not including) the answer being
    // regenerated, so the model isn't biased by the very reply it's redoing.
    const cutIdx = stopBeforeMsgId ? full.findIndex((m) => m.id === stopBeforeMsgId) : -1;
    const scoped = cutIdx === -1 ? full : full.slice(0, cutIdx);
    const history = scoped.map((m) => ({ role: m.role, text: m.text }));

    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("thinking");
    let started = false;

    streamChat({
      messages: history,
      signal: controller.signal,
      onToken: (text) => {
        if (!started) {
          started = true;
          setStatus("streaming");
          setBranches((bs) => {
            const b = bs[targetId];
            if (!b) return bs;
            const messages = isNewMessage
              ? [...b.messages, { id: assistantMsgId, role: "assistant", text }]
              : b.messages.map((m) => (m.id === assistantMsgId ? { ...m, text } : m));
            return { ...bs, [targetId]: { ...b, messages } };
          });
        } else {
          setBranches((bs) => {
            const b = bs[targetId];
            if (!b) return bs;
            return {
              ...bs,
              [targetId]: {
                ...b,
                messages: b.messages.map((m) => (m.id === assistantMsgId ? { ...m, text: m.text + text } : m)),
              },
            };
          });
        }
        // Cheap: just resets a debounce timer, no network call until 900ms
        // of silence — safe to call on every token.
        dirtySync.markDirty(targetId);
      },
      onDone: () => {
        abortRef.current = null;
        setStatus("idle");
        dirtySync.markDirty(targetId);
      },
      onError: (message) => {
        abortRef.current = null;
        setStatus("idle");
        setToast({ tone: "error", icon: "alert-triangle", title: "Couldn't get a response", desc: message });
        // Persist whatever partial reply made it into state before erroring.
        dirtySync.markDirty(targetId);
      },
    });
  };

  const stopGenerating = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  };

  // ── send — auto-creates a chat if activeId is null ──
  const send = (text) => {
    const t = (text != null ? text : input).trim();
    if (!t) return;
    setInput("");

    let targetId = activeId;

    if (!targetId) {
      targetId = uid();
      const newB = { id: targetId, name: "New chat", autoNamed: false, parentId: null, branchPointId: null, branchSeed: null, createdAt: Date.now(), messages: [] };
      branchesRef.current = { ...branchesRef.current, [targetId]: newB };
      setBranches(bs => ({ ...bs, [targetId]: newB }));
      setActiveId(targetId);
    }

    const b0 = branchesRef.current[targetId];
    if (!b0) return;

    const isInBranch = !!b0.parentId;
    const firstUser = b0.messages.filter((m) => m.role === "user").length === 0;
    const userMsg = { id: uid(), role: "user", text: t };

    // Update ref synchronously so runAssistantReply reads correct data
    branchesRef.current = { ...branchesRef.current, [targetId]: { ...b0, messages: [...b0.messages, userMsg] } };

    setBranches((bs) => {
      const b = bs[targetId] || b0;
      const name = (!isInBranch && firstUser && (b.name === "New chat" || !b.name)) ? autoName(t) : b.name;
      return { ...bs, [targetId]: { ...b, name, messages: [...b.messages, userMsg] } };
    });
    dirtySync.markDirty(targetId);

    runAssistantReply(targetId, uid(), true);
  };

  // ── new chat ──
  const newChat = () => {
    cleanupTemporary();
    const id = uid();
    setBranches((bs) => ({ ...bs, [id]: { id, name: "New chat", autoNamed: false, parentId: null, branchPointId: null, branchSeed: null, createdAt: Date.now(), messages: [] } }));
    setActiveId(id); setActivePanel(null); setInput("");
  };

  // ── temporary chat ──
  const cleanupTemporary = () => {
    if (isTemporary && activeId) {
      const tid = activeId;
      setBranches(bs => { const nb = { ...bs }; delete nb[tid]; return nb; });
      setIsTemporary(false);
    }
  };

  const startTemporaryChat = () => {
    if (isTemporary) {
      // Exit: navigate to most recent real chat
      const prev = rootChats[0]?.id || null;
      cleanupTemporary();
      setActiveId(prev);
      return;
    }
    cleanupTemporary();
    const id = uid();
    setBranches(bs => ({
      ...bs,
      [id]: { id, name: "Temporary chat", autoNamed: false, parentId: null, branchPointId: null, branchSeed: null, createdAt: Date.now(), messages: [], _temporary: true },
    }));
    setActiveId(id); setIsTemporary(true); setActivePanel(null); setInput("");
    setToast({ tone: "info", icon: "clock", title: "Temporary chat", desc: "This conversation won't be saved and disappears when you leave." });
  };

  // ── branch creation ──
  const createBranch = (msg, opts) => {
    opts = opts || {};
    const seedText = opts.quote || msg.topic || branch.name;
    const id = uid();
    const name = autoName(seedText);
    const seedLabel = opts.quote
      ? `"${opts.quote.slice(0, 28)}${opts.quote.length > 28 ? "…" : ""}"`
      : (msg.topic || branch.name);
    setBranches((bs) => ({
      ...bs,
      [id]: { id, name, autoNamed: true, parentId: activeId, branchPointId: msg.id, branchSeed: seedLabel, quote: opts.quote || null, createdAt: Date.now(), messages: [] },
    }));
    dirtySync.markDirty(id);
    setActiveId(id); setInput("");
    setToast({ tone: "info", icon: "git-branch", title: `Branch "${name}" created`, desc: "Full context is inherited. The parent thread stays untouched." });
  };

  const createBranchUnder = (parentId) => {
    const p = branches[parentId];
    if (!p) return;
    const lastMsg = p.messages.filter((m) => m.role === "assistant").slice(-1)[0] || p.messages.slice(-1)[0];
    const id = uid();
    const name = autoName(p.name + " detail");
    setBranches((bs) => ({
      ...bs,
      [id]: { id, name, autoNamed: true, parentId, branchPointId: lastMsg ? lastMsg.id : null, branchSeed: p.name, quote: null, createdAt: Date.now(), messages: [] },
    }));
    dirtySync.markDirty(id);
    setActiveId(id);
    setToast({ tone: "info", icon: "git-branch", title: `Branch "${name}" created`, desc: `Branched from "${p.name}".` });
  };

  // ── retry ──
  const retry = (msg) => {
    if (!branch) return;
    const idx = branch.messages.findIndex((m) => m.id === msg.id);
    if (idx < 0) return;
    runAssistantReply(activeId, msg.id, false, msg.id);
  };

  // ── star / copy ──
  const toggleStar = (msg) => {
    setBranch(activeId, (b) => ({
      ...b,
      messages: b.messages.map((m) => m.id === msg.id ? { ...m, starred: !m.starred, starredAt: !m.starred ? Date.now() : m.starredAt } : m),
    }));
  };

  const copyText = (text) => {
    const showSuccess = () => setToast({ tone: "success", icon: "check", title: "Copied to clipboard", desc: null });
    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.cssText = "position:fixed;opacity:0;top:0;left:0;pointer-events:none";
        document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
        showSuccess();
      } catch (_) {}
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showSuccess).catch(fallback);
    } else { fallback(); }
  };

  const renameBranch = (id, name) => setBranch(id, (b) => ({ ...b, name, autoNamed: false }));

  // ── merge ──
  const descendants = (id) => {
    const out = new Set();
    const walk = (pid) => Object.values(branches).forEach((b) => { if (b.parentId === pid) { out.add(b.id); walk(b.id); } });
    walk(id); return out;
  };

  // ── delete chat / branch ──
  const [deleteConfirm, setDeleteConfirm] = React.useState(null); // { id, name, isRoot, count } | null

  const requestDelete = (b) => {
    setDeleteConfirm({ id: b.id, name: b.name, isRoot: !b.parentId, count: descendants(b.id).size });
  };

  const deleteBranch = (id) => {
    const b = branches[id];
    if (!b) return;
    const toRemove = new Set([id, ...descendants(id)]);
    const isRoot = !b.parentId;

    let nextActiveId = activeId;
    if (activeId && toRemove.has(activeId)) {
      nextActiveId = isRoot ? (rootChats.find((r) => !toRemove.has(r.id))?.id ?? null) : b.parentId;
    }

    // Cancel any in-flight debounce for everything about to be removed —
    // otherwise a stale flush could re-upsert (resurrect) a row moments
    // after we tell the server to delete it.
    dirtySync.cancelPending(Array.from(toRemove));

    setBranches((bs) => {
      const nb = { ...bs };
      toRemove.forEach((rid) => delete nb[rid]);
      return nb;
    });
    if (nextActiveId !== activeId) setActiveId(nextActiveId);
    if (activePanel === "branches" && rootChatId && toRemove.has(rootChatId)) setActivePanel(null);

    if (!isGuest && userId) {
      const remoteCall = isRoot ? deleteConversationCascade(id) : deleteBranchCascade(id);
      remoteCall.catch((err) => {
        setToast({ tone: "error", icon: "alert-triangle", title: "Couldn't delete from your account", desc: err?.message || "Try again." });
      });
    }

    setToast({ tone: "success", icon: "trash", title: isRoot ? "Chat deleted" : "Branch deleted", desc: null });
  };

  // Only show direct ancestors (parent chain) — not lateral chats or unrelated branches.
  const mergeTargets = (sourceId) => {
    const anc = lineage(branches, sourceId).slice(0, -1).map((b) => b.id);
    return anc.reverse().map((id) => ({
      value: id,
      label: branches[id].name + (id === (branch && branch.parentId) ? " · parent" : " · ancestor"),
    }));
  };

  const getConvRoot = () => rootChatId || activeId;

  const openMergeResponse = (msg) => {
    const target = (branch && branch.parentId) || getConvRoot();
    if (!confirmMergePref) return doMerge({ scope: "response", sourceId: activeId, sourceMsg: msg, target });
    setMerge({ scope: "response", sourceId: activeId, sourceMsg: msg, target });
  };
  const openMergeConversation = () => {
    const target = (branch && branch.parentId) || getConvRoot();
    if (!confirmMergePref) return doMerge({ scope: "conversation", sourceId: activeId, target });
    setMerge({ scope: "conversation", sourceId: activeId, target });
  };

  const doMerge = (m) => {
    const ts = Date.now();
    const src = branches[m.sourceId];
    const divider = { id: uid(), role: "merge", source: src.name, sourceId: m.sourceId, scope: m.scope, ts };
    let inserts;
    if (m.scope === "response") {
      inserts = [{ ...m.sourceMsg, id: uid(), starred: false, fromMerge: m.sourceId }];
    } else {
      inserts = src.messages
        .filter((x) => x.role === "user" || x.role === "assistant")
        .map((x) => ({ ...x, id: uid(), starred: false, fromMerge: m.sourceId }));
    }
    setBranches((bs) => ({ ...bs, [m.target]: { ...bs[m.target], messages: [...bs[m.target].messages, divider, ...inserts] } }));
    dirtySync.markDirty(m.target); // merge never mutates the source branch, only the target
    setMerge(null);
    setActiveId(m.target);
    pendingJump.current = { messageId: divider.id, flashOnly: true };
    setToast({ tone: "success", icon: "git-merge", title: `Merged into "${branches[m.target].name}"`, desc: `Content from "${src.name}" was added. Source branch kept.` });
  };

  // ── navigation ──
  const navigate = (id) => {
    if (!branches[id]) return;
    // Leaving a temporary chat — clean it up
    if (isTemporary && activeId && id !== activeId) {
      const tid = activeId;
      setBranches(bs => { const nb = { ...bs }; delete nb[tid]; return nb; });
      setIsTemporary(false);
    }
    setActiveId(id); setSearchOpen(false);
  };

  const jumpToMessage = (branchId, messageId) => {
    setActiveId(branchId); setSearchOpen(false);
    pendingJump.current = { messageId };
  };

  React.useEffect(() => {
    if (!pendingJump.current) return;
    const { messageId, flashOnly } = pendingJump.current;
    pendingJump.current = null;
    const t = setTimeout(() => {
      const node = msgNodes.current[messageId];
      const cont = scrollRef.current;
      if (node && cont && !flashOnly) cont.scrollTop = Math.max(0, node.offsetTop - 96);
      setHighlightId(messageId);
      setTimeout(() => setHighlightId(null), 1600);
    }, 80);
    return () => clearTimeout(t);
  }, [activeId, branches]);

  const openPanel = (key) => setActivePanel((p) => (p === key ? null : key));

  // ── context menus ──
  const openMsgMenu = (e, msg) => {
    const items = [
      { id: "branch", label: "Branch from here", icon: "git-branch", accent: true, run: () => createBranch(msg) },
      { id: "star", label: msg.starred ? "Remove star" : "Star response", icon: "star", run: () => toggleStar(msg) },
      { id: "copy", label: "Copy text", icon: "copy", run: () => copyText(msg.text) },
    ];
    if (inBranch) items.push({ id: "merge", label: "Merge response to parent", icon: "git-merge", run: () => openMergeResponse(msg) });
    setCtxMenu({ x: e.clientX, y: e.clientY, items });
  };

  const openBranchMenu = (b, e) => {
    const items = [
      { id: "open", label: "Open branch", icon: "corner-down-right", run: () => navigate(b.id) },
      { id: "new", label: "New branch here", icon: "git-branch", accent: true, run: () => createBranchUnder(b.id) },
      { id: "rename", label: "Rename", icon: "pencil", run: () => { setActivePanel("branches"); setTreeEditId(b.id); } },
    ];
    if (b.parentId) items.push({ divider: true }, { id: "merge", label: "Merge to parent…", icon: "git-merge", run: () => { setActiveId(b.id); setTimeout(() => openMergeConversation(), 0); } });
    items.push({ divider: true }, { id: "delete", label: b.parentId ? "Delete branch" : "Delete chat", icon: "trash", danger: true, run: () => requestDelete(b) });
    setCtxMenu({ x: e.clientX, y: e.clientY, items });
  };

  const onSelectText = (sel) => setSelMenu({ x: sel.x, y: sel.y, text: sel.text, msg: sel.msg });
  const closeTransients = () => { setCtxMenu(null); setSelMenu(null); };

  // ── profile actions ──
  const handleProfileAction = (action) => {
    if (action === "theme") toggleTheme();
    else if (action === "shortcuts") setShortcutsOpen(true);
    else if (action === "settings") setSettingsOpen(true);
  };

  // ── merge dialog helpers ──
  const mergeTgts = merge ? mergeTargets(merge.sourceId) : [];
  return (
    <div style={{ display: "flex", height: "100%", width: "100%", background: "var(--bg)", overflow: "hidden" }}>
      <Sidebar
        expanded={sidebarExpanded} onToggle={() => setSidebarExpanded((v) => !v)}
        activePanel={activePanel} onOpenPanel={openPanel}
        onNewChat={newChat} onSearch={() => setSearchOpen(true)} onSettings={() => setSettingsOpen(true)}
        branchCount={convBranchCount} starCount={starred.length} theme={theme}
        rootChats={rootChats} activeChatId={rootChatId}
        onSelectChat={navigate}
        onThemeToggle={toggleTheme}
        onProfileAction={handleProfileAction}
        isMobile={isMobile} mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)}
        authIsGuest={isGuest} authProfile={authProfile} onSignOut={onSignOut}
        onContextMenu={openBranchMenu}
      />

      {activePanel && (
        <Panel
          kind={activePanel} branches={branches} rootId={rootChatId} activeId={activeId}
          onSelect={navigate} onClose={() => setActivePanel(null)}
          onRename={renameBranch} onContextMenu={openBranchMenu}
          starred={starred} onJumpStar={jumpToMessage}
          onUnstar={(bid, mid) => setBranch(bid, (b) => ({ ...b, messages: b.messages.map((m) => m.id === mid ? { ...m, starred: false } : m) }))}
          editRequestId={treeEditId} onEditConsumed={() => setTreeEditId(null)}
          fullScreen={isMobile}
        />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative", background: "var(--surface-1)" }}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
          {/* Landing header — hamburger (mobile) + theme toggle + temp chat, shown only when no branch is active */}
          {!branch && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "flex-end",
              height: 56, padding: isMobile ? "0 10px" : "0 20px", flex: "none",
            }}>
              {isMobile && (
                <IconButton icon={<I name="menu" />} label="Open menu" onClick={() => setMobileNavOpen(true)} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Tooltip content={theme === "dark" ? "Light mode" : "Dark mode"} side="bottom">
                  <IconButton
                    icon={<I name={theme === "dark" ? "sun" : "moon"} />}
                    label="Toggle theme"
                    onClick={toggleTheme}
                  />
                </Tooltip>
                <Tooltip content={isTemporary ? "Exit temporary chat" : "Start temporary chat"} side="bottom">
                  <IconButton
                    icon={<I name="clock" />}
                    label="Temporary chat"
                    onClick={startTemporaryChat}
                  />
                </Tooltip>
              </div>
            </div>
          )}

          {/* TopBar — shown when any branch is active */}
          {branch && (
            <TopBar
              nodes={nodes} branches={branches} rootChatId={rootChatId}
              inBranch={inBranch} onNavigate={navigate} onRename={renameBranch}
              onMerge={openMergeConversation} theme={theme}
              onToggleTheme={toggleTheme}
              isTemporary={isTemporary} onStartTemporary={startTemporaryChat}
              onToast={setToast}
              isMobile={isMobile} onOpenMobileNav={() => setMobileNavOpen(true)}
            />
          )}

          {isEmpty ? (
            <EmptyState onSend={send} input={input} setInput={setInput} onToast={setToast} isMobile={isMobile} />
          ) : (
            <>
              <motion.div
                key={activeId}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                onScrollCapture={closeTransients} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
              >
                <ChatThread
                  branch={threadBranch} status={status} inBranch={inBranch}
                  onAction={(a, msg) => {
                    if (a === "branch") createBranch(msg);
                    else if (a === "retry") retry(msg);
                    else if (a === "star") toggleStar(msg);
                    else if (a === "copy") copyText(msg.text);
                    else if (a === "merge") openMergeResponse(msg);
                  }}
                  onContextMenu={openMsgMenu} onSelectText={onSelectText}
                  onJumpParent={() => navigate(branch.parentId)}
                  onJumpSource={(sid) => navigate(sid)}
                  scrollRef={scrollRef} registerMsgRef={registerMsgRef} highlightId={highlightId}
                  isTouch={isTouch} isMobile={isMobile}
                />
              </motion.div>
              <div style={{ position: "relative", flex: "none" }}>
                <div style={{ position: "absolute", bottom: "100%", left: 0, right: 0, height: 24, background: "var(--gradient-fade-bottom)", pointerEvents: "none" }} />
                <div style={{
                  padding: isMobile ? "0 12px calc(14px + env(safe-area-inset-bottom))" : "0 24px 22px",
                }}>
                  <AppComposer
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onSend={send}
                    branchingFrom={inBranch ? (branch.branchSeed || (branches[branch.parentId] || {}).name) : null}
                    onToast={setToast}
                    isGenerating={status !== "idle"}
                    onStop={stopGenerating}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Merge dialog */}
      <Dialog open={!!merge} onClose={() => setMerge(null)}
        title={merge && merge.scope === "response" ? "Merge response to a branch" : "Merge conversation to a branch"}
        description="Choose where this content should land. It's appended with a labelled divider — nothing is overwritten and the source branch is kept."
        width={480}
        footer={merge && <>
          <Button variant="ghost" onClick={() => setMerge(null)}>Cancel</Button>
          <Button variant="brand" iconLeft={<I name="git-merge" size={16} />} onClick={() => doMerge(merge)}>Merge</Button>
        </>}>
        {merge && <MergeBody scope={merge.scope} source={branches[merge.sourceId].name} targets={mergeTgts} target={merge.target} setTarget={(v) => setMerge((m) => ({ ...m, target: v }))} />}
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}
        title={deleteConfirm ? (deleteConfirm.isRoot ? "Delete this chat?" : "Delete this branch?") : ""}
        description={deleteConfirm ? (
          deleteConfirm.count > 0
            ? `"${deleteConfirm.name}" and its ${deleteConfirm.count} branch${deleteConfirm.count === 1 ? "" : "es"} will be permanently deleted. This can't be undone.`
            : `"${deleteConfirm.name}" will be permanently deleted. This can't be undone.`
        ) : ""}
        width={440}
        footer={deleteConfirm && <>
          <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" iconLeft={<I name="trash" size={16} />} onClick={() => { deleteBranch(deleteConfirm.id); setDeleteConfirm(null); }}>Delete</Button>
        </>}>
      </Dialog>

      {/* Guest → account import */}
      <Dialog open={!!guestImportOffer} onClose={() => setGuestImportOffer(null)}
        title="Import your guest chats?"
        description="You have chats from before you signed in. Import them into your account, or start fresh — they won't be offered again after this."
        width={460}
        footer={<>
          <Button variant="ghost" onClick={() => { guestImportService.clearGuestSnapshot(); setGuestImportOffer(null); }}>Discard</Button>
          <Button variant="brand" onClick={() => importGuestData(guestImportOffer)}>Import</Button>
        </>}>
      </Dialog>

      {/* Search */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} title="Search" description="Find branches and anything said in a thread." width={540}>
        <CommandPalette branches={branches} onPick={jumpToMessage} />
      </Dialog>

      {/* Settings */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings" width={460}
        footer={<Button variant="secondary" onClick={() => setSettingsOpen(false)}>Done</Button>}>
        <SettingsBody theme={theme} setTheme={setThemeAnimated} density={density} setDensity={setDensity} autoMerge={confirmMergePref} setAutoMerge={setConfirmMergePref} />
      </Dialog>

      {/* Keyboard shortcuts */}
      <Dialog open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} title="Keyboard shortcuts" width={420}
        footer={<Button variant="secondary" onClick={() => setShortcutsOpen(false)}>Done</Button>}>
        <ShortcutsBody />
      </Dialog>

      {ctxMenu && <ContextMenu x={ctxMenu.x} y={ctxMenu.y} items={ctxMenu.items} onClose={() => setCtxMenu(null)} />}
      {selMenu && (
        <SelectionMenu x={selMenu.x} y={selMenu.y}
          onBranch={() => { createBranch(selMenu.msg, { quote: selMenu.text }); setSelMenu(null); const s = window.getSelection(); if (s) s.removeAllRanges(); }}
          onCopy={() => { copyText(selMenu.text); setSelMenu(null); }}
          onClose={() => setSelMenu(null)} />
      )}

      {toast && (
        <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: "var(--z-toast)" }}>
          <Toast
            tone={toast.tone}
            icon={<I name={toast.icon} size={18} />}
            title={toast.title}
            description={toast.desc}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}
