import * as z from "zod";

export const createCoinSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  price: z.number().min(0.0001, {
    message: "Price is required",
  }),
  quantity: z.number().min(1, {
    message: "Minimum quantity is 1",
  }),
});
