import * as React from "react";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties;
}

export function Tooltip(props: TooltipProps): JSX.Element;
