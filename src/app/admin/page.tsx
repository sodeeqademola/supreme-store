import React from "react";
import Admin from "./Admin";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const [orders, products, users] = await Promise.all([
    prisma.order.findMany({}),
    prisma.products.findMany({}),
    prisma.user.findMany({}),
  ]);

  const totalOrders = orders.length;

  const totalProducts = products.length;

  const totalUsers = users.length;

  const totalAmount = orders.reduce((acc, item) => {
    return item.amount + acc;
  }, 0);

  const todayDate = new Date().getDate();

  const sevenDaysAgoDate = todayDate - 30;

  const sevenDaysAgoFullDate = new Date(new Date().setDate(sevenDaysAgoDate));

  const request = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgoFullDate,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
  });

  const response = request.map((item) => {
    return {
      amount: item.amount,
      date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    };
  });

  return (
    <div>
      <Admin
        totalAmount={totalAmount}
        totalOrder={totalOrders}
        totalProducts={totalProducts}
        totalUsers={totalUsers}
        response={response}
      />
    </div>
  );
};

export default page;
