"use server";

import { createClient } from "@/utils/supabase/server";
import { getSalesAmount } from "./delivery-aggregation";

const getAllAgregs = async () => {
  const supabase = createClient();
  const salesAmount = await getSalesAmount(supabase);

  return {
    salesAmount,
    usersCount: 0,
  };
};

export { getAllAgregs };
