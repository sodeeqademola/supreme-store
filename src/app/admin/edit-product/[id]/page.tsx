import EditProductForm from "@/components/EditProductForm";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit_Products",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();
  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });

  const id = (await params).id;

  const editedProduct = await prisma.products.findUnique({
    where: {
      id,
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
      <EditProductForm editedProduct={editedProduct} />
    </div>
  );
};

export default page;
