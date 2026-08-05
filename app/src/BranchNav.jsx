// BranchNav — the collapsed branch-lineage pill + Back button. Click any
// node name to navigate immediately; click the pill's own background (not
// a node) to expand the full branch tree (see BranchTreeOverlay.jsx).
//
// Display persistence: navigating to an ancestor of the currently-shown
// chain does NOT shrink the pill back down to just that ancestor's own
// lineage — the deepest node reached ("tip") stays visible, with whichever
// node is actually active shown in bold/brand color within that same
// chain. Only navigating somewhere outside the current chain (a sibling
// branch, a different chat entirely) starts a fresh chain from there.
import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon as I } from "./Icon.jsx";
import { branchTree, lineage } from "./logic.js";
import { BranchTreeOverlay } from "./BranchTreeOverlay.jsx";

const MAX_VISIBLE = 3;
export const NAV_PILL_HEIGHT = 44;

// Collapses `nodes` (root→tip) to at most `maxVisible` entries + an
// ellipsis, anchored toward whichever end is farthest from `currentIndex`
// (the position of the *actually active* branch within that chain, which
// isn't always the last entry now that the chain can extend past it).
export function collapseNodes(nodes, currentIndex = nodes.length - 1, maxVisible = MAX_VISIBLE) {
  const n = nodes.length;
  if (n <= maxVisible) {
    return nodes.map((node, i) => ({ kind: "node", node, isCurrent: i === currentIndex }));
  }
  if (currentIndex >= n - 2) {
    return [
      { kind: "ellipsis" },
      { kind: "node", node: nodes[n - 2], isCurrent: currentIndex === n - 2 },
      { kind: "node", node: nodes[n - 1], isCurrent: currentIndex === n - 1 },
    ];
  }
  if (currentIndex <= 1) {
    return [
      { kind: "node", node: nodes[0], isCurrent: currentIndex === 0 },
      { kind: "node", node: nodes[1], isCurrent: currentIndex === 1 },
      { kind: "ellipsis" },
    ];
  }
  return [
    { kind: "ellipsis" },
    { kind: "node", node: nodes[currentIndex], isCurrent: true },
    { kind: "ellipsis" },
  ];
}

