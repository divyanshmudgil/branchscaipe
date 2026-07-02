// Screens — AppComposer (real SpeechRecognition voice), EmptyState (logo animation),
// CommandPalette, SettingsBody, ShortcutsBody, MergeBody (simplified), ContextMenu, SelectionMenu.

// ── AppComposer ───────────────────────────────────────────────────────────────
function AppComposer({ value, onChange, onSend, branchingFrom, disabled, onToast }) {
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
    const h = (e) => { if (attachRef.current && !attachRef.current.contains(e.target)) setAttachOpen(false); };
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
        tone: "error", icon: "mic-off",
        title: "Voice not supported",
        desc: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
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

    rec.onresult = (event) => {
      let finalPart = "";
      let interimPart = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalPart += event.results[i][0].transcript;
        else interimPart += event.results[i][0].transcript;
      }
      if (finalPart) transcriptRef.current += (transcriptRef.current ? " " : "") + finalPart.trim();
      const display = (transcriptRef.current + (interimPart ? " " + interimPart : "")).trim();
      if (display) onChange && onChange({ target: { value: display } });
    };

    rec.onerror = (event) => {
      if (event.error === "not-allowed") {
        onToast && onToast({ tone: "error", icon: "mic-off", title: "Microphone access denied", desc: "Allow microphone access in your browser settings." });
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
          setTimeout(() => { textareaRef.current && textareaRef.current.focus(); }, 50);
        }, 500);
      }
    };

    recognitionRef.current = rec;
    try { rec.start(); } catch (e) { setVoiceState("idle"); }
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
      setTimeout(() => { textareaRef.current && textareaRef.current.focus(); }, 50);
    }, 420);
  };

  const handleVoiceClick = () => {
    if (voiceState === "idle") startVoice();
    else if (voiceState === "recording") stopVoice();
    // transcribing state ignores clicks
  };

  const handleAttach = (type) => {
    setAttachOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.accept =
        type === "image"    ? "image/*" :
        type === "pdf"      ? ".pdf" :
        ".pdf,.doc,.docx,.txt,.md,.csv";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && onToast) {
      onToast({ tone: "info", icon: "paperclip", title: file.name, desc: "Attachment ready — included with your next message." });
    }
    e.target.value = "";
  };

  // Voice button colors
  const voiceColor = voiceState === "recording"
    ? (pulseBright ? "oklch(52% 0.22 20)" : "oklch(62% 0.18 20)")
    : voiceState === "transcribing" ? "var(--brand-primary)" : "var(--text-muted)";
  const voiceBg = voiceState === "recording"
    ? (pulseBright ? "oklch(94% 0.04 20)" : "oklch(97% 0.02 20)")
    : "transparent";
  const voiceBorder = voiceState !== "idle" ? "1px solid oklch(85% 0.06 20)" : "none";

  const attachTypes = [
    { id: "image",    icon: "image",     label: "Upload image",    sub: "JPEG, PNG, GIF, WebP" },
    { id: "document", icon: "file-text", label: "Upload document", sub: "TXT, MD, DOCX, CSV"   },
    { id: "pdf",      icon: "file",      label: "Upload PDF",      sub: "PDF up to 50 MB"       },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "var(--composer-max)", margin: "0 auto" }}>
      {branchingFrom && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8, marginLeft: 6,
          padding: "4px 10px", background: "var(--brand-primary-soft)", color: "var(--text-brand)",
          borderRadius: "var(--radius-pill)",
          fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", fontWeight: 500,
        }}>
          <I name="git-branch" size={13} /> Branching from {branchingFrom}
        </div>
      )}

      <div style={{
        background: "var(--surface-glass-heavy)",
        WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)",
        padding: "14px 16px 10px",
      }}>
        <textarea
          ref={textareaRef}
          value={value} onChange={onChange}
          placeholder={
            voiceState === "recording"     ? "Listening…"      :
            voiceState === "transcribing"  ? "Transcribing…"   :
                                             "Ask me anything…"
          }
          rows={1}
          disabled={disabled || voiceState !== "idle"}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); canSend && onSend && onSend(); } }}
          style={{
            width: "100%", border: "none", outline: "none", resize: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-normal)",
            color: voiceState !== "idle" ? "var(--text-muted)" : "var(--text-primary)",
            letterSpacing: "var(--tracking-wide)", minHeight: 22, maxHeight: 160,
            transition: "color var(--motion-fast)",
          }}
        />

        {/* Voice state indicator */}
        {voiceState === "recording" && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 4, marginBottom: 2,
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: voiceColor,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: voiceColor,
              display: "inline-block", transition: "background var(--motion-fast)",
            }} />
            Listening — click mic to stop
          </div>
        )}
        {voiceState === "transcribing" && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 4, marginBottom: 2,
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)",
          }}>
            <span style={{
              width: 14, height: 14, border: "2px solid var(--brand-primary)",
              borderTopColor: "transparent", borderRadius: "50%", display: "inline-block",
              animation: "bscSpin 0.7s linear infinite", flex: "none",
            }} />
            Transcribing…
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          {/* Attachment */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }} ref={attachRef}>
            <button type="button" onClick={() => setAttachOpen(v => !v)} title="Attach file" style={composerIconBtn}>
              <span style={{ fontSize: 22, lineHeight: 1, color: "var(--text-muted)", fontWeight: 300 }}>+</span>
            </button>
            {attachOpen && (
              <div style={{
                position: "absolute", bottom: "calc(100% + 8px)", left: 0, zIndex: 200,
                width: 230, padding: 6,
                background: "var(--surface-glass-heavy)",
                WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)", animation: "bscPop var(--motion-fast) var(--ease-out)",
              }}>
                <div style={{ padding: "4px 10px 8px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-muted)" }}>
                  Attach
                </div>
                {attachTypes.map(t => (
                  <button key={t.id} type="button" onClick={() => handleAttach(t.id)} style={{
                    display: "flex", alignItems: "flex-start", gap: 10, width: "100%",
                    padding: "9px 10px", border: "none", borderRadius: "var(--radius-sm)",
                    background: "transparent", cursor: "pointer", textAlign: "left",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                    <span style={{ display: "inline-flex", color: "var(--text-muted)", marginTop: 1 }}><I name={t.icon} size={16} /></span>
                    <span>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, color: "var(--text-primary)" }}>{t.label}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)" }}>{t.sub}</div>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice + send */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              type="button" onClick={handleVoiceClick}
              title={voiceState === "recording" ? "Stop recording" : "Voice input"}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 34, height: 34, borderRadius: "var(--radius-sm)",
                border: voiceBorder, background: voiceBg, color: voiceColor,
                cursor: voiceState === "transcribing" ? "default" : "pointer",
                transition: "background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast)",
              }}
            >
              <I name="mic" size={16} />
            </button>
            <button
              type="button" onClick={() => canSend && onSend && onSend()}
              disabled={!canSend} aria-label="Send"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 36, height: 36, borderRadius: "var(--radius-full)", border: "none",
                background: canSend ? "var(--gradient-brand)" : "var(--surface-3)",
                color: canSend ? "#fff" : "var(--text-disabled)",
                boxShadow: canSend ? "var(--shadow-glow-soft)" : "none",
                cursor: canSend ? "pointer" : "not-allowed",
                transition: "background var(--motion-fast), box-shadow var(--motion-fast)",
              }}
            >
              <I name="send" size={15} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 8, fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-disabled)" }}>
        AI can make mistakes — verify important information
      </div>
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  );
}
window.AppComposer = AppComposer;

