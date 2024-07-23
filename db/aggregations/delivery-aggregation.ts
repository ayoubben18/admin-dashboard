"use server";

import { handleStatus } from "@/lib/handleStatus";
import { logger } from "@/lib/logger";
import { TotalOrder, UsersAggregs } from "@/types/aggregations-types";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { createClient } from "@/utils/supabase/server";

const getSalesAmount = async (supabase: TypedSupabaseCLient) => {
  const { data, error, status } = await supabase.from("delivery").select("*");

  error && logger.error(error.message);

  if (!data) return 0;

  const amount = data.reduce(
    (acc: number, curr: any) => acc + curr.total_price,
    0
  );
  return handleStatus(error, status, amount) as number;
};

const getGroupedOrders = async () => {
  const supabase = createClient();
  const { data, error, status } = await supabase.rpc(
    "get_delivery_count_by_date"
  );

  return handleStatus(error, status, data) as TotalOrder[] | null;
};

const getCustomerConversionRate = async (supabase: TypedSupabaseCLient) => {
  const { data, error, status } = await supabase.rpc(
    "get_customer_conversion_rate"
  );

  if (!data) return null;

  return handleStatus(error, status, data[0]) as UsersAggregs | null;
};

export { getSalesAmount, getGroupedOrders, getCustomerConversionRate };
