"use client";
import React from "react";
import LatestProductCard from "./LatestProductCard";
import { motion } from "framer-motion";
// import { Products } from "./Products";

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

const LatestProduct = ({ products }: PropductsProps) => {
  return (
    <motion.div
      className="w-[90%] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      {" "}
      <div className="text-3xl tracking-[5px] text-center">
        <span className="text-[#249ea7] text-5xl font-semibold">O</span>ur{" "}
        <span className="text-[#249ea7] text-5xl font-semibold">L</span>atest{" "}
        <span className="text-[#249ea7] text-5xl font-semibold">P</span>roduct
      </div>
      <div className="flex justify-center gap-3 items-center flex-wrap">
        {products.length > 0 ? (
          products.slice(-6).map((products, index: number) => {
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

export default LatestProduct;
