"use client";
import AdminHeader from "@/components/AdminHeader";
import React from "react";
import { motion } from "framer-motion";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <AdminHeader />
      {children}
    </motion.div>
  );
};

export default layout;