const composerIconBtn = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 34, height: 34, borderRadius: "var(--radius-sm)",
  border: "none", background: "transparent", cursor: "pointer",
};

// ── EmptyState — animated BRANCHSCAIPE logo (plays once per session) ──────────
function EmptyState({ onSend, input, setInput, onToast }) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const { Pill } = NS;

  // Animation plays every time EmptyState mounts (CSS handles single-play per mount).
  const shouldAnimate = true;

  const suggestions = [
    "Break down a complex idea",
    "Compare two approaches",
    "Help me think through a problem",
    "What are the tradeoffs here?",
  ];

  // Gradient style for the "AI" letters
  const aiStyle = {
    background: "var(--gradient-brand)",
    WebkitBackgroundClip: "text", backgroundClip: "text",
    WebkitTextFillColor: "transparent", color: "transparent",
    display: "inline-block",
    // Glow animation fires together with letter reveal
    animation: shouldAnimate ? "bscLogoGlow 1.5s ease both" : "none",
  };

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "0 24px", gap: 28, minHeight: 0,
    }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>

        {/* Animated wordmark */}
        <div className="bsc-wordmark" style={{
          fontSize: 52, display: "inline-flex", alignItems: "baseline",
          letterSpacing: "0.08em", fontWeight: 700,
        }}>
          <span style={{
            color: "var(--text-primary)",
            display: "inline-block",
            animation: shouldAnimate ? "bscLogoLeft 0.6s cubic-bezier(0.2,0,0,1) 0.38s both" : "none",
          }}>BRANCHSC</span>
          <span style={aiStyle}>AI</span>
          <span style={{
            color: "var(--text-primary)",
            display: "inline-block",
            animation: shouldAnimate ? "bscLogoRight 0.6s cubic-bezier(0.2,0,0,1) 0.38s both" : "none",
          }}>PE</span>
        </div>

        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-h2)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)", letterSpacing: "var(--tracking-tight)" }}>
          How can I help you think?
        </div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", color: "var(--text-muted)", maxWidth: 420, lineHeight: 1.6 }}>
          Ask anything — then branch any answer to explore a different path without losing your place.
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "var(--composer-max)" }}>
        <AppComposer
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={() => onSend()}
          onToast={onToast}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 14 }}>
          {suggestions.map((s) => <Pill key={s} onClick={() => onSend(s)}>{s}</Pill>)}
        </div>
      </div>
    </div>
  );
}
window.EmptyState = EmptyState;

