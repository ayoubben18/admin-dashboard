"use server";

import { createClient } from "@/utils/supabase/server";
import { getDeliveries, getUserDeliveries } from "../data/delivery-data";
import { logger } from "@/lib/logger";
import { getOrders } from "../data/orders-data";
import { getOrdersProducts } from "./orders-service";
import { redis } from "@/lib/redis";

export interface FullDeliveryData {
  orders: Root[];
  address: string;
  check_out: string | null;
  created_at: string;
  delivered: string | null;
  email: string;
  id: string;
  name: string;
  phone_number: string;
  shipping: string | null;
  state: string;
  total_price: number;
  user_id: string;
}
export interface Root {
  id: string;
  size: string;
  color: string;
  price: number;
  status: string;
  user_id: string;
  quantity: number;
  order_date: string;
  product_id: string;
  delivery_id: string;
  products: Products;
}

export interface Products {
  name: string;
}

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

  const deliveryOrders = await getOrdersProducts(supabase, orders);

  return deliveryOrders;
};

const getUserDeliveriesService = async (userId: string) => {
  const supabase = createClient();
  const deliveries = await getUserDeliveries(supabase, userId);

  if (!deliveries || deliveries.length === 0) {
    return [];
  }

  let fullDeliveries = [];

  for (const delivery of deliveries) {
    const orders: Root[] | null = await redis.get(
      `user-placed:${userId}/${delivery.id}`
    );

    if (orders) {
      fullDeliveries.push({
        ...delivery,
        orders: orders,
      });
    }
  }

  return fullDeliveries;
};

export {
  getPaginatedDeliveries,
  getDeliveryProducts,
  getUserDeliveriesService,
};
