"use client";

import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const TokenCard = () => {
  return <Card></Card>;
};

export function TokenCardSkeleton() {
  return (
    <div className="w-80 h-60 rounded-md flex flex-col bg-gray-900 p-4">
      <div className="w-full flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <Skeleton className="w-16 h-3" />
      </div>
    </div>
  );
}
