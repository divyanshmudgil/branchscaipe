import React from "react";

/**
 * Select / dropdown. Headless-ish: opens a soft menu of options.
 * options: [{value,label,icon?}]
 */
export function Select({ value, onChange, options = [], placeholder = "Select…", disabled = false, style = {} }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", width: "100%", ...style }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          height: 44,
          padding: "0 14px",
          background: "var(--surface-1)",
          border: `1.5px solid ${open ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-md)",
          boxShadow: open ? "var(--ring-focus)" : "var(--shadow-xs)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body)",
          color: selected ? "var(--text-primary)" : "var(--text-muted)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "var(--transition-base)",
        }}
      >
        {selected?.icon}
        <span style={{ flex: 1, textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {selected ? selected.label : placeholder}
        </span>
        <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--motion-fast)", color: "var(--text-muted)" }}>▾</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: "var(--z-dropdown)",
            padding: 6,
            background: "var(--surface-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            animation: "bscPop var(--motion-medium) var(--ease-out)",
          }}
        >
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange && onChange(o.value); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "9px 10px",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: active ? "var(--surface-selected)" : "transparent",
                  color: active ? "var(--text-brand)" : "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--fs-body-sm)",
                  fontWeight: active ? "var(--weight-semibold)" : "var(--weight-regular)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-hover)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {o.icon}
                {o.label}
              </button>
            );
          })}
        </div>
      )}
      <style>{`@keyframes bscPop { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
