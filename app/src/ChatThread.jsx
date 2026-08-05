// ChatThread — renders a branch's transcript: origin banner, quoted-selection
// context (for selection-branches), messages, merge dividers, status.
import React from "react";
import { motion } from "framer-motion";
import { UserMessage, AIStatusIndicator } from "./design-system/components/ai/index.js";
import { Response, MergeDivider, BranchOriginBanner } from "./Response.jsx";
import { Icon as I } from "./Icon.jsx";

export function ChatThread({ branch, status, inBranch, onAction, onContextMenu, onSelectText, onJumpParent, onJumpSource, scrollRef, registerMsgRef, highlightId, isTouch = false, isMobile = false }) {
  const realCount = branch.messages.filter((m) => m.role === "user" || m.role === "assistant").length;

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [branch.id, branch.messages.length, status]);

  return (
    <div ref={scrollRef} className="bsc-scroll" style={{ flex: 1, overflowY: "auto", position: "relative", minHeight: 0 }}>
      <div style={{ position: "sticky", top: 0, height: 24, marginBottom: -24, background: "var(--gradient-fade-top)", zIndex: 2, pointerEvents: "none" }} />

      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: isMobile ? "16px 14px 24px" : "16px 24px 36px", display: "flex", flexDirection: "column", gap: 22 }}>
        {inBranch && <BranchOriginBanner parentName={branch._parentName} seed={branch.branchSeed} onJump={onJumpParent} />}

        {inBranch && branch.quote && (
          <div style={{ display: "flex", gap: 10, padding: "12px 16px", background: "var(--surface-2)", border: "1px solid var(--border-subtle)", borderLeft: "2px solid var(--border-brand)", borderRadius: "var(--radius-md)" }}>
            <span style={{ display: "inline-flex", color: "var(--brand-primary)", flex: "none", marginTop: 1 }}><I name="quote" size={15} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--text-muted)", marginBottom: 3 }}>Branched from selection</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", color: "var(--text-secondary)", lineHeight: 1.5 }}>{branch.quote}</div>
            </div>
          </div>
        )}

        {branch.messages.map((m) => {
          // initial/animate on a motion element only plays once, on that
          // component instance's first mount — since messages are keyed by
          // id and only ever appended (never reordered), this naturally
          // animates just the newly-arrived message, not the whole history
          // re-playing on every render or branch switch.
          const entrance = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } };
          if (m.role === "merge") {
            return (
              <motion.div key={m.id} {...entrance}>
                <MergeDivider source={m.source} ts={m.ts} scope={m.scope} onJump={() => onJumpSource && onJumpSource(m.sourceId)} />
              </motion.div>
            );
          }
          if (m.role === "user") {
            return (
              <motion.div key={m.id} ref={(n) => registerMsgRef(m.id, n)} className={highlightId === m.id ? "bsc-flash" : ""} {...entrance}>
                <UserMessage>{m.text}</UserMessage>
              </motion.div>
            );
          }
          return (
            <motion.div key={m.id} ref={(n) => registerMsgRef(m.id, n)} className={highlightId === m.id ? "bsc-flash" : ""} style={m.fromMerge ? { borderLeft: "2px solid var(--border-brand)", paddingLeft: 16, marginLeft: -2 } : null} {...entrance}>
              <Response msg={m} inBranch={inBranch} onAction={onAction} onContextMenu={onContextMenu} onSelectText={onSelectText} registerRef={() => {}} isTouch={isTouch} />
            </motion.div>
          );
        })}

        {inBranch && realCount === 0 && status === "idle" && (
          <div style={{ textAlign: "center", padding: "10px 24px 4px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>
            You're in a new branch with the full context up to here.<br />Ask your side question — the parent thread stays untouched.
          </div>
        )}

        {status && status !== "idle" && (
          <div style={{ alignSelf: "flex-start", paddingTop: 2 }}>
            <AIStatusIndicator state={status} />
          </div>
        )}
      </div>
    </div>
  );
}
