"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Checkbox, Input, Textarea, Tooltip } from "@heroui/react";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaDesktop, FaLaptop, FaTv } from "react-icons/fa";
import { IoWatch } from "react-icons/io5";
import { SiEngadget } from "react-icons/si";
import ImageUploader from "./ImageUpload";
import toast from "react-hot-toast";
import type { Selection } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/Action/paymentIntent";

// colors array
export const colors = [
  { key: "black", label: "Black" },
  { key: "silver", label: "Silver" },
  { key: "white", label: "White" },
  { key: "grey", label: "Grey" },
  { key: "red", label: "Red" },
  { key: "gold", label: "Gold" },
  { key: "blue", label: "Blue" },
  { key: "graphite", label: "graphite" },
];

// cloudinary arrays
interface cloudinaryResponse {
  asset_id: string;
  public_id: string;
  secure_url: string;
}

// zod for formschema
const formSchema = z.object({
  name: z.string().min(3),
  price: z.string().refine((value) => Number(value)),
  brand: z.string().min(3),
  description: z.string().min(3),
  inStock: z.boolean().optional(),
});

//formshematype
type formShematype = z.infer<typeof formSchema>;

const AddProductForm = () => {
  const [uploadedImages, setUploadedImage] = useState<cloudinaryResponse[]>([]);

  const [category, setCategory] = useState<string | null>(null);

  const [color, setColor] = React.useState<Selection>(new Set([]));

  const [loading, setLoading] = useState<boolean>(false);

  const imageUrl: string[] = [];

  useEffect(() => {
    uploadedImages.map((url) => {
      imageUrl.push(url.secure_url);
    });
  }, [color]);

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm<formShematype>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmitForm = async (value: formShematype) => {
    setLoading(true);
    try {
      //destructuring
      const { brand, description, name, price, inStock } = value;
      const colors = Array.from(color);
      const images = colors.map((color, index) => {
        return {
          color: color as string,
          image: imageUrl[index],
        };
      });

      if (colors.length !== imageUrl.length) {
        toast.error("Number of images and colors are not the same");
      } else {
        const response = await createProduct(
          name,
          description,
          price,
          brand,
          category as string,
          inStock as boolean,
          images
        );
        if (response.success === "true") {
          toast.success("Product created successfully");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error when adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="
      flex flex-col justify-center items-center mx-auto gap-3"
      >
        <Input
          type="text"
          label="Name"
          {...register("name")}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
        />
        <Input
          type="text"
          label="Price"
          {...register("price")}
          errorMessage={errors.price?.message}
          isInvalid={!!errors.price}
        />
        <Input
          type="text"
          label="Brand"
          {...register("brand")}
          errorMessage={errors.brand?.message}
          isInvalid={!!errors.brand}
        />
        <Textarea
          label="Description"
          type="text"
          {...register("description")}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
        />

        <Checkbox
          color="default"
          className="self-start"
          {...register("inStock")}
          isInvalid={!!errors.inStock}
        >
          The product is inStock
        </Checkbox>

        <p className="text-red-600">
          {" "}
          {errors.inStock && errors.inStock.message}{" "}
        </p>

        {/* select category fro the products */}

        <h1 className="self-start font-bold text-lg">Select a Category</h1>

        <div className="grid grid-cols-3 gap-4">
          <Tooltip content="Phone">
            <Button
              type="button"
              className="flex justify-center items-center"
              onPress={() => setCategory("phone")}
            >
              <HiOutlineDevicePhoneMobile size={18} />
              <h1>Phone</h1>
            </Button>
          </Tooltip>
          <Tooltip content="Laptop">
            <Button
              type="button"
              className="flex justify-center items-center"
              onPress={() => setCategory("laptop")}
            >
              <FaLaptop size={18} />
              <h1>Laptop</h1>
            </Button>
          </Tooltip>
          <Tooltip content="Desktop">
            <Button
              type="button"
              className="flex justify-center items-center"
              onPress={() => setCategory("desktop")}
            >
              <FaDesktop size={18} />
              <h1>Desktop</h1>
            </Button>
          </Tooltip>
          <Tooltip content="Watch">
            <Button
              type="button"
              className="flex justify-center items-center"
              onPress={() => setCategory("watch")}
            >
              <IoWatch size={18} />
              <h1>Watch</h1>
            </Button>
          </Tooltip>
          <Tooltip content="Tv">
            <Button
              type="button"
              className="flex justify-center items-center"
              onPress={() => setCategory("tv")}
            >
              <FaTv size={18} />
              <h1>Tv</h1>
            </Button>
          </Tooltip>
          <Tooltip content="Accessories">
            <Button
              type="button"
              className="flex justify-center items-center"
              onPress={() => setCategory("accessories")}
            >
              <SiEngadget size={18} />
              <h1>Accessories</h1>
            </Button>
          </Tooltip>
        </div>

        {/* seleot images for the products */}

        <div className="my-4">
          <ImageUploader
            uploadedImages={uploadedImages}
            setUploadedImage={setUploadedImage}
          />
        </div>

        {/* select colors for the products */}

        <div>
          <h1>Select the available product colors and upload their images</h1>
          <h3 className="text-sm font-light mt-1">
            You must upload an image for each of the color selected otherwise
            your color selction will be ignored.
          </h3>
        </div>

        {/* select your favourite color */}

        <div className="flex w-full max-w-xs flex-col gap-2">
          <Select
            className="max-w-xs"
            label="Product Colors"
            placeholder="Select a color for the product"
            selectedKeys={color}
            selectionMode="multiple"
            onSelectionChange={setColor}
          >
            {colors.map((color) => (
              <SelectItem key={color.key}>{color.label}</SelectItem>
            ))}
          </Select>
        </div>
        {loading ? (
          <Button
            type="submit"
            className="bg-[#249ea7] text-white w-full mt-3"
            disabled={loading}
          >
            Processing...
          </Button>
        ) : (
          <Button type="submit" className="bg-[#249ea7] text-white w-full mt-3">
            Add Product
          </Button>
        )}
      </form>
    </motion.div>
  );
};

export default AddProductForm;
