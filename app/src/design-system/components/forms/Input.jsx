import React from "react";

/**
 * Text input. Pill or rounded. Optional leading/trailing icon.
 */
export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  iconLeft = null,
  iconRight = null,
  size = "md",
  shape = "rounded",
  invalid = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = { sm: 36, md: 44, lg: 52 };
  const h = heights[size] || heights.md;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: h,
        width: "100%",
        padding: shape === "pill" ? "0 18px" : "0 14px",
        background: disabled ? "var(--surface-2)" : "var(--surface-1)",
        border: `1.5px solid ${invalid ? "var(--color-error)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
        borderRadius: shape === "pill" ? "var(--radius-pill)" : "var(--radius-md)",
        boxShadow: focus ? (invalid ? "var(--ring-error)" : "var(--ring-focus)") : "var(--shadow-xs)",
        transition: "var(--transition-base)",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
        ...style,
      }}
    >
      {iconLeft && <span style={{ display: "inline-flex", color: "var(--text-muted)", flex: "none" }}>{iconLeft}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body)",
          color: "var(--text-primary)",
          letterSpacing: "var(--tracking-wide)",
        }}
        {...rest}
      />
      {iconRight && <span style={{ display: "inline-flex", color: "var(--text-muted)", flex: "none" }}>{iconRight}</span>}
    </div>
  );
}
