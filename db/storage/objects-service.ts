"use server";

import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "./objects-data";

const uploadProductImages = async (productId: string, images: File[]) => {
  const supabase = createClient();

  for (const image of images) {
    await uploadImage(supabase, image, productId);
  }
};

export { uploadProductImages };
