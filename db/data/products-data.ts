"use server";

import { handleStatus } from "@/lib/handleStatus";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Products } from "@/types/tablesTypes";

const getProduct = async (supabase: TypedSupabaseCLient, productId: string) => {
  const { data, error, status } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  return handleStatus(error, status, data) as Products | null;
};

const getProducts = async (supabase: TypedSupabaseCLient, ids: string[]) => {
  const { data, error, status } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);

  return handleStatus(error, status, data) as Products[];
};

const insertProduct = async (
  supabase: TypedSupabaseCLient,
  product: Omit<
    Products,
    "id" | "embeddings" | "rating_count" | "general_rating"
  >
) => {
  const { data, error, status } = await supabase
    .from("products")
    .insert([product])
    .select("*")
    .single();

  return handleStatus(error, status, data) as Products;
};

export { getProduct, getProducts, insertProduct };
