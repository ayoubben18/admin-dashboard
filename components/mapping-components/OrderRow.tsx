"use client";
import { Delivery, Orders } from "@/types/tablesTypes";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoveHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getOrders } from "@/db/data/orders-data";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  delivery: Delivery;
};

const OrderRow = ({ delivery }: Props) => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Orders[]>([]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["getOrders"],
    mutationFn: async () => {
      toast.promise(handleOpenDialog, {
        loading: "Fetching orders...",
        success: "Orders fetched successfully",
        error: "An error occurred while fetching orders",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast.error("An error occurred while fetching orders");
    },
  });

  const handleOpenDialog = async () => {
    setOpen(true);
    const fetchedOrders = await getOrders(delivery.id);
    if (!fetchedOrders) {
      setOrders([]);
    } else {
      setOrders(fetchedOrders);
    }
  };

  return (
    <TableRow key={delivery.id}>
      <TableCell className="font-medium">{delivery.name}</TableCell>
      <TableCell>
        {format(new Date(delivery.created_at), "MM-dd-yyyy")}
      </TableCell>
      <TableCell>
        {" "}
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300",
            delivery.state === "shipping" &&
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            delivery.state === "received" &&
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            delivery.state === "placed" &&
              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          )}
        >
          {delivery.state}
        </div>
      </TableCell>
      <TableCell>$ {delivery.total_price}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoveHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => mutate()}>
              View order
            </DropdownMenuItem>
            <DropdownMenuItem>Customer details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <Dialog open={open}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {format(new Date(delivery.created_at), "MM-dd-yyyy")}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {delivery.name} - ${delivery.total_price}
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" text-left">Name</TableHead>
                <TableHead>quantity</TableHead>
                <TableHead>color</TableHead>
                <TableHead>size</TableHead>
                <TableHead className="text-right">quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending
                ? // Render a sekeleton from shadcn 3 rows
                  [1, 2, 3].map((index) => (
                    <TableRow key={index}>
                      <TableCell className="w-1/4 h-4 bg-gray-200 animate-pulse"></TableCell>
                      <TableCell className="w-1/4 h-4 bg-gray-200 animate-pulse"></TableCell>
                      <TableCell className="w-1/4 h-4 bg-gray-200 animate-pulse"></TableCell>
                    </TableRow>
                  ))
                : orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.price}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
};

export default OrderRow;