// ── CommandPalette ────────────────────────────────────────────────────────────
function CommandPalette({ branches, onPick }) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const { Input } = NS;
  const I = window.BscIcon;
  const [q, setQ] = React.useState("");
  const query = q.trim().toLowerCase();

  const branchHits = Object.values(branches).filter((b) => b.name.toLowerCase().includes(query));
  const msgHits = [];
  if (query.length >= 2) {
    Object.values(branches).forEach((b) => {
      b.messages.forEach((m) => {
        if ((m.role === "user" || m.role === "assistant") && m.text.toLowerCase().includes(query))
          msgHits.push({ b, m });
      });
    });
  }

  const snippet = (text) => {
    const i = text.toLowerCase().indexOf(query);
    if (i < 0) return text.slice(0, 80);
    const start = Math.max(0, i - 24);
    return (start > 0 ? "…" : "") + text.slice(start, i + query.length + 40) + "…";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Input shape="rounded" iconLeft={<I name="search" size={18} />} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search branches & messages…" autoFocus />
      <div className="bsc-scroll" style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 360, overflowY: "auto" }}>
        {branchHits.length > 0 && (
          <SGroup label="Branches">
            {branchHits.map((b) => (
              <SRow key={b.id} onClick={() => onPick(b.id)} icon={b.parentId ? "git-branch" : "message-square"} accent={!!b.parentId}>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{b.name}</span>
                {b.parentId && <span style={{ marginLeft: "auto", fontSize: "var(--fs-micro)", color: "var(--text-muted)" }}>branch</span>}
              </SRow>
            ))}
          </SGroup>
        )}
        {msgHits.length > 0 && (
          <SGroup label="Messages">
            {msgHits.slice(0, 12).map(({ b, m }, i) => (
              <SRow key={b.id + i} onClick={() => onPick(b.id, m.id)} icon={m.role === "user" ? "user" : "sparkles"}>
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontSize: "var(--fs-micro)", fontWeight: 700, color: "var(--text-brand)" }}>{b.name}</span>
                  <span style={{ display: "block", fontSize: "var(--fs-body-sm)", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{snippet(m.text)}</span>
                </span>
              </SRow>
            ))}
          </SGroup>
        )}
        {query.length >= 1 && branchHits.length === 0 && msgHits.length === 0 && (
          <div style={{ padding: 22, textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)" }}>No matches for "{q}".</div>
        )}
        {query.length === 0 && (
          <div style={{ padding: "18px 8px", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)" }}>
            Search by conversation name or message content.
          </div>
        )}
      </div>
    </div>
  );
}
window.CommandPalette = CommandPalette;

