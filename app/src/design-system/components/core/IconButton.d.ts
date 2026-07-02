import * as React from "react";

/**
 * Icon-only button for toolbars, the icon rail, and message actions.
 */
export interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  variant?: "ghost" | "soft" | "solid";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "circle";
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
