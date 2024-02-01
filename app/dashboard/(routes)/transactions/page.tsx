"use client";

import { trpc } from "@/app/_trpc/client";
import TransactionsListSkeleton, {
  TransactionsList,
} from "./_components/transacrions-list";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const TransactionPage = () => {
  const router = useRouter();
  const { data, isError, isLoading } =
    trpc.transactions.getUserTransactions.useQuery();

  if (isLoading) {
    return <TransactionPageSkeleton />;
  }

  const onClick = () => {
    router.refresh();
  };

  return (
    <div className="w-full p-6 flex flex-col lg:flex-row">
      {isError || !data ? (
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-y-4">
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
        </div>
      ) : (
        <>
          <div className="w-full lg:w-1/2 border-b-4 lg:border-r-4 lg:border-b-0 border-gray-800 overflow-y-auto pb-4 lg:pb-0 mb-4 lg:mb-0 lg:pr-6">
            {data.userOrders.length === 0 ? (
              <div className="h-[calc(100vh-140px)] w-full flex flex-col items-center justify-center gap-y-2">
                <h3 className="text-xl font-semibold">No orders found!</h3>
                <span>
                  You can buy some tokens{" "}
                  <Link
                    className="text-primary font-semibold"
                    href="/dashboard/browse"
                  >
                    here
                  </Link>
                </span>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">Your orders</h3>
                  <p className="text-sm text-muted-foreground">
                    Here you can find your recent orders
                  </p>
                </div>
                <TransactionsList data={data.userOrders} mode="ORDERS" />
              </div>
            )}
          </div>
          <div className="pl-0 lg:px-6 w-full lg:w-1/2">
            {data.userSales.length === 0 ? (
              <div className="h-[calc(100vh-140px)] w-full flex flex-col items-center justify-center gap-y-2">
                <h3 className="text-xl font-semibold">No sales found!</h3>
                <span>
                  You can sell your tokens{" "}
                  <Link
                    className="text-primary font-semibold"
                    href="/dashboard/wallet"
                  >
                    here
                  </Link>
                </span>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">Your sales</h3>
                  <p className="text-sm text-muted-foreground">
                    Here you can find your recent sales
                  </p>
                </div>
                <TransactionsList data={data.userSales} mode="SALES" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const TransactionPageSkeleton = () => {
  return (
    <div className="w-full p-6 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 border-b-4 lg:border-r-4 lg:border-b-0 border-gray-800 overflow-y-auto mb-4 lg:mb-0 lg:pr-6 space-y-4">
        <div className="w-full flex flex-col gap-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-52" />
        </div>
        <TransactionsListSkeleton />
      </div>
      <div className="pl-0 lg:px-6 w-full lg:w-1/2 space-y-4">
        <div className="w-full flex flex-col gap-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-52" />
        </div>
        <TransactionsListSkeleton />
      </div>
    </div>
  );
};

export default TransactionPage;
