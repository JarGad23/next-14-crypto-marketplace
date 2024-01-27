"use client";

import { trpc } from "@/app/_trpc/client";
import { TransactionsList } from "./_components/transacrions-list";

const TransactionPage = () => {
  const { data, isError, isLoading } =
    trpc.transactions.getUserTransactions.useQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="h-[calc(100vh-80px)] w-full p-6 flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-1/2 border-r-4 border-gray-800">
        {data?.userOrders.length === 0 ? (
          <div>No order found!</div>
        ) : (
          <TransactionsList data={data.userOrders} />
        )}
      </div>
      <div className="w-full lg:w-1/2">
        {data.userSales.length === 0 ? (
          <div>No sales found!</div>
        ) : (
          <TransactionsList data={data.userOrders} />
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
