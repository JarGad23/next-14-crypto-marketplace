"use client";

import * as z from "zod";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
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
import { buyTokenSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";

interface BuyTokenFormProps {
  children: React.ReactNode;
  name: string;
  price: number;
  quantityForSale: number;
  saleId: string;
}

export const BuyTokenForm = ({
  children,
  name,
  price,
  quantityForSale,
  saleId,
}: BuyTokenFormProps) => {
  const formCloseRef = useRef<ElementRef<"button">>(null);
  const { userId } = useAuth();

  if (!userId) {
    redirect("/");
  }

  const { mutate: buyToken, isLoading } = trpc.tokens.buyToken.useMutation({
    onSuccess: (data) => {
      if (data) {
        window.location.assign(data);
      }
      console.log(data);
      form.reset();
      toast.success("Sale updated successfully");
    },
    onError: ({ message }: any) => {
      toast.error(message);
    },
  });

  const form = useForm<z.infer<typeof buyTokenSchema>>({
    mode: "all",
    resolver: zodResolver(buyTokenSchema),
    defaultValues: {
      name,
      price,
      quantityForSale,
      quantityForBuy: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof buyTokenSchema>) => {
    buyToken({
      saleId,
      quantityForBuy: values.quantityForBuy,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <CardWrapper titleLabel="Buy tokens">
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
                      <FormLabel>Price per token</FormLabel>
                      <FormControl>
                        <Input {...field} disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantityForSale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avaliable tokens to buy</FormLabel>
                      <FormControl>
                        <Input {...field} disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantityForBuy"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Tokens you want to buy</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10"
                          {...field}
                          disabled={isLoading}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !form.formState.isValid}
              >
                Buy
              </Button>
            </form>
          </Form>
        </CardWrapper>
        <DialogClose ref={formCloseRef} />
      </DialogContent>
    </Dialog>
  );
};
