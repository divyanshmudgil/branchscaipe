import * as React from "react";

/**
 * Live assistant status — aurora halo dot + animated label.
 */
export interface AIStatusIndicatorProps {
  state?: "thinking" | "typing" | "streaming" | "idle";
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

export function AIStatusIndicator(props: AIStatusIndicatorProps): JSX.Element;
