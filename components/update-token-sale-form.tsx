"use client";
import { trpc } from "@/app/_trpc/client";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface UpdateTokenSaleFormProps {
  children: React.ReactNode;
  saleId: string;
  quantityForSale: number;
  sellingTokenId: string;
}

export const UpdateTokenSaleForm = ({
  children,
  saleId,
  quantityForSale,
  sellingTokenId,
}: UpdateTokenSaleFormProps) => {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/");
  }

  const {
    data: userTokenInWallet,
    isError,
    isLoading,
  } = trpc.getTokenFromUserWallet.useQuery({
    walletUserId: userId,
    tokenId: sellingTokenId,
  });

  return <div className="w-full">{children}</div>;
};
