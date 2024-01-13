import { UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/app/dashboard/_components/mobile-sidebar";

interface NavbarProps {
  showLogo?: boolean;
  isSidebarControll?: boolean;
}

export const Navbar = ({
  showLogo = false,
  isSidebarControll = false,
}: NavbarProps) => {
  const { user } = auth();

  return (
    <nav className="h-20 border-b bg-neutral-100 dark:bg-neutral-900 shadow-md">
      <div
        className={cn(
          "h-full w-full mx-auto max-w-7xl flex items-center gap-x-2 px-4",
          showLogo || isSidebarControll ? "justify-between" : "justify-end"
        )}
      >
        {showLogo ? (
          <Image src="/logo.svg" width="60" height="60" alt="logo" />
        ) : null}
        {isSidebarControll ? (
          <div className="block md:hidden">
            <MobileSidebar>
              <Button>Open</Button>
            </MobileSidebar>
          </div>
        ) : null}
        <div className="flex items-center justify-center gapx-x-2 ml-auto">
          {user && user.id ? (
            <Button variant="link" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button variant="link" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
          {user && user.id ? <UserButton afterSignOutUrl="/" /> : null}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
