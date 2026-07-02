/* @ds-bundle: {"format":3,"namespace":"BranchscaipeDesignSystem_0d3c10","components":[{"name":"AIStatusIndicator","sourcePath":"components/ai/AIStatusIndicator.jsx"},{"name":"AssistantMessage","sourcePath":"components/ai/AssistantMessage.jsx"},{"name":"BranchBreadcrumb","sourcePath":"components/ai/BranchBreadcrumb.jsx"},{"name":"BranchIndicator","sourcePath":"components/ai/BranchIndicator.jsx"},{"name":"BranchNavigator","sourcePath":"components/ai/BranchNavigator.jsx"},{"name":"Composer","sourcePath":"components/ai/Composer.jsx"},{"name":"ContextBanner","sourcePath":"components/ai/ContextBanner.jsx"},{"name":"MergeBanner","sourcePath":"components/ai/MergeBanner.jsx"},{"name":"ThreadLineage","sourcePath":"components/ai/ThreadLineage.jsx"},{"name":"ToolCall","sourcePath":"components/ai/ToolCall.jsx"},{"name":"UserMessage","sourcePath":"components/ai/UserMessage.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Drawer","sourcePath":"components/feedback/Drawer.jsx"},{"name":"Menu","sourcePath":"components/feedback/Menu.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"}],"sourceHashes":{"components/ai/AIStatusIndicator.jsx":"8d159c8e1138","components/ai/AssistantMessage.jsx":"88deeb48a720","components/ai/BranchBreadcrumb.jsx":"54a151d74053","components/ai/BranchIndicator.jsx":"c2145b24b508","components/ai/BranchNavigator.jsx":"258648dbe0a7","components/ai/Composer.jsx":"83ac9f73641d","components/ai/ContextBanner.jsx":"36edb6f4b97d","components/ai/MergeBanner.jsx":"6e6a20bd339a","components/ai/ThreadLineage.jsx":"8d61fbee6c14","components/ai/ToolCall.jsx":"34b2f7aa3f80","components/ai/UserMessage.jsx":"d02c80d290c9","components/ai/glyphs.jsx":"65ad9ec84446","components/core/Avatar.jsx":"fb6f377ff04f","components/core/Badge.jsx":"8ab93e82649a","components/core/Button.jsx":"042577d32fb5","components/core/Card.jsx":"87ecea97df2c","components/core/IconButton.jsx":"12e52b635591","components/core/Pill.jsx":"1b4d10452ab4","components/core/Switch.jsx":"c5f3a74ce46b","components/core/Tabs.jsx":"8c299f0fe6ad","components/feedback/Dialog.jsx":"0be80eb2aa45","components/feedback/Drawer.jsx":"753721669de0","components/feedback/Menu.jsx":"83c16080ab8a","components/feedback/Toast.jsx":"5e0ba2578ec5","components/feedback/Tooltip.jsx":"6fdde111ec69","components/forms/Input.jsx":"e62b7ba5b3bc","components/forms/Select.jsx":"713af0943b6c","components/forms/Textarea.jsx":"2f224140ea6c","components/navigation/Breadcrumb.jsx":"d2c3150697e7","ui_kits/branchscaipe-app/App.jsx":"54f1a2da6dd5","ui_kits/branchscaipe-app/ChatThread.jsx":"aad1fd6865ee","ui_kits/branchscaipe-app/Icon.jsx":"cec2ecc93428","ui_kits/branchscaipe-app/LineageBar.jsx":"f2bd17008cd2","ui_kits/branchscaipe-app/Panel.jsx":"a8180c057a65","ui_kits/branchscaipe-app/Response.jsx":"d10a172ecc22","ui_kits/branchscaipe-app/Screens.jsx":"2e14242530d8","ui_kits/branchscaipe-app/Sidebar.jsx":"199cc8434fef","ui_kits/branchscaipe-app/TopBar.jsx":"274ca645560a","ui_kits/branchscaipe-app/data.js":"9fe8163a12a2"},"inlinedExternals":[],"unexposedExports":[{"name":"glyph","sourcePath":"components/ai/glyphs.jsx"}]} */

