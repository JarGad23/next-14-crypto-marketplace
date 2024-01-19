"use client";

import { trpc } from "@/app/_trpc/client";
import { TokenCard, TokenCardSkeleton } from "@/components/token-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { AlertCircle, Wallet } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

const WalletPage = () => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    redirect("/");
  }

  const {
    data: tokens,
    isError,
    isLoading,
  } = trpc.getUserWallet.useQuery({
    walletUserId: userId,
  });

  const onClick = () => {
    router.refresh();
  };

  return (
    <div className="p-6 flex flex-col">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold">Your wallet 💸</h2>
        <p className="text-muted-foreground">Here you can manage your tokens</p>
      </div>
      <div>
        {isLoading ? (
          <div className="pt-20 flex flex-col md:flex-row md:flex-wrap items-center gap-8">
            {[...Array(6)].map((_) => (
              <TokenCardSkeleton />
            ))}
          </div>
        ) : isError ? (
          <div className="pt-20 flex flex-col items-center justify-center gap-y-6">
            <div className="flex items-center gap-x-2">
              <h3 className="font-semibold text-3xl">Something went wrong</h3>
              <AlertCircle className="h-8 w-8 ml-2 text-rose-500" />
            </div>
            <p className="text-xl text-muted-foreground">
              Refresh or try again later
            </p>
            <Button variant="secondary" onClick={onClick}>
              Refresh
            </Button>
          </div>
        ) : (
          <div className="w-full pt-20 flex flex-col md:flex-row md:flex-wrap items-center gap-8">
            {tokens.length === 0 ? (
              <div className="pt-20 flex flex-col items-center justify-center gap-y-6">
                <div className="flex items-center gap-x-2">
                  <h3 className="font-semibold text-3xl">
                    Your wallet is empty
                  </h3>
                  <Wallet className="h-10 w-10 ml-2" />
                </div>
                <span className="text-xl text-muted-foreground">
                  You can get some tokens{" "}
                  <Link
                    href="/dashboard/browse"
                    className="text-primary font-semibold text"
                  >
                    here
                  </Link>{" "}
                  or you can go and{" "}
                  <Link
                    href="/dashboard/create"
                    className="text-primary font-semibold text"
                  >
                    create
                  </Link>{" "}
                  your own.
                </span>
              </div>
            ) : (
              tokens.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token.token}
                  userQuantityOfToken={token.userQuantityOfToken}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
