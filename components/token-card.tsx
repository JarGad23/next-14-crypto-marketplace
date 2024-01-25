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
import { DeleteTokenSaleModal } from "./delete-token-sale-modal";
import { UpdateTokenSaleForm } from "./update-token-sale-form";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TokenCardProps {
  token: Token;
  userQuantityOfToken?: number;
  quantityForSale?: number;
  soldQuantity?: number;
  saleId?: string;
  view: "Wallet" | "Browse" | "Sales";
}

export const TokenCard = ({
  token,
  view,
  userQuantityOfToken,
  quantityForSale,
  soldQuantity,
  saleId,
}: TokenCardProps) => {
  let content;

  switch (view) {
    case "Wallet":
      if (userQuantityOfToken) {
        content = (
          <div className="h-full flex flex-col justify-between gap-y-4">
            <div className="flex items-center gap-x-2 mt-4">
              <h3>
                Quantity of tokens:{" "}
                <span className="font-semibold">
                  {`${userQuantityOfToken}/${token.quantity}`}
                </span>
              </h3>
            </div>
            <div className="h-fill">
              <SellTokenForm
                tokenId={token.id}
                price={token.price}
                userQuantityOfToken={userQuantityOfToken}
                name={token.name}
              >
                <Button className="w-full">Sell</Button>
              </SellTokenForm>
            </div>
          </div>
        );
      } else {
        content = (
          <div className="h-full flex flex-col justify-between gap-y-4">
            <div className="flex flex-col items-center mt-2 md:mt-0 xl:mt-4">
              <h3 className="text-lg font-semibold">
                You currently selling all your tokens.
              </h3>
              <p className="text-muted-foreground text-xs lg:text-sm text-center">
                To get back tokens reduce your selling amount or delte a sale.
              </p>
            </div>
            <Button className="w-full">
              <Link
                href="/dashboard/sales"
                className="w-full flex items-center justify-center"
              >
                Go to sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        );
      }
      break;

    case "Browse":
      if (quantityForSale && saleId) {
        content = (
          <>
            <div className="flex flex-col gap-y-2">
              <h3>
                Available amount of tokens{" "}
                <span className="font-semibold">{quantityForSale}</span>
              </h3>
              <h3>
                Maximum amount of that token is:{" "}
                <span className="font-semibold">{token.quantity}</span>
              </h3>
            </div>
            <BuyTokenForm
              name={token.name}
              price={token.price}
              quantityForSale={quantityForSale}
              saleId={saleId}
            >
              <Button className="w-full">Buy</Button>
            </BuyTokenForm>
          </>
        );
      }
      break;

    case "Sales":
      if (quantityForSale && soldQuantity !== null && saleId !== undefined) {
        content = (
          <>
            <div className="flex flex-col gap-y-2">
              <h3>
                Selling amount of tokens:{" "}
                <span className="font-semibold">{quantityForSale}</span>
              </h3>
              <h3>
                Tokens that you have already sold:{" "}
                <span className="font-semibold">{soldQuantity}</span>
              </h3>
            </div>
            <div className="flex w-full items-center justify-center gap-x-4">
              <UpdateTokenSaleForm
                saleId={saleId}
                quantityForSale={quantityForSale}
                sellingTokenId={token.id}
              >
                <Button className="w-full">Update Sale</Button>
              </UpdateTokenSaleForm>
              <DeleteTokenSaleModal saleId={saleId}>
                <Button variant="destructive" className="w-full">
                  Delete Sale
                </Button>
              </DeleteTokenSaleModal>
            </div>
          </>
        );
      }
      break;

    default:
      content = null;
  }

  return (
    <Card className="w-full h-[320px] lg:w-[45%] 2xl:w-[32%] flex flex-col justify-between">
      <CardHeader className="h-1/3">
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
      <CardContent className="h-2/3 space-y-4 flex flex-col justify-between">
        <div className="flex items-center gap-x-2">
          <h3>
            Price per one token:{" "}
            <span className="font-semibold">{formatPrice(token.price)}</span>
          </h3>
        </div>
        {content}
      </CardContent>
    </Card>
  );
};

export function TokenCardSkeleton() {
  return (
    <div className="w-full lg:w-[45%] 2xl:w-[32%] h-60 rounded-md flex flex-col bg-gray-300 dark:bg-gray-900 p-6">
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center gap-x-2">
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-36 h-8" />
            <Skeleton className="w-44 h-3" />
          </div>
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-4 mt-4">
        <Skeleton className="w-52 h-4" />
        <Skeleton className="w-52 h-4" />
        <Skeleton className="w-full h-8 rounded-md" />
      </div>
    </div>
  );
}
