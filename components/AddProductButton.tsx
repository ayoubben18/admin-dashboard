import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import ProductForm from "./smaller-components/ProductForm";

const AddProductButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            The allowed number of images is set to 5 at the moment for
            developement purposes.
          </DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
