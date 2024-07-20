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
  const product = await insertProduct(
    supabase,
    productDto.name,
    productDto.description,
    productDto.number_of_images,
    productDto.sizes || null,
    productDto.colors || null,
    productDto.price,
    productDto.stock
  );

  await uploadProductImages(product.id, images);
};

export { createProduct };
