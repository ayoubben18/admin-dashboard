"use client";
import { getPaginatedDeliveries } from "@/db/service/delivery-service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import OrdersTable from "./smaller-components/OrdersTable";
import { Button } from "./ui/button";

const PaginatedOrdersTable = () => {
  const elementPerPage = 10;

  const [page, setPage] = useState(1);

  const { data: deliveries, isLoading } = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      return getPaginatedDeliveries(page, elementPerPage);
    },
  });

  if (!deliveries) return null;

  return (
    <div className=" flex flex-col gap-6 w-full">
      <OrdersTable deliveries={deliveries} />
      <div className="flex justify-center gap-3">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          variant="expandIcon"
          Icon={ArrowLeftIcon}
          iconPlacement="left"
        >
          Previous
        </Button>
        <Button
          disabled={deliveries.length < elementPerPage}
          onClick={() => setPage((prev) => prev + 1)}
          variant="expandIcon"
          Icon={ArrowRightIcon}
          iconPlacement="right"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginatedOrdersTable;
