import * as React from "react";

/**
 * Text input with optional icons. `shape="pill"` for search/composer style.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "pill";
  invalid?: boolean;
}

export function Input(props: InputProps): JSX.Element;
