import React from "react";

/**
 * Surface container. elevation: flat | raised | floating ; glass for blur panels.
 */
export function Card({
  children,
  elevation = "raised",
  glass = false,
  interactive = false,
  padding = "var(--space-6)",
  style = {},
  ...rest
}) {
  const elevations = {
    flat: { background: "var(--surface-1)", boxShadow: "none", border: "1px solid var(--border-default)" },
    raised: { background: "var(--surface-1)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" },
    floating: { background: "var(--surface-elevated)", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-subtle)" },
  };
  const e = elevations[elevation] || elevations.raised;

  const glassStyle = glass
    ? {
        background: "var(--surface-glass)",
        WebkitBackdropFilter: "var(--glass-blur)",
        backdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-md)",
      }
    : e;

  return (
    <div
      style={{
        borderRadius: "var(--radius-xl)",
        padding,
        transition: interactive ? "var(--transition-base)" : "none",
        cursor: interactive ? "pointer" : "default",
        ...glassStyle,
        ...style,
      }}
      onMouseEnter={(ev) => { if (interactive) { ev.currentTarget.style.boxShadow = "var(--shadow-md)"; ev.currentTarget.style.transform = "translateY(-2px)"; } }}
      onMouseLeave={(ev) => { if (interactive) { ev.currentTarget.style.boxShadow = glass ? "var(--shadow-md)" : e.boxShadow; ev.currentTarget.style.transform = "translateY(0)"; } }}
      {...rest}
    >
      {children}
    </div>
  );
}
