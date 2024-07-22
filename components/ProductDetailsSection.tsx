"use client";
import { ProductType } from "@/types/ProductType";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { useState } from "react";
import { MultipleInputs } from "./smaller-components/MultipleInputs";
import { colorArray, sizesArray } from "@/lib/pairs";
import { ImageSection } from "./smaller-components/ImageSection";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, productSchema } from "@/schemas/productSchema";
import {
  deleteProductService,
  updateProductService,
} from "@/db/service/product-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  product: ProductType;
};

const ProductDetailsSection = ({ product }: Props) => {
  const [colors, setColors] = useState(
    product.colors?.map((color) => {
      return (
        colorArray.find((c) => c.value === color) || {
          value: color,
          label: color,
        }
      );
    }) || []
  );
  const [sizes, setSizes] = useState(
    product.sizes?.map((size) => {
      return (
        sizesArray.find((c) => c.value === size) || {
          value: size,
          label: size,
        }
      );
    }) || []
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: async (values: z.infer<typeof productFormSchema>) => {
      const productDto = {
        ...values,
        colors: colors.map((color) => color.value) || null,
        sizes: sizes.map((size) => size.value) || null,
      };

      // parse the prooduct using the productSchema schema
      const parsedProduct = productSchema
        .omit({
          number_of_images: true,
        })
        .parse(productDto);
      await updateProductService({ id: product.id, ...parsedProduct });
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error("Error updating product, Try again later");
    },
  });

  const handleDeleteProduct = async () => {
    toast.promise(async () => await deleteProductService(product.id), {
      loading: "Deleting product...",
      success: "Product deleted successfully",
      error: "Error deleting product, Try again later",
    });
    router.push("/products");
  };
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start order-2 md:order-1">
        <div className="flex items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <div className="grid gap-4 text-sm leading-loose">
              {product.description}
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="grid gap-4 md:gap-8"
          >
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inventory</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Inventory"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <h1 className=" text-md">Colors</h1>
              <MultipleInputs
                pairs={colorArray}
                label="colors"
                selected={colors}
                setSelected={setColors}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <h1 className=" text-md">Sizes</h1>
              <MultipleInputs
                pairs={sizesArray}
                label="sizes"
                selected={sizes}
                setSelected={setSizes}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-32"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                type="submit"
                className=" flex gap-2 items-center"
                size="lg"
                disabled={isPending}
              >
                {isPending && <div className="loader" />} Submit
              </Button>
              <Button size="lg" variant="outline" onClick={handleDeleteProduct}>
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Product
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <ImageSection images={product.images} />
    </div>
  );
};

export default ProductDetailsSection;
