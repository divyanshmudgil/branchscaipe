import React from "react";

/**
 * Menu — floating action list (context / more menus). items: [{id,label,icon?,danger?,divider?}]
 * Render anchored by the caller; this is the panel + optional trigger wrapper.
 */
export function Menu({ items = [], onSelect, trigger, open: controlledOpen, onOpenChange, align = "left", style = {} }) {
  const [uOpen, setUOpen] = React.useState(false);
  const open = controlledOpen != null ? controlledOpen : uOpen;
  const setOpen = (v) => { onOpenChange ? onOpenChange(v) : setUOpen(v); };
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", ...style }}>
      {trigger && <span onClick={() => setOpen(!open)}>{trigger}</span>}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            [align]: 0,
            zIndex: "var(--z-dropdown)",
            minWidth: 200,
            padding: 6,
            background: "var(--surface-glass-heavy)",
            WebkitBackdropFilter: "var(--glass-blur)",
            backdropFilter: "var(--glass-blur)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            animation: "bscMenu var(--motion-medium) var(--ease-out)",
          }}
        >
          {items.map((it, i) =>
            it.divider ? (
              <div key={i} style={{ height: 1, background: "var(--border-subtle)", margin: "6px 4px" }} />
            ) : (
              <button
                key={it.id || i}
                type="button"
                onClick={() => { onSelect && onSelect(it.id); it.onClick && it.onClick(); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "9px 10px",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: "transparent",
                  color: it.danger ? "var(--color-error)" : "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--fs-body-sm)",
                  fontWeight: "var(--weight-medium)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = it.danger ? "var(--color-error-bg)" : "var(--surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {it.icon && <span style={{ display: "inline-flex", color: it.danger ? "var(--color-error)" : "var(--text-muted)", flex: "none" }}>{it.icon}</span>}
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.shortcut && <span style={{ color: "var(--text-muted)", fontSize: "var(--fs-micro)" }}>{it.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
      <style>{`@keyframes bscMenu { from { opacity: 0; transform: translateY(-6px) scale(0.97); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
