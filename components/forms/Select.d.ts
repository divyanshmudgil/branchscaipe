import * as React from "react";

export interface SelectOption { value: string; label: React.ReactNode; icon?: React.ReactNode; }

/**
 * Custom select with a soft popover list. Also used as the "Choose parent" picker.
 */
export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
