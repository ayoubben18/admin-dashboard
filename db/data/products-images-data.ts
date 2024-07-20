"use sever";

import { handleStatus } from "@/lib/handleStatus";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { ProductImages } from "@/types/tablesTypes";

const insertProductImage = async (
  supabase: TypedSupabaseCLient,
  images: Omit<ProductImages, "id" | "created_at">[]
) => {
  const { data, status, error } = await supabase
    .from("products_images")
    .insert(images)
    .select("*");

  console.log(data, status, error);

  return handleStatus(error, status, data) as ProductImages[];
};

const getProductImages = async (
  supabase: TypedSupabaseCLient,
  productId: string,
  limit: number = 5
) => {
  const { data, status, error } = await supabase
    .from("products_images")
    .select("*")
    .eq("product_id", productId)
    .limit(limit);

  return handleStatus(error, status, data) as ProductImages[];
};

export { insertProductImage, getProductImages };
