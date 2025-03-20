"use client";
import { motion } from "framer-motion";
import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import moment from "moment";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

type OrderProps = {
  order: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    currency: string;
    status: string;
    deliveryStatus: string | null;
    paymentIntentId: string;
    userId: string | null;
    products: {
      color: string;
      id: string;
      imageIndex: number;
      imageUrl: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
    } | null;
  }[];
  currentUser: {
    name: string | null;
    id: string;
    email: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: string;
  } | null;
};

const Order = ({ order, currentUser }: OrderProps) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(order.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return order.slice(start, end);
  }, [page, order]);

  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <h1 className="font-bold text-xl text-center tracking-wider">Orders</h1>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="role">AMOUNT(USD)</TableColumn>
          <TableColumn key="status">PAYMENT STATUS</TableColumn>
          <TableColumn key="delivery">DELIVERY STATUS</TableColumn>
          <TableColumn key="date">DATE</TableColumn>
          <TableColumn key="action">ACTION</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {items.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{currentUser?.name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.amount)}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.deliveryStatus}</TableCell>
                <TableCell>{moment(item.createdAt).fromNow()}</TableCell>
                <TableCell>
                  <Link href={`/admin/orderDetails/${item.id}`}>
                    <FaEye
                      size={20}
                      className="cursor-pointer"
                      title="view order"
                    />
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

export default Order;
