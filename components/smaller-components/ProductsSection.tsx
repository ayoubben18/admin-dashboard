"use client";
import { getSortedProductsService } from "@/db/service/product-service";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ProductRow from "../mapping-components/ProductRow";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ProductsSkeleton from "./ProductsSkeleton";

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

const ProductsSection = () => {
  const elemenetsPerPage = 10;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<FullProductType[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getSortedProductsService(page, elemenetsPerPage),
    refetchOnWindowFocus: false,
    retry: true,
  });

  useMemo(() => {
    if (data) {
      setProducts((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <div className="overflow-x-auto w-full flex flex-col gap-6">
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
          {products.map((product, index) => (
            <ProductRow product={product} key={index} />
          ))}
          {products.length === 0 ||
            (isLoading && <ProductsSkeleton rowsPerPage={elemenetsPerPage} />)}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-3">
        <Button
          disabled={isLoading || data!.length < elemenetsPerPage}
          onClick={() => setPage((prev) => prev + 1)}
          className=" flex gap-2"
        >
          <PlusCircleIcon className=" w-4 h-4" /> Show more
        </Button>
      </div>
    </div>
  );
};

export default ProductsSection;
