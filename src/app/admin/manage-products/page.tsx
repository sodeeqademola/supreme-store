import ManageProductForm from "@/components/ManageProductForm";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Manage_Products",
};

const page = async () => {
  return (
    <div>
      <ManageProductForm />
    </div>
  );
};

export default page;
