import { Orders, Products } from "@/types/tablesTypes";

export const deliveryOrdersMapper = (
  orders: Orders[],
  products: Products[]
) => {
  return orders.map((order) => {
    const product = products.find((product) => product.id === order.product_id);
    // if there is not product, do not return anything just pass to the next iteration
    return {
      name: product?.name || "",
      quantity: order.quantity,
      price: order.price,
      color: order.color,
      size: order.size,
    };
  });
};
