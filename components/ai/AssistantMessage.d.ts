import * as React from "react";

export type MessageAction = "copy" | "branch" | "retry" | "merge" | "more";

/**
 * Left-aligned assistant response with the signature action toolbar
 * (Copy · Branch · Retry · Merge · More), revealed on hover.
 *
 * @startingPoint section="AI" subtitle="Assistant response + branch/merge action bar" viewport="700x220"
 */
export interface AssistantMessageProps {
  children?: React.ReactNode;
  actions?: MessageAction[];
  onAction?: (action: MessageAction) => void;
  branchNew?: boolean;
  showActions?: boolean;
  style?: React.CSSProperties;
}

export function AssistantMessage(props: AssistantMessageProps): JSX.Element;
