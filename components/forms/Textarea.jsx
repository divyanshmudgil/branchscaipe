import React from "react";

/**
 * Auto-sizing textarea — calm rounded well. Used outside the composer too.
 */
export function Textarea({ value, onChange, placeholder, rows = 3, invalid = false, disabled = false, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: "100%",
        resize: "vertical",
        padding: "14px 16px",
        background: disabled ? "var(--surface-2)" : "var(--surface-1)",
        border: `1.5px solid ${invalid ? "var(--color-error)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-lg)",
        boxShadow: focus ? (invalid ? "var(--ring-error)" : "var(--ring-focus)") : "var(--shadow-xs)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body)",
        lineHeight: "var(--lh-normal)",
        color: "var(--text-primary)",
        outline: "none",
        transition: "var(--transition-base)",
        ...style,
      }}
      {...rest}
    />
  );
}
