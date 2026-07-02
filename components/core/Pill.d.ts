import * as React from "react";

/**
 * Interactive chip — tools, filters, branch chips, suggested prompts.
 */
export interface PillProps {
  children?: React.ReactNode;
  iconLeft?: React.ReactNode;
  selected?: boolean;
  removable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onRemove?: () => void;
  style?: React.CSSProperties;
}

export function Pill(props: PillProps): JSX.Element;
