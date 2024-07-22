"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pairs } from "@/types/Pairs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FileUploader } from "../file-uploader";
import { Textarea } from "../ui/textarea";
import { MultipleInputs } from "./MultipleInputs";
import useImagesStore from "@/stores/imagesStore";
import { productFormSchema, productSchema } from "@/schemas/productSchema";
import { createProduct } from "@/db/service/product-client-service";
import { colorArray, sizesArray } from "@/lib/pairs";

const ProductForm = () => {
  const [colors, setColors] = useState<Pairs[]>([]);
  const [sizes, setSizes] = useState<Pairs[]>([]);
  const { images, addImage } = useImagesStore();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (values: z.infer<typeof productFormSchema>) => {
      const product = {
        ...values,
        colors: colors.map((color) => color.value) || null,
        sizes: sizes.map((size) => size.value) || null,
        number_of_images: images?.length || 0,
      };

      // parse the prooduct using the productSchema schema
      const parsedProduct = productSchema.parse(product);
      await createProduct(parsedProduct, images || []);
    },
    onError: (error) => {
      console.log(error.message);

      toast.error("Error creating product", {
        duration: 1500,
      });
    },
    onSuccess: () => {
      toast.success("Product added successfully", {
        duration: 1500,
      });
      form.reset();
      addImage([]);
      setColors([]);
      setSizes([]);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: NaN,
      stock: NaN,
    },
  });

  return (
    <div className=" w-full grid grid-cols-2 gap-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutate(values))}
          className="space-y-8 scroll-auto w-full "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
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
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Stock"
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

          <Button
            type="submit"
            className=" flex items-center gap-2"
            disabled={isPending}
          >
            {isPending && <div className="loader" />} Submit
          </Button>
        </form>
      </Form>
      <FileUploader maxFiles={5} maxSize={1024 * 1024 * 4} multiple />
    </div>
  );
};

export default ProductForm;
