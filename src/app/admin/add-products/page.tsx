import AddProductForm from "@/components/AddProductForm";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add_Products",
};

const page = async () => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  if (currentUser) {
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return (
        <div className="grid place-content-center h-screen">
          <h1 className="font-semibold text-lg">Oops! Access Denied</h1>
        </div>
      );
    }

    return (
      <div className="">
        <AddProductForm />
      </div>
    );
  }
};

export default page;
