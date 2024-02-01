import { Token, Transaction } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { format } from "date-fns";

interface TransactionDetailsModalProps {
  children: React.ReactNode;
  mode: "ORDERS" | "SALES";
  transaction: {
    token: Token;
  } & Transaction;
}

export const TransactionDetailsModal = ({
  children,
  mode,
  transaction,
}: TransactionDetailsModalProps) => {
  const title = mode === "ORDERS" ? "Order Details" : "Sale Details";
  const label = mode === "ORDERS" ? "bought" : "sold";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-y-8">
          <div className="w-full flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">
                {transaction.token.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                Created by: {transaction.token.creatorUserName}
              </p>
            </div>
            <Image
              alt="token"
              src={transaction.token.imageUrl || ""}
              width="60"
              height="60"
              className="rounded-full aspect-square"
            />
          </div>
          <div className="flex flex-col gap-y-2 pr-6">
            <div className="flex items-center justify-between">
              <h3>Quantity you {label}:</h3>
              <p className="font-semibold">{transaction.quantity}</p>
            </div>
            <div className="flex items-center justify-between">
              <h3>Total quantity of token:</h3>
              <p className="font-semibold">{transaction.token.quantity}</p>
            </div>
            <div className="flex items-center justify-between">
              <h3>Price per one token:</h3>
              <p className="font-semibold">
                {formatPrice(transaction.pricePerToken)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <h3>Total:</h3>
              <p className="font-semibold">
                {formatPrice(transaction.quantity * transaction.pricePerToken)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              <h3>Transaction date:</h3>
              <p>{format(transaction.created_at, "HH:mm dd/MM/yyyy")}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <h3>Transaction status:</h3>
              <p
                className={cn(
                  "font-semibold",
                  transaction.transactionState === "PAID"
                    ? "text-emerald-500"
                    : transaction.transactionState === "PENDING"
                    ? "text-gray-500"
                    : "text-rose-500"
                )}
              >
                {transaction.transactionState}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
