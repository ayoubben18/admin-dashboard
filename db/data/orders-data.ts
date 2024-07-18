"use server";

import { handleStatus } from "@/lib/handleStatus";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Orders } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/server";

const getOrders = async (supabas: TypedSupabaseCLient, deliveryId: string) => {
  const supabase = createClient();
  const { data, status, error } = await supabase
    .from("orders")
    .select("*")
    .eq("delivery_id", deliveryId);

  return handleStatus(error, status, data) as Orders[] | null;
};

export { getOrders };
