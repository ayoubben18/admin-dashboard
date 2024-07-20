import { handleStatus } from "@/lib/handleStatus";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Products } from "@/types/tablesTypes";

const insertProduct = async (
  supabase: TypedSupabaseCLient,
  name: string,
  description: string,
  number_of_images: number,
  sizes: string[] | null,
  colors: string[] | null,
  price: number,
  stock: number
) => {
  const { data, error, status } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        number_of_images,
        sizes,
        colors,
        price,
        stock,
      },
    ])
    .select("*")
    .single();

  return handleStatus(error, status, data) as Products;
};

export { insertProduct };