(() => {

const __ds_ns = (window.BranchscaipeDesignSystem_0d3c10 = window.BranchscaipeDesignSystem_0d3c10 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/ai/AIStatusIndicator.jsx
try { (() => {
/**
 * AIStatusIndicator — the assistant's live status. state: thinking | typing | streaming | idle
 * Renders a soft aurora dot + animated label. "thinking" shows three drifting dots.
 */
function AIStatusIndicator({
  state = "thinking",
  label,
  style = {}
}) {
  const meta = {
    thinking: {
      text: "Thinking",
      dots: true
    },
    typing: {
      text: "Typing",
      dots: true
    },
    streaming: {
      text: "Responding",
      dots: false
    },
    idle: {
      text: "Ready",
      dots: false
    }
  };
  const m = meta[state] || meta.thinking;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 22,
      height: 22,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background: "var(--gradient-brand)",
      opacity: 0.25,
      animation: state === "idle" ? "none" : "bscHalo 2s var(--ease-calm) infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--gradient-brand)",
      boxShadow: "var(--shadow-glow-soft)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-muted)",
      display: "inline-flex",
      alignItems: "center"
    }
  }, label || m.text, m.dots && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginLeft: 3
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 4,
      height: 4,
      margin: "0 1px",
      borderRadius: "50%",
      background: "var(--text-muted)",
      animation: `bscDot 1.4s ${i * 0.2}s var(--ease-standard) infinite`
    }
  })))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes bscHalo { 0%,100% { transform: scale(1); opacity: 0.25; } 50% { transform: scale(1.5); opacity: 0; } }
        @keyframes bscDot { 0%,60%,100% { opacity: 0.25; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }
      `));
}
Object.assign(__ds_scope, { AIStatusIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/AIStatusIndicator.jsx", error: String((e && e.message) || e) }); }

// components/ai/UserMessage.jsx
try { (() => {
/**
 * UserMessage — right-aligned prompt bubble. Soft pill on surface-2.
 */
function UserMessage({
  children,
  timestamp,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
      borderBottomRightRadius: "var(--radius-xs)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-normal)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-wide)"
    }
  }, children), timestamp && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-micro)",
      color: "var(--text-disabled)",
      paddingRight: 4
    }
  }, timestamp)));
}
Object.assign(__ds_scope, { UserMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/UserMessage.jsx", error: String((e && e.message) || e) }); }

// components/ai/glyphs.jsx
try { (() => {
/**
 * Internal SVG glyph set for AI components (lowercase export → not on the public
 * namespace). Mirrors Lucide at 1.75 stroke so AI components stay self-contained.
 */
const PATHS = {
  "git-branch": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "3",
    x2: "6",
    y2: "15"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9a9 9 0 0 1-9 9"
  })),
  "git-merge": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 21V9a9 9 0 0 0 9 9"
  })),
  "rotate-ccw": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v6h6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 8a9 9 0 1 0 2.5-3.4"
  })),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  "more-horizontal": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.4"
  })),
  send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 19V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m5 12 7-7 7 7"
  })),
  "corner-down-right": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
    points: "15 10 20 15 15 20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 4v7a4 4 0 0 0 4 4h12"
  })),
  "arrow-left": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 19-7-7 7-7"
  })),
  sparkles: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9.9 4.6 11 8l3.4 1.1L11 10.2 9.9 13.6 8.8 10.2 5.4 9.1 8.8 8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 5l.7 2 2 .7-2 .7L18 11l-.7-2-2-.7 2-.7z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15l.5 1.5L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.5z"
  })),
  check: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  "chevron-down": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))
};
function glyph(name, {
  size = 18,
  sw = 1.75,
  color = "currentColor",
  style = {}
} = {}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: "none",
      ...style
    }
  }, PATHS[name] || null);
}
Object.assign(__ds_scope, { glyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/glyphs.jsx", error: String((e && e.message) || e) }); }

// components/ai/AssistantMessage.jsx
try { (() => {
/**
 * AssistantMessage — left-aligned response with the signature action toolbar
 * (Copy · Branch · Retry · Merge · More). Branch carries a "NEW" affordance.
 * actions: subset of ["copy","branch","retry","merge","more"]
 */
function AssistantMessage({
  children,
  actions = ["copy", "branch", "retry", "more"],
  onAction,
  branchNew = false,
  showActions = true,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const labels = {
    copy: "Copy",
    branch: "Branch",
    retry: "Retry",
    merge: "Merge",
    more: ""
  };
  const icons = {
    copy: "copy",
    branch: "git-branch",
    retry: "rotate-ccw",
    merge: "git-merge",
    more: "more-horizontal"
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-relaxed)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-wide)",
      maxWidth: "100%"
    }
  }, children), showActions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      opacity: hover ? 1 : 0.0,
      transform: hover ? "none" : "translateY(-2px)",
      transition: "opacity var(--motion-fast) var(--ease-standard), transform var(--motion-fast) var(--ease-standard)"
    }
  }, actions.map(a => {
    const labeled = a !== "more";
    return /*#__PURE__*/React.createElement("button", {
      key: a,
      type: "button",
      onClick: () => onAction && onAction(a),
      title: labels[a] || "More",
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 32,
        padding: labeled ? "0 12px" : "0",
        width: labeled ? "auto" : 32,
        justifyContent: "center",
        background: "var(--surface-2)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        color: a === "branch" ? "var(--text-brand)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: "var(--weight-medium)",
        cursor: "pointer",
        transition: "var(--transition-base)"
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = "var(--surface-2)";
      }
    }, __ds_scope.glyph(icons[a], {
      size: 15
    }), labeled && labels[a], a === "branch" && branchNew && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: -7,
        right: -8,
        background: "var(--brand-accent)",
        color: "var(--text-on-accent)",
        fontSize: 8,
        fontWeight: 700,
        lineHeight: 1,
        padding: "2px 4px",
        borderRadius: "var(--radius-xs)",
        letterSpacing: ".02em"
      }
    }, "NEW"));
  })));
}
Object.assign(__ds_scope, { AssistantMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/AssistantMessage.jsx", error: String((e && e.message) || e) }); }

// components/ai/BranchBreadcrumb.jsx
try { (() => {
/**
 * BranchBreadcrumb — the branch lineage pill shown in the header.
 * path: array of strings, root → current. Current is bold.
 */
function BranchBreadcrumb({
  path = [],
  onCrumb,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 44,
      padding: "0 20px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, path.map((node, i) => {
    const last = i === path.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => !last && onCrumb && onCrumb(i),
      style: {
        border: "none",
        background: "transparent",
        padding: 0,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: last ? "var(--weight-bold)" : "var(--weight-regular)",
        color: last ? "var(--text-primary)" : "var(--text-muted)",
        cursor: last ? "default" : "pointer",
        whiteSpace: "nowrap",
        transition: "color var(--motion-fast)"
      },
      onMouseEnter: e => {
        if (!last) e.currentTarget.style.color = "var(--text-secondary)";
      },
      onMouseLeave: e => {
        if (!last) e.currentTarget.style.color = "var(--text-muted)";
      }
    }, node), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--brand-primary)",
        display: "inline-flex"
      }
    }, __ds_scope.glyph("corner-down-right", {
      size: 14,
      sw: 2
    })));
  }));
}
Object.assign(__ds_scope, { BranchBreadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/BranchBreadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/ai/BranchIndicator.jsx
try { (() => {
/**
 * BranchIndicator — a small inline marker that a message has branches, with a
 * count, and an optional switcher (‹ 2/3 ›) to page between sibling branches.
 */
function BranchIndicator({
  count = 0,
  current = 1,
  onPrev,
  onNext,
  onOpen,
  label = "branches",
  style = {}
}) {
  const hasSiblings = count > 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      height: 28,
      padding: "0 4px 0 10px",
      background: "var(--brand-primary-soft)",
      border: "1px solid var(--border-brand)",
      borderRadius: "var(--radius-pill)",
      color: "var(--text-brand)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--weight-semibold)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginRight: 4
    }
  }, __ds_scope.glyph("git-branch", {
    size: 13
  })), hasSiblings ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onPrev,
    "aria-label": "Previous branch",
    style: chev
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 30,
      textAlign: "center",
      fontVariantNumeric: "tabular-nums"
    }
  }, current, "/", count), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onNext,
    "aria-label": "Next branch",
    style: chev
  }, "\u203A")) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onOpen,
    style: {
      ...chev,
      width: "auto",
      padding: "0 6px"
    }
  }, count, " ", label));
}
const chev = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 22,
  height: 22,
  border: "none",
  background: "transparent",
  color: "inherit",
  borderRadius: "var(--radius-xs)",
  cursor: "pointer",
  fontSize: 15,
  lineHeight: 1
};
Object.assign(__ds_scope, { BranchIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/BranchIndicator.jsx", error: String((e && e.message) || e) }); }

// components/ai/Composer.jsx
try { (() => {
/**
 * Composer — the message input bar. Glass pill with placeholder, +, Tools, Send.
 * Shows a "Branching from …" context chip when composing inside a branch.
 */
function Composer({
  value = "",
  onChange,
  onSend,
  placeholder = "Ask me anything…",
  branchingFrom = null,
  tools = true,
  disabled = false,
  style = {}
}) {
  const canSend = value && value.trim().length > 0 && !disabled;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--composer-max)",
      margin: "0 auto",
      ...style
    }
  }, branchingFrom && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8,
      marginLeft: 6,
      padding: "4px 10px",
      background: "var(--brand-primary-soft)",
      color: "var(--text-brand)",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--weight-medium)"
    }
  }, __ds_scope.glyph("git-branch", {
    size: 13
  }), "Branching from ", branchingFrom), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)",
      padding: "14px 16px 10px"
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: 1,
    disabled: disabled,
    onKeyDown: e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        canSend && onSend && onSend();
      }
    },
    style: {
      width: "100%",
      border: "none",
      outline: "none",
      resize: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-normal)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-wide)",
      minHeight: 22,
      maxHeight: 160
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: "Attach",
    style: btn
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      lineHeight: 1,
      color: "var(--text-muted)",
      fontWeight: 300
    }
  }, "+")), tools && /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      ...btn,
      width: "auto",
      padding: "0 10px",
      gap: 6,
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--weight-medium)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "6",
    x2: "20",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "12",
    x2: "20",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "18",
    x2: "20",
    y2: "18"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "6",
    r: "2",
    fill: "var(--surface-1)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "12",
    r: "2",
    fill: "var(--surface-1)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "18",
    r: "2",
    fill: "var(--surface-1)"
  })), "Tools")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => canSend && onSend && onSend(),
    disabled: !canSend,
    "aria-label": "Send",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
      borderRadius: "var(--radius-full)",
      border: "none",
      background: canSend ? "var(--gradient-brand)" : "var(--surface-3)",
      color: canSend ? "#fff" : "var(--text-disabled)",
      boxShadow: canSend ? "var(--shadow-glow-soft)" : "none",
      cursor: canSend ? "pointer" : "not-allowed",
      transition: "var(--transition-base)"
    }
  }, __ds_scope.glyph("send", {
    size: 18
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-disabled)"
    }
  }, "AI can make mistakes"));
}
const btn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: "transparent",
  cursor: "pointer"
};
Object.assign(__ds_scope, { Composer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/Composer.jsx", error: String((e && e.message) || e) }); }

// components/ai/ContextBanner.jsx
try { (() => {
/**
 * ContextBanner — the inline divider that marks "Branch from: X" within a thread.
 * variant: branch (neutral hairline) | merge (iris-tinted).
 */
function ContextBanner({
  label,
  from,
  variant = "branch",
  style = {}
}) {
  const isMerge = variant === "merge";
  const text = label || `${isMerge ? "Merge from" : "Branch from"}: ${from}`;
  const color = isMerge ? "var(--text-brand)" : "var(--text-muted)";
  const line = isMerge ? "var(--border-brand)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      width: "100%",
      margin: "8px 0",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: line
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--weight-medium)",
      whiteSpace: "nowrap"
    }
  }, __ds_scope.glyph(isMerge ? "git-merge" : "git-branch", {
    size: 14
  }), text), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: line
    }
  }));
}
Object.assign(__ds_scope, { ContextBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/ContextBanner.jsx", error: String((e && e.message) || e) }); }

// components/ai/MergeBanner.jsx
try { (() => {
/**
 * MergeBanner — confirmation strip for merging a branch (or response) into a parent.
 * Offers a parent selector affordance and confirm/cancel.
 */
function MergeBanner({
  source = "Closure",
  parent = "Hooks",
  scope = "chat",
  // "chat" | "response"
  onConfirm,
  onCancel,
  onChooseParent,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      width: "100%",
      padding: "12px 14px 12px 18px",
      background: "var(--gradient-branch)",
      border: "1px solid var(--border-brand)",
      borderRadius: "var(--radius-lg)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--brand-primary)",
      flex: "none"
    }
  }, __ds_scope.glyph("git-merge", {
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, "Merge ", scope, " to parent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      marginTop: 1,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-secondary)",
      fontWeight: 600
    }
  }, source), __ds_scope.glyph("corner-down-right", {
    size: 12
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onChooseParent,
    style: {
      border: "none",
      background: "transparent",
      color: "var(--text-brand)",
      fontWeight: 600,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      padding: 0,
      fontSize: "var(--fs-caption)"
    }
  }, parent, " ", __ds_scope.glyph("chevron-down", {
    size: 12
  })))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCancel,
    style: ghostBtn
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onConfirm,
    style: confirmBtn
  }, __ds_scope.glyph("git-merge", {
    size: 15
  }), " Merge"));
}
const ghostBtn = {
  height: 34,
  padding: "0 14px",
  border: "none",
  background: "transparent",
  color: "var(--text-secondary)",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--fs-body-sm)",
  fontWeight: 600,
  borderRadius: "var(--radius-sm)",
  cursor: "pointer",
  flex: "none"
};
const confirmBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 34,
  padding: "0 16px",
  border: "none",
  background: "var(--gradient-brand)",
  color: "#fff",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--fs-body-sm)",
  fontWeight: 600,
  borderRadius: "var(--radius-sm)",
  boxShadow: "var(--shadow-glow-soft)",
  cursor: "pointer",
  flex: "none"
};
Object.assign(__ds_scope, { MergeBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/MergeBanner.jsx", error: String((e && e.message) || e) }); }

// components/ai/ThreadLineage.jsx
try { (() => {
/**
 * ThreadLineage — the branch hierarchy tree. nodes: nested {id,label,children?}.
 * Indents children and connects them with the corner-down-right glyph.
 */
function ThreadLineage({
  tree = [],
  activeId,
  onSelect,
  style = {}
}) {
  const renderNode = (node, depth) => {
    const active = node.id === activeId;
    return /*#__PURE__*/React.createElement("div", {
      key: node.id
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onSelect && onSelect(node.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        width: "100%",
        padding: "7px 10px",
        paddingLeft: 10 + depth * 20,
        border: "none",
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--surface-selected)" : "transparent",
        color: active ? "var(--text-brand)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: active ? "var(--weight-semibold)" : "var(--weight-regular)",
        cursor: "pointer",
        textAlign: "left",
        transition: "var(--transition-base)"
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = "transparent";
      }
    }, depth > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        color: "var(--text-disabled)",
        opacity: 0.8
      }
    }, __ds_scope.glyph("corner-down-right", {
      size: 13
    })), depth === 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        color: active ? "var(--brand-primary)" : "var(--text-muted)"
      }
    }, __ds_scope.glyph("git-branch", {
      size: 14
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, node.label)), node.children && node.children.map(c => renderNode(c, depth + 1)));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      ...style
    }
  }, tree.map(n => renderNode(n, 0)));
}
Object.assign(__ds_scope, { ThreadLineage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/ThreadLineage.jsx", error: String((e && e.message) || e) }); }

// components/ai/BranchNavigator.jsx
try { (() => {
/**
 * BranchNavigator — a compact panel listing the branch tree with a header.
 * Composes ThreadLineage; meant to live in a Drawer or the sidebar.
 */
function BranchNavigator({
  tree = [],
  activeId,
  onSelect,
  count,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-secondary)",
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, __ds_scope.glyph("git-branch", {
    size: 15
  }), "Branches"), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      color: "var(--text-brand)",
      background: "var(--brand-primary-soft)",
      borderRadius: "var(--radius-pill)",
      padding: "2px 8px"
    }
  }, count)), /*#__PURE__*/React.createElement(__ds_scope.ThreadLineage, {
    tree: tree,
    activeId: activeId,
    onSelect: onSelect
  }));
}
Object.assign(__ds_scope, { BranchNavigator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/BranchNavigator.jsx", error: String((e && e.message) || e) }); }

// components/ai/ToolCall.jsx
try { (() => {
/**
 * ToolCall — collapsible chip showing an AI tool invocation + status.
 * status: running | done | error
 */
function ToolCall({
  name = "search_web",
  summary,
  status = "done",
  children,
  defaultOpen = false,
  style = {}
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const statusMeta = {
    running: {
      color: "var(--color-info)",
      bg: "var(--color-info-bg)",
      text: "Running"
    },
    done: {
      color: "var(--color-success)",
      bg: "var(--color-success-bg)",
      text: "Done"
    },
    error: {
      color: "var(--color-error)",
      bg: "var(--color-error-bg)",
      text: "Failed"
    }
  };
  const m = statusMeta[status] || statusMeta.done;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-2)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "10px 14px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-muted)",
      flex: "none"
    }
  }, __ds_scope.glyph("sparkles", {
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-secondary)",
      flex: "none"
    }
  }, name), summary && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, summary), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      flex: "none",
      color: m.color,
      background: m.bg,
      borderRadius: "var(--radius-pill)",
      padding: "2px 9px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: m.color,
      animation: status === "running" ? "bscPulse 1.2s var(--ease-standard) infinite" : "none"
    }
  }), m.text), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-disabled)",
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--motion-fast)"
    }
  }, __ds_scope.glyph("chevron-down", {
    size: 16
  }))), open && children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 14px 14px 40px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      lineHeight: "var(--lh-normal)"
    }
  }, children), /*#__PURE__*/React.createElement("style", null, `@keyframes bscPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`));
}
Object.assign(__ds_scope, { ToolCall });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/ToolCall.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — user or assistant. Falls back to initials over an aurora tint.
 */
function Avatar({
  src,
  name = "",
  size = 36,
  kind = "user",
  style = {},
  ...rest
}) {
  const initials = name.split(" ").map(p => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const tints = {
    user: "var(--c-aurora-mint)",
    assistant: "var(--gradient-brand)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      flex: "none",
      borderRadius: "var(--radius-full)",
      background: src ? "transparent" : tints[kind] || tints.user,
      color: kind === "assistant" ? "#fff" : "var(--c-ink-800)",
      fontFamily: "var(--font-sans)",
      fontSize: Math.round(size * 0.38),
      fontWeight: "var(--weight-semibold)",
      overflow: "hidden",
      boxShadow: "var(--shadow-xs)",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || (kind === "assistant" ? "AI" : ""));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Status / count badge. tone: neutral | brand | success | warning | error | info | new
 */
function Badge({
  children,
  tone = "neutral",
  soft = true,
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "var(--surface-3)",
      fg: "var(--text-secondary)",
      solidBg: "var(--text-secondary)"
    },
    brand: {
      bg: "var(--brand-primary-soft)",
      fg: "var(--text-brand)",
      solidBg: "var(--brand-primary)"
    },
    success: {
      bg: "var(--color-success-bg)",
      fg: "var(--color-success)",
      solidBg: "var(--color-success)"
    },
    warning: {
      bg: "var(--color-warning-bg)",
      fg: "var(--color-warning)",
      solidBg: "var(--color-warning)"
    },
    error: {
      bg: "var(--color-error-bg)",
      fg: "var(--color-error)",
      solidBg: "var(--color-error)"
    },
    info: {
      bg: "var(--color-info-bg)",
      fg: "var(--color-info)",
      solidBg: "var(--color-info)"
    },
    new: {
      bg: "var(--brand-accent)",
      fg: "var(--text-on-accent)",
      solidBg: "var(--brand-accent)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: 20,
      padding: "0 8px",
      borderRadius: "var(--radius-pill)",
      background: soft ? t.bg : t.solidBg,
      color: soft ? t.fg : "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.02em",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: soft ? t.fg : "#fff"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Branchscaipe primary button. Soft, rounded, calm.
 * Variants: primary | secondary | ghost | brand (aurora CTA) | danger
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      padding: "0 14px",
      font: "var(--fs-body-sm)",
      gap: 6,
      radius: "var(--radius-sm)"
    },
    md: {
      height: 40,
      padding: "0 18px",
      font: "var(--fs-body-sm)",
      gap: 8,
      radius: "var(--radius-md)"
    },
    lg: {
      height: 48,
      padding: "0 24px",
      font: "var(--fs-body)",
      gap: 8,
      radius: "var(--radius-lg)"
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--brand-primary)",
      color: "var(--brand-on-primary)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-glow-soft)"
    },
    brand: {
      background: "var(--gradient-brand)",
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-glow)"
    },
    secondary: {
      background: "var(--surface-2)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-default)",
      boxShadow: "none"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent",
      boxShadow: "none"
    },
    danger: {
      background: "var(--color-error-bg)",
      color: "var(--color-error)",
      border: "1px solid transparent",
      boxShadow: "none"
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    className: "bsc-btn",
    "data-variant": variant,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-sans)",
      fontSize: s.font,
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wide)",
      borderRadius: s.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? "var(--opacity-disabled)" : 1,
      transition: "var(--transition-base)",
      whiteSpace: "nowrap",
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.98)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none"
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none"
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. elevation: flat | raised | floating ; glass for blur panels.
 */
function Card({
  children,
  elevation = "raised",
  glass = false,
  interactive = false,
  padding = "var(--space-6)",
  style = {},
  ...rest
}) {
  const elevations = {
    flat: {
      background: "var(--surface-1)",
      boxShadow: "none",
      border: "1px solid var(--border-default)"
    },
    raised: {
      background: "var(--surface-1)",
      boxShadow: "var(--shadow-sm)",
      border: "1px solid var(--border-subtle)"
    },
    floating: {
      background: "var(--surface-elevated)",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--border-subtle)"
    }
  };
  const e = elevations[elevation] || elevations.raised;
  const glassStyle = glass ? {
    background: "var(--surface-glass)",
    WebkitBackdropFilter: "var(--glass-blur)",
    backdropFilter: "var(--glass-blur)",
    border: "1px solid var(--border-subtle)",
    boxShadow: "var(--shadow-md)"
  } : e;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: "var(--radius-xl)",
      padding,
      transition: interactive ? "var(--transition-base)" : "none",
      cursor: interactive ? "pointer" : "default",
      ...glassStyle,
      ...style
    },
    onMouseEnter: ev => {
      if (interactive) {
        ev.currentTarget.style.boxShadow = "var(--shadow-md)";
        ev.currentTarget.style.transform = "translateY(-2px)";
      }
    },
    onMouseLeave: ev => {
      if (interactive) {
        ev.currentTarget.style.boxShadow = glass ? "var(--shadow-md)" : e.boxShadow;
        ev.currentTarget.style.transform = "translateY(0)";
      }
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square/round icon-only button. For toolbars, rails, message actions.
 * variant: ghost | soft | solid ; shape: rounded | circle
 */
function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  shape = "rounded",
  active = false,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 30,
    md: 38,
    lg: 44
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    ghost: {
      background: active ? "var(--surface-active)" : "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent"
    },
    soft: {
      background: active ? "var(--surface-selected)" : "var(--surface-2)",
      color: active ? "var(--text-brand)" : "var(--text-secondary)",
      border: "1px solid var(--border-subtle)"
    },
    solid: {
      background: "var(--brand-primary)",
      color: "var(--brand-on-primary)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-glow-soft)"
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      flex: "none",
      borderRadius: shape === "circle" ? "var(--radius-full)" : "var(--radius-sm)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? "var(--opacity-disabled)" : 1,
      transition: "var(--transition-base)",
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled && variant === "ghost" && !active) e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      if (variant === "ghost" && !active) e.currentTarget.style.background = "transparent";
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pill — interactive chip/tag. Used for tools, filters, branch chips, suggestions.
 */
function Pill({
  children,
  iconLeft = null,
  selected = false,
  onClick,
  removable = false,
  onRemove,
  style = {},
  ...rest
}) {
  const clickable = !!onClick || removable;
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 32,
      padding: "0 14px",
      borderRadius: "var(--radius-pill)",
      background: selected ? "var(--surface-selected)" : "var(--surface-2)",
      color: selected ? "var(--text-brand)" : "var(--text-secondary)",
      border: selected ? "1px solid var(--border-brand)" : "1px solid var(--border-subtle)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--weight-medium)",
      cursor: clickable ? "pointer" : "default",
      transition: "var(--transition-base)",
      whiteSpace: "nowrap",
      ...style
    },
    onMouseEnter: e => {
      if (clickable && !selected) e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      if (clickable && !selected) e.currentTarget.style.background = "var(--surface-2)";
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none"
    }
  }, iconLeft), children, removable && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove();
    },
    style: {
      display: "inline-flex",
      marginLeft: 2,
      opacity: 0.6,
      cursor: "pointer"
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
/**
 * Switch / toggle. Calm, rounded.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = "md",
  style = {}
}) {
  const dims = {
    sm: {
      w: 36,
      h: 20,
      k: 14
    },
    md: {
      w: 44,
      h: 26,
      k: 20
    }
  };
  const d = dims[size] || dims.md;
  const control = /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      display: "inline-flex",
      alignItems: "center",
      width: d.w,
      height: d.h,
      flex: "none",
      padding: 3,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--brand-primary)" : "var(--surface-3)",
      boxShadow: checked ? "var(--shadow-glow-soft)" : "var(--shadow-inset)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? "var(--opacity-disabled)" : 1,
      transition: "background var(--motion-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: d.k,
      height: d.k,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transform: checked ? `translateX(${d.w - d.k - 6}px)` : "translateX(0)",
      transition: "transform var(--motion-medium) var(--ease-calm)"
    }
  }));
  if (!label) return control;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-primary)",
      ...style
    }
  }, control, label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
/**
 * Tabs — pill-style segmented control. items: [{id,label,icon?}]
 */
function Tabs({
  items = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      padding: 4,
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, items.map(it => {
    const active = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onChange && onChange(it.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 34,
        padding: "0 16px",
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: active ? "var(--surface-1)" : "transparent",
        color: active ? "var(--text-primary)" : "var(--text-muted)",
        boxShadow: active ? "var(--shadow-sm)" : "none",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
        cursor: "pointer",
        transition: "var(--transition-base)",
        whiteSpace: "nowrap"
      }
    }, it.icon, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/**
 * Dialog — centered modal over a scrim. Use for merge confirmation, settings.
 */
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 460,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: "var(--z-modal)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "var(--scrim)",
      WebkitBackdropFilter: "blur(4px)",
      backdropFilter: "blur(4px)",
      animation: "bscScrim var(--motion-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width,
      maxWidth: "100%",
      padding: "26px",
      background: "var(--surface-elevated)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-2xl)",
      boxShadow: "var(--shadow-xl)",
      animation: "bscDialog var(--motion-slow) var(--ease-spring)",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-h3)",
      color: "var(--text-primary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-muted)",
      marginTop: 8,
      lineHeight: "var(--lh-normal)"
    }
  }, description), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 24
    }
  }, footer)), /*#__PURE__*/React.createElement("style", null, `
        @keyframes bscScrim { from { opacity: 0; } }
        @keyframes bscDialog { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: none; } }
      `));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Drawer.jsx
try { (() => {
/**
 * Drawer — slide-in panel from a side. Used for branch navigator, settings, knowledge base.
 */
function Drawer({
  open,
  onClose,
  side = "right",
  width = 360,
  title,
  children,
  glass = true,
  style = {}
}) {
  if (!open) return null;
  const fromX = side === "right" ? "100%" : "-100%";
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: "var(--z-modal)",
      display: "flex",
      justifyContent: side === "right" ? "flex-end" : "flex-start",
      background: "var(--scrim)",
      animation: "bscScrim var(--motion-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: "92%",
      height: "100%",
      padding: "22px",
      background: glass ? "var(--surface-glass-heavy)" : "var(--surface-1)",
      WebkitBackdropFilter: glass ? "var(--glass-blur)" : "none",
      backdropFilter: glass ? "var(--glass-blur)" : "none",
      borderLeft: side === "right" ? "1px solid var(--border-subtle)" : "none",
      borderRight: side === "left" ? "1px solid var(--border-subtle)" : "none",
      boxShadow: "var(--shadow-xl)",
      animation: `bscDrawer var(--motion-slow) var(--ease-calm)`,
      overflowY: "auto",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-h4)",
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer",
      fontSize: 20,
      lineHeight: 1
    }
  }, "\xD7")), children), /*#__PURE__*/React.createElement("style", null, `
        @keyframes bscScrim { from { opacity: 0; } }
        @keyframes bscDrawer { from { transform: translateX(${fromX}); } to { transform: none; } }
      `));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Menu.jsx
try { (() => {
/**
 * Menu — floating action list (context / more menus). items: [{id,label,icon?,danger?,divider?}]
 * Render anchored by the caller; this is the panel + optional trigger wrapper.
 */
function Menu({
  items = [],
  onSelect,
  trigger,
  open: controlledOpen,
  onOpenChange,
  align = "left",
  style = {}
}) {
  const [uOpen, setUOpen] = React.useState(false);
  const open = controlledOpen != null ? controlledOpen : uOpen;
  const setOpen = v => {
    onOpenChange ? onOpenChange(v) : setUOpen(v);
  };
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block",
      ...style
    }
  }, trigger && /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(!open)
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
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
      animation: "bscMenu var(--motion-medium) var(--ease-out)"
    }
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 1,
      background: "var(--border-subtle)",
      margin: "6px 4px"
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: it.id || i,
    type: "button",
    onClick: () => {
      onSelect && onSelect(it.id);
      it.onClick && it.onClick();
      setOpen(false);
    },
    style: {
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
      textAlign: "left"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = it.danger ? "var(--color-error-bg)" : "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, it.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: it.danger ? "var(--color-error)" : "var(--text-muted)",
      flex: "none"
    }
  }, it.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.label), it.shortcut && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-micro)"
    }
  }, it.shortcut)))), /*#__PURE__*/React.createElement("style", null, `@keyframes bscMenu { from { opacity: 0; transform: translateY(-6px) scale(0.97); } to { opacity: 1; transform: none; } }`));
}
Object.assign(__ds_scope, { Menu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Menu.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Toast — transient notification chip. tone: neutral|success|error|info
 */
function Toast({
  title,
  description,
  tone = "neutral",
  icon = null,
  onClose,
  action,
  style = {}
}) {
  const tones = {
    neutral: "var(--text-secondary)",
    success: "var(--color-success)",
    error: "var(--color-error)",
    info: "var(--color-info)"
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      minWidth: 280,
      maxWidth: 420,
      padding: "14px 16px",
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscToast var(--motion-slow) var(--ease-spring)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      alignSelf: "stretch",
      borderRadius: "var(--radius-pill)",
      background: tones[tone],
      flex: "none"
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: tones[tone],
      flex: "none",
      marginTop: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, action)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer",
      fontSize: 16,
      lineHeight: 1,
      padding: 2,
      flex: "none"
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("style", null, `@keyframes bscToast { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: none; } }`));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/**
 * Tooltip — hover label. Soft, dark glass chip. side: top|bottom|left|right
 */
function Tooltip({
  children,
  content,
  side = "top",
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
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
      ...pos[side]
    }
  }, content), /*#__PURE__*/React.createElement("style", null, `@keyframes bscTip { from { opacity: 0; transform: ${pos[side].transform || ""} scale(0.94); } }`));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input. Pill or rounded. Optional leading/trailing icon.
 */
function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  iconLeft = null,
  iconRight = null,
  size = "md",
  shape = "rounded",
  invalid = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: 36,
    md: 44,
    lg: 52
  };
  const h = heights[size] || heights.md;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: h,
      width: "100%",
      padding: shape === "pill" ? "0 18px" : "0 14px",
      background: disabled ? "var(--surface-2)" : "var(--surface-1)",
      border: `1.5px solid ${invalid ? "var(--color-error)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: shape === "pill" ? "var(--radius-pill)" : "var(--radius-md)",
      boxShadow: focus ? invalid ? "var(--ring-error)" : "var(--ring-focus)" : "var(--shadow-xs)",
      transition: "var(--transition-base)",
      opacity: disabled ? "var(--opacity-disabled)" : 1,
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-muted)",
      flex: "none"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-wide)"
    }
  }, rest)), iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-muted)",
      flex: "none"
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/**
 * Select / dropdown. Headless-ish: opens a soft menu of options.
 * options: [{value,label,icon?}]
 */
