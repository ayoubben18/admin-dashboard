"use server";

import { createClient } from "@/utils/supabase/server";
import {
  getCustomerConversionRate,
  getSalesAmount,
} from "./delivery-aggregation";

const getAllAgregs = async () => {
  const supabase = createClient();
  const salesAmount = await getSalesAmount(supabase);
  const usersAgreggs = await getCustomerConversionRate(supabase);

  return {
    salesAmount,
    usersCount: usersAgreggs?.total_users,
    conventionRate: usersAgreggs?.conversion_rate,
  };
};

export { getAllAgregs };
