import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full">
      <Button asChild>
        <Link href="/sign-in">Login</Link>
      </Button>
      <ModeToggle />
    </div>
  );
}