function Select({
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const selected = options.find(o => o.value === value);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    style: {
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
      transition: "var(--transition-base)"
    }
  }, selected?.icon, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "left",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement("span", {
    style: {
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--motion-fast)",
      color: "var(--text-muted)"
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    style: {
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
      animation: "bscPop var(--motion-medium) var(--ease-out)"
    }
  }, options.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      onClick: () => {
        onChange && onChange(o.value);
        setOpen(false);
      },
      style: {
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
        textAlign: "left"
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = "transparent";
      }
    }, o.icon, o.label);
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes bscPop { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: none; } }`));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Auto-sizing textarea — calm rounded well. Used outside the composer too.
 */
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
  invalid = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      resize: "vertical",
      padding: "14px 16px",
      background: disabled ? "var(--surface-2)" : "var(--surface-1)",
      border: `1.5px solid ${invalid ? "var(--color-error)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-lg)",
      boxShadow: focus ? invalid ? "var(--ring-error)" : "var(--ring-focus)" : "var(--shadow-xs)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-normal)",
      color: "var(--text-primary)",
      outline: "none",
      transition: "var(--transition-base)",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
/**
 * Breadcrumb — generic path. items: [{label, onClick?}]. Last is current (bold).
 */
function Breadcrumb({
  items = [],
  separator = "›",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      onClick: !last ? it.onClick : undefined,
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: last ? "var(--weight-semibold)" : "var(--weight-regular)",
        color: last ? "var(--text-primary)" : "var(--text-muted)",
        cursor: !last && it.onClick ? "pointer" : "default",
        transition: "color var(--motion-fast)",
        whiteSpace: "nowrap"
      },
      onMouseEnter: e => {
        if (!last && it.onClick) e.currentTarget.style.color = "var(--text-secondary)";
      },
      onMouseLeave: e => {
        if (!last && it.onClick) e.currentTarget.style.color = "var(--text-muted)";
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-disabled)",
        fontSize: "var(--fs-body-sm)"
      }
    }, separator));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/App.jsx
