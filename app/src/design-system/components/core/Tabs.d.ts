import * as React from "react";

export interface TabItem { id: string; label: React.ReactNode; icon?: React.ReactNode; }

/**
 * Pill-style segmented tab control.
 */
export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
