// Sidebar — v5. Animated gradient identity, collapsed chat-list hidden,
// profile dropdown uses fixed positioning to escape overflow:hidden clipping,
// icon centering improved for collapsed state.
import React from "react";
import ReactDOM from "react-dom";
import { Avatar } from "./design-system/components/core/index.js";
import { Icon as I } from "./Icon.jsx";

function ChatListItem({ chat, active, expanded, onClick }) {
  const [hover, setHover] = React.useState(false);
  const bg = active
    ? "var(--surface-selected)"
    : hover ? "var(--surface-hover)" : "transparent";
  return (
    <button
      type="button" onClick={onClick} title={chat.name}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 9, width: "100%", height: 36,
        padding: "0 8px", background: bg,
        border: active ? "1px solid var(--border-brand)" : "1px solid transparent",
        borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left", flex: "none",
        transition: "background var(--motion-fast) var(--ease-standard)",
      }}
    >
      <span style={{ display: "inline-flex", flex: "none", color: active ? "var(--brand-primary)" : "var(--text-muted)" }}>
        <I name="message-square" size={14} />
      </span>
      <span style={{
        flex: 1, minWidth: 0,
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)",
        fontWeight: active ? 600 : 500,
        color: active ? "var(--text-brand)" : "var(--text-primary)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {chat.name}
      </span>
    </button>
  );
}

// ProfileMenu — uses position:fixed so it escapes the sidebar's overflow:hidden.
// anchorRect: the profile button's getBoundingClientRect() captured at open time.
function ProfileMenu({ theme, anchorRect, onClose, onThemeToggle, onShortcuts, onSettings }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("keydown", k);
    };
  }, []);

  // Position above the button, left-aligned with it, never off-screen
  const menuW = 228;
  const left = anchorRect
    ? Math.min(anchorRect.left, window.innerWidth - menuW - 12)
    : 12;
  const bottom = anchorRect
    ? window.innerHeight - anchorRect.top + 8
    : 80;

  const menuItem = (icon, label, onClick, danger) => (
    <button
      type="button"
      onClick={() => { onClick(); onClose(); }}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "9px 10px", border: "none", borderRadius: "var(--radius-sm)",
        background: "transparent",
        color: danger ? "var(--color-error)" : "var(--text-primary)",
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)",
        fontWeight: 500, cursor: "pointer", textAlign: "left",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = danger ? "var(--color-error-bg)" : "var(--surface-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ display: "inline-flex", color: danger ? "var(--color-error)" : "var(--text-muted)" }}>
        <I name={icon} size={16} />
      </span>
      {label}
    </button>
  );

  // Rendered via a portal straight to <body> — position:fixed alone is NOT enough to
  // escape an ancestor's overflow:hidden (the sidebar clips fixed descendants too,
  // since they're still DOM descendants of it). A portal removes it from that subtree
  // entirely so it can truly float above everything, uncropped.
  return ReactDOM.createPortal(
    <div ref={ref} style={{
      position: "fixed", left, bottom, zIndex: 9999,
      width: menuW, padding: 6,
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)", animation: "bscPop var(--motion-fast) var(--ease-out)",
    }}>
      <div style={{ padding: "8px 12px 10px", borderBottom: "1px solid var(--border-subtle)", marginBottom: 6 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 700, color: "var(--text-primary)" }}>Divyansh Mudgil</div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)" }}>divyansh@example.com · Pro plan</div>
      </div>
      {menuItem("user", "Profile", () => {})}
      {menuItem(
        theme === "dark" ? "sun" : "moon",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        onThemeToggle
      )}
      {menuItem("keyboard", "Keyboard shortcuts", onShortcuts)}
      {menuItem("settings", "Settings", onSettings)}
      <div style={{ height: 1, background: "var(--border-subtle)", margin: "6px 4px" }} />
      {menuItem("log-out", "Sign out", () => {}, true)}
    </div>,
    document.body
  );
}

