"use client";
import { getSortedProductsService } from "@/db/service/product-service";
import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
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
import React from "react";

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
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        getSortedProductsService(pageParam, elemenetsPerPage),
      getNextPageParam: (lastPage, pages) =>
        lastPage.length === elemenetsPerPage ? pages.length + 1 : undefined,
    });

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
          {data?.pages.map((group, index) => (
            <React.Fragment key={index}>
              {group.map((product, index) => (
                <ProductRow product={product} key={index} />
              ))}
            </React.Fragment>
          ))}
          {(isFetchingNextPage || isFetching) && (
            <ProductsSkeleton rowsPerPage={elemenetsPerPage} />
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-3">
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className=" flex gap-2"
        >
          <PlusCircleIcon className=" w-4 h-4" /> Show more
        </Button>
      </div>
    </div>
  );
};

export default ProductsSection;
