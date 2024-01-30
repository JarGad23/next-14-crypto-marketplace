"use client";

import { ShoppingCart, TrendingUp, WalletIcon } from "lucide-react";
import { DashboardCard } from "./_components/dashboard-card";
import { DataTable, DataTableSkeleton } from "./_components/data-table";
import { columns } from "./_components/columns";
import { trpc } from "../_trpc/client";

const DashboardPage = () => {
  const { data, isError, isLoading } =
    trpc.transactions.getSalesDataForTable.useQuery();

  return (
    <div className="w-full p-12 flex flex-col gap-y-8">
      <div className="w-full grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <DashboardCard
          title="Wallet"
          icon={WalletIcon}
          href="/dashboard/wallet"
          description="Checkout your tokens. Manage theme and set theme up for sale on market."
          label="Wallet"
        />
        <DashboardCard
          title="Market"
          icon={ShoppingCart}
          href="/dashboard/browse"
          description="Checkout tokens on our market. Here you can find a tokens that are setted up for sale from another users nad available to purchase."
          label="Browse"
        />
        <DashboardCard
          title="Transactions"
          icon={TrendingUp}
          href="/dashboard/transactions"
          description="Here you can find all your transactions. Tokens that you have sold and also that you bought in recent time."
          label="Transactions"
        />
      </div>
      <div className="w-full">
        {isLoading ? (
          <DataTableSkeleton />
        ) : isError || data === undefined ? (
          <div>Something went wrong</div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
