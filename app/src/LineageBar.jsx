// Breadcrumb — primary navigation showing the full branch lineage (root → current).
// Clicking a node navigates. Long lineages collapse with an ellipsis that expands.
// Double-click (or rename) edits a branch name inline. Current node is emphasised.
import React from "react";
import { Icon as I } from "./Icon.jsx";

export function LineageBar({ nodes, onNavigate, onRename, maxVisible = 4 }) {
  const [expanded, setExpanded] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [draft, setDraft] = React.useState("");
  const inputRef = React.useRef(null);

  const ids = nodes.map((n) => n.id).join(">");
  React.useEffect(() => { setExpanded(false); }, [ids]);
  React.useEffect(() => { if (editId && inputRef.current) { inputRef.current.focus(); inputRef.current.select(); } }, [editId]);

  const startEdit = (n) => { setEditId(n.id); setDraft(n.name); };
  const commit = () => { const v = draft.trim(); if (v && onRename) onRename(editId, v); setEditId(null); };
  const cancel = () => setEditId(null);

  const collapsed = !expanded && nodes.length > maxVisible;
  let shown;
  if (collapsed) shown = [{ kind: "node", n: nodes[0], idx: 0 }, { kind: "ellipsis" }, { kind: "node", n: nodes[nodes.length - 2], idx: nodes.length - 2 }, { kind: "node", n: nodes[nodes.length - 1], idx: nodes.length - 1 }];
  else shown = nodes.map((n, idx) => ({ kind: "node", n, idx }));

  const sep = (key) => <span key={key} style={{ display: "inline-flex", color: "var(--text-disabled)", flex: "none" }}><I name="chevron-right" size={14} sw={2} /></span>;

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4, maxWidth: "100%", minWidth: 0,
      height: 44, padding: "0 10px 0 14px", background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)", overflow: "hidden",
    }}>
      {shown.map((item, i) => {
        const last = i === shown.length - 1;
        if (item.kind === "ellipsis") {
          return (
            <React.Fragment key="el">
              <button type="button" onClick={() => setExpanded(true)} title="Show full lineage" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, flex: "none",
                border: "none", borderRadius: "var(--radius-sm)", background: "transparent", color: "var(--text-muted)", cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              ><I name="more-horizontal" size={16} /></button>
              {sep("sep-el")}
            </React.Fragment>
          );
        }
        const n = item.n;
        const isCurrent = item.idx === nodes.length - 1;
        const editing = editId === n.id;
        return (
          <React.Fragment key={n.id}>
            {editing ? (
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } if (e.key === "Escape") cancel(); }}
                style={{
                  height: 30, minWidth: 60, width: `${Math.max(6, draft.length + 1)}ch`, maxWidth: 200,
                  padding: "0 8px", border: "1.5px solid var(--border-focus)", borderRadius: "var(--radius-sm)",
                  background: "var(--surface-1)", color: "var(--text-primary)", outline: "none",
                  fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600,
                }}
              />
            ) : (
              <button
                type="button"
                onClick={() => !isCurrent && onNavigate && onNavigate(n.id)}
                onDoubleClick={() => startEdit(n)}
                title={isCurrent ? "Double-click to rename" : `Go to ${n.name}`}
                style={{
                  display: "inline-flex", alignItems: "center", height: 30, padding: "0 10px", flex: "none",
                  border: isCurrent ? "1px solid var(--border-brand)" : "1px solid transparent",
                  borderRadius: "var(--radius-pill)",
                  background: isCurrent ? "var(--surface-selected)" : "transparent",
                  color: isCurrent ? "var(--text-brand)" : "var(--text-muted)",
                  fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)",
                  fontWeight: isCurrent ? 700 : 500, cursor: isCurrent ? "text" : "pointer",
                  whiteSpace: "nowrap", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", display: "inline-block",
                  lineHeight: "28px",
                  transition: "color var(--motion-fast), background var(--motion-fast)",
                }}
                onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.color = "var(--text-secondary)"; }}
                onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.color = "var(--text-muted)"; }}
              >{n.name}</button>
            )}
            {!last && sep("sep-" + n.id)}
          </React.Fragment>
        );
      })}
    </div>
  );
}
