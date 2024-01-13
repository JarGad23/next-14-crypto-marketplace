"use client";

import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRef, useEffect, ElementRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import { SidebarList } from "./sidebar-list";

export const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const sheetCloseRef = useRef<ElementRef<"button">>(null);
  const matches = useMediaQuery("(min-width: 768px)");

  const onClick = () => {
    sheetCloseRef.current?.click();
  };

  useEffect(() => {
    if (matches) {
      sheetCloseRef.current?.click();
    }
  }, [matches, sheetCloseRef]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="p-4 flex items-center gap-x-2 mb-8">
          <Image src="/logo.svg" width="60" height="60" alt="Logo" />
          <h2 className="font-bold text-primary text-xl">Next Crypto</h2>
        </div>
        <SidebarList onClick={onClick} />
        <SheetClose ref={sheetCloseRef} />
      </SheetContent>
    </Sheet>
  );
};
