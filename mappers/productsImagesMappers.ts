import { ProductImages } from "@/types/tablesTypes";

export const productsImagesMappers = (
  productId: string,
  images: {
    id: string;
    path: string;
    fullPath: string;
  }[]
): Omit<ProductImages, "id" | "created_at">[] => {
  return images.map((image) => ({
    object_id: image.id,
    product_id: productId,
    full_path: image.path,
  }));
};
