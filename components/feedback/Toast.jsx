import React from "react";

/**
 * Toast — transient notification chip. tone: neutral|success|error|info
 */
export function Toast({ title, description, tone = "neutral", icon = null, onClose, action, style = {} }) {
  const tones = {
    neutral: "var(--text-secondary)",
    success: "var(--color-success)",
    error: "var(--color-error)",
    info: "var(--color-info)",
  };
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        minWidth: 280,
        maxWidth: 420,
        padding: "14px 16px",
        background: "var(--surface-glass-heavy)",
        WebkitBackdropFilter: "var(--glass-blur)",
        backdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        animation: "bscToast var(--motion-slow) var(--ease-spring)",
        ...style,
      }}
    >
      <span style={{ width: 6, alignSelf: "stretch", borderRadius: "var(--radius-pill)", background: tones[tone], flex: "none" }} />
      {icon && <span style={{ display: "inline-flex", color: tones[tone], flex: "none", marginTop: 1 }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>{title}</div>
        {description && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", marginTop: 2 }}>{description}</div>}
        {action && <div style={{ marginTop: 10 }}>{action}</div>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss"
          style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 2, flex: "none" }}>×</button>
      )}
      <style>{`@keyframes bscToast { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
