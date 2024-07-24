"use server";

import { Delivery as DeliveryEnum } from "@/enums/delivery.enum";
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

const updateDeliveryStatus = async (id: string, status: string) => {
  // we should update the time too
  let shippingDate = null;
  let receivedDate = null;
  if (status === DeliveryEnum.Shipping) {
    shippingDate = new Date();
  } else if (status === DeliveryEnum.Received) {
    receivedDate = new Date();
  }
  const supabase = createClient();

  const {
    data,
    status: statusResponse,
    error,
  } = await supabase
    .from("delivery")
    .update({ state: status, shipping: shippingDate, delivered: receivedDate })
    .eq("id", id);

  return handleStatus(error, statusResponse, data);
};

const getUserDeliveries = async (
  supabase: TypedSupabaseCLient,
  userId: string
) => {
  const { data, error, status } = await supabase
    .from("delivery")
    .select("*")
    .eq("user_id", userId);

  return handleStatus(error, status, data) as Delivery[] | null;
};
export {
  getRecentOrders,
  getDeliveries,
  updateDeliveryStatus,
  getUserDeliveries,
};
