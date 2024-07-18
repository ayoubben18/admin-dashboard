"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delivery } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";
import { MoveHorizontalIcon } from "lucide-react";
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
          setOrdersArr((prev) => [...prev, payload.new as Delivery]);
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
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersArr.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(order.created_at), "MM-dd-yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  ${order.total_price}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary">{order.state}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
