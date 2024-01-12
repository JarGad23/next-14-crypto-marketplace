import { UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { user } = auth();

  return (
    <nav className="w-full fixed top-0 bg-neutral-100 dark:bg-neutral-900 shadow-md py-2 z-[50]">
      <div className="h-full mx-auto max-w-7xl flex items-center gap-x-2 justify-between px-4">
        <Image src="/logo.svg" width="60" height="60" alt="logo" />
        <div className="flex items-center justify-center gapx-x-2">
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
