import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * MergeBanner — confirmation strip for merging a branch (or response) into a parent.
 * Offers a parent selector affordance and confirm/cancel.
 */
export function MergeBanner({
  source = "Closure",
  parent = "Hooks",
  scope = "chat",          // "chat" | "response"
  onConfirm,
  onCancel,
  onChooseParent,
  style = {},
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "100%",
        padding: "12px 14px 12px 18px",
        background: "var(--gradient-branch)",
        border: "1px solid var(--border-brand)",
        borderRadius: "var(--radius-lg)",
        ...style,
      }}
    >
      <span style={{ display: "inline-flex", color: "var(--brand-primary)", flex: "none" }}>{glyph("git-merge", { size: 20 })}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>
          Merge {scope} to parent
        </div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", marginTop: 1, display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <b style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{source}</b>
          {glyph("corner-down-right", { size: 12 })}
          <button type="button" onClick={onChooseParent} style={{ border: "none", background: "transparent", color: "var(--text-brand)", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3, padding: 0, fontSize: "var(--fs-caption)" }}>
            {parent} {glyph("chevron-down", { size: 12 })}
          </button>
        </div>
      </div>
      <button type="button" onClick={onCancel} style={ghostBtn}>Cancel</button>
      <button type="button" onClick={onConfirm} style={confirmBtn}>{glyph("git-merge", { size: 15 })} Merge</button>
    </div>
  );
}

const ghostBtn = {
  height: 34, padding: "0 14px", border: "none", background: "transparent",
  color: "var(--text-secondary)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)",
  fontWeight: 600, borderRadius: "var(--radius-sm)", cursor: "pointer", flex: "none",
};
const confirmBtn = {
  display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 16px",
  border: "none", background: "var(--gradient-brand)", color: "#fff",
  fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600,
  borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-glow-soft)", cursor: "pointer", flex: "none",
};
