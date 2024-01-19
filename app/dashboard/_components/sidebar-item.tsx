"use client";

import { cn } from "@/lib/utils";
import { type SidebarRoute } from "@/routes/sidebar-routes";

interface SidebarItems extends SidebarRoute {
  isActive: boolean;
  redirect: () => void;
}

export const SidebarItem = ({
  label,
  icon: Icon,
  isActive,
  redirect,
}: SidebarItems) => {
  return (
    <li
      className={cn(
        "w-full h-20 px-4 hover:bg-primary/60 transition",
        isActive ? "bg-primary/60 border-r-4 border-primary" : ""
      )}
    >
      <div
        onClick={redirect}
        className="w-full h-full flex items-center gap-x-4 cursor-pointer"
      >
        <Icon />
        <span>{label}</span>
      </div>
    </li>
  );
};
