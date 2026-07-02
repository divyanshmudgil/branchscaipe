import * as React from "react";

/**
 * Merge confirmation strip — merge a branch (scope="chat") or a single response
 * (scope="response") into a chosen parent.
 *
 * @startingPoint section="AI" subtitle="Merge-to-parent confirmation banner" viewport="700x120"
 */
export interface MergeBannerProps {
  source?: string;
  parent?: string;
  scope?: "chat" | "response";
  onConfirm?: () => void;
  onCancel?: () => void;
  onChooseParent?: () => void;
  style?: React.CSSProperties;
}

export function MergeBanner(props: MergeBannerProps): JSX.Element;
