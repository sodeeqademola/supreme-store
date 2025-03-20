"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { motion } from "framer-motion";
import { MdOutlineElectricBike, MdPending } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { handleDelivered, handleDispatched } from "@/Action/paymentIntent";
import toast from "react-hot-toast";
import { GiStorkDelivery } from "react-icons/gi";
import Link from "next/link";

type OrderProps = {
  order: {
    paymentStatus: string;
    deliveryStatus: string | null;
    createdAt: Date;
    id: string;
    amount: number;
    product: {
      name: string;
      price: number;
    }[];
  }[];
};

const OrderProductForm = ({ order }: OrderProps) => {
  // handleDispatched
  const handleDispatch = async (id: string) => {
    try {
      const response = await handleDispatched(id);
      if (response.success === "true") {
        toast.success("Order on dispatched");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while dispatching order");
    }
  };

  // handledelivery
  const handleDelivery = async (id: string) => {
    try {
      const response = await handleDelivered(id);
      if (response.success === "true") {
        toast.success("Order delivered successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while delivering product");
    }
  };

  //return
  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>CUSTOMER ID</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>PAYMENT STATUS</TableColumn>
          <TableColumn>DELIVERY STATUS</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {order.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="line-clamp-1">{item.id}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(item.amount))}
                </TableCell>
                <TableCell>
                  {item.paymentStatus === "pending" ? (
                    <span className="flex justify-start items-center gap-1 bg-red-700 rounded-md p-1.5 w-fit text-white">
                      <span> pending </span> <MdPending />
                    </span>
                  ) : (
                    <span className="flex justify-start items-center gap-1 bg-green-700 rounded-md p-1.5 w-fit text-white">
                      <span> completed </span> <IoCheckmarkDoneSharp />
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item.deliveryStatus === "pending" && (
                    <span className="flex justify-start items-center gap-1 bg-red-700 rounded-md p-1.5 w-fit text-white">
                      <span> pending </span> <MdPending />
                    </span>
                  )}
                  {item.deliveryStatus === "OnDispatched" && (
                    <span className="flex justify-start items-center gap-1 bg-yellow-700 rounded-md p-1.5 w-fit text-white">
                      <span> OnDispatched </span> <MdOutlineElectricBike />
                    </span>
                  )}
                  {item.deliveryStatus === "delivered" && (
                    <span className="flex justify-start items-center gap-1 bg-green-700 rounded-md p-1.5 w-fit text-white">
                      <span> Delivered </span> <GiStorkDelivery />
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                </TableCell>
                <TableCell className="flex justify-start items-baseline gap-2 mt-2">
                  <LuRefreshCw
                    size={15}
                    className="cursor-pointer "
                    onClick={() => handleDispatch(item.id)}
                  />

                  <IoCheckmark
                    size={15}
                    className="cursor-pointer"
                    onClick={() => handleDelivery(item.id)}
                  />
                  <Link href={`/admin/orderDetails/${item.id}`}>
                    <GrView size={15} className="cursor-pointer" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default OrderProductForm;
