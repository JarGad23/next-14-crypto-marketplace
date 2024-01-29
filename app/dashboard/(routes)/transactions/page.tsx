"use client";

import { trpc } from "@/app/_trpc/client";
import { TransactionsList } from "./_components/transacrions-list";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TransactionPage = () => {
  const router = useRouter();
  const { data, isError, isLoading } =
    trpc.transactions.getUserTransactions.useQuery();

  if (isLoading) {
    return <div>Loading</div>;
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
          <div className="w-full lg:w-1/2 border-b-4 lg:border-r-4 lg:border-b-0 border-gray-800 overflow-y-auto mb-4 lg:mb-0 lg:pr-6">
            {data.userOrders.length === 0 ? (
              <div>No order found!</div>
            ) : (
              <div className="w-full flex flex-col gap-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">Your orders</h3>
                  <p className="text-sm text-muted-foreground">
                    Here you can find your recent orders
                  </p>
                </div>
                <TransactionsList data={data.userOrders} />
              </div>
            )}
          </div>
          <div className="pl-0 lg:px-6 w-full lg:w-1/2">
            {data.userSales.length === 0 ? (
              <div>No sales found!</div>
            ) : (
              <div className="w-full flex flex-col gap-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">Your sales</h3>
                  <p className="text-sm text-muted-foreground">
                    Here you can find your recent sales
                  </p>
                </div>
                <TransactionsList data={data.userSales} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionPage;
