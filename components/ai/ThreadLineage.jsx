import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * ThreadLineage — the branch hierarchy tree. nodes: nested {id,label,children?}.
 * Indents children and connects them with the corner-down-right glyph.
 */
export function ThreadLineage({ tree = [], activeId, onSelect, style = {} }) {
  const renderNode = (node, depth) => {
    const active = node.id === activeId;
    return (
      <div key={node.id}>
        <button
          type="button"
          onClick={() => onSelect && onSelect(node.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            width: "100%",
            padding: "7px 10px",
            paddingLeft: 10 + depth * 20,
            border: "none",
            borderRadius: "var(--radius-sm)",
            background: active ? "var(--surface-selected)" : "transparent",
            color: active ? "var(--text-brand)" : "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-body-sm)",
            fontWeight: active ? "var(--weight-semibold)" : "var(--weight-regular)",
            cursor: "pointer",
            textAlign: "left",
            transition: "var(--transition-base)",
          }}
          onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-hover)"; }}
          onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
        >
          {depth > 0 && <span style={{ display: "inline-flex", color: "var(--text-disabled)", opacity: 0.8 }}>{glyph("corner-down-right", { size: 13 })}</span>}
          {depth === 0 && <span style={{ display: "inline-flex", color: active ? "var(--brand-primary)" : "var(--text-muted)" }}>{glyph("git-branch", { size: 14 })}</span>}
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{node.label}</span>
        </button>
        {node.children && node.children.map((c) => renderNode(c, depth + 1))}
      </div>
    );
  };
  return <div style={{ display: "flex", flexDirection: "column", gap: 2, ...style }}>{tree.map((n) => renderNode(n, 0))}</div>;
}
