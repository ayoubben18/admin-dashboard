"use client";
import React, { useState } from "react";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
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
import { Textarea } from "../ui/textarea";
import { MultipleInputs } from "./MultipleInputs";
import { Pairs } from "@/types/Pairs";
import { FileUploader } from "../file-uploader";
import { createProduct } from "@/db/service/product-service";
import { toast } from "sonner";

const colorArray = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "pink", label: "Pink" },
  { value: "brown", label: "Brown" },
  { value: "gray", label: "Gray" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "cyan", label: "Cyan" },
  { value: "magenta", label: "Magenta" },
  { value: "lime", label: "Lime" },
  { value: "indigo", label: "Indigo" },
  { value: "teal", label: "Teal" },
  { value: "maroon", label: "Maroon" },
  { value: "navy", label: "Navy" },
  { value: "olive", label: "Olive" },
  { value: "turquoise", label: "Turquoise" },
  { value: "silver", label: "Silver" },
  { value: "gold", label: "Gold" },
  { value: "lavender", label: "Lavender" },
  { value: "beige", label: "Beige" },
  { value: "salmon", label: "Salmon" },
] satisfies Pairs[];

const sizesArray = [
  // Sizes with roamn notation
  { value: "xxs", label: "XXS" },
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
  { value: "xxxl", label: "XXXL" },
] satisfies Pairs[];

export const productFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().positive(),
});

const ProductForm = () => {
  const [colors, setColors] = useState<Pairs[]>([]);
  const [sizes, setSizes] = useState<Pairs[]>([]);
  const { isPending, mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
    onError: () => {
      toast.error("Error creating product", {
        duration: 1500,
      });
    },
    onSuccess: () => {
      toast.success("Product added successfully", {
        duration: 1500,
      });
    },
  });
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    mutate({
      ...values,
      colors: colors.map((color) => color.value),
      sizes: sizes.map((size) => size.value),
      images: [],
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FileUploader />

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
