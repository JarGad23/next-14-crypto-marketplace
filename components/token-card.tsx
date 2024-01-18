"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { formatPrice } from "@/lib/format-price";
import { Button } from "./ui/button";
import Link from "next/link";

interface TokenCardProps {
  tokenId: string;
  userQuantityOfToken: number;
}

export const TokenCard = ({ tokenId, userQuantityOfToken }: TokenCardProps) => {
  const { data, isError } = trpc.getToken.useQuery({ tokenId });

  if (!data || isError) {
    return <TokenCardSkeleton />;
  }

  return (
    <Card className="w-full lg:w-[45%] 2xl:w-1/3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl">{data.token.name}</CardTitle>
            <CardDescription>
              Created by: {data.token.creatorUserName}
            </CardDescription>
          </div>
          <Image
            alt="token"
            src={data.token?.imageUrl || ""}
            width="80"
            height="80"
            className="rounded-full aspect-square"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-x-2">
          <h3>
            Price per one token:{" "}
            <span className="font-semibold">
              {formatPrice(data.token.price)}
            </span>
          </h3>
        </div>
        <div className="flex items-center gap-x-2">
          <h3>
            Quantity of tokens:{" "}
            <span className="font-semibold">
              {`${userQuantityOfToken}/${data.token.quantity}`}
            </span>
          </h3>
        </div>
        <Button asChild className="w-full">
          <Link href="/dashboard/sell">Sell</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export function TokenCardSkeleton() {
  return (
    <div className="w-full lg:w-[45%] 2xl:w-1/4 h-60 rounded-md flex flex-col bg-gray-900 p-6">
      <div className="w-full flex flex-col gap-y-2">
        <div className="flex justify-between items-center gap-x-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
        <Skeleton className="w-16 h-3" />
      </div>
      <div className="w-full flex flex-col gap-y-4">
        <Skeleton className="w-30 h-4" />
        <Skeleton className="w-30 h-4" />
        <Skeleton className="w-full h-6 rounded-md" />
      </div>
    </div>
  );
}
