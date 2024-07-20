"use server";

import { serverActionClient } from "@/actions/server-actions-client";
import { productSchema } from "@/schemas/productSchema";
import { createClient } from "@/utils/supabase/server";
import { insertProduct } from "../data/products-data";
import { uploadProductImages } from "../storage/objects-service";

const createProduct = serverActionClient
  .schema(productSchema)
  .action(
    async ({
      parsedInput: {
        name,
        description,
        numberOfImages,
        sizes,
        colors,
        images,
        price,
        stock,
      },
    }) => {
      const supabase = createClient();
      const product = await insertProduct(supabase, {
        name,
        description,
        number_of_images: numberOfImages,
        sizes,
        colors,
        price,
        stock,
      });

      await uploadProductImages(product.id, images);
    }
  );

export { createProduct };
