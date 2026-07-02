import * as React from "react";

/**
 * Slide-in glass drawer — branch navigator, settings, knowledge base.
 */
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  side?: "left" | "right";
  width?: number;
  title?: React.ReactNode;
  children?: React.ReactNode;
  glass?: boolean;
  style?: React.CSSProperties;
}

export function Drawer(props: DrawerProps): JSX.Element | null;
