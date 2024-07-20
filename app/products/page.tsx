import AddProductButton from "@/components/AddProductButton";
import PageWrapper from "@/components/PageWrapper";
import ProductsSection from "@/components/ProductsSection";
import React from "react";

const page = () => {
  return (
    <PageWrapper className=" gap-10">
      <AddProductButton />
      <ProductsSection />
    </PageWrapper>
  );
};

export default page;
