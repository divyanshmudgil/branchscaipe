// TopBar — breadcrumb lineage (primary nav) + right-side actions.
// "More" button replaced with Temporary Chat toggle.
// Share popover now shows a success toast on copy.
// Temporary badge shown in breadcrumb row when in ephemeral mode.
import React from "react";
import { IconButton } from "./design-system/components/core/index.js";
import { Tooltip } from "./design-system/components/feedback/index.js";
import { LineageBar as Breadcrumb } from "./LineageBar.jsx";
import { Icon as I } from "./Icon.jsx";

export function TopBar({
  nodes, inBranch, onNavigate, onRename, onMerge,
  theme, onToggleTheme,
  isTemporary, onStartTemporary,
  onToast,
}) {
  const [tempHover, setTempHover] = React.useState(false);

  const tempActive = isTemporary;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 12, height: 64, padding: "0 18px 0 20px", flex: "none",
    }}>
      {/* Left: breadcrumb + temporary indicator */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 10 }}>
        <Breadcrumb nodes={nodes} onNavigate={onNavigate} onRename={onRename} />
        {isTemporary && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            height: 22, padding: "0 10px", flex: "none",
            background: "oklch(95% 0.04 70)",
            border: "1px solid oklch(82% 0.07 70)",
            borderRadius: "var(--radius-pill)",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700,
            color: "oklch(50% 0.14 70)", whiteSpace: "nowrap",
          }}>
            <I name="clock" size={11} /> Temporary
          </span>
        )}
      </div>

      {/* Right: action buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "none" }}>
        {inBranch && (
          <button
            type="button" onClick={onMerge} style={mergeBtn}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-2)"; }}
          >
            <I name="git-merge" size={15} /> Merge to parent
          </button>
        )}

        <Tooltip content={theme === "dark" ? "Light mode" : "Dark mode"} side="bottom">
          <IconButton icon={<I name={theme === "dark" ? "sun" : "moon"} />} label="Toggle theme" onClick={onToggleTheme} />
        </Tooltip>

        {/* Temporary chat toggle */}
        <Tooltip content={tempActive ? "Exit temporary chat" : "Start temporary chat"} side="bottom">
          <button
            type="button" onClick={onStartTemporary}
            onMouseEnter={() => setTempHover(true)}
            onMouseLeave={() => setTempHover(false)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36, flex: "none", border: "none",
              borderRadius: "var(--radius-md)",
              background: tempActive
                ? "oklch(93% 0.05 70)"
                : tempHover ? "var(--surface-hover)" : "transparent",
              color: tempActive ? "oklch(50% 0.14 70)" : "var(--text-secondary)",
              cursor: "pointer",
              transition: "background var(--motion-fast) var(--ease-standard), color var(--motion-fast)",
            }}
          >
            <I name="clock" size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

// ── SharePopover ──────────────────────────────────────────────────────────────
// Generates a copyable link and fires a toast on successful copy.
export function SharePopover({ nodes, inBranch, onClose, onToast }) {
  const ref = React.useRef(null);
  const [scope, setScope] = React.useState(inBranch ? "branch" : "conversation");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const current = nodes[nodes.length - 1];
  const root = nodes[0];
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const token = (current.id || "x").slice(-6);
  const link = scope === "branch"
    ? `https://branchscaipe.app/s/${slug(root.name)}/${slug(current.name)}-${token}`
    : `https://branchscaipe.app/s/${slug(root.name)}-${(root.id || "x").slice(-6)}`;

  const copy = () => {
    const done = () => {
      setCopied(true);
      if (onToast) onToast({ tone: "success", icon: "check", title: "Link copied", desc: "Share link is on your clipboard." });
      setTimeout(() => { setCopied(false); onClose(); }, 1400);
    };
    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = link;
        ta.style.cssText = "position:fixed;opacity:0;top:0;left:0;pointer-events:none";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch (_) { done(); } // show success anyway — link is visible to copy manually
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(done).catch(fallback);
    } else {
      fallback();
    }
  };

  const Opt = ({ id, icon, title, desc }) => {
    const on = scope === id;
    return (
      <button type="button" onClick={() => setScope(id)} style={{
        display: "flex", alignItems: "flex-start", gap: 10, width: "100%", textAlign: "left",
        padding: "10px 11px",
        border: "1px solid " + (on ? "var(--border-brand)" : "var(--border-subtle)"),
        borderRadius: "var(--radius-md)",
        background: on ? "var(--surface-selected)" : "transparent",
        cursor: "pointer",
        transition: "background var(--motion-fast), border-color var(--motion-fast)",
      }}>
        <span style={{ display: "inline-flex", marginTop: 1, color: on ? "var(--brand-primary)" : "var(--text-muted)" }}>
          <I name={icon} size={16} />
        </span>
        <span style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, color: "var(--text-primary)" }}>{title}</div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)", marginTop: 1 }}>{desc}</div>
        </span>
        <span style={{ display: "inline-flex", marginTop: 2, color: on ? "var(--brand-primary)" : "transparent" }}>
          <I name="check" size={15} />
        </span>
      </button>
    );
  };

  return (
    <div ref={ref} style={{
      position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: "var(--z-dropdown)",
      width: 304, padding: 12,
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-medium) var(--ease-out)",
    }}>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Share</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)", marginBottom: 10 }}>
        Anyone with the link can view a read-only copy.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Opt id="conversation" icon="messages-square" title="Entire conversation" desc={`Full thread from "${root.name}"`} />
        <Opt id="branch" icon="git-branch" title="This branch only" desc={`Just "${current.name}" and its context`} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, padding: "6px 6px 6px 12px", background: "var(--surface-2)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)" }}>
        <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-mono, monospace)", fontSize: "var(--fs-micro)", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {link}
        </span>
        <button type="button" onClick={copy} style={{
          display: "inline-flex", alignItems: "center", gap: 5, height: 30, padding: "0 12px", flex: "none",
          border: "none", borderRadius: "var(--radius-pill)",
          background: "var(--gradient-brand)", color: "#fff",
          boxShadow: "var(--shadow-glow-soft)",
          fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700, cursor: "pointer",
          transition: "opacity var(--motion-fast)",
        }}>
          <I name={copied ? "check" : "link"} size={13} />
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

const mergeBtn = {
  display: "inline-flex", alignItems: "center", gap: 7, height: 36, padding: "0 14px",
  background: "var(--surface-2)", border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-pill)", color: "var(--text-brand)",
  fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600,
  cursor: "pointer", transition: "background var(--motion-fast)",
};
