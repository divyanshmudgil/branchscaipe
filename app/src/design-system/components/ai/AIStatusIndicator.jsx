import React from "react";

/**
 * AIStatusIndicator — the assistant's live status. state: thinking | typing | streaming | idle
 * Renders a soft aurora dot + animated label. "thinking" shows three drifting dots.
 */
export function AIStatusIndicator({ state = "thinking", label, style = {} }) {
  const meta = {
    thinking: { text: "Thinking", dots: true },
    typing: { text: "Typing", dots: true },
    streaming: { text: "Responding", dots: false },
    idle: { text: "Ready", dots: false },
  };
  const m = meta[state] || meta.thinking;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, ...style }}>
      <span style={{ position: "relative", width: 22, height: 22, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--gradient-brand)", opacity: 0.25, animation: state === "idle" ? "none" : "bscHalo 2s var(--ease-calm) infinite" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow-soft)" }} />
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center" }}>
        {label || m.text}
        {m.dots && (
          <span style={{ display: "inline-flex", marginLeft: 3 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 4, height: 4, margin: "0 1px", borderRadius: "50%", background: "var(--text-muted)", animation: `bscDot 1.4s ${i * 0.2}s var(--ease-standard) infinite` }} />
            ))}
          </span>
        )}
      </span>
      <style>{`
        @keyframes bscHalo { 0%,100% { transform: scale(1); opacity: 0.25; } 50% { transform: scale(1.5); opacity: 0; } }
        @keyframes bscDot { 0%,60%,100% { opacity: 0.25; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }
      `}</style>
    </div>
  );
}
