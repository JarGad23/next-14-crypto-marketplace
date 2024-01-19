"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { Form } from "./ui/form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { sellTokenSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

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
}: SellTokenFormProps) => {
  const form = useForm<z.infer<typeof sellTokenSchema>>({
    resolver: zodResolver(sellTokenSchema),
    defaultValues: {
      name,
      price,
      quantityForSale: NaN,
      userQuantityOfToken,
    },
  });

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <CardWrapper titleLabel="Sell Token">
          <Form {...form}>
            <form></form>
          </Form>
        </CardWrapper>
      </DialogContent>
    </Dialog>
  );
};
