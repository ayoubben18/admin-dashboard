import React from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import OrderRow from "../mapping-components/OrderRow";
import { Delivery } from "@/types/tablesTypes";

type Props = {
  deliveries: Delivery[];
};

const OrdersTable = ({ deliveries }: Props) => {
  return (
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
        {deliveries.map((delivery) => (
          <OrderRow delivery={delivery} key={delivery.id} />
        ))}
      </TableBody>
      <TableFooter className="hidden"></TableFooter>
    </Table>
  );
};

export default OrdersTable;
