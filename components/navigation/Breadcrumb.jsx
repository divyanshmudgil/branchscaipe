import React from "react";

/**
 * Breadcrumb — generic path. items: [{label, onClick?}]. Last is current (bold).
 */
export function Breadcrumb({ items = [], separator = "›", style = {} }) {
  return (
    <nav style={{ display: "inline-flex", alignItems: "center", gap: 8, ...style }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            <span
              onClick={!last ? it.onClick : undefined}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--fs-body-sm)",
                fontWeight: last ? "var(--weight-semibold)" : "var(--weight-regular)",
                color: last ? "var(--text-primary)" : "var(--text-muted)",
                cursor: !last && it.onClick ? "pointer" : "default",
                transition: "color var(--motion-fast)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (!last && it.onClick) e.currentTarget.style.color = "var(--text-secondary)"; }}
              onMouseLeave={(e) => { if (!last && it.onClick) e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              {it.label}
            </span>
            {!last && <span style={{ color: "var(--text-disabled)", fontSize: "var(--fs-body-sm)" }}>{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
