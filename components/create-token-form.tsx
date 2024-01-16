"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { createTokenSchema } from "@/schemas";
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
import { FileUpload } from "./file-upload";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export const CreateTokenForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);

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

  const form = useForm<z.infer<typeof createTokenSchema>>({
    resolver: zodResolver(createTokenSchema),
    defaultValues: {
      name: "",
      quantity: undefined,
      price: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createTokenSchema>) => {
    createToken({ ...values, imageUrl });
  };

  return (
    <CardWrapper titleLabel="Create Token">
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
            {imageUrl && !isEditingImage ? (
              <div className="relative aspect-video">
                <Button
                  className="absolute top-2 right-2 z-40"
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setIsEditingImage(true), setImageUrl("");
                  }}
                >
                  <X className="text-rose-500 h-6 w-6" />
                </Button>
                <Image
                  className="object-cover bg-gray-500 transition"
                  fill
                  alt="Image"
                  src={imageUrl}
                />
              </div>
            ) : (
              <div className="border-4 border-dashed">
                <FileUpload
                  endpoint="tokenImage"
                  onChange={(url) => {
                    if (url) {
                      setImageUrl(url);
                      setIsEditingImage(false);
                    }
                  }}
                />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Create
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
