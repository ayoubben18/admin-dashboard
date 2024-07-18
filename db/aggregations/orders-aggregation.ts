"use server";

import { handleStatus } from "@/lib/handleStatus";
import { ProductsCount } from "@/types/aggregations-types";
import { createClient } from "@/utils/supabase/server";

const getAllOrders = async () => {
  const supabase = createClient();
  const { data, error, status } = await supabase.rpc("get_product_sales_count");

  return handleStatus(error, status, data) as ProductsCount[];
};

export { getAllOrders };
