import React from "react";
import type { Metadata } from "next";

import CheckOutClient from "./CheckOutClient";

export const metadata: Metadata = {
  title: "CheckOut",
};

const page = () => {
  return (
    <div>
      <CheckOutClient />
    </div>
  );
};

export default page;
