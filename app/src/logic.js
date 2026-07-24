// ─────────────────────────────────────────────────────────────────────────
// Branchscaipe — data model + branching/merge/context logic
//
// Model:
//   branch   = { id, name, autoNamed, parentId, branchPointId, branchSeed,
//                createdAt, messages[], _temporary? }
//   message  = user/assistant: { id, role, text, topic?, starred?, fromMerge? }
//            = merge divider:  { id, role:"merge", source, sourceId, scope, ts }
// ─────────────────────────────────────────────────────────────────────────

let _n = 1;
export const uid = (p) => `${p || "id"}-${Date.now().toString(36)}-${(_n++).toString(36)}`;

// ── Lineage & context ──────────────────────────────────────────────────────
export function lineage(branches, id) {
  const out = [];
  let cur = branches[id];
  while (cur) { out.unshift(cur); cur = cur.parentId ? branches[cur.parentId] : null; }
  return out;
}

// Walks the branch's lineage and, for every ancestor, includes only its
// messages up to the exact point the next branch in the chain forked from
// (its branchPointId) — never anything the ancestor's thread added after
// that fork, and never a sibling branch's messages at all. This is what
// keeps a branch's AI context scoped to itself: the caller sends exactly
// this list to the model, nothing more.
export function contextMessages(branches, id) {
  const chain = lineage(branches, id);
  let acc = [];
  chain.forEach((b, i) => {
    const child = chain[i + 1];
    if (child) {
      const cut = b.messages.findIndex((m) => m.id === child.branchPointId);
      acc = acc.concat(cut === -1 ? b.messages : b.messages.slice(0, cut + 1));
    } else {
      acc = acc.concat(b.messages);
    }
  });
  return acc.filter((m) => m.role === "user" || m.role === "assistant");
}

// ── Auto-naming ─────────────────────────────────────────────────────────────
const STOP_WORDS = new Set(
  "the a an of to for and or but is are be how what why when where can could would should do does this that these those your you i we it on in with from about into give me show tell explain describe compare discuss versus vs please just also".split(" ")
);

function titleCase(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }

export function autoName(seed) {
  if (!seed) return "New chat";
  const words = seed.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const salient = words.filter((w) => !STOP_WORDS.has(w) && w.length > 2);
  if (!salient.length) { const f = words.find(w => w.length > 1); return f ? titleCase(f) : "New chat"; }
  return salient.sort((a, b) => b.length - a.length).slice(0, 2).map(titleCase).join(" ").slice(0, 32);
}

// ── Relative time ──────────────────────────────────────────────────────────
export function relTime(ts) {
  const s = Math.max(1, Math.round((Date.now() - ts) / 1000));
  if (s < 45) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}
