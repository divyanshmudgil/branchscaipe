import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * Composer — the message input bar. Glass pill with placeholder, +, Tools, Send.
 * Shows a "Branching from …" context chip when composing inside a branch.
 */
export function Composer({
  value = "",
  onChange,
  onSend,
  placeholder = "Ask me anything…",
  branchingFrom = null,
  tools = true,
  disabled = false,
  style = {},
}) {
  const canSend = value && value.trim().length > 0 && !disabled;
  return (
    <div style={{ width: "100%", maxWidth: "var(--composer-max)", margin: "0 auto", ...style }}>
      {branchingFrom && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8, marginLeft: 6, padding: "4px 10px", background: "var(--brand-primary-soft)", color: "var(--text-brand)", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", fontWeight: "var(--weight-medium)" }}>
          {glyph("git-branch", { size: 13 })}
          Branching from {branchingFrom}
        </div>
      )}
      <div
        style={{
          background: "var(--surface-glass-heavy)",
          WebkitBackdropFilter: "var(--glass-blur)",
          backdropFilter: "var(--glass-blur)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-md)",
          padding: "14px 16px 10px",
        }}
      >
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); canSend && onSend && onSend(); } }}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-body)",
            lineHeight: "var(--lh-normal)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-wide)",
            minHeight: 22,
            maxHeight: 160,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button type="button" title="Attach" style={btn}><span style={{ fontSize: 22, lineHeight: 1, color: "var(--text-muted)", fontWeight: 300 }}>+</span></button>
            {tools && (
              <button type="button" style={{ ...btn, width: "auto", padding: "0 10px", gap: 6, color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--weight-medium)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="var(--surface-1)"/><circle cx="15" cy="12" r="2" fill="var(--surface-1)"/><circle cx="9" cy="18" r="2" fill="var(--surface-1)"/></svg>
                Tools
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => canSend && onSend && onSend()}
            disabled={!canSend}
            aria-label="Send"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: "var(--radius-full)",
              border: "none",
              background: canSend ? "var(--gradient-brand)" : "var(--surface-3)",
              color: canSend ? "#fff" : "var(--text-disabled)",
              boxShadow: canSend ? "var(--shadow-glow-soft)" : "none",
              cursor: canSend ? "pointer" : "not-allowed",
              transition: "var(--transition-base)",
            }}
          >
            {glyph("send", { size: 18 })}
          </button>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 8, fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-disabled)" }}>AI can make mistakes</div>
    </div>
  );
}

const btn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: "transparent",
  cursor: "pointer",
};
