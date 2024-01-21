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
import { Token } from "@prisma/client";
import { SellTokenForm } from "./sell-token-form";
import { BuyTokenForm } from "./buy-token-form";

interface TokenCardProps {
  token: Token;
  userQuantityOfToken?: number;
  quantityForSale?: number;
  view: "Wallet" | "Browse";
}

export const TokenCard = ({
  token,
  userQuantityOfToken,
  view,
  quantityForSale,
}: TokenCardProps) => {
  return (
    <Card className="w-full lg:w-[45%] 2xl:w-[32%]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl">{token.name}</CardTitle>
            <CardDescription>
              Created by: {token.creatorUserName}
            </CardDescription>
          </div>
          <Image
            alt="token"
            src={token.imageUrl || ""}
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
            <span className="font-semibold">{formatPrice(token.price)}</span>
          </h3>
        </div>
        {view === "Wallet" && userQuantityOfToken ? (
          <>
            <div className="flex items-center gap-x-2">
              <h3>
                Quantity of tokens:{" "}
                <span className="font-semibold">
                  {`${userQuantityOfToken}/${token.quantity}`}
                </span>
              </h3>
            </div>
            <SellTokenForm
              tokenId={token.id}
              price={token.price}
              userQuantityOfToken={userQuantityOfToken}
              name={token.name}
            >
              <Button className="w-full">Sell</Button>
            </SellTokenForm>
          </>
        ) : (
          view === "Browse" &&
          quantityForSale && (
            <>
              <div className="flex flex-col gap-y-2">
                <h3>
                  Avaliable amount of tokens{" "}
                  <span className="font-semibold">{quantityForSale}</span>
                </h3>
                <h3>
                  Maximum amount of that token is:{" "}
                  <span className="font-semibold">{token.quantity}</span>
                </h3>
              </div>
              <BuyTokenForm>
                <Button className="w-full">Buy</Button>
              </BuyTokenForm>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};

export function TokenCardSkeleton() {
  return (
    <div className="w-full lg:w-[45%] 2xl:w-[32%] h-60 rounded-md flex flex-col bg-gray-900 p-6">
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center gap-x-2">
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-28 h-8" />
            <Skeleton className="w-36 h-3" />
          </div>
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-4 mt-4">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-full h-8 rounded-md" />
      </div>
    </div>
  );
}
