import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * BranchBreadcrumb — the branch lineage pill shown in the header.
 * path: array of strings, root → current. Current is bold.
 */
export function BranchBreadcrumb({ path = [], onCrumb, style = {} }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 44,
        padding: "0 20px",
        background: "var(--surface-2)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
    >
      {path.map((node, i) => {
        const last = i === path.length - 1;
        return (
          <React.Fragment key={i}>
            <button
              type="button"
              onClick={() => !last && onCrumb && onCrumb(i)}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "var(--fs-body-sm)",
                fontWeight: last ? "var(--weight-bold)" : "var(--weight-regular)",
                color: last ? "var(--text-primary)" : "var(--text-muted)",
                cursor: last ? "default" : "pointer",
                whiteSpace: "nowrap",
                transition: "color var(--motion-fast)",
              }}
              onMouseEnter={(e) => { if (!last) e.currentTarget.style.color = "var(--text-secondary)"; }}
              onMouseLeave={(e) => { if (!last) e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              {node}
            </button>
            {!last && <span style={{ color: "var(--brand-primary)", display: "inline-flex" }}>{glyph("corner-down-right", { size: 14, sw: 2 })}</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
