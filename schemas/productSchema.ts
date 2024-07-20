import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().positive(),
});

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().positive(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  number_of_images: z.number().min(1).max(5),
});
