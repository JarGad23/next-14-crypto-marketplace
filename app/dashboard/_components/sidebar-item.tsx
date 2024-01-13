"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type SidebarRoute } from "@/routes/sidebar-routes";
import Link from "next/link";

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
        "w-full py-5 px-4 hover:bg-primary/60 transition",
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
