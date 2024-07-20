import AddProductButton from "@/components/AddProductButton";
import PageWrapper from "@/components/PageWrapper";
import ProductsSection from "@/components/smaller-components/ProductsSection";
import { getSortedProductsService } from "@/db/service/product-service";
import React from "react";

const page = async () => {
  const products = await getSortedProductsService();
  if (!products) return null;
  return (
    <PageWrapper className=" gap-10">
      <AddProductButton />
      <ProductsSection products={products} />
    </PageWrapper>
  );
};

export default page;
