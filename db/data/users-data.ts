"use server";

import { logger } from "@/lib/logger";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";

// I'm joking you can't do this :), Or you're gonna fuck yourself

const getAllUsers = async (supabase: TypedSupabaseCLient) => {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  logger.info(users.length);
  error && logger.error(error.message);

  return users.length;
};

export { getAllUsers };
