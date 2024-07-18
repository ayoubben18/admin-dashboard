"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { utilityState } from "@/lib/utility-state";
import { cn } from "@/lib/utils";
import { Delivery } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
  orders: Delivery[];
};

const RecentOrdersTable = ({ orders }: Props) => {
  const supabase = createClient();
  const [ordersArr, setOrdersArr] = useState(orders);
  useEffect(() => {
    const channel = supabase
      .channel("realtime comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "delivery" },
        (payload) => {
          // set the array to the latest 2 orders and the new one
          setOrdersArr((prev) => {
            const newDelivery = payload.new as Delivery;
            const updatedDeliveries = [newDelivery, ...prev.slice(0, 2)];
            return updatedDeliveries;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, ordersArr, setOrdersArr]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          A table of the latest orders placed on your store.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className=" text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersArr.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.name}</TableCell>
                <TableCell>
                  {format(new Date(order.created_at), "MM-dd-yyyy")}
                </TableCell>
                <TableCell>${order.total_price}</TableCell>
                <TableCell className=" text-right">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ",
                      utilityState(order.state)
                    )}
                  >
                    {order.state}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;
