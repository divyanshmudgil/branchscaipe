import * as React from "react";

export interface BreadcrumbItem { label: React.ReactNode; onClick?: () => void; }

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
