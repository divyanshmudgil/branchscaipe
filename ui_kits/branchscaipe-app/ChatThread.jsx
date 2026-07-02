// ChatThread — renders a branch's transcript: origin banner, quoted-selection
// context (for selection-branches), messages, merge dividers, status.
function ChatThread({ branch, status, inBranch, onAction, onContextMenu, onSelectText, onJumpParent, onJumpSource, scrollRef, registerMsgRef, highlightId }) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const { UserMessage, AIStatusIndicator } = NS;
  const Response = window.Response, MergeDivider = window.MergeDivider, BranchOriginBanner = window.BranchOriginBanner;
  const I = window.BscIcon;
  const realCount = branch.messages.filter((m) => m.role === "user" || m.role === "assistant").length;

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [branch.id, branch.messages.length, status]);

  return (
    <div ref={scrollRef} className="bsc-scroll" style={{ flex: 1, overflowY: "auto", position: "relative", minHeight: 0 }}>
      <div style={{ position: "sticky", top: 0, height: 24, marginBottom: -24, background: "var(--gradient-fade-top)", zIndex: 2, pointerEvents: "none" }} />

      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "16px 24px 36px", display: "flex", flexDirection: "column", gap: 22 }}>
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
          if (m.role === "merge") {
            return <MergeDivider key={m.id} source={m.source} ts={m.ts} scope={m.scope} onJump={() => onJumpSource && onJumpSource(m.sourceId)} />;
          }
          if (m.role === "user") {
            return (
              <div key={m.id} ref={(n) => registerMsgRef(m.id, n)} className={highlightId === m.id ? "bsc-flash" : ""}>
                <UserMessage>{m.text}</UserMessage>
              </div>
            );
          }
          return (
            <div key={m.id} ref={(n) => registerMsgRef(m.id, n)} className={highlightId === m.id ? "bsc-flash" : ""} style={m.fromMerge ? { borderLeft: "2px solid var(--border-brand)", paddingLeft: 16, marginLeft: -2 } : null}>
              <Response msg={m} inBranch={inBranch} onAction={onAction} onContextMenu={onContextMenu} onSelectText={onSelectText} registerRef={() => {}} />
            </div>
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
window.ChatThread = ChatThread;
