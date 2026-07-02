import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * ToolCall — collapsible chip showing an AI tool invocation + status.
 * status: running | done | error
 */
export function ToolCall({ name = "search_web", summary, status = "done", children, defaultOpen = false, style = {} }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const statusMeta = {
    running: { color: "var(--color-info)", bg: "var(--color-info-bg)", text: "Running" },
    done: { color: "var(--color-success)", bg: "var(--color-success-bg)", text: "Done" },
    error: { color: "var(--color-error)", bg: "var(--color-error-bg)", text: "Failed" },
  };
  const m = statusMeta[status] || statusMeta.done;
  return (
    <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", background: "var(--surface-2)", overflow: "hidden", ...style }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ display: "inline-flex", color: "var(--text-muted)", flex: "none" }}>{glyph("sparkles", { size: 16 })}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--text-secondary)", flex: "none" }}>{name}</span>
        {summary && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{summary}</span>}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, flex: "none", color: m.color, background: m.bg, borderRadius: "var(--radius-pill)", padding: "2px 9px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.color, animation: status === "running" ? "bscPulse 1.2s var(--ease-standard) infinite" : "none" }} />
          {m.text}
        </span>
        <span style={{ display: "inline-flex", color: "var(--text-disabled)", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--motion-fast)" }}>{glyph("chevron-down", { size: 16 })}</span>
      </button>
      {open && children && (
        <div style={{ padding: "0 14px 14px 40px", fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>
          {children}
        </div>
      )}
      <style>{`@keyframes bscPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
    </div>
  );
}
