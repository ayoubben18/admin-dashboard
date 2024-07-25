"use server";

import { handleStatus } from "@/lib/handleStatus";
import { logger } from "@/lib/logger";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";
import { Users } from "@/types/tablesTypes";

const getAllUsers = async (supabase: TypedSupabaseCLient) => {
  const { data, error, status } = await supabase.from("users").select("*");

  error && logger.error(error.message);

  return handleStatus(error, status, data) as Users[] | null;
};

const getUser = async (supabase: TypedSupabaseCLient, id: string) => {
  const { data, error, status } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return handleStatus(error, status, data) as Users | null;
};

export { getAllUsers, getUser };
