import Order from "@/components/Order";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Order",
};
const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const order = await prisma.order.findMany({
      where: {
        userId: currentUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return (
      <div>
        <Order order={order} currentUser={currentUser} />
      </div>
    );
  }
};

export default page;
