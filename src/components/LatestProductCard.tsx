"use client";
import { Card, CardBody, CardFooter } from "@heroui/react";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// type ProductsProps = {
//   products: {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     brand: string;
//     category: string;
//     inStock: boolean;
//     quantity: number;
//     images: {
//       color: string;
//       colorCode: string;
//       image: string;
//     }[];
//     reviews: {
//       id: string;
//       userId: string;
//       productId: string;
//       rating: number;
//       comment: string;
//       createdDate: string;
//       user: {
//         id: string;
//         name: string;
//         email: string;
//         emailVerified: null;
//         image: string;
//         hashedPassword: null;
//         createdAt: string;
//         updatedAt: string;
//         role: string;
//       };
//     }[];
//   };
// };

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
  };
};
const LatestProductCard = ({ products }: PropductsProps) => {
  // const rating =
  //   products.reviews.reduce((acc, product) => {
  //     return product.rating + acc;
  //   }, 0) / products?.reviews?.length;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="mt-2"
    >
      <Link href={`productDetails/${products.id}`}>
        <Card className="w-44 cursor-pointer">
          <CardBody className="h-40">
            <Image
              src={products?.images[0]?.image}
              alt="gadget"
              height={70}
              width={100}
              className="w-full h-10 rounded grow"
            />
          </CardBody>
          <CardFooter className="flex flex-col my-1">
            <div className="flex justify-between items-center w-full">
              <h1 className="mr-4 line-clamp-1">{products.name}</h1>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(products.price)}
              </p>
            </div>
            {/* <div className="text-small">
                <Rating name="read-only" size="small" value={rating} readOnly />
              </div> */}
            <div>
              <h1 className="line-clamp-1 text-small font-normal">
                {products.description}
              </h1>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default LatestProductCard;
