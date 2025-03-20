"use client";
import React from "react";
import { motion } from "framer-motion";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Image from "next/image";

type OrderProps = {
  orders: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    currency: string;
    status: string;
    deliveryStatus: string | null;
    paymentIntentId: string;
    userId: string | null;
    products:
      | {
          color: string;
          id: string;
          imageIndex: number;
          imageUrl: string;
          name: string;
          price: number;
          quantity: number;
        }[]
      | undefined;
    address:
      | {
          city: string;
          country: string;
          line1: string;
          line2: string;
        }
      | null
      | undefined;
  } | null;
};

const OrderDetails = ({ orders }: OrderProps) => {
  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <h1 className="font-bold text-xl mb-3">Order Details</h1>

      <p>Order Id : {orders?.id}</p>
      <p>
        Total Amount :{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(orders?.amount as number)}
      </p>
      <p className="mt-1">
        Payment Status :{" "}
        {orders?.status === "pending" && (
          <span className="bg-red-700 p-1 rounded-lg text-white">pending</span>
        )}{" "}
        {orders?.status === "completed" && (
          <span className="bg-green-700 p-1 rounded-lg text-white">
            completed
          </span>
        )}{" "}
      </p>
      <p className="my-2">
        Delivery Status :{" "}
        {orders?.deliveryStatus === "pending" && (
          <span className="bg-red-700 p-1 rounded-lg text-white">pending</span>
        )}{" "}
        {orders?.deliveryStatus === "completed" && (
          <span className="bg-green-700 p-1 rounded-lg text-white">
            completed
          </span>
        )}{" "}
        {orders?.deliveryStatus === "OnDispatched" && (
          <span className="bg-yellow-700 p-1 rounded-lg text-white">
            OnDispatched
          </span>
        )}{" "}
      </p>
      <p>Date : {moment(orders?.createdAt).fromNow()}</p>

      {orders?.address?.city &&
        orders.address.line1 &&
        orders.address.country && (
          <p>
            {" "}
            Address :{" "}
            {`${orders?.address?.line1} , ${orders?.address?.city}, ${orders?.address?.country}`}{" "}
          </p>
        )}

      <h1 className="mt-4 mb-2 font-bold text-xl">Product Ordered</h1>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>

          <TableColumn>PRICE</TableColumn>
          <TableColumn>QUANTITY</TableColumn>
          <TableColumn>TOTAL</TableColumn>
        </TableHeader>
        <TableBody>
          <>
            {" "}
            {orders?.products?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="flex justify-start items-center gap-2">
                    <Image
                      src={item.imageUrl}
                      alt="product image"
                      width={40}
                      height={100}
                      priority
                      quality={98}
                    />{" "}
                    <div className="flex flex-col justify-start items-start">
                      <span className="line-clamp-1">{item.name}</span>{" "}
                      <span>{item.color}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="font-bold tracking-wider">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(orders.amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default OrderDetails;
