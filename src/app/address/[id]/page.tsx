import AddressForm from "@/components/AddressForm";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return <AddressForm id={id} />;
};

export default page;
