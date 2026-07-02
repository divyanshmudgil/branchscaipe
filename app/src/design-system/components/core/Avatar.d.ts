import * as React from "react";

/**
 * Round avatar for user / assistant. Initials fallback over an aurora tint.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: number;
  kind?: "user" | "assistant";
}

export function Avatar(props: AvatarProps): JSX.Element;
