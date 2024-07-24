import { handleStatus } from "@/lib/handleStatus";
import { productSchema } from "@/schemas/productSchema";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Products } from "@/types/tablesTypes";
import { z } from "zod";

const insertProduct = async (
  supabase: TypedSupabaseCLient,
  product: z.infer<typeof productSchema>
) => {
  const { data, error, status } = await supabase
    .from("products")
    .insert([product])
    .select("*")
    .single();

  return handleStatus(error, status, data) as Products;
};

export { insertProduct };
