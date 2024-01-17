"use client";

import { trpc } from "@/app/_trpc/client";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const WalletPage = () => {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/");
  }

  const { data } = trpc.getUserWallet.useQuery({ walletUserId: userId });

  return (
    <div className="p-6 flex flex-col">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold">Your wallet 💸</h2>
        <p className="text-muted-foreground">Here you can manage your tokens</p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-8">
        {JSON.stringify(data)}
      </div>
    </div>
  );
};

export default WalletPage;
