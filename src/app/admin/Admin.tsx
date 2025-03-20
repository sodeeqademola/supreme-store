"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { FaDollarSign } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa6";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type statsProps = {
  totalAmount: number;
  totalOrder: number;
  totalProducts: number;
  totalUsers: number;
  response: {
    amount: number;
    date: string;
  }[];
};

const Admin = ({
  totalAmount,
  totalOrder,
  totalProducts,
  totalUsers,
  response,
}: statsProps) => {
  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <Card className="p-4">
        <h1 className="text-center font-bold text-lg my-3">STATS</h1>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-3">
          <Card className="p-3 flex flex-row items-center  justify-between">
            <div>
              <h1 className="font-bold text-medium">Total Revenue</h1>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalAmount)}
              </p>
            </div>
            <div>
              <FaDollarSign size={20} className="text-[#249ea7]" />
            </div>
          </Card>
          <Card className="p-3 flex flex-row items-center  justify-between">
            <div>
              <h1 className="font-bold text-medium">Total Orders</h1>
              <p>{totalOrder}</p>
            </div>
            <div>
              <FaBookmark size={20} className="text-[#249ea7]" />
            </div>
          </Card>
          <Card className="p-3 flex flex-row items-center  justify-between">
            <div>
              <h1 className="font-bold text-medium">Total Products</h1>
              <p>{totalProducts}</p>
            </div>
            <div>
              <AiOutlineProduct size={20} className="text-[#249ea7]" />
            </div>
          </Card>
          <Card className="p-3 flex flex-row items-center  justify-between">
            <div>
              <h1 className="font-bold text-medium">Total Users</h1>
              <p>{totalUsers}</p>
            </div>
            <div>
              <FaUser size={20} className="text-[#249ea7]" />
            </div>
          </Card>
        </div>

        <Card className="p-3 my-3">
          <h1 className="text-center font-bold text-lg my-3">Transactions</h1>
          <p className=" font-medium text-medium">
            Recent transactions from your store
          </p>
          <div className="my-2">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={response}>
                {/* <CartesianGrid strokeDasharray="3 3" />  */}
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#249ea7"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Card>
    </motion.div>
  );
};

export default Admin;