try { (() => {
// App — Branchscaipe. Hardened interaction model v4.
// Key changes: empty initial state, null-safe activeId, temporary chat,
// auto-create chat on first send, AppComposer, profile actions, visual cleanup.
const LS_KEY = "bsc.app.v4"; // bumped to clear stale hardcoded data

function App() {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    Dialog,
    Button,
    Toast,
    IconButton,
    Tooltip
  } = NS;
  const I = window.BscIcon;
  const BSC = window.BSC;

  // ── persistence ──
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "null");
    } catch {
      return null;
    }
  };
  const saved = load();
  const [branches, setBranches] = React.useState(() => saved && saved.branches || {});
  const [activeId, setActiveId] = React.useState(() => {
    if (saved && saved.activeId && saved.branches && saved.branches[saved.activeId]) return saved.activeId;
    return null;
  });
  const [theme, setTheme] = React.useState(() => saved && saved.theme || "light");
  const [density, setDensity] = React.useState(() => saved && saved.density || "comfortable");
  const [confirmMergePref, setConfirmMergePref] = React.useState(() => saved ? saved.confirmMergePref !== false : true);
  const [sidebarExpanded, setSidebarExpanded] = React.useState(() => saved ? !!saved.sidebarExpanded : false);
  const [isTemporary, setIsTemporary] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const [activePanel, setActivePanel] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);
  const [merge, setMerge] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [ctxMenu, setCtxMenu] = React.useState(null);
  const [selMenu, setSelMenu] = React.useState(null);
  const [highlightId, setHighlightId] = React.useState(null);
  const [treeEditId, setTreeEditId] = React.useState(null);
  const scrollRef = React.useRef(null);
  const msgNodes = React.useRef({});
  const replyTimer = React.useRef(null);
  const pendingJump = React.useRef(null);
  const branchesRef = React.useRef(branches);
  branchesRef.current = branches;
  const registerMsgRef = (id, node) => {
    if (node) msgNodes.current[id] = node;else delete msgNodes.current[id];
  };
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  React.useEffect(() => {
    if (isTemporary) return; // never persist temporary chats
    const saveable = Object.fromEntries(Object.entries(branches).filter(([, b]) => !b._temporary));
    const data = {
      branches: saveable,
      activeId,
      theme,
      density,
      confirmMergePref,
      sidebarExpanded
    };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch {}
  }, [branches, activeId, theme, density, confirmMergePref, sidebarExpanded, isTemporary]);
  React.useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3400);
      return () => clearTimeout(t);
    }
  }, [toast]);
  React.useEffect(() => {
    const k = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  // ── derived state (all null-safe) ──
  const branch = activeId ? branches[activeId] : null;
  const chain = branch ? BSC.lineage(branches, activeId) : [];
  const nodes = chain.map(b => ({
    id: b.id,
    name: b.name
  }));
  const inBranch = branch ? !!branch.parentId : false;
  const realMsgs = branch ? branch.messages.filter(m => m.role === "user" || m.role === "assistant") : [];
  const isEmpty = !branch || realMsgs.length === 0 && !inBranch;
  const threadBranch = branch ? {
    ...branch,
    _parentName: branch.parentId ? (branches[branch.parentId] || {}).name : null
  } : null;

  // Root chat of the current active branch (used for sidebar highlighting + Branches panel)
  const rootChatId = branch ? BSC.lineage(branches, activeId)[0]?.id ?? activeId : null;

  // Root conversations (non-temporary) sorted newest-first — shown in sidebar
  const rootChats = Object.values(branches).filter(b => !b.parentId && !b._temporary).sort((a, b) => b.createdAt - a.createdAt);

  // Branch count within current conversation tree (for sidebar badge)
  const convBranchCount = rootChatId ? Object.values(branches).filter(b => {
    if (!b.parentId) return false;
    return BSC.lineage(branches, b.id)[0]?.id === rootChatId;
  }).length : 0;

  // All starred messages across all branches
  const starred = [];
  Object.values(branches).forEach(b => b.messages.forEach(m => {
    if (m.starred) starred.push({
      branchId: b.id,
      branchName: b.name,
      messageId: m.id,
      text: m.text,
      topic: m.topic,
      ts: m.starredAt || b.createdAt
    });
  }));
  starred.sort((a, b) => b.ts - a.ts);

  // ── helpers ──
  const setBranch = (id, fn) => setBranches(bs => ({
    ...bs,
    [id]: fn(bs[id])
  }));
  const contextTopics = () => branch ? BSC.contextMessages(branches, activeId).filter(m => m.role === "assistant" && m.topic).map(m => m.topic) : [];

  // ── send — auto-creates a chat if activeId is null ──
  const send = text => {
    const t = (text != null ? text : input).trim();
    if (!t) return;
    setInput("");
    let targetId = activeId;
    if (!targetId) {
      targetId = BSC.uid("chat");
      const newB = {
        id: targetId,
        name: "New chat",
        autoNamed: false,
        parentId: null,
        branchPointId: null,
        branchSeed: null,
        createdAt: Date.now(),
        messages: []
      };
      branchesRef.current = {
        ...branchesRef.current,
        [targetId]: newB
      };
      setBranches(bs => ({
        ...bs,
        [targetId]: newB
      }));
      setActiveId(targetId);
    }
    const b0 = branchesRef.current[targetId];
    if (!b0) return;
    const isInBranch = !!b0.parentId;
    const firstUser = b0.messages.filter(m => m.role === "user").length === 0;
    const userMsg = {
      id: BSC.uid("m"),
      role: "user",
      text: t
    };

    // Update ref synchronously so the timeout closure reads correct data
    branchesRef.current = {
      ...branchesRef.current,
      [targetId]: {
        ...b0,
        messages: [...b0.messages, userMsg]
      }
    };
    setBranches(bs => {
      const b = bs[targetId] || b0;
      const name = !isInBranch && firstUser && (b.name === "New chat" || !b.name) ? BSC.autoName(t) : b.name;
      return {
        ...bs,
        [targetId]: {
          ...b,
          name,
          messages: [...b.messages, userMsg]
        }
      };
    });
    setStatus("thinking");
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      const cur = branchesRef.current[targetId];
      if (!cur) return;
      const ctxTopics = BSC.contextMessages(branchesRef.current, targetId).filter(m => m.role === "assistant" && m.topic).map(m => m.topic);
      const reply = BSC.generateReply({
        branch: cur,
        userText: t,
        contextTopics: ctxTopics,
        merged: cur._lastMerge
      });
      setBranches(bs => {
        const b = bs[targetId];
        if (!b) return bs;
        return {
          ...bs,
          [targetId]: {
            ...b,
            messages: [...b.messages, {
              id: BSC.uid("m"),
              role: "assistant",
              text: reply
            }]
          }
        };
      });
      setStatus("idle");
    }, 1050 + Math.random() * 350);
  };

  // ── new chat ──
  const newChat = () => {
    cleanupTemporary();
    const id = BSC.uid("chat");
    setBranches(bs => ({
      ...bs,
      [id]: {
        id,
        name: "New chat",
        autoNamed: false,
        parentId: null,
        branchPointId: null,
        branchSeed: null,
        createdAt: Date.now(),
        messages: []
      }
    }));
    setActiveId(id);
    setActivePanel(null);
    setInput("");
  };

  // ── temporary chat ──
  const cleanupTemporary = () => {
    if (isTemporary && activeId) {
      const tid = activeId;
      setBranches(bs => {
        const nb = {
          ...bs
        };
        delete nb[tid];
        return nb;
      });
      setIsTemporary(false);
    }
  };
  const startTemporaryChat = () => {
    if (isTemporary) {
      // Exit: navigate to most recent real chat
      const prev = rootChats[0]?.id || null;
      cleanupTemporary();
      setActiveId(prev);
      return;
    }
    cleanupTemporary();
    const id = BSC.uid("tmp");
    setBranches(bs => ({
      ...bs,
      [id]: {
        id,
        name: "Temporary chat",
        autoNamed: false,
        parentId: null,
        branchPointId: null,
        branchSeed: null,
        createdAt: Date.now(),
        messages: [],
        _temporary: true
      }
    }));
    setActiveId(id);
    setIsTemporary(true);
    setActivePanel(null);
    setInput("");
    setToast({
      tone: "info",
      icon: "clock",
      title: "Temporary chat",
      desc: "This conversation won't be saved and disappears when you leave."
    });
  };

  // ── branch creation ──
  const createBranch = (msg, opts) => {
    opts = opts || {};
    const seedText = opts.quote || msg.topic || branch.name;
    const id = BSC.uid("br");
    const name = BSC.autoName(seedText);
    const seedLabel = opts.quote ? `"${opts.quote.slice(0, 28)}${opts.quote.length > 28 ? "…" : ""}"` : msg.topic || branch.name;
    setBranches(bs => ({
      ...bs,
      [id]: {
        id,
        name,
        autoNamed: true,
        parentId: activeId,
        branchPointId: msg.id,
        branchSeed: seedLabel,
        quote: opts.quote || null,
        createdAt: Date.now(),
        messages: []
      }
    }));
    setActiveId(id);
    setInput("");
    setToast({
      tone: "info",
      icon: "git-branch",
      title: `Branch "${name}" created`,
      desc: "Full context is inherited. The parent thread stays untouched."
    });
  };
  const createBranchUnder = parentId => {
    const p = branches[parentId];
    if (!p) return;
    const lastMsg = p.messages.filter(m => m.role === "assistant").slice(-1)[0] || p.messages.slice(-1)[0];
    const id = BSC.uid("br");
    const name = BSC.autoName(p.name + " detail");
    setBranches(bs => ({
      ...bs,
      [id]: {
        id,
        name,
        autoNamed: true,
        parentId,
        branchPointId: lastMsg ? lastMsg.id : null,
        branchSeed: p.name,
        quote: null,
        createdAt: Date.now(),
        messages: []
      }
    }));
    setActiveId(id);
    setToast({
      tone: "info",
      icon: "git-branch",
      title: `Branch "${name}" created`,
      desc: `Branched from "${p.name}".`
    });
  };

  // ── retry ──
  const retry = msg => {
    if (!branch) return;
    const idx = branch.messages.findIndex(m => m.id === msg.id);
    if (idx < 0) return;
    let userText = "";
    for (let i = idx - 1; i >= 0; i--) {
      if (branch.messages[i].role === "user") {
        userText = branch.messages[i].text;
        break;
      }
    }
    setStatus("thinking");
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      const cur = branchesRef.current[activeId];
      if (!cur) return;
      const reply = BSC.generateReply({
        branch: cur,
        userText: userText || "continue",
        contextTopics: contextTopics(),
        retry: true
      });
      setBranch(activeId, b => ({
        ...b,
        messages: b.messages.map(m => m.id === msg.id ? {
          ...m,
          text: reply
        } : m)
      }));
      setStatus("idle");
    }, 950 + Math.random() * 300);
  };

  // ── star / copy ──
  const toggleStar = msg => {
    setBranch(activeId, b => ({
      ...b,
      messages: b.messages.map(m => m.id === msg.id ? {
        ...m,
        starred: !m.starred,
        starredAt: !m.starred ? Date.now() : m.starredAt
      } : m)
    }));
  };
  const copyText = text => {
    const showSuccess = () => setToast({
      tone: "success",
      icon: "check",
      title: "Copied to clipboard",
      desc: null
    });
    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;opacity:0;top:0;left:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showSuccess();
      } catch (_) {}
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showSuccess).catch(fallback);
    } else {
      fallback();
    }
  };
  const renameBranch = (id, name) => setBranch(id, b => ({
    ...b,
    name,
    autoNamed: false
  }));

  // ── merge ──
  const descendants = id => {
    const out = new Set();
    const walk = pid => Object.values(branches).forEach(b => {
      if (b.parentId === pid) {
        out.add(b.id);
        walk(b.id);
      }
    });
    walk(id);
    return out;
  };

  // Only show direct ancestors (parent chain) — not lateral chats or unrelated branches.
  const mergeTargets = sourceId => {
    const anc = BSC.lineage(branches, sourceId).slice(0, -1).map(b => b.id);
    return anc.reverse().map(id => ({
      value: id,
      label: branches[id].name + (id === (branch && branch.parentId) ? " · parent" : " · ancestor")
    }));
  };
  const getConvRoot = () => rootChatId || activeId;
  const openMergeResponse = msg => {
    const target = branch && branch.parentId || getConvRoot();
    if (!confirmMergePref) return doMerge({
      scope: "response",
      sourceId: activeId,
      sourceMsg: msg,
      target
    });
    setMerge({
      scope: "response",
      sourceId: activeId,
      sourceMsg: msg,
      target
    });
  };
  const openMergeConversation = () => {
    const target = branch && branch.parentId || getConvRoot();
    if (!confirmMergePref) return doMerge({
      scope: "conversation",
      sourceId: activeId,
      target
    });
    setMerge({
      scope: "conversation",
      sourceId: activeId,
      target
    });
  };
  const doMerge = m => {
    const ts = Date.now();
    const src = branches[m.sourceId];
    const divider = {
      id: BSC.uid("mg"),
      role: "merge",
      source: src.name,
      sourceId: m.sourceId,
      scope: m.scope,
      ts
    };
    let inserts;
    if (m.scope === "response") {
      inserts = [{
        ...m.sourceMsg,
        id: BSC.uid("m"),
        starred: false,
        fromMerge: m.sourceId
      }];
    } else {
      inserts = src.messages.filter(x => x.role === "user" || x.role === "assistant").map(x => ({
        ...x,
        id: BSC.uid("m"),
        starred: false,
        fromMerge: m.sourceId
      }));
    }
    setBranches(bs => ({
      ...bs,
      [m.target]: {
        ...bs[m.target],
        _lastMerge: src.name,
        messages: [...bs[m.target].messages, divider, ...inserts]
      }
    }));
    setMerge(null);
    setActiveId(m.target);
    pendingJump.current = {
      messageId: divider.id,
      flashOnly: true
    };
    setToast({
      tone: "success",
      icon: "git-merge",
      title: `Merged into "${branches[m.target].name}"`,
      desc: `Content from "${src.name}" was added. Source branch kept.`
    });
  };

  // ── navigation ──
  const navigate = id => {
    if (!branches[id]) return;
    // Leaving a temporary chat — clean it up
    if (isTemporary && activeId && id !== activeId) {
      const tid = activeId;
      setBranches(bs => {
        const nb = {
          ...bs
        };
        delete nb[tid];
        return nb;
      });
      setIsTemporary(false);
    }
    setActiveId(id);
    setSearchOpen(false);
  };
  const jumpToMessage = (branchId, messageId) => {
    setActiveId(branchId);
    setSearchOpen(false);
    pendingJump.current = {
      messageId
    };
  };
  React.useEffect(() => {
    if (!pendingJump.current) return;
    const {
      messageId,
      flashOnly
    } = pendingJump.current;
    pendingJump.current = null;
    const t = setTimeout(() => {
      const node = msgNodes.current[messageId];
      const cont = scrollRef.current;
      if (node && cont && !flashOnly) cont.scrollTop = Math.max(0, node.offsetTop - 96);
      setHighlightId(messageId);
      setTimeout(() => setHighlightId(null), 1600);
    }, 80);
    return () => clearTimeout(t);
  }, [activeId, branches]);
  const openPanel = key => setActivePanel(p => p === key ? null : key);

  // ── context menus ──
  const openMsgMenu = (e, msg) => {
    const items = [{
      id: "branch",
      label: "Branch from here",
      icon: "git-branch",
      accent: true,
      run: () => createBranch(msg)
    }, {
      id: "star",
      label: msg.starred ? "Remove star" : "Star response",
      icon: "star",
      run: () => toggleStar(msg)
    }, {
      id: "copy",
      label: "Copy text",
      icon: "copy",
      run: () => copyText(msg.text)
    }];
    if (inBranch) items.push({
      id: "merge",
      label: "Merge response to parent",
      icon: "git-merge",
      run: () => openMergeResponse(msg)
    });
    setCtxMenu({
      x: e.clientX,
      y: e.clientY,
      items
    });
  };
  const openBranchMenu = (b, e) => {
    const items = [{
      id: "open",
      label: "Open branch",
      icon: "corner-down-right",
      run: () => navigate(b.id)
    }, {
      id: "new",
      label: "New branch here",
      icon: "git-branch",
      accent: true,
      run: () => createBranchUnder(b.id)
    }, {
      id: "rename",
      label: "Rename",
      icon: "pencil",
      run: () => {
        setActivePanel("branches");
        setTreeEditId(b.id);
      }
    }];
    if (b.parentId) items.push({
      divider: true
    }, {
      id: "merge",
      label: "Merge to parent…",
      icon: "git-merge",
      run: () => {
        setActiveId(b.id);
        setTimeout(() => openMergeConversation(), 0);
      }
    });
    setCtxMenu({
      x: e.clientX,
      y: e.clientY,
      items
    });
  };
  const onSelectText = sel => setSelMenu({
    x: sel.x,
    y: sel.y,
    text: sel.text,
    msg: sel.msg
  });
  const closeTransients = () => {
    setCtxMenu(null);
    setSelMenu(null);
  };

  // ── profile actions ──
  const handleProfileAction = action => {
    if (action === "theme") setTheme(t => t === "dark" ? "light" : "dark");else if (action === "shortcuts") setShortcutsOpen(true);else if (action === "settings") setSettingsOpen(true);
  };

  // ── merge dialog helpers ──
  const mergeTgts = merge ? mergeTargets(merge.sourceId) : [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      width: "100%",
      background: "var(--bg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    expanded: sidebarExpanded,
    onToggle: () => setSidebarExpanded(v => !v),
    activePanel: activePanel,
    onOpenPanel: openPanel,
    onNewChat: newChat,
    onSearch: () => setSearchOpen(true),
    onSettings: () => setSettingsOpen(true),
    branchCount: convBranchCount,
    starCount: starred.length,
    theme: theme,
    rootChats: rootChats,
    activeChatId: rootChatId,
    onSelectChat: navigate,
    onThemeToggle: () => setTheme(t => t === "dark" ? "light" : "dark"),
    onProfileAction: handleProfileAction
  }), activePanel && /*#__PURE__*/React.createElement(Panel, {
    kind: activePanel,
    branches: branches,
    rootId: rootChatId,
    activeId: activeId,
    onSelect: navigate,
    onClose: () => setActivePanel(null),
    onRename: renameBranch,
    onContextMenu: openBranchMenu,
    starred: starred,
    onJumpStar: jumpToMessage,
    onUnstar: (bid, mid) => setBranch(bid, b => ({
      ...b,
      messages: b.messages.map(m => m.id === mid ? {
        ...m,
        starred: false
      } : m)
    })),
    editRequestId: treeEditId,
    onEditConsumed: () => setTreeEditId(null)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      position: "relative",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: 0
    }
  }, !branch && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      height: 56,
      padding: "0 20px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    content: theme === "dark" ? "Light mode" : "Dark mode",
    side: "bottom"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(I, {
      name: theme === "dark" ? "sun" : "moon"
    }),
    label: "Toggle theme",
    onClick: () => setTheme(t => t === "dark" ? "light" : "dark")
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: isTemporary ? "Exit temporary chat" : "Start temporary chat",
    side: "bottom"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(I, {
      name: "clock"
    }),
    label: "Temporary chat",
    onClick: startTemporaryChat
  })))), branch && /*#__PURE__*/React.createElement(TopBar, {
    nodes: nodes,
    inBranch: inBranch,
    onNavigate: navigate,
    onRename: renameBranch,
    onMerge: openMergeConversation,
    theme: theme,
    onToggleTheme: () => setTheme(t => t === "dark" ? "light" : "dark"),
    isTemporary: isTemporary,
    onStartTemporary: startTemporaryChat,
    onToast: setToast
  }), isEmpty ? /*#__PURE__*/React.createElement(EmptyState, {
    onSend: send,
    input: input,
    setInput: setInput,
    onToast: setToast
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onScrollCapture: closeTransients,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(ChatThread, {
    branch: threadBranch,
    status: status,
    inBranch: inBranch,
    onAction: (a, msg) => {
      if (a === "branch") createBranch(msg);else if (a === "retry") retry(msg);else if (a === "star") toggleStar(msg);else if (a === "copy") copyText(msg.text);else if (a === "merge") openMergeResponse(msg);
    },
    onContextMenu: openMsgMenu,
    onSelectText: onSelectText,
    onJumpParent: () => navigate(branch.parentId),
    onJumpSource: sid => navigate(sid),
    scrollRef: scrollRef,
    registerMsgRef: registerMsgRef,
    highlightId: highlightId
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 22px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(AppComposer, {
    value: input,
    onChange: e => setInput(e.target.value),
    onSend: send,
    branchingFrom: inBranch ? branch.branchSeed || (branches[branch.parentId] || {}).name : null,
    onToast: setToast
  }))))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!merge,
    onClose: () => setMerge(null),
    title: merge && merge.scope === "response" ? "Merge response to a branch" : "Merge conversation to a branch",
    description: "Choose where this content should land. It's appended with a labelled divider \u2014 nothing is overwritten and the source branch is kept.",
    width: 480,
    footer: merge && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setMerge(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      iconLeft: /*#__PURE__*/React.createElement(I, {
        name: "git-merge",
        size: 16
      }),
      onClick: () => doMerge(merge)
    }, "Merge"))
  }, merge && /*#__PURE__*/React.createElement(MergeBody, {
    scope: merge.scope,
    source: branches[merge.sourceId].name,
    targets: mergeTgts,
    target: merge.target,
    setTarget: v => setMerge(m => ({
      ...m,
      target: v
    }))
  })), /*#__PURE__*/React.createElement(Dialog, {
    open: searchOpen,
    onClose: () => setSearchOpen(false),
    title: "Search",
    description: "Find branches and anything said in a thread.",
    width: 540
  }, /*#__PURE__*/React.createElement(CommandPalette, {
    branches: branches,
    onPick: jumpToMessage
  })), /*#__PURE__*/React.createElement(Dialog, {
    open: settingsOpen,
    onClose: () => setSettingsOpen(false),
    title: "Settings",
    width: 460,
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setSettingsOpen(false)
    }, "Done")
  }, /*#__PURE__*/React.createElement(SettingsBody, {
    theme: theme,
    setTheme: setTheme,
    density: density,
    setDensity: setDensity,
    autoMerge: confirmMergePref,
    setAutoMerge: setConfirmMergePref
  })), /*#__PURE__*/React.createElement(Dialog, {
    open: shortcutsOpen,
    onClose: () => setShortcutsOpen(false),
    title: "Keyboard shortcuts",
    width: 420,
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setShortcutsOpen(false)
    }, "Done")
  }, /*#__PURE__*/React.createElement(ShortcutsBody, null)), ctxMenu && /*#__PURE__*/React.createElement(ContextMenu, {
    x: ctxMenu.x,
    y: ctxMenu.y,
    items: ctxMenu.items,
    onClose: () => setCtxMenu(null)
  }), selMenu && /*#__PURE__*/React.createElement(SelectionMenu, {
    x: selMenu.x,
    y: selMenu.y,
    onBranch: () => {
      createBranch(selMenu.msg, {
        quote: selMenu.text
      });
      setSelMenu(null);
      const s = window.getSelection();
      if (s) s.removeAllRanges();
    },
    onCopy: () => {
      copyText(selMenu.text);
      setSelMenu(null);
    },
    onClose: () => setSelMenu(null)
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: 24,
      bottom: 24,
      zIndex: "var(--z-toast)"
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    icon: /*#__PURE__*/React.createElement(I, {
      name: toast.icon,
      size: 18
    }),
    title: toast.title,
    description: toast.desc,
    onClose: () => setToast(null)
  })));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/ChatThread.jsx
