import OrderDetails from "@/components/OrderDetails";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Order_Details",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const orders = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return (
    <div>
      <OrderDetails orders={orders} />
    </div>
  );
};

export default page;
