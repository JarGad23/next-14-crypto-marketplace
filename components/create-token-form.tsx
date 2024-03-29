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
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateTokenForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [validForm, setValidForm] = useState(false);

  const router = useRouter();

  const { mutate: createToken, isLoading } =
    trpc.tokens.createToken.useMutation({
      onSuccess: () => {
        form.reset();
        setImageUrl("");
        toast.success("Token created successfully");
        router.push("/dashboard/wallet");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const form = useForm<z.infer<typeof createTokenSchema>>({
    mode: "all",
    resolver: zodResolver(createTokenSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (imageUrl !== "" && form.formState.isValid) {
      setValidForm(true);
    }
  }, [imageUrl, form.formState.isValid, validForm]);

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
              render={({ field, fieldState }) => (
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
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
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
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field, fieldState }) => (
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
                  <FormMessage>{fieldState.error?.message}</FormMessage>
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
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="dark:border-4 border-dashed">
                        <FileUpload
                          {...field}
                          endpoint="tokenImage"
                          onChange={(url) => {
                            if (url) {
                              setImageUrl(url);
                              setIsEditingImage(false);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !validForm}
          >
            Create
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
