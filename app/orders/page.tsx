import PageWrapper from "@/components/PageWrapper";
import PaginatedOrdersTable from "@/components/PaginatedOrdersTable";
import React from "react";

const page = () => {
  return (
    <PageWrapper className=" gap-8">
      <h1 className=" font-bold text-2xl">All Orders</h1>
      <PaginatedOrdersTable />
    </PageWrapper>
  );
};

export default page;
