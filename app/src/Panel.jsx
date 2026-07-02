// Panel — the secondary navigation column raised by Branches / Starred / History.
// Never a modal: the chat stays visible and interactive beside it.
import React from "react";
import { Icon as I } from "./Icon.jsx";
import { relTime } from "./logic.js";

export function Panel({ kind, branches, rootId, activeId, onSelect, onClose, onRename, onContextMenu, starred, onJumpStar, onUnstar, editRequestId, onEditConsumed, fullScreen = false }) {
  const titles = { branches: "Branches", starred: "Starred", history: "History" };
  const subtitle = {
    branches: "Your conversation lineage. Select to switch — it's just like changing chats.",
    starred: "Responses you saved. Select to jump back to the moment.",
    history: "Every thread and branch, most recent first.",
  };

  // On mobile the panel takes over the whole screen (like ChatGPT's mobile History/
  // Search view) rather than sitting beside the chat, so picking something should
  // also close it — there's no chat visible behind it to reveal.
  const handleSelect = fullScreen ? (id) => { onSelect(id); onClose(); } : onSelect;

  return (
    <div className="bsc-panel" style={{
      width: fullScreen ? "100%" : 312, flex: "none", display: "flex", flexDirection: "column", minHeight: 0,
      background: "var(--surface-1)", borderRight: fullScreen ? "none" : "1px solid var(--border-subtle)",
      ...(fullScreen
        ? { position: "fixed", inset: 0, zIndex: "var(--z-modal)" }
        : { zIndex: 150 }),
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 14px 10px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--brand-primary)", display: "inline-flex" }}><I name={kind === "starred" ? "star" : kind === "history" ? "history" : "git-branch"} size={17} /></span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: 700, color: "var(--text-primary)" }}>{titles[kind]}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close panel" style={iconGhost}><I name="x" size={18} /></button>
      </div>
      <div style={{ padding: "0 16px 12px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", lineHeight: 1.45 }}>{subtitle[kind]}</div>

      <div className="bsc-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 10px 14px", minHeight: 0 }}>
        {kind === "branches" && <BranchTree branches={branches} rootId={rootId} activeId={activeId} onSelect={handleSelect} onRename={onRename} onContextMenu={onContextMenu} editRequestId={editRequestId} onEditConsumed={onEditConsumed} />}
        {kind === "starred" && <StarredList starred={starred} onJump={fullScreen ? (bid, mid) => { onJumpStar(bid, mid); onClose(); } : onJumpStar} onUnstar={onUnstar} />}
        {kind === "history" && <HistoryList branches={branches} activeId={activeId} onSelect={handleSelect} />}
      </div>
    </div>
  );
}

// Recursive branch tree with inline rename + active emphasis + right-click menu.
function BranchTree({ branches, rootId, activeId, onSelect, onRename, onContextMenu, editRequestId, onEditConsumed }) {
  const [editId, setEditId] = React.useState(null);
  const [draft, setDraft] = React.useState("");
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (editId && inputRef.current) { inputRef.current.focus(); inputRef.current.select(); } }, [editId]);
  React.useEffect(() => {
    if (editRequestId && branches[editRequestId]) { setEditId(editRequestId); setDraft(branches[editRequestId].name); onEditConsumed && onEditConsumed(); }
  }, [editRequestId]);

  const childrenOf = (pid) => Object.values(branches).filter((b) => b.parentId === pid).sort((a, b) => a.createdAt - b.createdAt);
  const startEdit = (b) => { setEditId(b.id); setDraft(b.name); };
  const commit = () => { const v = draft.trim(); if (v && onRename) onRename(editId, v); setEditId(null); };

  const Node = ({ b, depth }) => {
    const [hover, setHover] = React.useState(false);
    const active = b.id === activeId;
    const kids = childrenOf(b.id);
    const editing = editId === b.id;
    const count = b.messages.filter((m) => m.role === "user" || m.role === "assistant").length;
    return (
      <div>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onContextMenu={(e) => { e.preventDefault(); onContextMenu && onContextMenu(b, e); }}
          style={{
            display: "flex", alignItems: "center", gap: 8, height: 38, paddingRight: 6,
            paddingLeft: 8 + depth * 16, borderRadius: "var(--radius-md)",
            background: active ? "var(--surface-selected)" : hover ? "var(--surface-hover)" : "transparent",
            boxShadow: active ? "var(--shadow-glow-soft)" : "none",
            border: active ? "1px solid var(--border-brand)" : "1px solid transparent",
            cursor: "pointer", transition: "background var(--motion-fast), box-shadow var(--motion-medium)",
          }}
          onClick={() => !editing && onSelect && onSelect(b.id)}
        >
          <span style={{ display: "inline-flex", flex: "none", color: active ? "var(--brand-primary)" : depth === 0 ? "var(--text-muted)" : "var(--text-disabled)" }}>
            <I name={depth === 0 ? "message-square" : "git-branch"} size={depth === 0 ? 15 : 14} />
          </span>
          {editing ? (
            <input ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } if (e.key === "Escape") setEditId(null); }}
              style={{ flex: 1, minWidth: 0, height: 28, padding: "0 8px", border: "1.5px solid var(--border-focus)", borderRadius: "var(--radius-sm)", background: "var(--surface-1)", color: "var(--text-primary)", outline: "none", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600 }} />
          ) : (
            <span onDoubleClick={(e) => { e.stopPropagation(); startEdit(b); }} title="Double-click to rename" style={{
              flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: active ? 600 : 500,
              color: active ? "var(--text-brand)" : "var(--text-secondary)",
            }}>{b.name}</span>
          )}
          {!editing && hover ? (
            <button type="button" onClick={(e) => { e.stopPropagation(); onContextMenu && onContextMenu(b, e); }} aria-label="Branch options" style={{ ...iconGhost, width: 26, height: 26, flex: "none" }}><I name="more-horizontal" size={15} /></button>
          ) : !editing && (
            <span style={{ flex: "none", fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-disabled)", paddingRight: 4 }}>{count}</span>
          )}
        </div>
        {kids.map((k) => <Node key={k.id} b={k} depth={depth + 1} />)}
      </div>
    );
  };

  const root = branches[rootId];
  return <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{root && <Node b={root} depth={0} />}</div>;
}

