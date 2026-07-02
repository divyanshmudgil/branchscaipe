import * as React from "react";

/**
 * Right-aligned user prompt bubble.
 */
export interface UserMessageProps {
  children?: React.ReactNode;
  timestamp?: React.ReactNode;
  style?: React.CSSProperties;
}

export function UserMessage(props: UserMessageProps): JSX.Element;
