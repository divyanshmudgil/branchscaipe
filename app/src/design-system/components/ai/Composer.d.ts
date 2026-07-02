import * as React from "react";

/**
 * The message composer — glass pill with placeholder, +, Tools, and Send.
 * When composing inside a branch, pass `branchingFrom` to show the context chip.
 *
 * @startingPoint section="AI" subtitle="Glass message composer with Tools + Send" viewport="760x160"
 */
export interface ComposerProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend?: () => void;
  placeholder?: string;
  branchingFrom?: React.ReactNode;
  tools?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Composer(props: ComposerProps): JSX.Element;
