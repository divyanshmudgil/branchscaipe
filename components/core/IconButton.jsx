import React from "react";

/**
 * Square/round icon-only button. For toolbars, rails, message actions.
 * variant: ghost | soft | solid ; shape: rounded | circle
 */
export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  shape = "rounded",
  active = false,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = { sm: 30, md: 38, lg: 44 };
  const dim = sizes[size] || sizes.md;

  const variants = {
    ghost: { background: active ? "var(--surface-active)" : "transparent", color: "var(--text-secondary)", border: "1px solid transparent" },
    soft: { background: active ? "var(--surface-selected)" : "var(--surface-2)", color: active ? "var(--text-brand)" : "var(--text-secondary)", border: "1px solid var(--border-subtle)" },
    solid: { background: "var(--brand-primary)", color: "var(--brand-on-primary)", border: "1px solid transparent", boxShadow: "var(--shadow-glow-soft)" },
  };
  const v = variants[variant] || variants.ghost;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        flex: "none",
        borderRadius: shape === "circle" ? "var(--radius-full)" : "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
        transition: "var(--transition-base)",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled && variant === "ghost" && !active) e.currentTarget.style.background = "var(--surface-hover)"; }}
      onMouseLeave={(e) => { if (variant === "ghost" && !active) e.currentTarget.style.background = "transparent"; }}
      {...rest}
    >
      {icon}
    </button>
  );
}
