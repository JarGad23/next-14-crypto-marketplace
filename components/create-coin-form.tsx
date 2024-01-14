"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { createCoinSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardWrapper } from "./card-wrapper";

export const CreateCoinForm = () => {
  const form = useForm<z.infer<typeof createCoinSchema>>({
    resolver: zodResolver(createCoinSchema),
    defaultValues: {
      name: "",
      quantity: undefined,
      price: undefined,
    },
  });

  return (
    <CardWrapper titleLabel="Create Coin">
      <Form {...form}>
        <form className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Coin name" type="text" />
                  </FormControl>
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
                    <Input {...field} placeholder="10.99" />
                  </FormControl>
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
                    <Input {...field} placeholder="100" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