try { (() => {
// ChatThread — renders a branch's transcript: origin banner, quoted-selection
// context (for selection-branches), messages, merge dividers, status.
function ChatThread({
  branch,
  status,
  inBranch,
  onAction,
  onContextMenu,
  onSelectText,
  onJumpParent,
  onJumpSource,
  scrollRef,
  registerMsgRef,
  highlightId
}) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    UserMessage,
    AIStatusIndicator
  } = NS;
  const Response = window.Response,
    MergeDivider = window.MergeDivider,
    BranchOriginBanner = window.BranchOriginBanner;
  const I = window.BscIcon;
  const realCount = branch.messages.filter(m => m.role === "user" || m.role === "assistant").length;
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [branch.id, branch.messages.length, status]);
  return /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    className: "bsc-scroll",
    style: {
      flex: 1,
      overflowY: "auto",
      position: "relative",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: 24,
      marginBottom: -24,
      background: "var(--gradient-fade-top)",
      zIndex: 2,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      padding: "16px 24px 36px",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, inBranch && /*#__PURE__*/React.createElement(BranchOriginBanner, {
    parentName: branch._parentName,
    seed: branch.branchSeed,
    onJump: onJumpParent
  }), inBranch && branch.quote && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      padding: "12px 16px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderLeft: "2px solid var(--border-brand)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--brand-primary)",
      flex: "none",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "quote",
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".05em",
      color: "var(--text-muted)",
      marginBottom: 3
    }
  }, "Branched from selection"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-secondary)",
      lineHeight: 1.5
    }
  }, branch.quote))), branch.messages.map(m => {
    if (m.role === "merge") {
      return /*#__PURE__*/React.createElement(MergeDivider, {
        key: m.id,
        source: m.source,
        ts: m.ts,
        scope: m.scope,
        onJump: () => onJumpSource && onJumpSource(m.sourceId)
      });
    }
    if (m.role === "user") {
      return /*#__PURE__*/React.createElement("div", {
        key: m.id,
        ref: n => registerMsgRef(m.id, n),
        className: highlightId === m.id ? "bsc-flash" : ""
      }, /*#__PURE__*/React.createElement(UserMessage, null, m.text));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      ref: n => registerMsgRef(m.id, n),
      className: highlightId === m.id ? "bsc-flash" : "",
      style: m.fromMerge ? {
        borderLeft: "2px solid var(--border-brand)",
        paddingLeft: 16,
        marginLeft: -2
      } : null
    }, /*#__PURE__*/React.createElement(Response, {
      msg: m,
      inBranch: inBranch,
      onAction: onAction,
      onContextMenu: onContextMenu,
      onSelectText: onSelectText,
      registerRef: () => {}
    }));
  }), inBranch && realCount === 0 && status === "idle" && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "10px 24px 4px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-muted)",
      lineHeight: 1.6,
      maxWidth: 460,
      margin: "0 auto"
    }
  }, "You're in a new branch with the full context up to here.", /*#__PURE__*/React.createElement("br", null), "Ask your side question \u2014 the parent thread stays untouched."), status && status !== "idle" && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "flex-start",
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement(AIStatusIndicator, {
    state: status
  }))));
}
window.ChatThread = ChatThread;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/ChatThread.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/Icon.jsx
try { (() => {
// BscIcon — lucide wrapper for the UI kit. Exposes window.BscIcon.
function BscIcon({
  name,
  size = 20,
  sw = 1.75,
  color = "currentColor",
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          "stroke-width": sw,
          stroke: color
        },
        nameAttr: "data-lucide"
      });
    }
  }, [name, size, sw, color]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      alignItems: "center",
      ...style
    }
  });
}
window.BscIcon = BscIcon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/LineageBar.jsx
try { (() => {
// Breadcrumb — primary navigation showing the full branch lineage (root → current).
// Clicking a node navigates. Long lineages collapse with an ellipsis that expands.
// Double-click (or rename) edits a branch name inline. Current node is emphasised.
function LineageBar({
  nodes,
  onNavigate,
  onRename,
  maxVisible = 4
}) {
  const I = window.BscIcon;
  const [expanded, setExpanded] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [draft, setDraft] = React.useState("");
  const inputRef = React.useRef(null);
  const ids = nodes.map(n => n.id).join(">");
  React.useEffect(() => {
    setExpanded(false);
  }, [ids]);
  React.useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editId]);
  const startEdit = n => {
    setEditId(n.id);
    setDraft(n.name);
  };
  const commit = () => {
    const v = draft.trim();
    if (v && onRename) onRename(editId, v);
    setEditId(null);
  };
  const cancel = () => setEditId(null);
  const collapsed = !expanded && nodes.length > maxVisible;
  let shown;
  if (collapsed) shown = [{
    kind: "node",
    n: nodes[0],
    idx: 0
  }, {
    kind: "ellipsis"
  }, {
    kind: "node",
    n: nodes[nodes.length - 2],
    idx: nodes.length - 2
  }, {
    kind: "node",
    n: nodes[nodes.length - 1],
    idx: nodes.length - 1
  }];else shown = nodes.map((n, idx) => ({
    kind: "node",
    n,
    idx
  }));
  const sep = key => /*#__PURE__*/React.createElement("span", {
    key: key,
    style: {
      display: "inline-flex",
      color: "var(--text-disabled)",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "chevron-right",
    size: 14,
    sw: 2
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      maxWidth: "100%",
      minWidth: 0,
      height: 44,
      padding: "0 10px 0 14px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, shown.map((item, i) => {
    const last = i === shown.length - 1;
    if (item.kind === "ellipsis") {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: "el"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => setExpanded(true),
        title: "Show full lineage",
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          flex: "none",
          border: "none",
          borderRadius: "var(--radius-sm)",
          background: "transparent",
          color: "var(--text-muted)",
          cursor: "pointer"
        },
        onMouseEnter: e => {
          e.currentTarget.style.background = "var(--surface-hover)";
        },
        onMouseLeave: e => {
          e.currentTarget.style.background = "transparent";
        }
      }, /*#__PURE__*/React.createElement(I, {
        name: "more-horizontal",
        size: 16
      })), sep("sep-el"));
    }
    const n = item.n;
    const isCurrent = item.idx === nodes.length - 1;
    const editing = editId === n.id;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: n.id
    }, editing ? /*#__PURE__*/React.createElement("input", {
      ref: inputRef,
      value: draft,
      onChange: e => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: e => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        }
        if (e.key === "Escape") cancel();
      },
      style: {
        height: 30,
        minWidth: 60,
        width: `${Math.max(6, draft.length + 1)}ch`,
        maxWidth: 200,
        padding: "0 8px",
        border: "1.5px solid var(--border-focus)",
        borderRadius: "var(--radius-sm)",
        background: "var(--surface-1)",
        color: "var(--text-primary)",
        outline: "none",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: 600
      }
    }) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => !isCurrent && onNavigate && onNavigate(n.id),
      onDoubleClick: () => startEdit(n),
      title: isCurrent ? "Double-click to rename" : `Go to ${n.name}`,
      style: {
        display: "inline-flex",
        alignItems: "center",
        height: 30,
        padding: "0 10px",
        flex: "none",
        border: isCurrent ? "1px solid var(--border-brand)" : "1px solid transparent",
        borderRadius: "var(--radius-pill)",
        background: isCurrent ? "var(--surface-selected)" : "transparent",
        color: isCurrent ? "var(--text-brand)" : "var(--text-muted)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: isCurrent ? 700 : 500,
        cursor: isCurrent ? "text" : "pointer",
        whiteSpace: "nowrap",
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "inline-block",
        lineHeight: "28px",
        transition: "color var(--motion-fast), background var(--motion-fast)"
      },
      onMouseEnter: e => {
        if (!isCurrent) e.currentTarget.style.color = "var(--text-secondary)";
      },
      onMouseLeave: e => {
        if (!isCurrent) e.currentTarget.style.color = "var(--text-muted)";
      }
    }, n.name), !last && sep("sep-" + n.id));
  }));
}
window.LineageBar = LineageBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/LineageBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/Panel.jsx
try { (() => {
// Panel — the secondary navigation column raised by Branches / Starred / History.
// Never a modal: the chat stays visible and interactive beside it.
function Panel({
  kind,
  branches,
  rootId,
  activeId,
  onSelect,
  onClose,
  onRename,
  onContextMenu,
  starred,
  onJumpStar,
  onUnstar,
  editRequestId,
  onEditConsumed
}) {
  const I = window.BscIcon;
  const titles = {
    branches: "Branches",
    starred: "Starred",
    history: "History"
  };
  const subtitle = {
    branches: "Your conversation lineage. Select to switch — it's just like changing chats.",
    starred: "Responses you saved. Select to jump back to the moment.",
    history: "Every thread and branch, most recent first."
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bsc-panel",
    style: {
      width: 312,
      flex: "none",
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      background: "var(--surface-1)",
      borderRight: "1px solid var(--border-subtle)",
      zIndex: 150
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 14px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brand-primary)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: kind === "starred" ? "star" : kind === "history" ? "history" : "git-branch",
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, titles[kind])), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close panel",
    style: iconGhost
  }, /*#__PURE__*/React.createElement(I, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      lineHeight: 1.45
    }
  }, subtitle[kind]), /*#__PURE__*/React.createElement("div", {
    className: "bsc-scroll",
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "0 10px 14px",
      minHeight: 0
    }
  }, kind === "branches" && /*#__PURE__*/React.createElement(BranchTree, {
    branches: branches,
    rootId: rootId,
    activeId: activeId,
    onSelect: onSelect,
    onRename: onRename,
    onContextMenu: onContextMenu,
    editRequestId: editRequestId,
    onEditConsumed: onEditConsumed
  }), kind === "starred" && /*#__PURE__*/React.createElement(StarredList, {
    starred: starred,
    onJump: onJumpStar,
    onUnstar: onUnstar
  }), kind === "history" && /*#__PURE__*/React.createElement(HistoryList, {
    branches: branches,
    activeId: activeId,
    onSelect: onSelect
  })));
}
window.Panel = Panel;

// Recursive branch tree with inline rename + active emphasis + right-click menu.
function BranchTree({
  branches,
  rootId,
  activeId,
  onSelect,
  onRename,
  onContextMenu,
  editRequestId,
  onEditConsumed
}) {
  const I = window.BscIcon;
  const [editId, setEditId] = React.useState(null);
  const [draft, setDraft] = React.useState("");
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editId]);
  React.useEffect(() => {
    if (editRequestId && branches[editRequestId]) {
      setEditId(editRequestId);
      setDraft(branches[editRequestId].name);
      onEditConsumed && onEditConsumed();
    }
  }, [editRequestId]);
  const childrenOf = pid => Object.values(branches).filter(b => b.parentId === pid).sort((a, b) => a.createdAt - b.createdAt);
  const startEdit = b => {
    setEditId(b.id);
    setDraft(b.name);
  };
  const commit = () => {
    const v = draft.trim();
    if (v && onRename) onRename(editId, v);
    setEditId(null);
  };
  const Node = ({
    b,
    depth
  }) => {
    const [hover, setHover] = React.useState(false);
    const active = b.id === activeId;
    const kids = childrenOf(b.id);
    const editing = editId === b.id;
    const count = b.messages.filter(m => m.role === "user" || m.role === "assistant").length;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onContextMenu: e => {
        e.preventDefault();
        onContextMenu && onContextMenu(b, e);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 38,
        paddingRight: 6,
        paddingLeft: 8 + depth * 16,
        borderRadius: "var(--radius-md)",
        background: active ? "var(--surface-selected)" : hover ? "var(--surface-hover)" : "transparent",
        boxShadow: active ? "var(--shadow-glow-soft)" : "none",
        border: active ? "1px solid var(--border-brand)" : "1px solid transparent",
        cursor: "pointer",
        transition: "background var(--motion-fast), box-shadow var(--motion-medium)"
      },
      onClick: () => !editing && onSelect && onSelect(b.id)
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        flex: "none",
        color: active ? "var(--brand-primary)" : depth === 0 ? "var(--text-muted)" : "var(--text-disabled)"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: depth === 0 ? "message-square" : "git-branch",
      size: depth === 0 ? 15 : 14
    })), editing ? /*#__PURE__*/React.createElement("input", {
      ref: inputRef,
      value: draft,
      onChange: e => setDraft(e.target.value),
      onBlur: commit,
      onClick: e => e.stopPropagation(),
      onKeyDown: e => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        }
        if (e.key === "Escape") setEditId(null);
      },
      style: {
        flex: 1,
        minWidth: 0,
        height: 28,
        padding: "0 8px",
        border: "1.5px solid var(--border-focus)",
        borderRadius: "var(--radius-sm)",
        background: "var(--surface-1)",
        color: "var(--text-primary)",
        outline: "none",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: 600
      }
    }) : /*#__PURE__*/React.createElement("span", {
      onDoubleClick: e => {
        e.stopPropagation();
        startEdit(b);
      },
      title: "Double-click to rename",
      style: {
        flex: 1,
        minWidth: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: active ? 600 : 500,
        color: active ? "var(--text-brand)" : "var(--text-secondary)"
      }
    }, b.name), !editing && hover ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: e => {
        e.stopPropagation();
        onContextMenu && onContextMenu(b, e);
      },
      "aria-label": "Branch options",
      style: {
        ...iconGhost,
        width: 26,
        height: 26,
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: "more-horizontal",
      size: 15
    })) : !editing && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-micro)",
        color: "var(--text-disabled)",
        paddingRight: 4
      }
    }, count)), kids.map(k => /*#__PURE__*/React.createElement(Node, {
      key: k.id,
      b: k,
      depth: depth + 1
    })));
  };
  const root = branches[rootId];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, root && /*#__PURE__*/React.createElement(Node, {
    b: root,
    depth: 0
  }));
}
window.BranchTree = BranchTree;
function StarredList({
  starred,
  onJump,
  onUnstar
}) {
  const I = window.BscIcon;
  const BSC = window.BSC;
  if (!starred.length) return /*#__PURE__*/React.createElement(Empty, {
    icon: "star",
    line: "No starred responses yet.",
    sub: "Hover a response and tap the star to save it here."
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      paddingTop: 4
    }
  }, starred.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.messageId,
    style: {
      position: "relative",
      padding: "12px 12px 11px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      cursor: "pointer"
    },
    onClick: () => onJump(s.branchId, s.messageId),
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "var(--surface-2)";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--color-warning)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "star",
    size: 13
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 600,
      color: "var(--text-brand)"
    }
  }, s.branchName), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)"
    }
  }, BSC.relTime(s.ts))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-secondary)",
      lineHeight: 1.5,
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, s.text), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onUnstar(s.branchId, s.messageId);
    },
    title: "Remove star",
    style: {
      position: "absolute",
      top: 8,
      right: 8,
      ...iconGhost,
      width: 24,
      height: 24
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "x",
    size: 13
  })))));
}
function HistoryList({
  branches,
  activeId,
  onSelect
}) {
  const I = window.BscIcon;
  const BSC = window.BSC;
  const items = Object.values(branches).slice().sort((a, b) => b.createdAt - a.createdAt);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      paddingTop: 4
    }
  }, items.map(b => {
    const last = b.messages.filter(m => m.role === "user" || m.role === "assistant").slice(-1)[0];
    const active = b.id === activeId;
    return /*#__PURE__*/React.createElement("button", {
      key: b.id,
      type: "button",
      onClick: () => onSelect(b.id),
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "flex-start",
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        border: "none",
        borderRadius: "var(--radius-md)",
        background: active ? "var(--surface-selected)" : "transparent",
        cursor: "pointer"
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        flex: "none",
        color: b.parentId ? "var(--brand-primary)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: b.parentId ? "git-branch" : "message-square",
      size: 14
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: 600,
        color: active ? "var(--text-brand)" : "var(--text-primary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, b.name), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-micro)",
        color: "var(--text-muted)"
      }
    }, BSC.relTime(b.createdAt))), last && /*#__PURE__*/React.createElement("div", {
      style: {
        paddingLeft: 22,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-micro)",
        color: "var(--text-muted)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%"
      }
    }, last.text));
  }));
}
function Empty({
  icon,
  line,
  sub
}) {
  const I = window.BscIcon;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 8,
      padding: "48px 22px",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-disabled)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: icon,
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 600,
      color: "var(--text-secondary)"
    }
  }, line), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      maxWidth: 220,
      lineHeight: 1.5
    }
  }, sub));
}
const iconGhost = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  border: "none",
  borderRadius: "var(--radius-sm)",
  background: "transparent",
  color: "var(--text-muted)",
  cursor: "pointer"
};
window.PanelEmpty = Empty;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/Panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/Response.jsx
try { (() => {
// Response — assistant message with a streamlined action toolbar.
// Visible actions: Copy, Branch, Retry (the three most-used actions).
// Overflow menu: Star Response, Merge Response to Parent.
// Copy delegates clipboard work + toast to App via onAction("copy").

function Response({
  msg,
  inBranch,
  onAction,
  onContextMenu,
  onSelectText,
  registerRef
}) {
  const I = window.BscIcon;
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
    const h = e => {
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
    onSelectText && onSelectText({
      text,
      x: r.left + r.width / 2,
      y: r.top,
      msg
    });
  };

  // Overflow items: Star, Merge (conditionally)
  const overflowItems = [{
    id: "star",
    icon: msg.starred ? "star-off" : "star",
    label: msg.starred ? "Remove star" : "Star response",
    run: () => {
      onAction("star", msg);
      setOverflowOpen(false);
    }
  }];
  if (inBranch) {
    overflowItems.push({
      id: "merge",
      icon: "git-merge",
      label: "Merge to parent",
      run: () => {
        onAction("merge", msg);
        setOverflowOpen(false);
      }
    });
  }
  const Btn = ({
    icon,
    label,
    onClick,
    brand
  }) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    title: label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 30,
      padding: "0 11px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-sm)",
      color: brand ? "var(--text-brand)" : "var(--text-secondary)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background var(--motion-fast)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "var(--surface-2)";
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: icon,
    size: 14
  }), " ", label);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
    },
    onContextMenu: e => {
      e.preventDefault();
      onContextMenu && onContextMenu(e, msg);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%"
    }
  }, (msg.topic || msg.starred) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, msg.topic && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 26,
      padding: "0 11px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, msg.topic), msg.starred && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: 22,
      padding: "0 9px",
      background: "var(--color-warning-bg)",
      borderRadius: "var(--radius-pill)",
      color: "var(--color-warning)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "star",
    size: 11
  }), " Starred")), /*#__PURE__*/React.createElement("div", {
    ref: bodyRef,
    onMouseUp: handleMouseUp,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-relaxed)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-wide)"
    }
  }, msg.text.split("\n\n").map((p, k) => /*#__PURE__*/React.createElement("p", {
    key: k,
    style: {
      margin: k === 0 ? 0 : "12px 0 0"
    }
  }, p))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      flexWrap: "wrap",
      opacity: hover ? 1 : 0,
      transform: hover ? "none" : "translateY(-2px)",
      pointerEvents: hover ? "auto" : "none",
      transition: "opacity var(--motion-fast) var(--ease-standard), transform var(--motion-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    icon: copied ? "check" : "copy",
    label: copied ? "Copied" : "Copy",
    onClick: doCopy
  }), /*#__PURE__*/React.createElement(Btn, {
    icon: "git-branch",
    label: "Branch",
    onClick: () => onAction("branch", msg),
    brand: true
  }), /*#__PURE__*/React.createElement(Btn, {
    icon: "rotate-ccw",
    label: "Retry",
    onClick: () => onAction("retry", msg)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    },
    ref: overflowRef
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOverflowOpen(v => !v),
    title: "More actions",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
      background: overflowOpen ? "var(--surface-hover)" : "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-sm)",
      color: "var(--text-secondary)",
      cursor: "pointer",
      transition: "background var(--motion-fast)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = overflowOpen ? "var(--surface-hover)" : "var(--surface-2)";
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "more-horizontal",
    size: 14
  })), overflowOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 6px)",
      left: 0,
      zIndex: 200,
      minWidth: 190,
      padding: 6,
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-fast) var(--ease-out)"
    }
  }, overflowItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    type: "button",
    onClick: item.run,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "9px 10px",
      border: "none",
      borderRadius: "var(--radius-sm)",
      background: "transparent",
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 500,
      cursor: "pointer",
      textAlign: "left"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: item.icon,
    size: 15
  })), item.label))))));
}
window.Response = Response;