// SidebarItem — nav button; perfectly centres icon when collapsed.
function SidebarItem({ icon, label, onClick, active, badge, accent, expanded }) {
  const [hover, setHover] = React.useState(false);
  const bg = active ? "var(--surface-selected)" : hover ? "var(--surface-hover)" : "transparent";
  const col = active ? "var(--text-brand)" : "var(--text-secondary)";
  return (
    <button
      type="button" onClick={onClick} title={expanded ? undefined : label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center",
        gap: expanded ? 10 : 0,
        width: "100%", height: 40,
        padding: expanded ? "0 8px" : "0",
        justifyContent: expanded ? "flex-start" : "center",
        textAlign: "left",
        border: "none", borderRadius: "var(--radius-md)",
        background: bg, color: col,
        cursor: "pointer", position: "relative", flex: "none",
        transition: "background var(--motion-fast) var(--ease-standard), color var(--motion-fast) var(--ease-standard)",
      }}
    >
      <span style={{ display: "inline-flex", flex: "none", color: accent && !active ? "var(--brand-primary)" : "inherit" }}>
        <I name={icon} size={18} />
      </span>

      {/* Label — zero-width + invisible when collapsed so it doesn't affect icon position */}
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: active ? 600 : 500,
        whiteSpace: "nowrap",
        flex: expanded ? 1 : "none",
        width: expanded ? "auto" : 0, overflow: "hidden",
        opacity: expanded ? 1 : 0,
        transition: "opacity var(--motion-fast) var(--ease-standard)",
      }}>{label}</span>

      {/* Badge (expanded) */}
      <span style={{
        flex: "none", fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700,
        color: "var(--text-brand)", background: "var(--brand-primary-soft)", borderRadius: "var(--radius-pill)",
        padding: "2px 7px", minWidth: 18, textAlign: "center",
        display: (badge != null && badge > 0 && expanded) ? "block" : "none",
      }}>{badge}</span>

      {/* Dot indicator (collapsed) */}
      <span style={{
        position: "absolute", top: 7, right: expanded ? 10 : 8,
        width: 6, height: 6, borderRadius: "50%", background: "var(--brand-primary)",
        display: (badge != null && badge > 0 && !expanded) ? "block" : "none",
      }} />
    </button>
  );
}

