export type TotalOrder = { date: string; count: number };

export type ProductsCount = {
  product_id: string;
  product_name: string;
  total_sold: number;
};

export type ProductSalesByDay = {
  sale_date: string;
  quantity_sold: number;
};

export type UsersAggregs = {
  total_users: number;
  users_with_purchase: number;
  conversion_rate: number;
};
