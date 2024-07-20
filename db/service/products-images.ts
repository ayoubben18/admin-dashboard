"use server";

import { productsImagesMappers } from "@/mappers/productsImagesMappers";
import { insertProductImage } from "../data/products-images-data";
import { createClient } from "@/utils/supabase/server";

const insertProductImagesService = async (
  productId: string,
  images: {
    id: string;
    path: string;
    fullPath: string;
  }[]
) => {
  const supabase = createClient();
  const mapped = productsImagesMappers(productId, images);

  await insertProductImage(supabase, mapped);
};

export { insertProductImagesService };