function SGroup({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-muted)", padding: "2px 8px 6px" }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{children}</div>
    </div>
  );
}
function SRow({ icon, accent, onClick, children }) {
  const I = window.BscIcon;
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", border: "none", background: "transparent", borderRadius: "var(--radius-sm)", cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
      <span style={{ display: "inline-flex", flex: "none", color: accent ? "var(--brand-primary)" : "var(--text-muted)" }}><I name={icon} size={16} /></span>
      <span style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8 }}>{children}</span>
    </button>
  );
}

// ── SettingsBody ──────────────────────────────────────────────────────────────
function SettingsBody({ theme, setTheme, density, setDensity, autoMerge, setAutoMerge }) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const { Switch, Tabs } = NS;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <SRow2 label="Appearance" hint="Switch between light and dark mode.">
        <Switch checked={theme === "dark"} onChange={(v) => setTheme(v ? "dark" : "light")} label={theme === "dark" ? "Dark" : "Light"} />
      </SRow2>
      <SRow2 label="Density" hint="Message spacing in the conversation.">
        <Tabs value={density} onChange={setDensity} items={[{ id: "compact", label: "Compact" }, { id: "comfortable", label: "Comfortable" }]} />
      </SRow2>
      <SRow2 label="Confirm before merge" hint="Ask for confirmation before merging.">
        <Switch checked={autoMerge} onChange={setAutoMerge} />
      </SRow2>
    </div>
  );
}
window.SettingsBody = SettingsBody;

function SRow2({ label, hint, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
        {hint && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", color: "var(--text-muted)", marginTop: 2 }}>{hint}</div>}
      </div>
      <div style={{ flex: "none" }}>{children}</div>
    </div>
  );
}

// ── ShortcutsBody ─────────────────────────────────────────────────────────────
function ShortcutsBody() {
  const shortcuts = [
    { keys: ["⌘", "K"],          desc: "Open search"           },
    { keys: ["⌘", "↵"],          desc: "Send message"          },
    { keys: ["⇧", "↵"],          desc: "New line in composer"  },
    { keys: ["Esc"],              desc: "Close panels / dialogs"},
    { keys: ["⌘", "⇧", "B"],     desc: "Toggle sidebar"        },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {shortcuts.map((s, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px",
          borderRadius: "var(--radius-sm)", background: i % 2 === 0 ? "var(--surface-2)" : "transparent",
        }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", color: "var(--text-primary)" }}>{s.desc}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {s.keys.map((k, ki) => (
              <span key={ki} style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minWidth: 26, height: 24, padding: "0 6px",
                background: "var(--surface-1)", border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-mono, monospace)", fontSize: "var(--fs-micro)", fontWeight: 700,
                color: "var(--text-secondary)",
              }}>{k}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
window.ShortcutsBody = ShortcutsBody;

// ── MergeBody — simplified: only branch selector, no preview info box ─────────
function MergeBody({ scope, source, targets, target, setTarget }) {
  const NS = window.BranchscaipeDesignSystem_0d3c10;
  const { Select } = NS;
  const I = window.BscIcon;
  const tgt = targets.find((t) => t.value === target);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Source → Target indicator */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
        background: "var(--gradient-branch)", border: "1px solid var(--border-brand)",
        borderRadius: "var(--radius-lg)",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 700, color: "var(--text-primary)" }}>
          <span style={{ color: "var(--brand-primary)", display: "inline-flex" }}><I name="git-branch" size={15} /></span>
          {source}
        </span>
        <span style={{ color: "var(--text-disabled)", display: "inline-flex" }}><I name="arrow-right" size={16} /></span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 700, color: "var(--text-brand)" }}>
          <span style={{ display: "inline-flex" }}><I name="git-merge" size={15} /></span>
          {tgt ? tgt.label : "…"}
        </span>
      </div>

      {/* Branch selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>
          Choose target branch
        </span>
        <Select value={target} onChange={setTarget} options={targets} />
      </div>

      {/* Minimal info note */}
      <div style={{ display: "inline-flex", alignItems: "flex-start", gap: 8, fontFamily: "var(--font-sans)", fontSize: "var(--fs-micro)", color: "var(--text-muted)", lineHeight: 1.5 }}>
        <span style={{ display: "inline-flex", marginTop: 1, flex: "none" }}><I name="info" size={13} /></span>
        Content is appended with a divider. Source branch is kept intact.
      </div>
    </div>
  );
}
window.MergeBody = MergeBody;

