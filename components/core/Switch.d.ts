import * as React from "react";

/**
 * Calm rounded toggle switch.
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
