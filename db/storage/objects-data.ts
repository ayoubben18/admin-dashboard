"use server";

import { ECOMErrorEnum } from "@/enums/EcomEnum";
import { ECOMError } from "@/lib/ecommerce-error";
import { TypedSupabaseCLient } from "@/types/SupabaseClient";

const uploadImage = async (
  supabase: TypedSupabaseCLient,
  image: File,
  productId: string
) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${productId}/${image.name}`, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new ECOMError(
      "Failed to upload image",
      ECOMErrorEnum.DatabaseError,
      500
    );
  }

  return data;
};

export { uploadImage };
