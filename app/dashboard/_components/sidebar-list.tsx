"use client";

import { sidebarRoutes } from "@/routes/sidebar-routes";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { useRouter } from "next/navigation";

interface SidebarListProps {
  onClick?: () => void;
}

export const SidebarList = ({ onClick }: SidebarListProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = sidebarRoutes;

  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const isActive = pathname === route.href;

        const redirect = () => {
          router.push(route.href);
          if (onClick) {
            onClick();
          }
        };

        return (
          <SidebarItem
            key={route.href}
            href={route.href}
            icon={route.icon}
            label={route.label}
            isActive={isActive}
            redirect={redirect}
          />
        );
      })}
    </ul>
  );
};
