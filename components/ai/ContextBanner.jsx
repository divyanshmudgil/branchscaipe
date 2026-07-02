import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * ContextBanner — the inline divider that marks "Branch from: X" within a thread.
 * variant: branch (neutral hairline) | merge (iris-tinted).
 */
export function ContextBanner({ label, from, variant = "branch", style = {} }) {
  const isMerge = variant === "merge";
  const text = label || `${isMerge ? "Merge from" : "Branch from"}: ${from}`;
  const color = isMerge ? "var(--text-brand)" : "var(--text-muted)";
  const line = isMerge ? "var(--border-brand)" : "var(--border-default)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", margin: "8px 0", ...style }}>
      <span style={{ flex: 1, height: 1, background: line }} />
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color, fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--weight-medium)", whiteSpace: "nowrap" }}>
        {glyph(isMerge ? "git-merge" : "git-branch", { size: 14 })}
        {text}
      </span>
      <span style={{ flex: 1, height: 1, background: line }} />
    </div>
  );
}
