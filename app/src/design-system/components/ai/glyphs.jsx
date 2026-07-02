import React from "react";

/**
 * Internal SVG glyph set for AI components (lowercase export → not on the public
 * namespace). Mirrors Lucide at 1.75 stroke so AI components stay self-contained.
 */
const PATHS = {
  "git-branch": <><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></>,
  "git-merge": <><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" /></>,
  "rotate-ccw": <><path d="M3 2v6h6" /><path d="M3 8a9 9 0 1 0 2.5-3.4" /></>,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  "more-horizontal": <><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /><circle cx="5" cy="12" r="1.4" /></>,
  send: <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>,
  "corner-down-right": <><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></>,
  "arrow-left": <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
  sparkles: <><path d="M9.9 4.6 11 8l3.4 1.1L11 10.2 9.9 13.6 8.8 10.2 5.4 9.1 8.8 8z" /><path d="M18 5l.7 2 2 .7-2 .7L18 11l-.7-2-2-.7 2-.7z" /><path d="M5 15l.5 1.5L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.5z" /></>,
  check: <><path d="M20 6 9 17l-5-5" /></>,
  "chevron-down": <><path d="m6 9 6 6 6-6" /></>,
};

export function glyph(name, { size = 18, sw = 1.75, color = "currentColor", style = {} } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", ...style }}>
      {PATHS[name] || null}
    </svg>
  );
}
