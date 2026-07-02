import * as React from "react";

export type ButtonVariant = "primary" | "brand" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Branchscaipe button — soft rounded action. Use `primary` for the main action,
 * `brand` for the signature aurora CTA (sparingly), `secondary`/`ghost` for the rest.
 *
 * @startingPoint section="Core" subtitle="Buttons — primary, brand, secondary, ghost" viewport="700x140"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
