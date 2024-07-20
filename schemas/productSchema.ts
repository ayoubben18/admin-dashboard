import { productFormSchema } from "@/components/smaller-components/ProductForm";
import { z } from "zod";

export const productSchema = z.object({
  productFormSchema,
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  numberOfImages: z.number().min(1).max(5),
  images: z.array(z.instanceof(FileList)),
});