// ── MergeDivider ──────────────────────────────────────────────────────────────
function MergeDivider({
  source,
  ts,
  scope,
  onJump
}) {
  const I = window.BscIcon;
  const BSC = window.BSC;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      margin: "6px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-brand)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onJump,
    title: `Go to ${source}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 30,
      padding: "0 14px",
      background: "var(--gradient-branch)",
      border: "1px solid var(--border-brand)",
      borderRadius: "var(--radius-pill)",
      cursor: onJump ? "pointer" : "default",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--brand-primary)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "git-merge",
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, "Merged ", scope === "response" ? "response" : "conversation", " from ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-brand)"
    }
  }, source)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)"
    }
  }, "\xB7 ", BSC.relTime(ts))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-brand)"
    }
  }));
}
window.MergeDivider = MergeDivider;

// ── BranchOriginBanner ────────────────────────────────────────────────────────
function BranchOriginBanner({
  parentName,
  seed,
  onJump
}) {
  const I = window.BscIcon;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      margin: "2px 0 4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-default)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onJump,
    title: "Go to parent",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: onJump ? "pointer" : "default",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--brand-primary)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "git-branch",
    size: 14
  })), "Branched from ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-secondary)",
      fontWeight: 600
    }
  }, parentName), seed ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, " \xB7 ", seed) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-default)"
    }
  }));
}
window.BranchOriginBanner = BranchOriginBanner;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/Response.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/Screens.jsx
try { (() => {
// Screens — AppComposer (real SpeechRecognition voice), EmptyState (logo animation),
// CommandPalette, SettingsBody, ShortcutsBody, MergeBody (simplified), ContextMenu, SelectionMenu.

// ── AppComposer ───────────────────────────────────────────────────────────────
function AppComposer({
  value,
  onChange,
  onSend,
  branchingFrom,
  disabled,
  onToast
}) {
  const I = window.BscIcon;
  const [attachOpen, setAttachOpen] = React.useState(false);
  const [voiceState, setVoiceState] = React.useState("idle"); // idle | recording | transcribing
  const [pulseBright, setPulseBright] = React.useState(false);
  const attachRef = React.useRef(null);
  const pulseIntervalRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const textareaRef = React.useRef(null);
  const recognitionRef = React.useRef(null);
  const transcriptRef = React.useRef("");
  const canSend = value && value.trim().length > 0 && !disabled && voiceState === "idle";

  // Close attachment menu on outside click
  React.useEffect(() => {
    if (!attachOpen) return;
    const h = e => {
      if (attachRef.current && !attachRef.current.contains(e.target)) setAttachOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [attachOpen]);

  // Pulse animation for recording state
  React.useEffect(() => {
    if (voiceState === "recording") {
      pulseIntervalRef.current = setInterval(() => setPulseBright(p => !p), 650);
    } else {
      clearInterval(pulseIntervalRef.current);
      setPulseBright(false);
    }
    return () => clearInterval(pulseIntervalRef.current);
  }, [voiceState]);

  // ── Real SpeechRecognition ────────────────────────────────────────
  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onToast && onToast({
        tone: "error",
        icon: "mic-off",
        title: "Voice not supported",
        desc: "Your browser doesn't support speech recognition. Try Chrome or Edge."
      });
      return;
    }
    transcriptRef.current = "";
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.maxAlternatives = 1;
    rec.onstart = () => setVoiceState("recording");
    rec.onresult = event => {
      let finalPart = "";
      let interimPart = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalPart += event.results[i][0].transcript;else interimPart += event.results[i][0].transcript;
      }
      if (finalPart) transcriptRef.current += (transcriptRef.current ? " " : "") + finalPart.trim();
      const display = (transcriptRef.current + (interimPart ? " " + interimPart : "")).trim();
      if (display) onChange && onChange({
        target: {
          value: display
        }
      });
    };
    rec.onerror = event => {
      if (event.error === "not-allowed") {
        onToast && onToast({
          tone: "error",
          icon: "mic-off",
          title: "Microphone access denied",
          desc: "Allow microphone access in your browser settings."
        });
      }
      if (event.error !== "aborted") {
        setVoiceState("idle");
        recognitionRef.current = null;
      }
    };
    rec.onend = () => {
      // Natural end by browser — transition to transcribing briefly then idle
      if (recognitionRef.current) {
        recognitionRef.current = null;
        setVoiceState("transcribing");
        setTimeout(() => {
          setVoiceState("idle");
          setTimeout(() => {
            textareaRef.current && textareaRef.current.focus();
          }, 50);
        }, 500);
      }
    };
    recognitionRef.current = rec;
    try {
      rec.start();
    } catch (e) {
      setVoiceState("idle");
    }
  };
  const stopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // prevent double-fire
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setVoiceState("transcribing");
    setTimeout(() => {
      setVoiceState("idle");
      setTimeout(() => {
        textareaRef.current && textareaRef.current.focus();
      }, 50);
    }, 420);
  };
  const handleVoiceClick = () => {
    if (voiceState === "idle") startVoice();else if (voiceState === "recording") stopVoice();
    // transcribing state ignores clicks
  };
  const handleAttach = type => {
    setAttachOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "image" ? "image/*" : type === "pdf" ? ".pdf" : ".pdf,.doc,.docx,.txt,.md,.csv";
      fileInputRef.current.click();
    }
  };
  const handleFileChange = e => {
    const file = e.target.files && e.target.files[0];
    if (file && onToast) {
      onToast({
        tone: "info",
        icon: "paperclip",
        title: file.name,
        desc: "Attachment ready — included with your next message."
      });
    }
    e.target.value = "";
  };

  // Voice button colors
  const voiceColor = voiceState === "recording" ? pulseBright ? "oklch(52% 0.22 20)" : "oklch(62% 0.18 20)" : voiceState === "transcribing" ? "var(--brand-primary)" : "var(--text-muted)";
  const voiceBg = voiceState === "recording" ? pulseBright ? "oklch(94% 0.04 20)" : "oklch(97% 0.02 20)" : "transparent";
  const voiceBorder = voiceState !== "idle" ? "1px solid oklch(85% 0.06 20)" : "none";
  const attachTypes = [{
    id: "image",
    icon: "image",
    label: "Upload image",
    sub: "JPEG, PNG, GIF, WebP"
  }, {
    id: "document",
    icon: "file-text",
    label: "Upload document",
    sub: "TXT, MD, DOCX, CSV"
  }, {
    id: "pdf",
    icon: "file",
    label: "Upload PDF",
    sub: "PDF up to 50 MB"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--composer-max)",
      margin: "0 auto"
    }
  }, branchingFrom && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8,
      marginLeft: 6,
      padding: "4px 10px",
      background: "var(--brand-primary-soft)",
      color: "var(--text-brand)",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "git-branch",
    size: 13
  }), " Branching from ", branchingFrom), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)",
      padding: "14px 16px 10px"
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    ref: textareaRef,
    value: value,
    onChange: onChange,
    placeholder: voiceState === "recording" ? "Listening…" : voiceState === "transcribing" ? "Transcribing…" : "Ask me anything…",
    rows: 1,
    disabled: disabled || voiceState !== "idle",
    onKeyDown: e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        canSend && onSend && onSend();
      }
    },
    style: {
      width: "100%",
      border: "none",
      outline: "none",
      resize: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-normal)",
      color: voiceState !== "idle" ? "var(--text-muted)" : "var(--text-primary)",
      letterSpacing: "var(--tracking-wide)",
      minHeight: 22,
      maxHeight: 160,
      transition: "color var(--motion-fast)"
    }
  }), voiceState === "recording" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 4,
      marginBottom: 2,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: voiceColor
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: voiceColor,
      display: "inline-block",
      transition: "background var(--motion-fast)"
    }
  }), "Listening \u2014 click mic to stop"), voiceState === "transcribing" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 4,
      marginBottom: 2,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      border: "2px solid var(--brand-primary)",
      borderTopColor: "transparent",
      borderRadius: "50%",
      display: "inline-block",
      animation: "bscSpin 0.7s linear infinite",
      flex: "none"
    }
  }), "Transcribing\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      position: "relative"
    },
    ref: attachRef
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setAttachOpen(v => !v),
    title: "Attach file",
    style: composerIconBtn
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      lineHeight: 1,
      color: "var(--text-muted)",
      fontWeight: 300
    }
  }, "+")), attachOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: 0,
      zIndex: 200,
      width: 230,
      padding: 6,
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 10px 8px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: "var(--text-muted)"
    }
  }, "Attach"), attachTypes.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    onClick: () => handleAttach(t.id),
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      width: "100%",
      padding: "9px 10px",
      border: "none",
      borderRadius: "var(--radius-sm)",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-muted)",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: t.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)"
    }
  }, t.sub)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleVoiceClick,
    title: voiceState === "recording" ? "Stop recording" : "Voice input",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 34,
      height: 34,
      borderRadius: "var(--radius-sm)",
      border: voiceBorder,
      background: voiceBg,
      color: voiceColor,
      cursor: voiceState === "transcribing" ? "default" : "pointer",
      transition: "background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "mic",
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => canSend && onSend && onSend(),
    disabled: !canSend,
    "aria-label": "Send",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: "var(--radius-full)",
      border: "none",
      background: canSend ? "var(--gradient-brand)" : "var(--surface-3)",
      color: canSend ? "#fff" : "var(--text-disabled)",
      boxShadow: canSend ? "var(--shadow-glow-soft)" : "none",
      cursor: canSend ? "pointer" : "not-allowed",
      transition: "background var(--motion-fast), box-shadow var(--motion-fast)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "send",
    size: 15
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-disabled)"
    }
  }, "AI can make mistakes \u2014 verify important information"), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    style: {
      display: "none"
    },
    onChange: handleFileChange
  }));
}
window.AppComposer = AppComposer;
const composerIconBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: "transparent",
  cursor: "pointer"
};

// ── EmptyState — animated BRANCHSCAIPE logo (plays once per session) ──────────
function EmptyState({
  onSend,
  input,
  setInput,
  onToast
}) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    Pill
  } = NS;

  // Animation plays every time EmptyState mounts (CSS handles single-play per mount).
  const shouldAnimate = true;
  const suggestions = ["Break down a complex idea", "Compare two approaches", "Help me think through a problem", "What are the tradeoffs here?"];

  // Gradient style for the "AI" letters
  const aiStyle = {
    background: "var(--gradient-brand)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    display: "inline-block",
    // Glow animation fires together with letter reveal
    animation: shouldAnimate ? "bscLogoGlow 1.5s ease both" : "none"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
      gap: 28,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bsc-wordmark",
    style: {
      fontSize: 52,
      display: "inline-flex",
      alignItems: "baseline",
      letterSpacing: "0.08em",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      display: "inline-block",
      animation: shouldAnimate ? "bscLogoLeft 0.6s cubic-bezier(0.2,0,0,1) 0.38s both" : "none"
    }
  }, "BRANCHSC"), /*#__PURE__*/React.createElement("span", {
    style: aiStyle
  }, "AI"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      display: "inline-block",
      animation: shouldAnimate ? "bscLogoRight 0.6s cubic-bezier(0.2,0,0,1) 0.38s both" : "none"
    }
  }, "PE")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-h2)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "How can I help you think?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body)",
      color: "var(--text-muted)",
      maxWidth: 420,
      lineHeight: 1.6
    }
  }, "Ask anything \u2014 then branch any answer to explore a different path without losing your place.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "var(--composer-max)"
    }
  }, /*#__PURE__*/React.createElement(AppComposer, {
    value: input,
    onChange: e => setInput(e.target.value),
    onSend: () => onSend(),
    onToast: onToast
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
      marginTop: 14
    }
  }, suggestions.map(s => /*#__PURE__*/React.createElement(Pill, {
    key: s,
    onClick: () => onSend(s)
  }, s)))));
}
window.EmptyState = EmptyState;

// ── CommandPalette ────────────────────────────────────────────────────────────
function CommandPalette({
  branches,
  onPick
}) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    Input
  } = NS;
  const I = window.BscIcon;
  const [q, setQ] = React.useState("");
  const query = q.trim().toLowerCase();
  const branchHits = Object.values(branches).filter(b => b.name.toLowerCase().includes(query));
  const msgHits = [];
  if (query.length >= 2) {
    Object.values(branches).forEach(b => {
      b.messages.forEach(m => {
        if ((m.role === "user" || m.role === "assistant") && m.text.toLowerCase().includes(query)) msgHits.push({
          b,
          m
        });
      });
    });
  }
  const snippet = text => {
    const i = text.toLowerCase().indexOf(query);
    if (i < 0) return text.slice(0, 80);
    const start = Math.max(0, i - 24);
    return (start > 0 ? "…" : "") + text.slice(start, i + query.length + 40) + "…";
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    shape: "rounded",
    iconLeft: /*#__PURE__*/React.createElement(I, {
      name: "search",
      size: 18
    }),
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search branches & messages\u2026",
    autoFocus: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "bsc-scroll",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      maxHeight: 360,
      overflowY: "auto"
    }
  }, branchHits.length > 0 && /*#__PURE__*/React.createElement(SGroup, {
    label: "Branches"
  }, branchHits.map(b => /*#__PURE__*/React.createElement(SRow, {
    key: b.id,
    onClick: () => onPick(b.id),
    icon: b.parentId ? "git-branch" : "message-square",
    accent: !!b.parentId
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, b.name), b.parentId && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)"
    }
  }, "branch")))), msgHits.length > 0 && /*#__PURE__*/React.createElement(SGroup, {
    label: "Messages"
  }, msgHits.slice(0, 12).map(({
    b,
    m
  }, i) => /*#__PURE__*/React.createElement(SRow, {
    key: b.id + i,
    onClick: () => onPick(b.id, m.id),
    icon: m.role === "user" ? "user" : "sparkles"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      color: "var(--text-brand)"
    }
  }, b.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-secondary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, snippet(m.text)))))), query.length >= 1 && branchHits.length === 0 && msgHits.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      textAlign: "center",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)"
    }
  }, "No matches for \"", q, "\"."), query.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 8px",
      textAlign: "center",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)"
    }
  }, "Search by conversation name or message content.")));
}
window.CommandPalette = CommandPalette;
function SGroup({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      padding: "2px 8px 6px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, children));
}
function SRow({
  icon,
  accent,
  onClick,
  children
}) {
  const I = window.BscIcon;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "9px 10px",
      border: "none",
      background: "transparent",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      textAlign: "left",
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none",
      color: accent ? "var(--brand-primary)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: icon,
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, children));
}

// ── SettingsBody ──────────────────────────────────────────────────────────────
function SettingsBody({
  theme,
  setTheme,
  density,
  setDensity,
  autoMerge,
  setAutoMerge
}) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    Switch,
    Tabs
  } = NS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(SRow2, {
    label: "Appearance",
    hint: "Switch between light and dark mode."
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: theme === "dark",
    onChange: v => setTheme(v ? "dark" : "light"),
    label: theme === "dark" ? "Dark" : "Light"
  })), /*#__PURE__*/React.createElement(SRow2, {
    label: "Density",
    hint: "Message spacing in the conversation."
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: density,
    onChange: setDensity,
    items: [{
      id: "compact",
      label: "Compact"
    }, {
      id: "comfortable",
      label: "Comfortable"
    }]
  })), /*#__PURE__*/React.createElement(SRow2, {
    label: "Confirm before merge",
    hint: "Ask for confirmation before merging."
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: autoMerge,
    onChange: setAutoMerge
  })));
}
window.SettingsBody = SettingsBody;
function SRow2({
  label,
  hint,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, label), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, hint)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none"
    }
  }, children));
}

// ── ShortcutsBody ─────────────────────────────────────────────────────────────
function ShortcutsBody() {
  const shortcuts = [{
    keys: ["⌘", "K"],
    desc: "Open search"
  }, {
    keys: ["⌘", "↵"],
    desc: "Send message"
  }, {
    keys: ["⇧", "↵"],
    desc: "New line in composer"
  }, {
    keys: ["Esc"],
    desc: "Close panels / dialogs"
  }, {
    keys: ["⌘", "⇧", "B"],
    desc: "Toggle sidebar"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, shortcuts.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "9px 12px",
      borderRadius: "var(--radius-sm)",
      background: i % 2 === 0 ? "var(--surface-2)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-primary)"
    }
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, s.keys.map((k, ki) => /*#__PURE__*/React.createElement("span", {
    key: ki,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 26,
      height: 24,
      padding: "0 6px",
      background: "var(--surface-1)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-mono, monospace)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      color: "var(--text-secondary)"
    }
  }, k))))));
}
window.ShortcutsBody = ShortcutsBody;

// ── MergeBody — simplified: only branch selector, no preview info box ─────────
function MergeBody({
  scope,
  source,
  targets,
  target,
  setTarget
}) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    Select
  } = NS;
  const I = window.BscIcon;
  const tgt = targets.find(t => t.value === target);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 14px",
      background: "var(--gradient-branch)",
      border: "1px solid var(--border-brand)",
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brand-primary)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "git-branch",
    size: 15
  })), source), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-disabled)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "arrow-right",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 700,
      color: "var(--text-brand)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "git-merge",
    size: 15
  })), tgt ? tgt.label : "…")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)",
      fontWeight: 600,
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "Choose target branch"), /*#__PURE__*/React.createElement(Select, {
    value: target,
    onChange: setTarget,
    options: targets
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginTop: 1,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "info",
    size: 13
  })), "Content is appended with a divider. Source branch is kept intact."));
}
window.MergeBody = MergeBody;

// ── ContextMenu ───────────────────────────────────────────────────────────────
function ContextMenu({
  x,
  y,
  items,
  onClose
}) {
  const I = window.BscIcon;
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({
    left: x,
    top: y,
    visibility: "hidden"
  });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      left: Math.min(x, window.innerWidth - r.width - 12),
      top: Math.min(y, window.innerHeight - r.height - 12),
      visibility: "visible"
    });
  }, [x, y]);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const k = e => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("keydown", k);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "fixed",
      left: pos.left,
      top: pos.top,
      visibility: pos.visibility,
      zIndex: "var(--z-modal)",
      minWidth: 184,
      padding: 6,
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-fast) var(--ease-out)"
    }
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 1,
      background: "var(--border-subtle)",
      margin: "6px 4px"
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: it.id,
    type: "button",
    onClick: () => {
      it.run();
      onClose();
    },
    style: {
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
      fontWeight: 500,
      cursor: "pointer",
      textAlign: "left"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = it.danger ? "var(--color-error-bg)" : "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none",
      color: it.danger ? "var(--color-error)" : it.accent ? "var(--brand-primary)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: it.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.label))));
}
window.ContextMenu = ContextMenu;

// ── SelectionMenu ─────────────────────────────────────────────────────────────
function SelectionMenu({
  x,
  y,
  onBranch,
  onCopy,
  onClose
}) {
  const I = window.BscIcon;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const left = Math.max(12, Math.min(x, window.innerWidth - 12));
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "fixed",
      left,
      top: Math.max(8, y - 52),
      transform: "translateX(-50%)",
      zIndex: "var(--z-modal)",
      display: "flex",
      alignItems: "center",
      gap: 2,
      padding: 4,
      background: "var(--surface-inverse)",
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onMouseDown: e => {
      e.preventDefault();
      onBranch();
    },
    style: selMenuBtn
  }, /*#__PURE__*/React.createElement(I, {
    name: "git-branch",
    size: 15
  }), " Branch from selection"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onMouseDown: e => {
      e.preventDefault();
      onCopy();
    },
    title: "Copy",
    style: {
      ...selMenuBtn,
      padding: "0 10px"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "copy",
    size: 15
  })));
}
window.SelectionMenu = SelectionMenu;
const selMenuBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  height: 34,
  padding: "0 14px",
  border: "none",
  background: "transparent",
  color: "var(--text-inverse)",
  borderRadius: "var(--radius-pill)",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--fs-body-sm)",
  fontWeight: 600,
  cursor: "pointer"
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Sidebar — v5. Animated gradient identity, collapsed chat-list hidden,
// profile dropdown uses fixed positioning to escape overflow:hidden clipping,
// icon centering improved for collapsed state.

function ChatListItem({
  chat,
  active,
  expanded,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const I = window.BscIcon;
  const BSC = window.BSC;
  const bg = active ? "var(--surface-selected)" : hover ? "var(--surface-hover)" : "transparent";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    title: chat.name,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      width: "100%",
      height: 36,
      padding: "0 8px",
      background: bg,
      border: active ? "1px solid var(--border-brand)" : "1px solid transparent",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      textAlign: "left",
      flex: "none",
      transition: "background var(--motion-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none",
      color: active ? "var(--brand-primary)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "message-square",
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: active ? 600 : 500,
      color: active ? "var(--text-brand)" : "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, chat.name));
}

// ProfileMenu — uses position:fixed so it escapes the sidebar's overflow:hidden.
// anchorRect: the profile button's getBoundingClientRect() captured at open time.
function ProfileMenu({
  theme,
  anchorRect,
  onClose,
  onThemeToggle,
  onShortcuts,
  onSettings
}) {
  const I = window.BscIcon;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const k = e => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("keydown", k);
    };
  }, []);

  // Position above the button, left-aligned with it, never off-screen
  const menuW = 228;
  const left = anchorRect ? Math.min(anchorRect.left, window.innerWidth - menuW - 12) : 12;
  const bottom = anchorRect ? window.innerHeight - anchorRect.top + 8 : 80;
  const menuItem = (icon, label, onClick, danger) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      onClick();
      onClose();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "9px 10px",
      border: "none",
      borderRadius: "var(--radius-sm)",
      background: "transparent",
      color: danger ? "var(--color-error)" : "var(--text-primary)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 500,
      cursor: "pointer",
      textAlign: "left"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = danger ? "var(--color-error-bg)" : "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: danger ? "var(--color-error)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: icon,
    size: 16
  })), label);

  // Rendered via a portal straight to <body> — position:fixed alone is NOT enough to
  // escape an ancestor's overflow:hidden (the sidebar clips fixed descendants too,
  // since they're still DOM descendants of it). A portal removes it from that subtree
  // entirely so it can truly float above everything, uncropped.
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "fixed",
      left,
      bottom,
      zIndex: 9999,
      width: menuW,
      padding: 6,
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px 10px",
      borderBottom: "1px solid var(--border-subtle)",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "Divyansh Mudgil"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)"
    }
  }, "divyansh@example.com \xB7 Pro plan")), menuItem("user", "Profile", () => {}), menuItem(theme === "dark" ? "sun" : "moon", theme === "dark" ? "Switch to light mode" : "Switch to dark mode", onThemeToggle), menuItem("keyboard", "Keyboard shortcuts", onShortcuts), menuItem("settings", "Settings", onSettings), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-subtle)",
      margin: "6px 4px"
    }
  }), menuItem("log-out", "Sign out", () => {}, true)), document.body);
}
window.ProfileMenu = ProfileMenu;

// SidebarItem — nav button; perfectly centres icon when collapsed.
function SidebarItem({
  icon,
  label,
  onClick,
  active,
  badge,
  accent,
  expanded
}) {
  const [hover, setHover] = React.useState(false);
  const I = window.BscIcon;
  const bg = active ? "var(--surface-selected)" : hover ? "var(--surface-hover)" : "transparent";
  const col = active ? "var(--text-brand)" : "var(--text-secondary)";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    title: expanded ? undefined : label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: expanded ? 10 : 0,
      width: "100%",
      height: 40,
      padding: expanded ? "0 8px" : "0",
      justifyContent: expanded ? "flex-start" : "center",
      textAlign: "left",
      border: "none",
      borderRadius: "var(--radius-md)",
      background: bg,
      color: col,
      cursor: "pointer",
      position: "relative",
      flex: "none",
      transition: "background var(--motion-fast) var(--ease-standard), color var(--motion-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none",
      color: accent && !active ? "var(--brand-primary)" : "inherit"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: active ? 600 : 500,
      whiteSpace: "nowrap",
      flex: expanded ? 1 : "none",
      width: expanded ? "auto" : 0,
      overflow: "hidden",
      opacity: expanded ? 1 : 0,
      transition: "opacity var(--motion-fast) var(--ease-standard)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      color: "var(--text-brand)",
      background: "var(--brand-primary-soft)",
      borderRadius: "var(--radius-pill)",
      padding: "2px 7px",
      minWidth: 18,
      textAlign: "center",
      display: badge != null && badge > 0 && expanded ? "block" : "none"
    }
  }, badge), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 7,
      right: expanded ? 10 : 8,
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--brand-primary)",
      display: badge != null && badge > 0 && !expanded ? "block" : "none"
    }
  }));
}
window.SidebarItem = SidebarItem;
function Sidebar({
  expanded,
  onToggle,
  activePanel,
  onOpenPanel,
  onNewChat,
  onSearch,
  onSettings,
  branchCount,
  starCount,
  theme,
  rootChats,
  activeChatId,
  onSelectChat,
  onThemeToggle,
  onProfileAction
}) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    Tooltip,
    Avatar
  } = NS;
  const I = window.BscIcon;
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [profileRect, setProfileRect] = React.useState(null);
  const [toggleHover, setToggleHover] = React.useState(false);
  const profileBtnRef = React.useRef(null);
  const W = expanded ? 264 : 68;
  const it = p => /*#__PURE__*/React.createElement(SidebarItem, _extends({}, p, {
    expanded: expanded
  }));
  const handleProfileToggle = () => {
    if (!profileOpen && profileBtnRef.current) {
      setProfileRect(profileBtnRef.current.getBoundingClientRect());
    }
    setProfileOpen(v => !v);
  };

  // Wordmark with "AI" in brand gradient
  const wordmark = /*#__PURE__*/React.createElement("div", {
    className: "bsc-wordmark",
    style: {
      fontSize: 13,
      letterSpacing: "0.06em",
      display: "inline-flex",
      alignItems: "baseline",
      marginLeft: expanded ? 8 : 0,
      width: expanded ? "auto" : 0,
      overflow: "hidden",
      opacity: expanded ? 1 : 0,
      transition: "opacity var(--motion-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, "BRANCHSC"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--gradient-brand)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent"
    }
  }, "AI"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, "PE"));
  return (
    /*#__PURE__*/
    // bsc-sidebar class provides animated gradient (see index.html <style>)
    React.createElement("div", {
      className: "bsc-sidebar",
      style: {
        width: W,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 2,
        padding: "12px 8px",
        WebkitBackdropFilter: "var(--glass-blur)",
        backdropFilter: "var(--glass-blur)",
        borderRight: "1px solid var(--border-subtle)",
        zIndex: "var(--z-rail)",
        overflow: "hidden",
        transition: "width var(--motion-medium) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: expanded ? "space-between" : "center",
        height: 44,
        marginBottom: 2,
        flex: "none"
      }
    }, wordmark, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onToggle,
      "aria-label": "Toggle sidebar",
      title: expanded ? "Collapse sidebar" : "Expand sidebar",
      onMouseEnter: () => setToggleHover(true),
      onMouseLeave: () => setToggleHover(false),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        flex: "none",
        border: "none",
        borderRadius: "var(--radius-md)",
        background: toggleHover ? "var(--surface-hover)" : "transparent",
        color: "var(--text-secondary)",
        cursor: "pointer",
        transition: "background var(--motion-fast) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: "panel-left",
      size: 18
    }))), it({
      icon: "square-pen",
      label: "New chat",
      onClick: onNewChat,
      accent: true
    }), it({
      icon: "search",
      label: "Search",
      onClick: onSearch
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: "var(--border-subtle)",
        margin: "4px 2px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "bsc-scroll",
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: expanded ? "auto" : "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        paddingBottom: 4
      }
    }, expanded && rootChats.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 8px",
        textAlign: "center",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-caption)",
        color: "var(--text-muted)",
        lineHeight: 1.5
      }
    }, "No conversations yet.", /*#__PURE__*/React.createElement("br", null), "Start a new chat above."), expanded && rootChats.map(chat => /*#__PURE__*/React.createElement(ChatListItem, {
      key: chat.id,
      chat: chat,
      expanded: true,
      active: chat.id === activeChatId,
      onClick: () => onSelectChat(chat.id)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: "var(--border-subtle)",
        margin: "4px 2px"
      }
    }), it({
      icon: "git-branch",
      label: "Branches",
      onClick: () => onOpenPanel("branches"),
      active: activePanel === "branches",
      badge: branchCount
    }), it({
      icon: "star",
      label: "Starred",
      onClick: () => onOpenPanel("starred"),
      active: activePanel === "starred",
      badge: starCount
    }), it({
      icon: "history",
      label: "History",
      onClick: () => onOpenPanel("history"),
      active: activePanel === "history"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: "var(--border-subtle)",
        margin: "4px 2px"
      }
    }), it({
      icon: "settings",
      label: "Settings",
      onClick: onSettings
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: "none"
      }
    }, profileOpen && /*#__PURE__*/React.createElement(ProfileMenu, {
      theme: theme,
      anchorRect: profileRect,
      onClose: () => setProfileOpen(false),
      onThemeToggle: onThemeToggle,
      onShortcuts: () => {
        onProfileAction("shortcuts");
        setProfileOpen(false);
      },
      onSettings: () => {
        onSettings();
        setProfileOpen(false);
      }
    }), /*#__PURE__*/React.createElement("button", {
      ref: profileBtnRef,
      type: "button",
      onClick: handleProfileToggle,
      style: {
        display: "flex",
        alignItems: "center",
        gap: expanded ? 10 : 0,
        width: "100%",
        height: 44,
        padding: expanded ? "0 6px" : "0",
        justifyContent: expanded ? "flex-start" : "center",
        border: "none",
        borderRadius: "var(--radius-md)",
        background: profileOpen ? "var(--surface-hover)" : "transparent",
        cursor: "pointer",
        transition: "background var(--motion-fast) var(--ease-standard)"
      },
      onMouseEnter: e => {
        if (!profileOpen) e.currentTarget.style.background = "var(--surface-hover)";
      },
      onMouseLeave: e => {
        if (!profileOpen) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Divyansh Mudgil",
      kind: "user",
      size: 30,
      style: {
        background: "var(--c-aurora-mint)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        overflow: "hidden",
        width: expanded ? "auto" : 0,
        opacity: expanded ? 1 : 0,
        transition: "opacity var(--motion-fast) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: 600,
        color: "var(--text-primary)",
        whiteSpace: "nowrap"
      }
    }, "Divyansh Mudgil"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-micro)",
        color: "var(--text-muted)",
        whiteSpace: "nowrap"
      }
    }, "Pro plan")))))
  );
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/TopBar.jsx
try { (() => {
// TopBar — breadcrumb lineage (primary nav) + right-side actions.
// "More" button replaced with Temporary Chat toggle.
// Share popover now shows a success toast on copy.
// Temporary badge shown in breadcrumb row when in ephemeral mode.

function TopBar({
  nodes,
  inBranch,
  onNavigate,
  onRename,
  onMerge,
  theme,
  onToggleTheme,
  isTemporary,
  onStartTemporary,
  onToast
}) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const {
    IconButton,
    Tooltip
  } = NS;
  const Breadcrumb = window.LineageBar;
  const I = window.BscIcon;
  const [tempHover, setTempHover] = React.useState(false);
  const tempActive = isTemporary;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      height: 64,
      padding: "0 18px 0 20px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    nodes: nodes,
    onNavigate: onNavigate,
    onRename: onRename
  }), isTemporary && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: 22,
      padding: "0 10px",
      flex: "none",
      background: "oklch(95% 0.04 70)",
      border: "1px solid oklch(82% 0.07 70)",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      color: "oklch(50% 0.14 70)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "clock",
    size: 11
  }), " Temporary")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flex: "none"
    }
  }, inBranch && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onMerge,
    style: mergeBtn,
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--surface-hover)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "var(--surface-2)";
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "git-merge",
    size: 15
  }), " Merge to parent"), /*#__PURE__*/React.createElement(Tooltip, {
    content: theme === "dark" ? "Light mode" : "Dark mode",
    side: "bottom"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(I, {
      name: theme === "dark" ? "sun" : "moon"
    }),
    label: "Toggle theme",
    onClick: onToggleTheme
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: tempActive ? "Exit temporary chat" : "Start temporary chat",
    side: "bottom"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onStartTemporary,
    onMouseEnter: () => setTempHover(true),
    onMouseLeave: () => setTempHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      flex: "none",
      border: "none",
      borderRadius: "var(--radius-md)",
      background: tempActive ? "oklch(93% 0.05 70)" : tempHover ? "var(--surface-hover)" : "transparent",
      color: tempActive ? "oklch(50% 0.14 70)" : "var(--text-secondary)",
      cursor: "pointer",
      transition: "background var(--motion-fast) var(--ease-standard), color var(--motion-fast)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: "clock",
    size: 18
  })))));
}
window.TopBar = TopBar;

// ── SharePopover ──────────────────────────────────────────────────────────────
// Generates a copyable link and fires a toast on successful copy.
function SharePopover({
  nodes,
  inBranch,
  onClose,
  onToast
}) {
  const I = window.BscIcon;
  const ref = React.useRef(null);
  const [scope, setScope] = React.useState(inBranch ? "branch" : "conversation");
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const current = nodes[nodes.length - 1];
  const root = nodes[0];
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const token = (current.id || "x").slice(-6);
  const link = scope === "branch" ? `https://branchscaipe.app/s/${slug(root.name)}/${slug(current.name)}-${token}` : `https://branchscaipe.app/s/${slug(root.name)}-${(root.id || "x").slice(-6)}`;
  const copy = () => {
    const done = () => {
      setCopied(true);
      if (onToast) onToast({
        tone: "success",
        icon: "check",
        title: "Link copied",
        desc: "Share link is on your clipboard."
      });
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1400);
    };
    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = link;
        ta.style.cssText = "position:fixed;opacity:0;top:0;left:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch (_) {
        done();
      } // show success anyway — link is visible to copy manually
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(done).catch(fallback);
    } else {
      fallback();
    }
  };
  const Opt = ({
    id,
    icon,
    title,
    desc
  }) => {
    const on = scope === id;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setScope(id),
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        width: "100%",
        textAlign: "left",
        padding: "10px 11px",
        border: "1px solid " + (on ? "var(--border-brand)" : "var(--border-subtle)"),
        borderRadius: "var(--radius-md)",
        background: on ? "var(--surface-selected)" : "transparent",
        cursor: "pointer",
        transition: "background var(--motion-fast), border-color var(--motion-fast)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        marginTop: 1,
        color: on ? "var(--brand-primary)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: icon,
      size: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-body-sm)",
        fontWeight: 600,
        color: "var(--text-primary)"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-micro)",
        color: "var(--text-muted)",
        marginTop: 1
      }
    }, desc)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        marginTop: 2,
        color: on ? "var(--brand-primary)" : "transparent"
      }
    }, /*#__PURE__*/React.createElement(I, {
      name: "check",
      size: 15
    })));
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      right: 0,
      zIndex: "var(--z-dropdown)",
      width: 304,
      padding: 12,
      background: "var(--surface-glass-heavy)",
      WebkitBackdropFilter: "var(--glass-blur)",
      backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-medium) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: 700,
      color: "var(--text-primary)",
      marginBottom: 4
    }
  }, "Share"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-muted)",
      marginBottom: 10
    }
  }, "Anyone with the link can view a read-only copy."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Opt, {
    id: "conversation",
    icon: "messages-square",
    title: "Entire conversation",
    desc: `Full thread from "${root.name}"`
  }), /*#__PURE__*/React.createElement(Opt, {
    id: "branch",
    icon: "git-branch",
    title: "This branch only",
    desc: `Just "${current.name}" and its context`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 12,
      padding: "6px 6px 6px 12px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontFamily: "var(--font-mono, monospace)",
      fontSize: "var(--fs-micro)",
      color: "var(--text-secondary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, link), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: copy,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: 30,
      padding: "0 12px",
      flex: "none",
      border: "none",
      borderRadius: "var(--radius-pill)",
      background: "var(--gradient-brand)",
      color: "#fff",
      boxShadow: "var(--shadow-glow-soft)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-micro)",
      fontWeight: 700,
      cursor: "pointer",
      transition: "opacity var(--motion-fast)"
    }
  }, /*#__PURE__*/React.createElement(I, {
    name: copied ? "check" : "link",
    size: 13
  }), copied ? "Copied!" : "Copy link")));
}
window.SharePopover = SharePopover;
const mergeBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  height: 36,
  padding: "0 14px",
  background: "var(--surface-2)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-pill)",
  color: "var(--text-brand)",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--fs-body-sm)",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background var(--motion-fast)"
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/branchscaipe-app/data.js
try { (() => {
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
const uid = p => `${p || "id"}-${Date.now().toString(36)}-${(_n++).toString(36)}`;
window.BSC_UID = uid;
window.BSC_DATA = {
  rootId: null,
  branches: {}
};

// ── Lineage & context ──────────────────────────────────────────────────────
function lineage(branches, id) {
  const out = [];
  let cur = branches[id];
  while (cur) {
    out.unshift(cur);
    cur = cur.parentId ? branches[cur.parentId] : null;
  }
  return out;
}
function contextMessages(branches, id) {
  const chain = lineage(branches, id);
  let acc = [];
  chain.forEach((b, i) => {
    const child = chain[i + 1];
    if (child) {
      const cut = b.messages.findIndex(m => m.id === child.branchPointId);
      acc = acc.concat(cut === -1 ? b.messages : b.messages.slice(0, cut + 1));
    } else {
      acc = acc.concat(b.messages);
    }
  });
  return acc.filter(m => m.role === "user" || m.role === "assistant");
}

// ── Auto-naming ─────────────────────────────────────────────────────────────
const STOP_WORDS = new Set("the a an of to for and or but is are be how what why when where can could would should do does this that these those your you i we it on in with from about into give me show tell explain describe compare discuss versus vs please just also".split(" "));
function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function autoName(seed) {
  if (!seed) return "New chat";
  const words = seed.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const salient = words.filter(w => !STOP_WORDS.has(w) && w.length > 2);
  if (!salient.length) {
    const f = words.find(w => w.length > 1);
    return f ? titleCase(f) : "New chat";
  }
  return salient.sort((a, b) => b.length - a.length).slice(0, 2).map(titleCase).join(" ").slice(0, 32);
}

// ── Relative time ──────────────────────────────────────────────────────────
function relTime(ts) {
  const s = Math.max(1, Math.round((Date.now() - ts) / 1000));
  if (s < 45) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

// ── Context-aware, natural reply generation ────────────────────────────────
//
// Strategy:
//   1. Extract a meaningful subject from the user's text
//   2. Detect intent (question, how-to, comparison, help, opinion, example, general)
//   3. Pick from a pool of templates that reference the subject
//   4. Vary depth based on conversation turn count
//   5. Weave in branch/merge context when relevant

function pick(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// Slot the subject into a template string or function
function fill(template, subject) {
  if (typeof template === "function") return template(subject);
  return template.replace(/\{s\}/g, subject);
}

// Extract the 1-3 most meaningful words from the user's message
function extractSubject(text) {
  const clean = text.replace(/[?!.,;:'"]/g, " ").split(/\s+/).filter(Boolean);
  const meaningful = clean.filter(w => w.length > 3 && !STOP_WORDS.has(w.toLowerCase()));
  if (meaningful.length === 0) return clean[0] || "this";
  return meaningful.slice(0, 2).join(" ").toLowerCase();
}

// ── Response pools by intent ───────────────────────────────────────────────

const POOLS = {
  comparison: [s => `The choice between these approaches to ${s} usually comes down to three things: how often your requirements change, how much cognitive overhead is acceptable, and what happens when things break.\n\nThe conventional pick optimises for familiarity. The less common alternative trades legibility for composability. Which matters more in your situation?`, s => `Both options here are solving the same underlying problem — they just make different bets about what will hurt you later.\n\nFor ${s}, I'd ask: what does maintenance look like in six months? The answer usually points clearly at one of them.`, s => `These aren't as different as they appear on the surface. The real distinction with ${s} is about where complexity lives: one front-loads it, the other defers it.\n\nFront-loading usually wins if requirements are stable. Deferring wins if they're likely to shift. Which is your situation?`, s => `Comparisons like this for ${s} tend to be context-dependent rather than universal. The question worth asking first: what does the failure mode look like for each option? That framing usually makes the answer obvious faster than any feature comparison.`, s => `Both are reasonable — which is exactly why the decision feels hard. For ${s}, I'd weight: team familiarity, how well each one tests, and what "done" looks like. Pick the one that loses the fewest points across all three.`],
  help: [s => `Issues with ${s} typically trace back to one of three sources: an assumption baked in too early, a side effect that's hard to trace because it crosses boundaries, or something that works in isolation but breaks in composition.\n\nWalk me through what you expected to happen versus what's actually happening — that's usually enough to narrow it down.`, s => `When ${s} misbehaves, the most useful first move is to separate observation from explanation. What exactly is happening — not why you think it's happening, just the observed behaviour? That removes a layer of assumption and makes the real problem easier to spot.`, s => `Problems like this with ${s} usually have a simpler root cause than they look like from the outside. The noise makes it seem complex. Start by finding the smallest reproduction — if you can make it fail consistently with the fewest moving parts, the fix becomes obvious.`, s => `Debugging ${s} is often about eliminating possibilities systematically rather than guessing. What changed most recently before this started happening? That's the highest-probability culprit.`, s => `The tricky part with ${s} errors is that the symptom and the cause are rarely in the same place. I'd work backwards from the failure: what's the last thing that definitely works correctly? Then reason forward from there.`],
  howto: [s => `The key to ${s} is working backwards from the outcome rather than forwards from the tools. Start by being precise about what "done" looks like — a clear definition of the goal makes the steps fall into place.\n\nWith that said, the path usually looks like: establish a baseline, then iterate in small verifiable steps. What's your starting point?`, s => `For ${s}, there's a short path and a correct path — and they're often different. The short path gets you there faster but with hidden assumptions. The correct path takes slightly longer but stays stable under pressure.\n\nGiven the context, which matters more here?`, s => `The mental model that makes ${s} tractable: treat it as a series of decisions, not a single task. Identify the most consequential decision first, resolve it, then move to the next. This stops the whole thing from feeling overwhelming.`, s => `${s.charAt(0).toUpperCase() + s.slice(1)} has a natural sequence that's easy to skip when you're in a hurry. The first phase is almost always about understanding the constraints — not the implementation. Get the constraints clear, and the implementation tends to write itself.`, s => `Start with the simplest possible version of ${s} that could work. Make it work first, then make it right, then make it fast. Trying to do all three at once is where most of the friction comes from.`],
  explain: [s => `At its core, ${s} is about reducing a particular kind of uncertainty. Once you see what uncertainty it's designed to eliminate, the mechanics start to make intuitive sense rather than feeling like arbitrary rules.`, s => `The clearest way to think about ${s}: what problem existed before it, and what would go wrong without it? That framing makes the design decisions obvious — every piece of it is a direct response to something that used to break.`, s => `${s.charAt(0).toUpperCase() + s.slice(1)} is one of those concepts where the surface behaviour is deceptive. What you observe doesn't look like what's actually happening underneath. The underlying mechanism is simpler than it seems — want me to work through it from first principles?`, s => `The thing most explanations of ${s} get wrong is starting with how it works rather than why it exists. The "why" gives you the mental model. The "how" is just implementation detail that makes sense once the model clicks.`, s => `${s.charAt(0).toUpperCase() + s.slice(1)}: the short version is that it solves one specific problem very well, and creates a different set of problems if you use it outside that context. Understanding the intended use case is the key to understanding everything else about it.`],
  example: [s => `Here's a concrete way to see ${s} in action: imagine a system where two components need to stay in sync without either one knowing about the other directly. The pattern that works is introducing a single source of truth between them — both read from it, neither writes to the other. When state changes, the update propagates automatically.\n\nDoes the shape of your problem match that?`, s => `For ${s}, a real-world analogy that holds up well: think of it like a contract between two parties. Each side agrees to a specific interface. What's behind that interface can change freely — neither side needs to know. The moment you violate the contract is the moment complexity leaks.\n\nHow does that map to what you're building?`, s => `A minimal working example of ${s} usually has just three parts: input, transformation, and output. The transformation is where all the interesting decisions live. Everything else is just plumbing.\n\nWant me to trace through a specific scenario, or is the general pattern what you needed?`, s => `The cleanest illustration of ${s} I know: take two implementations that both produce the right output. One is readable but fragile. One is harder to follow but handles edge cases gracefully. The difference is almost always in how they handle the case that wasn't in the original requirements. That case will always arrive.`, s => `Let me give you a concrete example for ${s} and then flag where the assumption in that example is most likely to break for your specific case. The gap between the example and the real case is usually where the interesting problem lives.`],
  opinion: [s => `For ${s}, "best practice" always has an asterisk. Best for which team, at which scale, with which rate of change in requirements?\n\nIf I had to weight it for a typical situation: prioritise the option that's easiest to test independently, easiest to change without touching adjacent code, and clearest about its own failure modes.`, s => `My honest take on ${s}: the conventional recommendation is right for the common case, but the common case might not be yours. Before taking any advice — including mine — check what assumptions it's making about scale, team size, and how often this code changes.`, s => `The recommendation for ${s} depends on which failure you're most afraid of. If you're afraid of moving too slow, bias toward flexibility. If you're afraid of breaking things, bias toward explicitness. Those two goals are in genuine tension — the right answer picks a side rather than trying to optimise both.`, s => `What I'd actually do with ${s}: resist the urge to over-engineer it early. Start with the simplest approach, instrument it well so you can see where it struggles, and wait for reality to tell you what needs to change. Premature architecture creates more problems than it solves.`, s => `On ${s} — the advice that ages best is usually "understand the trade-off, then make it deliberately." Most problems come not from choosing the wrong option but from choosing without knowing what you were trading away.`],
  general: [s => `What you're hitting with ${s} is one of those things where the surface question and the actual question are slightly different. The surface question has an obvious answer. The actual question — what outcome are you trying to reach — has a more nuanced one.\n\nWhat does success look like here?`, s => `The mental model I'd bring to ${s}: separate the "what" from the "how." Get precise on what you want to achieve before thinking about implementation at all. Vague goals produce vague solutions, and the wrong solution built well is still the wrong solution.`, s => `With ${s}, it's worth asking what would tell you that you're wrong. That question sharpens the thinking faster than asking what would tell you that you're right. It forces you to name the assumptions you're carrying.`, s => `${s.charAt(0).toUpperCase() + s.slice(1)} is one of those areas where the first answer is usually right for the obvious case and wrong for the real case. The obvious case is straightforward. The real case has constraints, history, and context that the obvious case doesn't account for.\n\nWhat's the specific constraint that makes this tricky?`, s => `Let me give you the direct answer for ${s} first, then flag where that answer is most likely to break down for your situation specifically. The general answer is usually easy. The edge cases are where the interesting work lives.`, s => `The pattern I notice with ${s} is that the difficulty isn't in the core thing — it's in how it interacts with everything adjacent. Isolating it from those interactions, even mentally, usually makes the solution clear. What's the clearest version of the problem if you strip away the context?`],
  retry: [s => `Let me approach ${s} from a different angle. The previous framing might have been too abstract — here's the same idea grounded more concretely.`, s => `Taking another run at ${s}: the version I gave you was optimised for the general case. Your situation likely has specifics that change the answer. What's the part that felt off?`, s => `Different take on ${s}. Rather than working forward from principles, let's work backwards from what you're actually trying to accomplish.`, s => `Let me try ${s} again with a cleaner framing. I'll be more direct this time about where the genuine trade-offs are.`],
  merged: [s => `I've got both threads here now. The context from the merged branch is useful — it gives a fuller picture of where this started.\n\nBuilding on that: with ${s}, the most productive next step is probably to...`, s => `Bringing the merged context in alongside what we've been working through — the through-line I see is that ${s} keeps showing up as the crux. That's probably worth addressing directly rather than talking around it.\n\nWhat's the specific aspect you want to focus on?`]
};

// Turn-count variations: later turns get shorter, punchier responses sometimes
const SHORT_FOLLOWUPS = ["What's the specific part that's still unclear?", "Does that framing match what you were asking, or did I miss the mark?", "What would make this concrete for your situation?", "Is there a specific constraint I should factor in here?", "Which part of this are you least confident about?"];
function generateReply({
  branch,
  userText,
  contextTopics,
  merged,
  retry
}) {
  const q = (userText || "").trim();
  const qLow = q.toLowerCase();

  // Get conversation turn count for depth calibration
  const allMsgs = branch.messages.filter(m => m.role === "user" || m.role === "assistant");
  const turnCount = allMsgs.filter(m => m.role === "user").length;

  // Extract meaningful subject for natural response interpolation
  const subject = extractSubject(q);

  // ── Merged context ────────────────────────────────────────────────
  if (merged) {
    const tpl = pick(POOLS.merged);
    return fill(tpl, subject);
  }

  // ── Retry: different angle ────────────────────────────────────────
  if (retry) {
    const tpl = pick(POOLS.retry);
    return fill(tpl, subject);
  }

  // ── Detect intent ─────────────────────────────────────────────────
  let pool;
  if (/\bvs\b|versus|\bdiff(er|erence)|compar(e|ing|ison)\b/.test(qLow)) {
    pool = POOLS.comparison;
  } else if (/\bhelp\b|stuck|issue|problem|error|bug|wrong|not working|broken|fail/.test(qLow)) {
    pool = POOLS.help;
  } else if (/\bhow (to|do|can|should|would|does)\b/.test(qLow)) {
    pool = POOLS.howto;
  } else if (/\bexplain\b|what is|what are|what does|describe|clarify|mean\b/.test(qLow)) {
    pool = POOLS.explain;
  } else if (/\bexample|show me|give me (an?|some)|sample|demo\b/.test(qLow)) {
    pool = POOLS.example;
  } else if (/\bshould i\b|recommend|best (way|approach|practice)|advice|suggest/.test(qLow)) {
    pool = POOLS.opinion;
  } else {
    pool = POOLS.general;
  }
  let reply = fill(pick(pool), subject);

  // ── Late-conversation: occasionally append a short focused follow-up ──
  if (turnCount >= 3 && Math.random() > 0.55) {
    reply += "\n\n" + pick(SHORT_FOLLOWUPS);
  }

  // ── Branch context prefix: weave in parent context ─────────────────
  if (branch.parentId && contextTopics && contextTopics.length > 0 && turnCount <= 1) {
    const prev = contextTopics[contextTopics.length - 1];
    if (prev) {
      reply = `Building on "${prev}" — ${reply.charAt(0).toLowerCase() + reply.slice(1)}`;
    }
  }
  return reply;
}
window.BSC = {
  uid,
  lineage,
  contextMessages,
  autoName,
  relTime,
  generateReply
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/branchscaipe-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.AIStatusIndicator = __ds_scope.AIStatusIndicator;

__ds_ns.AssistantMessage = __ds_scope.AssistantMessage;

__ds_ns.BranchBreadcrumb = __ds_scope.BranchBreadcrumb;

__ds_ns.BranchIndicator = __ds_scope.BranchIndicator;

__ds_ns.BranchNavigator = __ds_scope.BranchNavigator;

__ds_ns.Composer = __ds_scope.Composer;

__ds_ns.ContextBanner = __ds_scope.ContextBanner;

__ds_ns.MergeBanner = __ds_scope.MergeBanner;

__ds_ns.ThreadLineage = __ds_scope.ThreadLineage;

__ds_ns.ToolCall = __ds_scope.ToolCall;

__ds_ns.UserMessage = __ds_scope.UserMessage;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

})();
