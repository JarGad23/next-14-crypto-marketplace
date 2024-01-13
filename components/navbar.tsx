import { UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/app/dashboard/_components/mobile-sidebar";
import { Menu } from "lucide-react";

interface NavbarProps {
  showLogo?: boolean;
  isSidebarControll?: boolean;
}

export const Navbar = async ({
  showLogo = false,
  isSidebarControll = false,
}: NavbarProps) => {
  const user = await currentUser();

  return (
    <nav className="h-20 border-b bg-neutral-100 dark:bg-neutral-900 shadow-md">
      <div
        className={cn(
          "h-full w-full mx-auto flex items-center gap-x-2 px-4",
          showLogo || isSidebarControll ? "justify-between" : "justify-end"
        )}
      >
        {isSidebarControll ? (
          <div className="block md:hidden">
            <MobileSidebar>
              <Button variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
            </MobileSidebar>
          </div>
        ) : null}
        {showLogo ? (
          <Image src="/logo.svg" width="60" height="60" alt="logo" />
        ) : (
          <Button asChild>
            <Link href="/dashboard/create">Create</Link>
          </Button>
        )}
        <div className="flex items-center justify-center gap-x-2 ml-auto">
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
