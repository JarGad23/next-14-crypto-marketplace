"use client";

import { trpc } from "@/app/_trpc/client";
import { TokenCard, TokenCardSkeleton } from "@/components/token-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Ghost } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BrowsePage = () => {
  const router = useRouter();

  const {
    data: tokens,
    isError,
    isLoading,
  } = trpc.sales.getTokensForSale.useQuery();

  const onClick = () => {
    router.refresh();
  };
  return (
    <div className="p-6 flex flex-col">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold">Browse page 💰</h2>
        <p className="text-muted-foreground">
          Here you can buy tokens created by other users
        </p>
      </div>
      <div>
        {isLoading ? (
          <div className="pt-20 flex flex-col md:flex-row md:flex-wrap items-center gap-8">
            {[...Array(6)].map((_, i) => (
              <TokenCardSkeleton key={i} />
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
          <div
            className={cn(
              "w-full pt-20 flex flex-col md:flex-row md:flex-wrap items-center gap-8",
              tokens.tokensForSale.length === 0 && "justify-center"
            )}
          >
            {tokens.tokensForSale.length === 0 ? (
              <div className="pt-20 flex flex-col items-center justify-center gap-y-6">
                <div className="flex items-center gap-x-2">
                  <h3 className="font-semibold text-3xl">
                    A little bit empty here
                  </h3>
                  <Ghost className="h-10 w-10 ml-2" />
                </div>
                <span className="text-xl text-muted-foreground">
                  Try to{" "}
                  <Link
                    href="/dashboard/create"
                    className="text-primary font-semibold"
                  >
                    create
                  </Link>{" "}
                  your own token
                </span>
              </div>
            ) : (
              tokens.tokensForSale.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token.token}
                  quantityForSale={token.quantityForSale}
                  view="Browse"
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
