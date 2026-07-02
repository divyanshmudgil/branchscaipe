import * as React from "react";

/**
 * Centered modal dialog over a blurred scrim. Merge confirmation, settings, etc.
 */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}

export function Dialog(props: DialogProps): JSX.Element | null;
