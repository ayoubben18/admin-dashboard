"use server";

import { logger } from "@/lib/logger";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";

const getAllUsers = async (supabase: TypedSupabaseCLient) => {
  const { data, error, status } = await supabase.from("users").select("*");

  error && logger.error(error.message);

  return { data, error, status };
};

export { getAllUsers };
