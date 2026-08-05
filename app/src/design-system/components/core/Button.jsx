import React from "react";
import { motion } from "framer-motion";

/**
 * Branchscaipe primary button. Soft, rounded, calm.
 * Variants: primary | secondary | ghost | brand (aurora CTA) | danger
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { height: 32, padding: "0 14px", font: "var(--fs-body-sm)", gap: 6, radius: "var(--radius-sm)" },
    md: { height: 40, padding: "0 18px", font: "var(--fs-body-sm)", gap: 8, radius: "var(--radius-md)" },
    lg: { height: 48, padding: "0 24px", font: "var(--fs-body)", gap: 8, radius: "var(--radius-lg)" },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: "var(--brand-primary)",
      color: "var(--brand-on-primary)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-glow-soft)",
    },
    brand: {
      background: "var(--gradient-brand)",
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-glow)",
    },
    secondary: {
      background: "var(--surface-2)",
      color: "var(--text-primary)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
    danger: {
      background: "var(--color-error-bg)",
      color: "var(--color-error)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="bsc-btn"
      data-variant={variant}
      whileHover={disabled ? undefined : { opacity: 0.88 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-wide)",
        borderRadius: s.radius,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
        whiteSpace: "nowrap",
        ...v,
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: "inline-flex", flex: "none" }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: "inline-flex", flex: "none" }}>{iconRight}</span>}
    </motion.button>
  );
}
