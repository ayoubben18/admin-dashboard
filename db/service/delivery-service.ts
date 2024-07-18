"use server";

import { createClient } from "@/utils/supabase/server";
import { getDeliveries } from "../data/delivery-data";
import { logger } from "@/lib/logger";
import { getOrders } from "../data/orders-data";

const getPaginatedDeliveries = async (page: number, elementPerPage: number) => {
  try {
    const supabase = createClient();

    const deliveries = await getDeliveries(supabase, page, elementPerPage);

    if (!deliveries || deliveries.length === 0) {
      return [];
    }

    return deliveries;
  } catch (error) {
    logger.error("Error getting paginated deliveries", error);
    return [];
  }
};

const getDeliveryProducts = async (deliveryId: string) => {
  const supabase = createClient();

  const orders = await getOrders(supabase, deliveryId);

  if (!orders || orders.length === 0) {
    return [];
  }
};

export { getPaginatedDeliveries };
