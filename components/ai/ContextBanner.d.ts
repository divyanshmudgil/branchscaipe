import * as React from "react";

/**
 * Inline divider marking a branch/merge point in the thread ("Branch from: Hooks").
 */
export interface ContextBannerProps {
  label?: React.ReactNode;
  from?: React.ReactNode;
  variant?: "branch" | "merge";
  style?: React.CSSProperties;
}

export function ContextBanner(props: ContextBannerProps): JSX.Element;
