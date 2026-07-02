import React from "react";

/**
 * Drawer — slide-in panel from a side. Used for branch navigator, settings, knowledge base.
 */
export function Drawer({ open, onClose, side = "right", width = 360, title, children, glass = true, style = {} }) {
  if (!open) return null;
  const fromX = side === "right" ? "100%" : "-100%";
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        display: "flex",
        justifyContent: side === "right" ? "flex-end" : "flex-start",
        background: "var(--scrim)",
        animation: "bscScrim var(--motion-fast) var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "92%",
          height: "100%",
          padding: "22px",
          background: glass ? "var(--surface-glass-heavy)" : "var(--surface-1)",
          WebkitBackdropFilter: glass ? "var(--glass-blur)" : "none",
          backdropFilter: glass ? "var(--glass-blur)" : "none",
          borderLeft: side === "right" ? "1px solid var(--border-subtle)" : "none",
          borderRight: side === "left" ? "1px solid var(--border-subtle)" : "none",
          boxShadow: "var(--shadow-xl)",
          animation: `bscDrawer var(--motion-slow) var(--ease-calm)`,
          overflowY: "auto",
          ...style,
        }}
      >
        {title && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ font: "var(--text-h4)", color: "var(--text-primary)" }}>{title}</div>
            <button type="button" onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
          </div>
        )}
        {children}
      </div>
      <style>{`
        @keyframes bscScrim { from { opacity: 0; } }
        @keyframes bscDrawer { from { transform: translateX(${fromX}); } to { transform: none; } }
      `}</style>
    </div>
  );
}
