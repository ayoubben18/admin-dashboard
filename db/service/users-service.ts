"use server";

import { createClient } from "@/utils/supabase/server";
import { getAllUsers } from "../data/users-data";

const getAllUsersService = async () => {
  const supabase = createClient();

  return getAllUsers(supabase);
};

export { getAllUsersService };
