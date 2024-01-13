"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRef, useEffect, ElementRef } from "react";
import { useMediaQuery } from "usehooks-ts";

export const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const sheetCloseRef = useRef<ElementRef<"button">>(null);
  const matches = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (matches) {
      sheetCloseRef.current?.click();
    }
  }, [matches, sheetCloseRef]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left">
        Test content
        <SheetClose ref={sheetCloseRef} />
      </SheetContent>
    </Sheet>
  );
};
