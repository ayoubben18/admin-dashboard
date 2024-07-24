import { productSchema } from "@/schemas/productSchema";
import { createClient } from "@/utils/supabase/client";
import { uploadProductImages } from "../storage/objects-service";
import { z } from "zod";
import { insertProduct } from "../data/client-products-data";

const createProduct = async (
  productDto: z.infer<typeof productSchema>,
  images: File[]
) => {
  const supabase = createClient();
  const product = await insertProduct(supabase, productDto);

  await uploadProductImages(product.id, images);
};

export { createProduct };
