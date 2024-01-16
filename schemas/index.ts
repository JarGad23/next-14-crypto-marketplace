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
