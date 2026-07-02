import React from "react";

/**
 * Avatar — user or assistant. Falls back to initials over an aurora tint.
 */
export function Avatar({ src, name = "", size = 36, kind = "user", style = {}, ...rest }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const tints = {
    user: "var(--c-aurora-mint)",
    assistant: "var(--gradient-brand)",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flex: "none",
        borderRadius: "var(--radius-full)",
        background: src ? "transparent" : tints[kind] || tints.user,
        color: kind === "assistant" ? "#fff" : "var(--c-ink-800)",
        fontFamily: "var(--font-sans)",
        fontSize: Math.round(size * 0.38),
        fontWeight: "var(--weight-semibold)",
        overflow: "hidden",
        boxShadow: "var(--shadow-xs)",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || (kind === "assistant" ? "AI" : "")
      )}
    </span>
  );
}