export function Sidebar({
  expanded, onToggle, activePanel, onOpenPanel,
  onNewChat, onSearch, onSettings,
  branchCount, starCount, theme,
  rootChats, activeChatId, onSelectChat,
  onThemeToggle, onProfileAction,
}) {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [profileRect, setProfileRect] = React.useState(null);
  const [toggleHover, setToggleHover] = React.useState(false);
  const profileBtnRef = React.useRef(null);

  const W = expanded ? 264 : 68;
  const it = (p) => <SidebarItem {...p} expanded={expanded} />;

  const handleProfileToggle = () => {
    if (!profileOpen && profileBtnRef.current) {
      setProfileRect(profileBtnRef.current.getBoundingClientRect());
    }
    setProfileOpen(v => !v);
  };

  // Wordmark with "AI" in brand gradient
  const wordmark = (
    <div className="bsc-wordmark" style={{
      fontSize: 13, letterSpacing: "0.06em", display: "inline-flex", alignItems: "baseline",
      marginLeft: expanded ? 8 : 0,
      width: expanded ? "auto" : 0, overflow: "hidden",
      opacity: expanded ? 1 : 0,
      transition: "opacity var(--motion-fast) var(--ease-standard)",
    }}>
      <span style={{ color: "var(--text-primary)" }}>BRANCHSC</span>
      <span style={{
        background: "var(--gradient-brand)",
        WebkitBackgroundClip: "text", backgroundClip: "text",
        WebkitTextFillColor: "transparent", color: "transparent",
      }}>AI</span>
      <span style={{ color: "var(--text-primary)" }}>PE</span>
    </div>
  );

  return (
    // bsc-sidebar class provides animated gradient (see app.css)
    <div
      className="bsc-sidebar"
      style={{
        width: W, flex: "none", display: "flex", flexDirection: "column", alignItems: "stretch", gap: 2,
        padding: "12px 8px",
        WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
        borderRight: "1px solid var(--border-subtle)", zIndex: "var(--z-rail)",
        overflow: "hidden",
        transition: "width var(--motion-medium) var(--ease-out)",
      }}
    >
      {/* Brand + toggle */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: expanded ? "space-between" : "center",
        height: 44, marginBottom: 2, flex: "none",
      }}>
        {wordmark}
          <button
            type="button" onClick={onToggle} aria-label="Toggle sidebar"
            title={expanded ? "Collapse sidebar" : "Expand sidebar"}
            onMouseEnter={() => setToggleHover(true)}
            onMouseLeave={() => setToggleHover(false)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36, flex: "none",
              border: "none", borderRadius: "var(--radius-md)",
              background: toggleHover ? "var(--surface-hover)" : "transparent",
              color: "var(--text-secondary)", cursor: "pointer",
              transition: "background var(--motion-fast) var(--ease-standard)",
            }}
          >
            <I name="panel-left" size={18} />
          </button>
      </div>

      {it({ icon: "square-pen", label: "New chat", onClick: onNewChat, accent: true })}
      {it({ icon: "search",     label: "Search",   onClick: onSearch })}

      <div style={{ height: 1, background: "var(--border-subtle)", margin: "4px 2px" }} />

      {/* ── Chat list: ONLY rendered when expanded ───────────────────────
          Container keeps flex:1 so layout below stays anchored to the bottom.
          When collapsed the space is empty — no chat icons visible.          */}
      <div
        className="bsc-scroll"
        style={{
          flex: 1, minHeight: 0,
          overflowY: expanded ? "auto" : "hidden",
          display: "flex", flexDirection: "column", gap: 1, paddingBottom: 4,
        }}
      >
        {expanded && rootChats.length === 0 && (
          <div style={{
            padding: "20px 8px", textAlign: "center",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)",
            color: "var(--text-muted)", lineHeight: 1.5,
          }}>
            No conversations yet.<br />Start a new chat above.
          </div>
        )}
        {/* Only render chat rows when expanded — collapsed shows no chat icons */}
        {expanded && rootChats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            expanded={true}
            active={chat.id === activeChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>

      <div style={{ height: 1, background: "var(--border-subtle)", margin: "4px 2px" }} />

      {it({
        icon: "git-branch", label: "Branches",
        onClick: () => onOpenPanel("branches"),
        active: activePanel === "branches", badge: branchCount,
      })}
      {it({
        icon: "star", label: "Starred",
        onClick: () => onOpenPanel("starred"),
        active: activePanel === "starred", badge: starCount,
      })}
      {it({
        icon: "history", label: "History",
        onClick: () => onOpenPanel("history"),
        active: activePanel === "history",
      })}

      <div style={{ height: 1, background: "var(--border-subtle)", margin: "4px 2px" }} />

      {it({ icon: "settings", label: "Settings", onClick: onSettings })}

      {/* Profile with dropdown — menu uses position:fixed to escape overflow:hidden */}
      <div style={{ position: "relative", flex: "none" }}>
        {profileOpen && (
          <ProfileMenu
            theme={theme}
            anchorRect={profileRect}
            onClose={() => setProfileOpen(false)}
            onThemeToggle={onThemeToggle}
            onShortcuts={() => { onProfileAction("shortcuts"); setProfileOpen(false); }}
            onSettings={() => { onSettings(); setProfileOpen(false); }}
          />
        )}
        <button
          ref={profileBtnRef}
          type="button"
          onClick={handleProfileToggle}
          style={{
            display: "flex", alignItems: "center", gap: expanded ? 10 : 0,
            width: "100%", height: 44,
            padding: expanded ? "0 6px" : "0",
            justifyContent: expanded ? "flex-start" : "center",
            border: "none", borderRadius: "var(--radius-md)",
            background: profileOpen ? "var(--surface-hover)" : "transparent",
            cursor: "pointer",
            transition: "background var(--motion-fast) var(--ease-standard)",
          }}
          onMouseEnter={(e) => { if (!profileOpen) e.currentTarget.style.background = "var(--surface-hover)"; }}
          onMouseLeave={(e) => { if (!profileOpen) e.currentTarget.style.background = "transparent"; }}
        >
          <Avatar name="Divyansh Mudgil" kind="user" size={30} style={{ background: "var(--c-aurora-mint)", flex: "none" }} />
          <div style={{
            minWidth: 0, overflow: "hidden",
            width: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
            transition: "opacity var(--motion-fast) var(--ease-standard)",
          }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>Divyansh Mudgil</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Pro plan</div>
          </div>
        </button>
      </div>
    </div>
  );
}
