import React from "react";

/**
 * Pill — interactive chip/tag. Used for tools, filters, branch chips, suggestions.
 */
export function Pill({ children, iconLeft = null, selected = false, onClick, removable = false, onRemove, style = {}, ...rest }) {
  const clickable = !!onClick || removable;
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 32,
        padding: "0 14px",
        borderRadius: "var(--radius-pill)",
        background: selected ? "var(--surface-selected)" : "var(--surface-2)",
        color: selected ? "var(--text-brand)" : "var(--text-secondary)",
        border: selected ? "1px solid var(--border-brand)" : "1px solid var(--border-subtle)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: "var(--weight-medium)",
        cursor: clickable ? "pointer" : "default",
        transition: "var(--transition-base)",
        whiteSpace: "nowrap",
        ...style,
      }}
      onMouseEnter={(e) => { if (clickable && !selected) e.currentTarget.style.background = "var(--surface-hover)"; }}
      onMouseLeave={(e) => { if (clickable && !selected) e.currentTarget.style.background = "var(--surface-2)"; }}
      {...rest}
    >
      {iconLeft && <span style={{ display: "inline-flex", flex: "none" }}>{iconLeft}</span>}
      {children}
      {removable && (
        <span
          onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }}
          style={{ display: "inline-flex", marginLeft: 2, opacity: 0.6, cursor: "pointer" }}
        >×</span>
      )}
    </span>
  );
}
