import { LucideProps } from "lucide-react";
import React from "react";


export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface AccordianLink {
  name: string;
  href: string;
}

export interface DashboardLinkProps {
  name: string;
  href: string;
  type: "link" | "accordion";
  items?: AccordianLink[];
  endContent?: () => React.ReactNode;
  icon: (props: LucideProps) => React.JSX.Element;
}