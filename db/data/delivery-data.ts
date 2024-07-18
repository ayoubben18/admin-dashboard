"use server";

import { handleStatus } from "@/lib/handleStatus";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Delivery } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/server";

const getRecentOrders = async () => {
  const supabase: TypedSupabaseCLient = createClient();

  const { data, status, error } = await supabase
    .from("delivery")
    .select("*")
    .order("created_at", { ascending: false })
    .range(0, 2);

  return handleStatus(error, status, data) as Delivery[];
};

const getDeliveries = async (
  supabase: TypedSupabaseCLient,
  page: number,
  elementPerPage: number
) => {
  const { data, status, error } = await supabase
    .from("delivery")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * elementPerPage, page * elementPerPage - 1);

  return handleStatus(error, status, data) as Delivery[];
};

export { getRecentOrders, getDeliveries };
