"use client";

import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { updateTokenSaleSchema } from "@/schemas";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ElementRef, useEffect, useRef } from "react";
import { toast } from "sonner";

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
  const formCloseRef = useRef<ElementRef<"button">>(null);
  const { userId } = useAuth();

  if (!userId) {
    redirect("/");
  }

  const { data: userTokenInWallet, isError } =
    trpc.getTokenFromUserWallet.useQuery({
      walletUserId: userId,
      tokenId: sellingTokenId,
    });

  const { mutate: updateSale, isLoading } = trpc.updateSellToken.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Sale updated successfully");
      window.location.reload();
    },
    onError: ({ message }: any) => {
      toast.error(message);
    },
  });

  const form = useForm<z.infer<typeof updateTokenSaleSchema>>({
    resolver: zodResolver(updateTokenSaleSchema),
    defaultValues: {
      name: "",
      price: 0,
      userQuantityOfToken: 0,
      newQuantityOfTokensForSale: 0,
    },
  });

  useEffect(() => {
    if (userTokenInWallet && userTokenInWallet.token) {
      form.reset({
        name: `${userTokenInWallet.token.name}`,
        price: userTokenInWallet.token.price,
        userQuantityOfToken:
          userTokenInWallet.userQuantityOfToken + quantityForSale,
        newQuantityOfTokensForSale: quantityForSale,
      });
    }
  }, [userTokenInWallet, quantityForSale, form]);

  const onSubmit = (values: z.infer<typeof updateTokenSaleSchema>) => {
    updateSale({
      saleId,
      newQuantityForSale: values.newQuantityOfTokensForSale,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <CardWrapper titleLabel="Update token sale">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userQuantityOfToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your amount of tokens</FormLabel>
                      <FormControl>
                        <Input {...field} disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newQuantityOfTokensForSale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tokens you want to sale</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10"
                          {...field}
                          disabled={isLoading}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Update
              </Button>
            </form>
          </Form>
        </CardWrapper>
        <DialogClose ref={formCloseRef} />
      </DialogContent>
    </Dialog>
  );
};
