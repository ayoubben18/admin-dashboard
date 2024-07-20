import { createClient } from "@/utils/supabase/client";
import { insertProductImagesService } from "../service/products-images";
import { uploadImage } from "./objects-data-client";

const uploadProductImages = async (productId: string, images: File[]) => {
  const supabase = createClient();
  let imagesData = [];

  for (const image of images) {
    const data = await uploadImage(supabase, image, productId);
    imagesData.push(data);
  }

  await insertProductImagesService(productId, imagesData);
};

export { uploadProductImages };
