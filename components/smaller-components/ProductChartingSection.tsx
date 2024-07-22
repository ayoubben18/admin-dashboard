import { getProductSalesByDay } from "@/db/aggregations/product-aggregations";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import ProductSalesChart from "./ProductSalesChart";

type Props = {
  productId: string;
};

const ProductChartingSection = async ({ productId }: Props) => {
  const supabase = createClient();
  const productSales = await getProductSalesByDay(supabase, productId);
  if (!productSales) return null;

  return <ProductSalesChart data={productSales} />;
};

export default ProductChartingSection;
