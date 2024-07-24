"use client";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components//ui/table";
import { getPaginatedDeliveries } from "@/db/service/delivery-service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import BigTableSkeleton from "./BigTableSkeleton";
import OrderRow from "./mapping-components/OrderRow";
import { Button } from "./ui/button";
import { Delivery } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/client";
const PaginatedOrdersTable = () => {
  const elementPerPage = 10;
  const supabase = createClient();

  const [page, setPage] = useState(1);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      const paginatedDelivery = await getPaginatedDeliveries(
        page,
        elementPerPage
      );
      setDeliveries(paginatedDelivery);
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("realtime delivery")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "delivery" },
        (payload) => {
          setDeliveries((prev) => {
            const newDelivery = payload.new as Delivery;
            const updatedDeliveries = [newDelivery, ...prev.slice(0, 9)];
            return updatedDeliveries;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, deliveries, setDeliveries]);

  return (
    <div className=" flex flex-col gap-6 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-left">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <BigTableSkeleton rowsPerPage={elementPerPage} />
          ) : (
            deliveries?.map((delivery) => (
              <OrderRow delivery={delivery} key={delivery.id} />
            ))
          )}
        </TableBody>
        <TableFooter className="hidden"></TableFooter>
      </Table>
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
          disabled={deliveries && deliveries.length < elementPerPage}
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