function StarredList({ starred, onJump, onUnstar }) {
  if (!starred.length) return <Empty icon="star" line="No starred responses yet." sub="Hover a response and tap the star to save it here." />;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
      {starred.map((s) => (
        <div key={s.messageId} style={{ position: "relative", padding: "12px 12px 11px", background: "var(--surface-2)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", cursor: "pointer" }}
          onClick={() => onJump(s.branchId, s.messageId)}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-2)"; }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ display: "inline-flex", color: "var(--color-warning)" }}><I name="star" size={13} /></span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 600, color: "var(--text-brand)" }}>{s.branchName}</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)" }}>{relTime(s.ts)}</span>
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", color: "var(--text-secondary)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.text}</div>
          <button type="button" onClick={(e) => { e.stopPropagation(); onUnstar(s.branchId, s.messageId); }} title="Remove star" style={{ position: "absolute", top: 8, right: 8, ...iconGhost, width: 24, height: 24 }}><I name="x" size={13} /></button>
        </div>
      ))}
    </div>
  );
}

function HistoryList({ branches, activeId, onSelect }) {
  const items = Object.values(branches).slice().sort((a, b) => b.createdAt - a.createdAt);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 4 }}>
      {items.map((b) => {
        const last = b.messages.filter((m) => m.role === "user" || m.role === "assistant").slice(-1)[0];
        const active = b.id === activeId;
        return (
          <button key={b.id} type="button" onClick={() => onSelect(b.id)} style={{
            display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start", width: "100%", textAlign: "left",
            padding: "10px 12px", border: "none", borderRadius: "var(--radius-md)",
            background: active ? "var(--surface-selected)" : "transparent", cursor: "pointer",
          }}
          onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-hover)"; }}
          onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
              <span style={{ display: "inline-flex", flex: "none", color: b.parentId ? "var(--brand-primary)" : "var(--text-muted)" }}><I name={b.parentId ? "git-branch" : "message-square"} size={14} /></span>
              <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, color: active ? "var(--text-brand)" : "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.name}</span>
              <span style={{ flex: "none", fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)" }}>{relTime(b.createdAt)}</span>
            </div>
            {last && <div style={{ paddingLeft: 22, fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{last.text}</div>}
          </button>
        );
      })}
    </div>
  );
}

function Empty({ icon, line, sub }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8, padding: "48px 22px", color: "var(--text-muted)" }}>
      <span style={{ display: "inline-flex", color: "var(--text-disabled)" }}><I name={icon} size={26} /></span>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, color: "var(--text-secondary)" }}>{line}</div>
      {sub && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", maxWidth: 220, lineHeight: 1.5 }}>{sub}</div>}
    </div>
  );
}

const iconGhost = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32,
  border: "none", borderRadius: "var(--radius-sm)", background: "transparent", color: "var(--text-muted)", cursor: "pointer",
};
