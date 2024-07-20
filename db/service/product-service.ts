"use server";

import { createClient } from "@/utils/supabase/server";
import { deleteProduct, getSortedProducts } from "../data/products-data";
import { getProductImages } from "../data/products-images-data";
import { getPublicUrl } from "../storage/object-data";
import { FullProductType } from "@/components/smaller-components/ProductsSection";

const deleteProductService = async (productId: string) => {
  const supabase = createClient();

  await deleteProduct(supabase, productId);
};

const getSortedProductsService = async (): Promise<FullProductType[]> => {
  // create an array that can contain the products with their images mapped together
  const productsWithImages = [];
  const supabase = createClient();

  const products = await getSortedProducts(supabase);
  if (!products) return [];

  for (const product of products) {
    const image = await getProductImages(supabase, product.id, 1);

    if (image.length !== 0) {
      const imageUrl = await getPublicUrl(supabase, image[0].full_path);

      productsWithImages.push({ ...product, imageUrl });
    } else productsWithImages.push({ ...product, imageUrl: null });
  }

  return productsWithImages;
};

export { deleteProductService, getSortedProductsService };
