import { handleStatus } from "@/lib/handleStatus";
import { ProductSalesByDay } from "@/types/aggregations-types";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";

async function getProductSalesByDay(
  supabase: TypedSupabaseCLient,
  productId: string
) {
  const { data, error, status } = await supabase.rpc(
    "get_product_sales_by_day",
    {
      product_uuid: productId,
    }
  );

  return handleStatus(error, status, data) as ProductSalesByDay[] | null;
}

export { getProductSalesByDay };
