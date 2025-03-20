import CartForm from "@/components/CartForm";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

const page = () => {
  return (
    <div>
      <CartForm />
    </div>
  );
};

export default page;
