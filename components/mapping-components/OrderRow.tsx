"use client";
import { updateDeliveryStatus } from "@/db/data/delivery-data";
import { getDeliveryProducts } from "@/db/service/delivery-service";
import { Delivery as DeliveryEnum } from "@/enums/delivery.enum";
import { utilityState } from "@/lib/utility-state";
import { cn } from "@/lib/utils";
import { DeliveryOrders } from "@/types/DeliveryOrders";
import { Delivery } from "@/types/tablesTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronDown, MoveHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TableSkeleton from "../TableSkeleton";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

type Props = {
  delivery: Delivery;
};

const deliveryStatus = [
  {
    status: DeliveryEnum.Placed,
    name: "Placed",
  },
  {
    status: DeliveryEnum.Shipping,
    name: "Shipping",
  },
  {
    status: DeliveryEnum.Received,
    name: "Received",
  },
];

const OrderRow = ({ delivery }: Props) => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<DeliveryOrders[]>([]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["getOrders"],
    mutationFn: async () => {
      await handleOpenDialog();
    },
    onError: (error) => {
      toast.error("An error occurred while fetching orders");
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: async ({ status }: { status: string }) => {
      toast.promise(updateDeliveryStatus(delivery.id, status), {
        loading: "Updating status...",
        success: "Status updated",
        error: "An error occurred while updating status",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  const setStatus = async (status: string) => {
    await update({ status });
  };

  const handleOpenDialog = async () => {
    setOpen(true);
    const fetchedOrders = await getDeliveryProducts(delivery.id);
    if (!fetchedOrders) {
      setOrders([]);
    } else {
      //@ts-ignore
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
        <Badge
          //@ts-ignore
          variant={delivery.state}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium "
          )}
        >
          {delivery.state}
        </Badge>
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
        <DialogContent>
          <DialogHeader>
            <div className=" flex justify-between">
              <div className=" flex flex-col gap-3">
                <DialogTitle>
                  {format(new Date(delivery.created_at), "MM-dd-yyyy")}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  {delivery.name} - ${delivery.total_price}
                </DialogDescription>
                <div className=" text-lg">
                  {delivery.address} - {delivery.email} -{" "}
                  {delivery.phone_number}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    //@ts-ignore
                    variant={delivery.state}
                    className={cn(" flex gap-2 ")}
                  >
                    {delivery.state} <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {deliveryStatus.map((status, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setStatus(status.status)}
                    >
                      {status.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" text-left">Name</TableHead>
                <TableHead>quantity</TableHead>
                <TableHead>color</TableHead>
                <TableHead>size</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                // Render a sekeleton from shadcn 3 rows
                <TableSkeleton rowsPerPage={3} />
              ) : (
                orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.color}</TableCell>
                    <TableCell>{order.size}</TableCell>
                    <TableCell className="text-right">
                      $ {order.price}
                    </TableCell>
                  </TableRow>
                ))
              )}
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
