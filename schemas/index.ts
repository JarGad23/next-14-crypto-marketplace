import * as z from "zod";

export const createTokenSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  price: z.coerce.number().min(0.0001, {
    message: "Price is required",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Minimum quantity is 1",
  }),
  imageUrl: z.string(),
});

export const sellTokenSchema = z
  .object({
    name: z.string().readonly(),
    price: z.number().readonly(),
    userQuantityOfToken: z.number().readonly(),
    quantityForSale: z.coerce.number().min(1, {
      message: "Minimum quantity is 1",
    }),
  })
  .refine((data) => data.quantityForSale <= data.userQuantityOfToken, {
    message: "Can't set higher quantity than your current quantity",
  });

export const updateTokenSaleSchema = z
  .object({
    name: z.string().readonly(),
    price: z.number().readonly(),
    userQuantityOfToken: z.number().readonly(),
    newQuantityOfTokensForSale: z.coerce.number().min(1, {
      message: "Minimum quantity is 1",
    }),
  })
  .refine(
    (data) => data.newQuantityOfTokensForSale <= data.userQuantityOfToken,
    {
      message: "Can't set higher quantity than your current quantity",
    }
  );

export const buyTokenSchema = z
  .object({
    name: z.string().readonly(),
    price: z.number().readonly(),
    quantityForSale: z.number().readonly(),
    quantityForBuy: z.coerce.number(),
  })
  .refine(
    (data) => {
      return data.quantityForBuy >= 1;
    },
    {
      message: "Minimum quantity is 1",
      path: ["quantityForBuy"],
    }
  )
  .refine(
    (data) => {
      return data.quantityForBuy <= data.quantityForSale;
    },
    {
      message: "Can't set more quantity than is for sale",
      path: ["quantityForBuy"],
    }
  );
