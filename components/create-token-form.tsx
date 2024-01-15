"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { createCoinSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { CardWrapper } from "./card-wrapper";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

export const CreateTokenForm = () => {
  const { mutate: createToken, isLoading } = trpc.createToken.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Token created successfully");
    },
    onError: ({ message }) => {
      form.reset();
      toast.error(message);
    },
  });

  const form = useForm<z.infer<typeof createCoinSchema>>({
    resolver: zodResolver(createCoinSchema),
    defaultValues: {
      name: "",
      quantity: undefined,
      price: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createCoinSchema>) => {
    createToken({ ...values });
  };

  return (
    <CardWrapper titleLabel="Create Coin">
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
                    <Input
                      {...field}
                      placeholder="Coin name"
                      type="text"
                      disabled={isLoading}
                    />
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
                    <Input
                      {...field}
                      placeholder="10.99"
                      type="number"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
                      type="number"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Create
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
