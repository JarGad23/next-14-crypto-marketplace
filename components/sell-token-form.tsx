"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { sellTokenSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ElementRef, useRef } from "react";

interface SellTokenFormProps {
  tokenId: string;
  children: React.ReactNode;
  name: string;
  price: number;
  userQuantityOfToken: number;
}

export const SellTokenForm = ({
  children,
  name,
  price,
  userQuantityOfToken,
  tokenId,
}: SellTokenFormProps) => {
  const formCloseRef = useRef<ElementRef<"button">>(null);
  const { mutate: sellToken, isLoading } = trpc.sales.createSale.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Token set for sale successfully");
      window.location.reload();
    },
    onError: ({ message }: any) => {
      toast.error(message);
    },
  });

  const form = useForm<z.infer<typeof sellTokenSchema>>({
    resolver: zodResolver(sellTokenSchema),
    defaultValues: {
      name,
      price,
      quantityForSale: NaN,
      userQuantityOfToken,
    },
  });

  const onSubmit = (values: z.infer<typeof sellTokenSchema>) => {
    sellToken({ tokenId, quantityForSale: values.quantityForSale });
    formCloseRef?.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <CardWrapper titleLabel="Sell Token">
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
                  name="quantityForSale"
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
                Sale
              </Button>
            </form>
          </Form>
        </CardWrapper>
        <DialogClose ref={formCloseRef} />
      </DialogContent>
    </Dialog>
  );
};
