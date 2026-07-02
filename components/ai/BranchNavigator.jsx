import React from "react";
import { glyph } from "./glyphs.jsx";
import { ThreadLineage } from "./ThreadLineage.jsx";

/**
 * BranchNavigator — a compact panel listing the branch tree with a header.
 * Composes ThreadLineage; meant to live in a Drawer or the sidebar.
 */
export function BranchNavigator({ tree = [], activeId, onSelect, count, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {glyph("git-branch", { size: 15 })}
          Branches
        </div>
        {count != null && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700, color: "var(--text-brand)", background: "var(--brand-primary-soft)", borderRadius: "var(--radius-pill)", padding: "2px 8px" }}>{count}</span>
        )}
      </div>
      <ThreadLineage tree={tree} activeId={activeId} onSelect={onSelect} />
    </div>
  );
}
