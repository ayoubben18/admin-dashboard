import { Delivery } from "@/enums/delivery.enum";

export const utilityState = (state: string) => {
  if (state === Delivery.Shipping) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  }
  if (state === Delivery.Received) {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }
  if (state === Delivery.Placed) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }
};
