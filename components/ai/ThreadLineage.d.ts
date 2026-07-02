import * as React from "react";

export interface LineageNode {
  id: string;
  label: React.ReactNode;
  children?: LineageNode[];
}

/**
 * Indented branch hierarchy tree (thread lineage). Highlights the active node.
 */
export interface ThreadLineageProps {
  tree: LineageNode[];
  activeId?: string;
  onSelect?: (id: string) => void;
  style?: React.CSSProperties;
}

export function ThreadLineage(props: ThreadLineageProps): JSX.Element;
