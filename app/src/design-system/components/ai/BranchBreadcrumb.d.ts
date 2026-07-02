import * as React from "react";

/**
 * Branch lineage pill for the header (root → current). Current node is bold;
 * earlier nodes are clickable to navigate up the hierarchy.
 */
export interface BranchBreadcrumbProps {
  path: string[];
  onCrumb?: (index: number) => void;
  style?: React.CSSProperties;
}

export function BranchBreadcrumb(props: BranchBreadcrumbProps): JSX.Element;
