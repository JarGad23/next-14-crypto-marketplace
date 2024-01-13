"use client";

import { type SidebarRoute } from "@/routes/sidebar-routes";

interface SidebarItems extends SidebarRoute {
  isActive: boolean;
}

export const SidebarItem = ({ href, label, icon, isActive }: SidebarItems) => {
  return <li>{label}</li>;
};