export function BranchNav({ nodes, branches, rootChatId, inBranch, onNavigate, onRename, isMobile = false }) {
  const [expanded, setExpanded] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const activeId = nodes[nodes.length - 1]?.id;

  const [tipId, setTipId] = React.useState(activeId);

  // Extend/preserve the displayed chain rather than always snapping it to
  // the true active lineage — see file header. Only depends on activeId:
  // `branches` is read fresh from the closure at the moment activeId
  // actually changes, which is the only time this needs to run (re-running
  // on every unrelated branches mutation, e.g. streaming tokens, would be
  // pointless).
  React.useEffect(() => {
    if (!activeId) return;
    setTipId((prevTip) => {
      if (prevTip === activeId) return prevTip;
      const prevChain = lineage(branches, prevTip);
      const stillOnChain = prevChain.some((n) => n.id === activeId);
      return stillOnChain ? prevTip : activeId;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  React.useEffect(() => { setExpanded(false); }, [activeId]);

  const tree = React.useMemo(() => branchTree(branches, rootChatId), [branches, rootChatId]);

  const displayNodes = React.useMemo(() => {
    const chain = lineage(branches, tipId);
    return chain.length ? chain : nodes; // tip branch got deleted — fall back to the real lineage
  }, [branches, tipId, nodes]);

  const currentIndex = Math.max(0, displayNodes.findIndex((n) => n.id === activeId));
  const shown = collapseNodes(displayNodes, currentIndex);

  const handleBack = () => {
    if (nodes.length > 1) onNavigate(nodes[nodes.length - 2].id);
  };

  const handleContainerClick = (e) => {
    if (e.target.closest("[data-nav-node]")) return;
    setExpanded(true);
  };

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
      <motion.button
        type="button"
        onClick={handleBack}
        disabled={!inBranch}
        aria-label="Back to parent branch"
        whileHover={inBranch ? { opacity: 1 } : undefined}
        whileTap={inBranch ? { scale: 0.94 } : undefined}
        style={{
          position: "relative", zIndex: "calc(var(--z-overlay) + 10)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: NAV_PILL_HEIGHT, height: NAV_PILL_HEIGHT, flex: "none",
          border: "none", borderRadius: "var(--radius-pill)", background: "var(--surface-2)",
          color: "var(--text-secondary)",
          cursor: inBranch ? "pointer" : "default", opacity: inBranch ? 1 : 0.4,
        }}
      >
        <I name="chevron-left" size={17} />
      </motion.button>

      <div style={{ position: "relative" }}>
        <motion.div
          onClick={handleContainerClick}
          role="button"
          tabIndex={0}
          aria-label="Branch navigation — click to see the full tree"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(true); } }}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          style={{
            position: "relative", zIndex: "calc(var(--z-overlay) + 10)",
            display: "inline-flex", alignItems: "center", gap: 2,
            height: NAV_PILL_HEIGHT, padding: "0 22px",
            maxWidth: "100%", minWidth: 0,
            background: "var(--surface-2)",
            border: "none", borderRadius: "var(--radius-pill)",
            overflow: "hidden", cursor: "pointer",
          }}
        >
          <AnimatePresence initial={false}>
            {shown.map((item, i) => {
              const key = item.kind === "ellipsis" ? `ellipsis-${i < shown.length - 1 && i === 0 ? "start" : "end"}` : item.isCurrent ? "current" : item.node.id;
              return (
                <React.Fragment key={key}>
                  {i > 0 && (
                    <span style={{ display: "inline-flex", color: "var(--text-muted)", flex: "none", opacity: 0.6 }}>
                      <I name="arrow-right" size={14} sw={2} />
                    </span>
                  )}
                  {item.kind === "ellipsis" ? (
                    <motion.span
                      layout
                      data-nav-node
                      onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.16 }}
                      style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 22, height: 28, flex: "none", color: "var(--text-muted)", cursor: "pointer",
                        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 700,
                      }}
                    >
                      …
                    </motion.span>
                  ) : (
                    <NavNode node={item.node} isCurrent={item.isCurrent} onNavigate={onNavigate} onRename={onRename} reduceMotion={reduceMotion} />
                  )}
                </React.Fragment>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Integrated hint — a small notch hanging off the pill's bottom
            edge holds the expand affordance, so the pill itself never has
            to grow taller than the Back/Merge buttons to fit it. */}
        <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", zIndex: "calc(var(--z-overlay) + 10)", pointerEvents: "none" }}>
          <motion.span
            onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
            variants={{
              rest: { y: -6, opacity: reduceMotion ? 0.5 : 0.45 },
              hover: { y: -4, opacity: 0.9 },
              tap: { y: -3, opacity: 1 },
            }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 30 }}
            style={{
              pointerEvents: "auto", cursor: "pointer",
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              width: 24, height: 12, overflow: "hidden",
              background: "var(--surface-2)", color: "var(--text-muted)",
              borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            }}
          >
            <I name="chevron-down" size={12} />
          </motion.span>
        </span>

        {/* Anchored to the pill itself (not the viewport) so it visibly
            grows out of it rather than reading as an unrelated floating
            panel — see BranchTreeOverlay's desktopWrapStyle. */}
        <AnimatePresence>
          {expanded && (
            <BranchTreeOverlay
              tree={tree}
              activeId={activeId}
              isMobile={isMobile}
              reduceMotion={reduceMotion}
              onSelect={(id) => { onNavigate(id); setExpanded(false); }}
              onClose={() => setExpanded(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// The current node's slot keeps a stable key ("current") across renders so
// this component instance persists across navigation — that's what lets
// the AnimatePresence below crossfade the *label* on `node` changes rather
// than the whole node being torn down and rebuilt on every hop.
function NavNode({ node, isCurrent, onNavigate, onRename, reduceMotion }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(node.name);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEditing = (e) => {
    if (!isCurrent || !onRename) return;
    e.stopPropagation();
    setDraft(node.name);
    setEditing(true);
  };

  const commit = () => {
    const next = draft.trim();
    if (next && next !== node.name) onRename(node.id, next);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(node.name);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        data-nav-node
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onBlur={commit}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") { e.preventDefault(); commit(); }
          else if (e.key === "Escape") { e.preventDefault(); cancel(); }
        }}
        style={{
          height: "100%", width: Math.max(40, draft.length * 8), maxWidth: 180,
          padding: "0 2px", border: "none", outline: "none",
          borderBottom: "1.5px solid var(--border-focus)",
          background: "transparent", color: "var(--text-brand)",
          fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 700,
        }}
      />
    );
  }

  return (
    <motion.button
      type="button"
      layout
      data-nav-node
      title={isCurrent && onRename ? `${node.name} (double-click to rename)` : node.name}
      onClick={(e) => { e.stopPropagation(); if (!isCurrent) onNavigate(node.id); }}
      onDoubleClick={startEditing}
      whileHover={!isCurrent ? { opacity: 0.65 } : undefined}
      whileTap={!isCurrent ? { scale: 0.96 } : undefined}
      style={{
        display: "inline-flex", alignItems: "center",
        height: "100%", padding: "0 2px", minWidth: 0, flexShrink: 1,
        border: "none", borderRadius: "var(--radius-pill)", background: "transparent",
        color: isCurrent ? "var(--text-brand)" : "var(--text-muted)",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)",
        fontWeight: isCurrent ? 700 : 500, cursor: isCurrent ? "default" : "pointer",
        maxWidth: 180,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={node.id}
          initial={reduceMotion ? false : { opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -6 }}
          transition={{ duration: reduceMotion ? 0 : 0.16 }}
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block", minWidth: 0, maxWidth: "100%" }}
        >
          {node.name}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