// ── ContextMenu ───────────────────────────────────────────────────────────────
function ContextMenu({ x, y, items, onClose }) {
  const I = window.BscIcon;
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ left: x, top: y, visibility: "hidden" });
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ left: Math.min(x, window.innerWidth - r.width - 12), top: Math.min(y, window.innerHeight - r.height - 12), visibility: "visible" });
  }, [x, y]);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, []);
  return (
    <div ref={ref} style={{
      position: "fixed", left: pos.left, top: pos.top, visibility: pos.visibility, zIndex: "var(--z-modal)",
      minWidth: 184, padding: 6,
      background: "var(--surface-glass-heavy)", WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-fast) var(--ease-out)",
    }}>
      {items.map((it, i) => it.divider
        ? <div key={i} style={{ height: 1, background: "var(--border-subtle)", margin: "6px 4px" }} />
        : (
          <button key={it.id} type="button" onClick={() => { it.run(); onClose(); }} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", border: "none",
            borderRadius: "var(--radius-sm)", background: "transparent",
            color: it.danger ? "var(--color-error)" : "var(--text-primary)",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 500, cursor: "pointer", textAlign: "left",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = it.danger ? "var(--color-error-bg)" : "var(--surface-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
            <span style={{ display: "inline-flex", flex: "none", color: it.danger ? "var(--color-error)" : it.accent ? "var(--brand-primary)" : "var(--text-muted)" }}><I name={it.icon} size={16} /></span>
            <span style={{ flex: 1 }}>{it.label}</span>
          </button>
        ))}
    </div>
  );
}
window.ContextMenu = ContextMenu;

// ── SelectionMenu ─────────────────────────────────────────────────────────────
function SelectionMenu({ x, y, onBranch, onCopy, onClose }) {
  const I = window.BscIcon;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const left = Math.max(12, Math.min(x, window.innerWidth - 12));
  return (
    <div ref={ref} style={{
      position: "fixed", left, top: Math.max(8, y - 52), transform: "translateX(-50%)", zIndex: "var(--z-modal)",
      display: "flex", alignItems: "center", gap: 2, padding: 4,
      background: "var(--surface-inverse)", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-lg)",
      animation: "bscPop var(--motion-fast) var(--ease-out)",
    }}>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); onBranch(); }} style={selMenuBtn}>
        <I name="git-branch" size={15} /> Branch from selection
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); onCopy(); }} title="Copy" style={{ ...selMenuBtn, padding: "0 10px" }}>
        <I name="copy" size={15} />
      </button>
    </div>
  );
}
window.SelectionMenu = SelectionMenu;

const selMenuBtn = {
  display: "inline-flex", alignItems: "center", gap: 7, height: 34, padding: "0 14px",
  border: "none", background: "transparent", color: "var(--text-inverse)", borderRadius: "var(--radius-pill)",
  fontFamily: "var(--font-sans)", fontSize: "var(--fs-body-sm)", fontWeight: 600, cursor: "pointer",
};
