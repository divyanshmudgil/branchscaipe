import * as React from "react";

export interface MenuItem {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

/**
 * Floating glass action menu (context / overflow menus). Pass a `trigger` or control `open`.
 */
export interface MenuProps {
  items: MenuItem[];
  onSelect?: (id?: string) => void;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "left" | "right";
  style?: React.CSSProperties;
}

export function Menu(props: MenuProps): JSX.Element;
