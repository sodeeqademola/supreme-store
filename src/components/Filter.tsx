"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import LatestProductCard from "./LatestProductCard";

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

const Filter = ({ products }: PropductsProps) => {
  const defaultFilter = products.filter((item) => {
    return item.price <= 1000;
  });
  const [product, setProduct] = useState(defaultFilter);

  const getPrice = (value1: number, value2: number) => {
    const getProduct = products.filter((item) => {
      return item.price >= value1 && item.price <= value2;
    });
    setProduct(getProduct);
  };

  return (
    <motion.div
      className="w-[90%] mx-auto "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <div>
        <Card>
          <CardHeader className="text-[#249ea7] text-2xl font-bold">
            Price
          </CardHeader>
          <div className="flex flex-row items-start gap-4 mb-3 pb-3">
            <div>
              <CardBody className="flex gap-2">
                <Button onPress={() => getPrice(0, 1000)}>$1000</Button>
                <Button onPress={() => getPrice(1000, 2000)}>
                  $1000 - $2000
                </Button>
                <Button onPress={() => getPrice(2000, 3000)}>
                  $2000 - $3000
                </Button>
                <Button onPress={() => getPrice(3000, 4000)}>
                  $3000 - $4000
                </Button>
                <Button onPress={() => getPrice(4000, 600000)}>
                  Over $4000
                </Button>
              </CardBody>
            </div>
            <div className="flex justify-start items-center flex-wrap gap-2 mr-4">
              {product.length > 0 ? (
                product.map((products, index: number) => {
                  return <LatestProductCard key={index} products={products} />;
                })
              ) : (
                <h1 className="grid place-content-center h-screen text-3xl font-bold">
                  There is no latest Product now
                </h1>
              )}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Filter;
