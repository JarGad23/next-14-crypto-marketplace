import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import {
  ArrowRight,
  CircleDollarSign,
  Coins,
  ShoppingCart,
} from "lucide-react";
import { Card } from "./_components/card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function Home() {
  const { user } = auth();

  return (
    <div className="relative h-full px-4 md:px-8 mx-auto">
      <div className="w-full  flex flex-col items-center justify-center space-y-6 text-center mb-4">
        <div className="max-w-4xl space-y-6">
          <h1 className={cn("text-4xl leading-relaxed", font.className)}>
            Welcome to{" "}
            <span className="w-full text-primary font-bold">Next Crypto.</span>{" "}
            Place where u can create, buy and sell tokens created by you and
            other users.
          </h1>
          <p className="text-lg text-muted-foreground">
            Use our user friendly dashboard to manage your token. Go to browse
            to search for tokens created by other users .Create a free account
            to get access to all presented benefits and more.
          </p>
          {user && user.id ? (
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button className="rounded-2xl px-12 py-6" asChild>
              <Link href="/sign-in">
                Login
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 max-w-6xl">
          <Card
            title="Create"
            icon={Coins}
            description="In our application you can create your own token. Set it price and
              quantity. You have full control of your digital asset."
            href="/dashboard/create"
            label="Create token"
          />
          <Card
            title="Sell"
            icon={CircleDollarSign}
            description="You can sell your coint that you have created. We make selling coins super easy, you just need to turn coin for selling in seller dashboard. It's just that easy we take care about rest"
            href="/dashboard/sell"
            label="Sell tokens"
          />
          <Card
            title="Buy"
            icon={ShoppingCart}
            description="You can safely and easy buy token created by onther users. You can simply browse the most popular tokens and also search them through the name."
            href="/dashboard/browse"
            label="Buy token"
          />
        </div>
      </div>
    </div>
  );
}
