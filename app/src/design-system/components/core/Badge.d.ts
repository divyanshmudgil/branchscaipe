import * as React from "react";

/**
 * Small status / count badge.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  tone?: "neutral" | "brand" | "success" | "warning" | "error" | "info" | "new";
  soft?: boolean;
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
