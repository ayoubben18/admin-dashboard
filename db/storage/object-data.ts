"use server";

import { TypedSupabaseCLient } from "@/types/SupabaseClient";

const getPublicUrl = async (supabase: TypedSupabaseCLient, path: string) => {
  const { data } = await supabase.storage
    .from("images")
    .getPublicUrl(`${path}`);

  return data.publicUrl;
};

export { getPublicUrl };
