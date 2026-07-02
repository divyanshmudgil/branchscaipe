import * as React from "react";

/**
 * Collapsible tool-invocation chip with a run status.
 */
export interface ToolCallProps {
  name?: string;
  summary?: React.ReactNode;
  status?: "running" | "done" | "error";
  defaultOpen?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ToolCall(props: ToolCallProps): JSX.Element;
