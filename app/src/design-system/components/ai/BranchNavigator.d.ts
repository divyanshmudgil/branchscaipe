import * as React from "react";
import { LineageNode } from "./ThreadLineage";

/**
 * Branch navigator panel — header + branch tree. Drop into a Drawer or sidebar.
 *
 * @startingPoint section="AI" subtitle="Branch hierarchy navigator panel" viewport="320x360"
 */
export interface BranchNavigatorProps {
  tree: LineageNode[];
  activeId?: string;
  onSelect?: (id: string) => void;
  count?: number;
  style?: React.CSSProperties;
}

export function BranchNavigator(props: BranchNavigatorProps): JSX.Element;
