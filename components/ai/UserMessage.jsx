import React from "react";

/**
 * UserMessage — right-aligned prompt bubble. Soft pill on surface-2.
 */
export function UserMessage({ children, timestamp, style = {} }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", ...style }}>
      <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <div
          style={{
            padding: "12px 18px",
            background: "var(--surface-2)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)",
            borderBottomRightRadius: "var(--radius-xs)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-body)",
            lineHeight: "var(--lh-normal)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-wide)",
          }}
        >
          {children}
        </div>
        {timestamp && <span style={{ fontSize: "var(--fs-micro)", color: "var(--text-disabled)", paddingRight: 4 }}>{timestamp}</span>}
      </div>
    </div>
  );
}
