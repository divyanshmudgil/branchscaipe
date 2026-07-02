import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * BranchIndicator — a small inline marker that a message has branches, with a
 * count, and an optional switcher (‹ 2/3 ›) to page between sibling branches.
 */
export function BranchIndicator({ count = 0, current = 1, onPrev, onNext, onOpen, label = "branches", style = {} }) {
  const hasSiblings = count > 1;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        height: 28,
        padding: "0 4px 0 10px",
        background: "var(--brand-primary-soft)",
        border: "1px solid var(--border-brand)",
        borderRadius: "var(--radius-pill)",
        color: "var(--text-brand)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-caption)",
        fontWeight: "var(--weight-semibold)",
        ...style,
      }}
    >
      <span style={{ display: "inline-flex", marginRight: 4 }}>{glyph("git-branch", { size: 13 })}</span>
      {hasSiblings ? (
        <>
          <button type="button" onClick={onPrev} aria-label="Previous branch" style={chev}>‹</button>
          <span style={{ minWidth: 30, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{current}/{count}</span>
          <button type="button" onClick={onNext} aria-label="Next branch" style={chev}>›</button>
        </>
      ) : (
        <button type="button" onClick={onOpen} style={{ ...chev, width: "auto", padding: "0 6px" }}>{count} {label}</button>
      )}
    </div>
  );
}

const chev = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 22,
  height: 22,
  border: "none",
  background: "transparent",
  color: "inherit",
  borderRadius: "var(--radius-xs)",
  cursor: "pointer",
  fontSize: 15,
  lineHeight: 1,
};
