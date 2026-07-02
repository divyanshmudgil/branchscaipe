import * as React from "react";

/**
 * Rounded surface container. Use `glass` for floating panels/overlays.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  elevation?: "flat" | "raised" | "floating";
  glass?: boolean;
  interactive?: boolean;
  padding?: string;
}

export function Card(props: CardProps): JSX.Element;
