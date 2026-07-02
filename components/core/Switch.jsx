import React from "react";

/**
 * Switch / toggle. Calm, rounded.
 */
export function Switch({ checked = false, onChange, disabled = false, label, size = "md", style = {} }) {
  const dims = { sm: { w: 36, h: 20, k: 14 }, md: { w: 44, h: 26, k: 20 } };
  const d = dims[size] || dims.md;
  const control = (
    <span
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: d.w,
        height: d.h,
        flex: "none",
        padding: 3,
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--brand-primary)" : "var(--surface-3)",
        boxShadow: checked ? "var(--shadow-glow-soft)" : "var(--shadow-inset)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
        transition: "background var(--motion-fast) var(--ease-standard)",
      }}
    >
      <span
        style={{
          width: d.k,
          height: d.k,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "var(--shadow-sm)",
          transform: checked ? `translateX(${d.w - d.k - 6}px)` : "translateX(0)",
          transition: "transform var(--motion-medium) var(--ease-calm)",
        }}
      />
    </span>
  );

  if (!label) return control;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", color: "var(--text-primary)", ...style }}>
      {control}
      {label}
    </label>
  );
}
