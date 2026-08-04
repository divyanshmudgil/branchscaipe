// LandingBackground — placeholder decorative layer for the landing screen.
// Intentionally minimal (a static aurora-tinted gradient using existing
// design tokens) so the landing page isn't bare while a real animated
// background (ReactBits) is wired in later. Swap the contents of this
// component only — Landing.tsx just renders it behind the foreground
// content and never needs to change.
import React from "react";

export function LandingBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          width: "min(1100px, 140vw)",
          height: "min(1100px, 140vw)",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "var(--gradient-brand)",
          opacity: 0.16,
          filter: "blur(120px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "-10%",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          borderRadius: "50%",
          background: "var(--c-aurora-mint)",
          opacity: 0.12,
          filter: "blur(140px)",
        }}
      />
    </div>
  );
}
