import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Token, Transaction } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TransactionsListProps {
  data: ({
    token: Token;
  } & Transaction)[];
}

export const TransactionsList = ({ data }: TransactionsListProps) => {
  return (
    <ul className="w-full space-y-4">
      {data.map((item) => (
        <li className="w-full">
          <Card className="w-full">
            <CardHeader className="w-full">
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-4 items-center justify-between">
                  <div className="flex flex-col">
                    <CardTitle>{item.token.name}</CardTitle>
                    <CardDescription>
                      <h4>
                        Created by: <span>{item.token.creatorUserName}</span>
                      </h4>
                      <h4>
                        Sold at:{" "}
                        <span>{format(item.created_at, "dd/MM/yyyy")}</span>
                      </h4>
                    </CardDescription>
                  </div>
                  <Image
                    alt="token"
                    src={item.token.imageUrl || ""}
                    width="80"
                    height="80"
                    className="rounded-full aspect-square"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
              <div className="flex flex-col">
                <h3>
                  Total price:{" "}
                  <span className="font-semibold">
                    {formatPrice(item.pricePerToken * item.quantity)}
                  </span>
                </h3>
                <h3>
                  Payment status:{" "}
                  <span
                    className={cn(
                      "font-semibold",
                      item.transactionState === "PAID"
                        ? "text-emerald-500"
                        : item.transactionState === "PENDING"
                        ? "text-gray-500"
                        : "text-rose-500"
                    )}
                  >
                    {item.transactionState}
                  </span>
                </h3>
              </div>
              <div className="w-full flex items-center ">
                <p className="border-r-2 border-gray-400 pr-2">
                  Amount of bought tokens:{" "}
                  <span className="font-semibold">{item.quantity}</span>
                </p>
                <p className="pl-2">
                  Price per one token:{" "}
                  <span className="font-semibold">{item.token.price}</span>
                </p>
              </div>
              <Button variant="secondary">See more transaction details</Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default function TransactionsListSkeleton() {
  return (
    <div className="w-full flex flex-col space-y-4 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full h-[282px] flex flex-col p-6 border-2 rounded-md"
        >
          <div className="w-full flex items-center justify-between mt-2">
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-20 w-20 rounded-full aspect-square" />
          </div>
          <div className="flex flex-col space-y-2 mt-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-8 w-full lg:w-[400px] mt-2" />
          <Skeleton className="rounded-md h-24 w-full mt-2" />
        </div>
      ))}
    </div>
  );
}
