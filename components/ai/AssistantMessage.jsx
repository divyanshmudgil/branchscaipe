import React from "react";
import { glyph } from "./glyphs.jsx";

/**
 * AssistantMessage — left-aligned response with the signature action toolbar
 * (Copy · Branch · Retry · Merge · More). Branch carries a "NEW" affordance.
 * actions: subset of ["copy","branch","retry","merge","more"]
 */
export function AssistantMessage({
  children,
  actions = ["copy", "branch", "retry", "more"],
  onAction,
  branchNew = false,
  showActions = true,
  style = {},
}) {
  const [hover, setHover] = React.useState(false);

  const labels = {
    copy: "Copy", branch: "Branch", retry: "Retry", merge: "Merge", more: "",
  };
  const icons = {
    copy: "copy", branch: "git-branch", retry: "rotate-ccw", merge: "git-merge", more: "more-horizontal",
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", ...style }}
    >
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body)",
          lineHeight: "var(--lh-relaxed)",
          color: "var(--text-primary)",
          letterSpacing: "var(--tracking-wide)",
          maxWidth: "100%",
        }}
      >
        {children}
      </div>

      {showActions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            opacity: hover ? 1 : 0.0,
            transform: hover ? "none" : "translateY(-2px)",
            transition: "opacity var(--motion-fast) var(--ease-standard), transform var(--motion-fast) var(--ease-standard)",
          }}
        >
          {actions.map((a) => {
            const labeled = a !== "more";
            return (
              <button
                key={a}
                type="button"
                onClick={() => onAction && onAction(a)}
                title={labels[a] || "More"}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  height: 32,
                  padding: labeled ? "0 12px" : "0",
                  width: labeled ? "auto" : 32,
                  justifyContent: "center",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  color: a === "branch" ? "var(--text-brand)" : "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--fs-body-sm)",
                  fontWeight: "var(--weight-medium)",
                  cursor: "pointer",
                  transition: "var(--transition-base)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-2)"; }}
              >
                {glyph(icons[a], { size: 15 })}
                {labeled && (labels[a])}
                {a === "branch" && branchNew && (
                  <span style={{ position: "absolute", top: -7, right: -8, background: "var(--brand-accent)", color: "var(--text-on-accent)", fontSize: 8, fontWeight: 700, lineHeight: 1, padding: "2px 4px", borderRadius: "var(--radius-xs)", letterSpacing: ".02em" }}>NEW</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
