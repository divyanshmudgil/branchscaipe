import React from "react";

/**
 * Tooltip — hover label. Soft, dark glass chip. side: top|bottom|left|right
 */
export function Tooltip({ children, content, side = "top", style = {} }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  };
  return (
    <span
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: "var(--z-tooltip)",
            whiteSpace: "nowrap",
            padding: "6px 10px",
            background: "var(--surface-inverse)",
            color: "var(--text-inverse)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-caption)",
            fontWeight: "var(--weight-medium)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-md)",
            pointerEvents: "none",
            animation: "bscTip var(--motion-fast) var(--ease-out)",
            ...pos[side],
          }}
        >
          {content}
        </span>
      )}
      <style>{`@keyframes bscTip { from { opacity: 0; transform: ${pos[side].transform || ""} scale(0.94); } }`}</style>
    </span>
  );
}
