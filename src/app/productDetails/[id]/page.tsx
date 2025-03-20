import ProductDetailsCard from "@/components/ProductDetailsCard";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Product_Details",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const productDetails = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      review: {
        include: {
          User: true,
        },
      },
    },
  });

  return (
    <div>
      {" "}
      <ProductDetailsCard products={productDetails} />{" "}
    </div>
  );
};

export default page;
