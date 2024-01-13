"use client";

import { sidebarRoutes } from "@/routes/sidebar-routes";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

export const SidebarList = () => {
  const pathname = usePathname();
  const routes = sidebarRoutes;

  return (
    <ul className="flex flex-col gap-y-4">
      {routes.map((route) => {
        const isActive = pathname === route.href;
        return (
          <SidebarItem
            key={route.href}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isActive={isActive}
          />
        );
      })}
    </ul>
  );
};
