import React from "react";

/**
 * Status / count badge. tone: neutral | brand | success | warning | error | info | new
 */
export function Badge({ children, tone = "neutral", soft = true, dot = false, style = {}, ...rest }) {
  const tones = {
    neutral: { bg: "var(--surface-3)", fg: "var(--text-secondary)", solidBg: "var(--text-secondary)" },
    brand: { bg: "var(--brand-primary-soft)", fg: "var(--text-brand)", solidBg: "var(--brand-primary)" },
    success: { bg: "var(--color-success-bg)", fg: "var(--color-success)", solidBg: "var(--color-success)" },
    warning: { bg: "var(--color-warning-bg)", fg: "var(--color-warning)", solidBg: "var(--color-warning)" },
    error: { bg: "var(--color-error-bg)", fg: "var(--color-error)", solidBg: "var(--color-error)" },
    info: { bg: "var(--color-info-bg)", fg: "var(--color-info)", solidBg: "var(--color-info)" },
    new: { bg: "var(--brand-accent)", fg: "var(--text-on-accent)", solidBg: "var(--brand-accent)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        height: 20,
        padding: "0 8px",
        borderRadius: "var(--radius-pill)",
        background: soft ? t.bg : t.solidBg,
        color: soft ? t.fg : "#fff",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-micro)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: soft ? t.fg : "#fff" }} />}
      {children}
    </span>
  );
}
