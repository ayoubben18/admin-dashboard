"use server";

import { FullProductType } from "@/components/smaller-components/ProductsSection";
import { logger } from "@/lib/logger";
import { redis } from "@/lib/redis";
import { ImageCache } from "@/types/ImageCache";
import { ProductType } from "@/types/ProductType";
import { Products } from "@/types/tablesTypes";
import { createClient } from "@/utils/supabase/server";
import {
  deleteProduct,
  getProduct,
  getSortedProducts,
  updateProduct,
} from "../data/products-data";
import {
  deleteProductImages,
  getProductImages,
} from "../data/products-images-data";

const deleteProductService = async (productId: string) => {
  const supabase = createClient();

  await redis.del(`product:${productId}`);
  await redis.zrem("products_by_rating", `product:${productId}`);
  await redis.del(`images:${productId}`);

  await deleteProduct(supabase, productId);
  await deleteProductImages(supabase, productId);
};

const getSortedProductsService = async (
  page: number,
  elementsPerPage: number
): Promise<FullProductType[]> => {
  // Feature : Fetch the sorted data from Redis
  async function fetchFromRedis() {
    const start = (page - 1) * elementsPerPage;
    const end = start + elementsPerPage - 1;

    try {
      const productIds = await redis.zrange("products_by_rating", start, end, {
        rev: true,
      });

      if (productIds.length === 0) {
        return null; // No products found in Redis
      }

      const products: Products[] = await redis.mget(productIds as string[]);
      const productsImagesKeys = products.map(
        (product) => `images:${product.id}`
      );
      const productsImages: ImageCache[][] =
        await redis.mget(productsImagesKeys);

      const productsWithImages = products.map((product, index) => {
        const imageUrl = productsImages[index]?.[0]?.url;

        return { ...product, imageUrl };
      });

      return productsWithImages;
    } catch (err) {
      return null;
    }
  }
  // Feature : fetch the data from Supabase
  const fetchFromDatabase = async () => {
    const productsWithImages = [];
    const supabase = createClient();

    const products = await getSortedProducts(supabase, page, elementsPerPage);
    if (!products) return [];

    for (const product of products) {
      const image = await getProductImages(supabase, product.id, 1);

      if (image.length !== 0) {
        productsWithImages.push({ ...product, imageUrl: image[0].image_url });
      } else productsWithImages.push({ ...product, imageUrl: null });
    }

    return productsWithImages;
  };

  const products = await fetchFromRedis();
  if (products) {
    logger.info("Products fetched from Redis");
    return products;
  }
  logger.info("Products fetched from Supabase");
  return await fetchFromDatabase();
};

const getProductService = async (id: string): Promise<ProductType | null> => {
  const product: Products | null = await redis.get(`product:${id}`);

  if (product) {
    const productImages: ImageCache[] | null = await redis.get(`images:${id}`);
    return { ...product, images: productImages || [] };
  }

  const supabase = createClient();
  const productData = await getProduct(supabase, id);

  if (!productData) return null;

  const images = await getProductImages(supabase, productData.id, 5);

  return {
    ...productData,
    images: images.map((image) => {
      return {
        name: image.full_path?.split("/").pop() || "",
        path: image.full_path,
        url: image.image_url,
      };
    }),
  };
};

const updateProductService = async (product: Partial<Products>) => {
  const supabase = createClient();

  await updateProduct(supabase, product);
};

export {
  deleteProductService,
  getProductService,
  getSortedProductsService,
  updateProductService,
};
