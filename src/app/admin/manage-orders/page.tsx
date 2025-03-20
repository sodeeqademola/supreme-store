import OrderProductForm from "@/components/OrderProductForm";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Manage_Products",
};

const page = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <OrderProductForm
        order={orders.map((item) => {
          return {
            paymentStatus: item.status,
            deliveryStatus: item.deliveryStatus,
            id: item.id,
            amount: item.amount,
            createdAt: item.createdAt,
            product: item.products.map((item) => {
              return { name: item.name, price: item.price };
            }),
          };
        })}
      />
    </div>
  );
};

export default page;
