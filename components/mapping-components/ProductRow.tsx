"use client";
import { FilePenIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { TableRow, TableCell } from "../ui/table";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductService } from "@/db/service/product-service";
import { toast } from "sonner";
import { FullProductType } from "../smaller-components/ProductsSection";
import Link from "next/link";

type Props = {
  product: FullProductType;
};

const ProductRow = ({ product }: Props) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProductService,
    onError: (error) => {
      console.log(error.message);

      toast.error("Failed to delete product");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product deleted successfully");
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imageUrl || "/not-available.jpg"}
            alt={product.name}
            width={100}
            height={100}
            priority
            className="rounded-md"
          />
        </Link>
      </TableCell>
      <TableCell className="font-semibold">{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500"
          onClick={() => mutate(product.id)}
          disabled={isPending}
        >
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
