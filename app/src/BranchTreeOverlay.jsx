// BranchTreeOverlay — the expanded state of BranchNav: a floating glass
// sheet (desktop) or a full-width bottom sheet (mobile) showing the whole
// branch tree, not just the active lineage. Backdrop is blur-only, never
// darkened. Dismiss paths (click outside, Escape, selecting a node, or the
// Back button closing it externally via AnimatePresence unmount) all share
// the same reverse animation since they're just different ways of making
// this component unmount.
import React from "react";
import { motion } from "framer-motion";
import { vibrate } from "./haptics.js";

function flattenTree(node, depth = 0, out = []) {
  if (!node) return out;
  out.push({ id: node.id, depth });
  node.children.forEach((c) => flattenTree(c, depth + 1, out));
  return out;
}

export function BranchTreeOverlay({ tree, activeId, isMobile, reduceMotion, onSelect, onClose }) {
  const rootRef = React.useRef(null);
  const rowRefs = React.useRef(new Map());
  const flat = React.useMemo(() => flattenTree(tree), [tree]);
  const [focusIndex, setFocusIndex] = React.useState(() => Math.max(0, flat.findIndex((r) => r.id === activeId)));
  // The roving row starts equal to the active row on open, so without this
  // gate the focus ring would render immediately as an (unwanted) second
  // indicator right on top of the active row's own fill — show it only
  // once the user actually drives focus with the keyboard.
  const [usedKeyboard, setUsedKeyboard] = React.useState(false);

  React.useEffect(() => {
    rowRefs.current.get(flat[focusIndex]?.id)?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // focus the active row once, on open

  const moveFocus = (delta) => {
    setFocusIndex((i) => {
      const next = Math.max(0, Math.min(flat.length - 1, i + delta));
      rowRefs.current.get(flat[next]?.id)?.focus();
      return next;
    });
  };

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setUsedKeyboard(true); moveFocus(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setUsedKeyboard(true); moveFocus(-1); }
      else if (e.key === "Tab") {
        // Only the roving row is ever tabIndex 0, so this just keeps
        // focus from escaping the sheet into the app behind it.
        e.preventDefault();
        rowRefs.current.get(flat[focusIndex]?.id)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusIndex, flat, onClose]);

  const select = (id) => {
    if (isMobile) vibrate(8);
    onSelect(id);
  };

  const backdropTransition = { duration: reduceMotion ? 0 : 0.18 };
  const springTransition = reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32, mass: 0.9 };
  // Desktop: grows straight out of the pill (transform-origin pinned to its
  // top edge) rather than fading in as an unrelated floating panel.
  const sheetVariants = isMobile
    ? { closed: { y: "100%", opacity: reduceMotion ? 1 : 0.6 }, open: { y: 0, opacity: 1 } }
    : { closed: { scaleY: reduceMotion ? 1 : 0.4, opacity: 0 }, open: { scaleY: 1, opacity: 1 } };

  const renderRows = (node, depth) => {
    const isActive = node.id === activeId;
    const flatIndex = flat.findIndex((r) => r.id === node.id);
    return (
      <React.Fragment key={node.id}>
        <TreeRow
          node={node} depth={depth} isActive={isActive}
          isRoving={flatIndex === focusIndex} showRing={usedKeyboard}
          reduceMotion={reduceMotion}
          registerRef={(el) => { if (el) rowRefs.current.set(node.id, el); else rowRefs.current.delete(node.id); }}
          onFocus={() => setFocusIndex(flatIndex)}
          onSelect={() => select(node.id)}
        />
        {node.children.map((c) => renderRows(c, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <>
      <motion.div
        key="backdrop"
        onClick={onClose}
        initial="closed" animate="open" exit="closed"
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        transition={backdropTransition}
        style={{
          position: "fixed", inset: 0, zIndex: "var(--z-overlay)", background: "transparent",
          WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
        }}
      />
      <div style={isMobile ? mobileWrapStyle : desktopWrapStyle}>
        <motion.div
          key="sheet"
          ref={rootRef}
          role="tree"
          aria-label="Branch hierarchy"
          initial="closed" animate="open" exit="closed"
          variants={sheetVariants}
          transition={springTransition}
          onClick={(e) => e.stopPropagation()}
          style={isMobile ? mobileSheetStyle : desktopSheetStyle}
        >
          <div style={{
            padding: "10px 12px 18px", overflowY: "auto",
            maxHeight: isMobile ? "60vh" : "min(60vh, 480px)", WebkitOverflowScrolling: "touch",
          }}>
            {tree ? renderRows(tree, 0) : null}
          </div>
        </motion.div>
      </div>
    </>
  );
}

function TreeRow({ node, depth, isActive, isRoving, showRing, reduceMotion, registerRef, onFocus, onSelect }) {
  return (
    <motion.div
      ref={registerRef}
      role="treeitem"
      aria-selected={isActive}
      tabIndex={isRoving ? 0 : -1}
      onFocus={onFocus}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }}
      whileHover={{ backgroundColor: "var(--surface-hover)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: reduceMotion ? 0 : 0.12 }}
      style={{
        position: "relative", display: "flex", alignItems: "center",
        height: 38, padding: "0 12px", paddingLeft: 16 + depth * 18,
        borderRadius: "var(--radius-md)", cursor: "pointer", outline: "none",
        // Only a real keyboard-driven focus gets a ring — the active branch
        // is already communicated by its fill below, not a stroke.
        boxShadow: isRoving && showRing ? "0 0 0 2px var(--border-focus)" : "none",
      }}
    >
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.14 }}
          style={{
            position: "absolute", inset: "2px 6px", borderRadius: "var(--radius-md)",
            background: "var(--surface-selected)", zIndex: 0,
          }}
        />
      )}
      <span style={{
        position: "relative", zIndex: 1, fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)",
        fontWeight: isActive ? 700 : 500, color: isActive ? "var(--text-brand)" : "var(--text-secondary)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {node.name}
      </span>
    </motion.div>
  );
}

// Anchored to the pill's own box (absolute within BranchNav's relatively-
// positioned pill wrapper) rather than the viewport — this is what makes
// it read as growing out of the pill instead of an unrelated panel.
const desktopWrapStyle = {
  position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
  zIndex: "calc(var(--z-overlay) + 1)", pointerEvents: "none",
};
const desktopSheetStyle = {
  pointerEvents: "auto", width: "min(420px, 92vw)",
  background: "var(--surface-glass-heavy)", border: "none",
  borderRadius: "var(--radius-xl)", overflow: "hidden",
  transformOrigin: "top center",
};
const mobileWrapStyle = {
  position: "fixed", inset: 0, zIndex: "calc(var(--z-overlay) + 1)",
  display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: "none",
};
const mobileSheetStyle = {
  pointerEvents: "auto", width: "100%",
  background: "var(--surface-glass-heavy)", border: "none",
  borderTopLeftRadius: "var(--radius-xl)", borderTopRightRadius: "var(--radius-xl)",
  paddingBottom: "env(safe-area-inset-bottom)", overflow: "hidden",
};
