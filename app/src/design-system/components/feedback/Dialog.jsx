import React from "react";

/**
 * Dialog — centered modal over a scrim. Use for merge confirmation, settings.
 */
export function Dialog({ open, onClose, title, description, children, footer, width = 460, style = {} }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "var(--scrim)",
        WebkitBackdropFilter: "blur(4px)",
        backdropFilter: "blur(4px)",
        animation: "bscScrim var(--motion-fast) var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          width,
          maxWidth: "100%",
          padding: "26px",
          background: "var(--surface-elevated)",
          border: "1px solid transparent",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-xl)",
          animation: "bscDialog var(--motion-slow) var(--ease-spring)",
          ...style,
        }}
      >
        {title && <div style={{ font: "var(--text-h3)", color: "var(--text-primary)" }}>{title}</div>}
        {description && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--text-muted)", marginTop: 8, lineHeight: "var(--lh-normal)" }}>{description}</div>}
        {children && <div style={{ marginTop: 18 }}>{children}</div>}
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>{footer}</div>}
      </div>
      <style>{`
        @keyframes bscScrim { from { opacity: 0; } }
        @keyframes bscDialog { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
