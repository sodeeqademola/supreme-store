"use client";
import React, { useState } from "react";

import { Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";
import LatestProductCard from "./LatestProductCard";

export const categories = [
  { key: "phone", label: "Phone" },
  { key: "laptop", label: "Laptop" },
  { key: "desktop", label: "Desktop" },
  { key: "watch", label: "Watch" },
  { key: "tv", label: "TV" },
  { key: "accessories", label: "Accessories" },
];

type PropductsProps = {
  products: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAT: Date;
    description: string;
    price: number;
    quantity: number | null;
    brand: string;
    category: string;
    inStock: boolean;
    images: {
      color: string;
      colorCode: string | null;
      image: string;
    }[];
  }[];
};
const Category = ({ products }: PropductsProps) => {
  const [value, setValue] = useState("laptop");

  return (
    <motion.div
      className="w-[90%] mx-auto my-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      {" "}
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Select
          className="max-w-xs"
          label="Categories"
          placeholder="Select categories of electronics"
          selectedKeys={value}
          variant="bordered"
          onSelectionChange={(e) => setValue(e.currentKey as string)}
        >
          {categories.map((category) => (
            <SelectItem key={category.key}>{category.label}</SelectItem>
          ))}
        </Select>
        <p className="text-default-500 text-small">Selected: {value}</p>
      </div>
      <div className="flex justify-center gap-3 items-center flex-wrap">
        {products.length > 0 ? (
          products
            .filter((item) => item.category === value)
            .map((products, index: number) => {
              return <LatestProductCard key={index} products={products} />;
            })
        ) : (
          <h1 className="grid place-content-center h-screen text-3xl font-bold">
            There is no latest Product now
          </h1>
        )}
      </div>
    </motion.div>
  );
};

export default Category;
