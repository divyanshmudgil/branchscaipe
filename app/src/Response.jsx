// Response — assistant message with a streamlined action toolbar.
// Visible actions: Copy, Branch, Retry (the three most-used actions).
// Overflow menu: Star Response, Merge Response to Parent.
// Copy delegates clipboard work + toast to App via onAction("copy").
import React from "react";
import { Icon as I } from "./Icon.jsx";
import { relTime } from "./logic.js";

export function Response({ msg, inBranch, onAction, onContextMenu, onSelectText, registerRef }) {
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const bodyRef = React.useRef(null);
  const overflowRef = React.useRef(null);

  React.useEffect(() => {
    if (registerRef) registerRef(msg.id, bodyRef);
  }, [msg.id]);

  // Close overflow on outside click
  React.useEffect(() => {
    if (!overflowOpen) return;
    const h = (e) => {
      if (overflowRef.current && !overflowRef.current.contains(e.target)) setOverflowOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [overflowOpen]);

  // Copy: local icon state + delegate clipboard + toast to App
  const doCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
    onAction("copy", msg);
  };

  const handleMouseUp = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const text = sel.toString().trim();
    if (text.length < 2) return;
    if (!bodyRef.current || !bodyRef.current.contains(sel.anchorNode)) return;
    const r = sel.getRangeAt(0).getBoundingClientRect();
    onSelectText && onSelectText({ text, x: r.left + r.width / 2, y: r.top, msg });
  };

  // Overflow items: Star, Merge (conditionally)
  const overflowItems = [
    {
      id: "star",
      icon: msg.starred ? "star-off" : "star",
      label: msg.starred ? "Remove star" : "Star response",
      run: () => { onAction("star", msg); setOverflowOpen(false); },
    },
  ];
  if (inBranch) {
    overflowItems.push({
      id: "merge",
      icon: "git-merge",
      label: "Merge to parent",
      run: () => { onAction("merge", msg); setOverflowOpen(false); },
    });
  }

  const Btn = ({ icon, label, onClick, brand }) => (
    <button
      type="button" onClick={onClick} title={label}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, height: 30, padding: "0 11px",
        background: "var(--surface-2)", border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        color: brand ? "var(--text-brand)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 500,
        cursor: "pointer", transition: "background var(--motion-fast)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-2)"; }}
    >
      <I name={icon} size={14} /> {label}
    </button>
  );

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); }}
      onContextMenu={(e) => { e.preventDefault(); onContextMenu && onContextMenu(e, msg); }}
      style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}
    >
      {/* Topic chip + starred badge */}
      {(msg.topic || msg.starred) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {msg.topic && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 11px",
              background: "var(--surface-2)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-pill)",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 700, color: "var(--text-primary)",
            }}>
              {msg.topic}
            </span>
          )}
          {msg.starred && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5, height: 22, padding: "0 9px",
              background: "var(--color-warning-bg)", borderRadius: "var(--radius-pill)",
              color: "var(--color-warning)",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700,
            }}>
              <I name="star" size={11} /> Starred
            </span>
          )}
        </div>
      )}

      {/* Message body */}
      <div
        ref={bodyRef}
        onMouseUp={handleMouseUp}
        style={{
          fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
          lineHeight: "var(--lh-relaxed)", color: "var(--text-primary)",
          letterSpacing: "var(--tracking-wide)",
        }}
      >
        {msg.text.split("\n\n").map((p, k) => (
          <p key={k} style={{ margin: k === 0 ? 0 : "12px 0 0" }}>{p}</p>
        ))}
      </div>

      {/* Action toolbar: Copy · Branch · Retry + overflow */}
      <div style={{
        display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap",
        opacity: hover ? 1 : 0,
        transform: hover ? "none" : "translateY(-2px)",
        pointerEvents: hover ? "auto" : "none",
        transition: "opacity var(--motion-fast) var(--ease-standard), transform var(--motion-fast) var(--ease-standard)",
      }}>
        <Btn icon={copied ? "check" : "copy"} label={copied ? "Copied" : "Copy"} onClick={doCopy} />
        <Btn icon="git-branch" label="Branch" onClick={() => onAction("branch", msg)} brand />
        <Btn icon="rotate-ccw" label="Retry" onClick={() => onAction("retry", msg)} />

        {/* Overflow menu — Star + Merge */}
        <div style={{ position: "relative" }} ref={overflowRef}>
          <button
            type="button"
            onClick={() => setOverflowOpen(v => !v)}
            title="More actions"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 30, height: 30,
              background: overflowOpen ? "var(--surface-hover)" : "var(--surface-2)",
              border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)",
              color: "var(--text-secondary)", cursor: "pointer",
              transition: "background var(--motion-fast)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = overflowOpen ? "var(--surface-hover)" : "var(--surface-2)"; }}
          >
            <I name="more-horizontal" size={14} />
          </button>

          {overflowOpen && (
            <div style={{
              position: "absolute", bottom: "calc(100% + 6px)", left: 0, zIndex: 200,
              minWidth: 190, padding: 6,
              background: "var(--surface-glass-heavy)",
              WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              animation: "bscPop var(--motion-fast) var(--ease-out)",
            }}>
              {overflowItems.map(item => (
                <button
                  key={item.id} type="button" onClick={item.run}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "9px 10px", border: "none", borderRadius: "var(--radius-sm)",
                    background: "transparent", color: "var(--text-primary)",
                    fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)",
                    fontWeight: 500, cursor: "pointer", textAlign: "left",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ display: "inline-flex", color: "var(--text-muted)" }}>
                    <I name={item.icon} size={15} />
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MergeDivider ──────────────────────────────────────────────────────────────
export function MergeDivider({ source, ts, scope, onJump }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", margin: "6px 0" }}>
      <span style={{ flex: 1, height: 1, background: "var(--border-brand)" }} />
      <button type="button" onClick={onJump} title={`Go to ${source}`} style={{
        display: "inline-flex", alignItems: "center", gap: 8, height: 30, padding: "0 14px",
        background: "var(--gradient-branch)", border: "1px solid var(--border-brand)",
        borderRadius: "var(--radius-pill)", cursor: onJump ? "pointer" : "default", whiteSpace: "nowrap",
      }}>
        <span style={{ display: "inline-flex", color: "var(--brand-primary)" }}><I name="git-merge" size={14} /></span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, color: "var(--text-primary)" }}>
          Merged {scope === "response" ? "response" : "conversation"} from <b style={{ color: "var(--text-brand)" }}>{source}</b>
        </span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)" }}>
          · {relTime(ts)}
        </span>
      </button>
      <span style={{ flex: 1, height: 1, background: "var(--border-brand)" }} />
    </div>
  );
}

// ── BranchOriginBanner ────────────────────────────────────────────────────────
export function BranchOriginBanner({ parentName, seed, onJump }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", margin: "2px 0 4px" }}>
      <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
      <button type="button" onClick={onJump} title="Go to parent" style={{
        display: "inline-flex", alignItems: "center", gap: 7, border: "none",
        background: "transparent", color: "var(--text-muted)", cursor: onJump ? "pointer" : "default",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 500,
      }}>
        <span style={{ display: "inline-flex", color: "var(--brand-primary)" }}><I name="git-branch" size={14} /></span>
        Branched from <b style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{parentName}</b>
        {seed ? <span style={{ color: "var(--text-muted)" }}> · {seed}</span> : null}
      </button>
      <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
    </div>
  );
}
