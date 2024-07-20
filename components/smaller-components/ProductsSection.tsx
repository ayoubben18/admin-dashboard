"use client";
import { Products } from "@/types/tablesTypes";
import { useQuery } from "@tanstack/react-query";
import ProductRow from "../mapping-components/ProductRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getSortedProductsService } from "@/db/service/product-service";

export type FullProductType = {
  colors: string[] | null;
  description: string;
  embeddings: string | null;
  general_rating: number;
  id: string;
  name: string;
  number_of_images: number | null;
  price: number;
  rating_count: number;
  sizes: string[] | null;
  stock: number;
  imageUrl: string | null;
};

interface Props {
  products: FullProductType[];
}

const ProductsSection = ({ products }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getSortedProductsService(),
    initialData: products,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return null;
  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product, index) => (
            <ProductRow product={product} key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsSection;
