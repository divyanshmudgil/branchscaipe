import * as React from "react";

/**
 * Inline marker that a message has branches, with a sibling switcher (‹ 2/3 ›).
 */
export interface BranchIndicatorProps {
  count?: number;
  current?: number;
  label?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onOpen?: () => void;
  style?: React.CSSProperties;
}

export function BranchIndicator(props: BranchIndicatorProps): JSX.Element;
