import * as React from "react";

export interface ToastProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "neutral" | "success" | "error" | "info";
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export function Toast(props: ToastProps): JSX.Element;
