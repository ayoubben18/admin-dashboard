import { FullDeliveryData } from "@/db/service/delivery-service";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { format } from "date-fns";
import { Separator } from "../ui/separator";

type Props = {
  data: FullDeliveryData[];
};

const UserSection = ({ data }: Props) => {
  return (
    <div className="grid gap-6 w-full">
      {data.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {format(new Date(order.created_at), "iii MMM dd, yyyy")}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Items</div>
                <ul className="grid gap-2">
                  {order.orders.map((item) => (
                    <li
                      key={item.products.name}
                      className="flex items-center justify-between"
                    >
                      <div>{item.products.name}</div>
                      <div>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Total</div>
                <div>${order.total_price.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserSection;
