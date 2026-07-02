import React from "react";

/**
 * Tabs — pill-style segmented control. items: [{id,label,icon?}]
 */
export function Tabs({ items = [], value, onChange, style = {} }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: 4,
        background: "var(--surface-2)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
    >
      {items.map((it) => {
        const active = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onChange && onChange(it.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              height: 34,
              padding: "0 16px",
              border: "none",
              borderRadius: "var(--radius-pill)",
              background: active ? "var(--surface-1)" : "transparent",
              color: active ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: active ? "var(--shadow-sm)" : "none",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-body-sm)",
              fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
              cursor: "pointer",
              transition: "var(--transition-base)",
              whiteSpace: "nowrap",
            }}
          >
            {it.icon}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
