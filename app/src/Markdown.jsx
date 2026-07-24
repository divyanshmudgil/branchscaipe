// Markdown — renders assistant message text as real markdown (bold, lists,
// code, tables, links, ...) instead of plain paragraphs, styled to match the
// design system's tokens so it reads as part of Branchscaipe rather than
// default browser markdown. react-markdown builds a React element tree (no
// dangerouslySetInnerHTML), so this stays as safe as plain text rendering.
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const textStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--fs-body)",
  lineHeight: "var(--lh-relaxed)",
  color: "var(--text-primary)",
  letterSpacing: "var(--tracking-wide)",
};

const codeStyle = {
  fontFamily: "var(--font-mono, monospace)",
  fontSize: "var(--fs-body-sm)",
  background: "var(--surface-2)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-xs)",
  padding: "1px 6px",
};

const components = {
  p: ({ node, ...props }) => <p style={{ margin: 0 }} {...props} />,
  strong: ({ node, ...props }) => <strong style={{ fontWeight: "var(--weight-semibold)" }} {...props} />,
  em: ({ node, ...props }) => <em {...props} />,
  a: ({ node, ...props }) => (
    <a
      style={{ color: "var(--text-brand)", textDecoration: "underline", textUnderlineOffset: 2 }}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }} {...props} />,
  ol: ({ node, ...props }) => <ol style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }} {...props} />,
  li: ({ node, ...props }) => <li style={{ paddingLeft: 2 }} {...props} />,
  h1: ({ node, ...props }) => <h1 style={{ margin: 0, fontSize: "var(--fs-h3)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-tight)" }} {...props} />,
  h2: ({ node, ...props }) => <h2 style={{ margin: 0, fontSize: "var(--fs-h3)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-tight)" }} {...props} />,
  h3: ({ node, ...props }) => <h3 style={{ margin: 0, fontSize: "var(--fs-body)", fontWeight: "var(--weight-semibold)" }} {...props} />,
  h4: ({ node, ...props }) => <h4 style={{ margin: 0, fontSize: "var(--fs-body)", fontWeight: "var(--weight-semibold)" }} {...props} />,
  hr: () => <hr style={{ border: "none", borderTop: "1px solid var(--border-subtle)", margin: 0 }} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      style={{
        margin: 0, padding: "2px 0 2px 14px",
        borderLeft: "2px solid var(--border-brand)",
        color: "var(--text-secondary)",
      }}
      {...props}
    />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    // Fenced code blocks arrive wrapped in <pre><code>; only style the inline
    // ` `-backtick form here — <pre> below handles the block chrome.
    if (inline) return <code style={codeStyle} {...props}>{children}</code>;
    return (
      <code style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "var(--fs-body-sm)" }} className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ node, ...props }) => (
    <pre
      className="bsc-scroll"
      style={{
        margin: 0, padding: "12px 14px",
        background: "var(--surface-2)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        overflowX: "auto",
        lineHeight: "var(--lh-normal)",
      }}
      {...props}
    />
  ),
  table: ({ node, ...props }) => (
    <div className="bsc-scroll" style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "var(--fs-body-sm)" }} {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      style={{ textAlign: "left", padding: "6px 10px", background: "var(--surface-2)", border: "1px solid var(--border-subtle)", fontWeight: "var(--weight-semibold)" }}
      {...props}
    />
  ),
  td: ({ node, ...props }) => <td style={{ padding: "6px 10px", border: "1px solid var(--border-subtle)" }} {...props} />,
};

export function Markdown({ children }) {
  return (
    <div style={{ ...textStyle, display: "flex", flexDirection: "column", gap: 12 }}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
