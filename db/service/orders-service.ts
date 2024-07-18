"use server";

import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Orders } from "@/types/tablesTypes";
import { getProducts } from "../data/products-data";
import { deliveryOrdersMapper } from "@/mappers/deliveryOrdersMapper";

const getOrdersProducts = async (
  supabase: TypedSupabaseCLient,
  orders: Orders[]
) => {
  const productsIds = orders.map((order) => order.product_id);

  const products = await getProducts(supabase, productsIds);

  return deliveryOrdersMapper(orders, products);
};

export { getOrdersProducts };
