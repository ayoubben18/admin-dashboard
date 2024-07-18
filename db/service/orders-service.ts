"use server";

import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Orders } from "@/types/tablesTypes";
import { getProducts } from "../data/products-data";

const getOrdersProducts = async (
  supabase: TypedSupabaseCLient,
  orders: Orders[]
) => {
  const productsIds = orders.map((order) => order.product_id);

  const products = await getProducts(supabase, productsIds);
};
