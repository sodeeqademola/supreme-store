"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "./Provider";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const CartForm = () => {
  const cart = useContext(CartContext);

  const totlaPrice = cart?.cart.reduce((acc, item) => {
    return item.price * item.quantity + acc;
  }, 0);

  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <div className="flex flex-col justify-center items-stretch gap-4">
        {cart && cart?.cart?.length > 0 ? (
          cart.cart.map((item, index) => {
            return (
              <div key={index} className="flex justify-between items-start">
                <div className="flex justify-start items-start gap-4">
                  <div>
                    <Image
                      src={item.imageUrl}
                      alt="itemImage"
                      height={80}
                      width={100}
                      quality={100}
                      priority
                      className=" sm:w-36 h-[100px] w-20 rounded-md"
                    />
                  </div>
                  <div className="mx-1 text-[15px]">
                    <h1>{item.name.substring(0, 20)}.....</h1>
                    <h1>{item.color}</h1>
                    <h1>
                      {new Intl.NumberFormat("en-US", {
                        currency: "USD",
                        style: "currency",
                      }).format(item.price * item.quantity)}
                    </h1>
                    <Button
                      onPress={() => cart.removeFromCart(item.id)}
                      color="danger"
                      className="h-6"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 ">
                  <Button
                    className="h-7 w-1 bg-[#249ea7] text-white"
                    onPress={() => cart.increaseQuantity(item.id)}
                  >
                    +
                  </Button>
                  <Button className="h-7 w-1">{item.quantity}</Button>
                  <Button
                    color="danger"
                    onPress={() =>
                      cart.decreaseQuantity(item.id, item.quantity)
                    }
                    className="h-7 w-1"
                  >
                    -
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="grid place-content-center h-screen  ">
            <h1 className="text-center text-xl font-bold mb-2">
              No Item in Cart
            </h1>
            <Link href={"/"}>
              <Button size="lg" className="bg-[#249ea7] text-white">
                Continue Shopping <FaArrowRight />{" "}
              </Button>
            </Link>
          </div>
        )}
      </div>
      {cart && cart?.cart.length > 0 && (
        <div className="flex justify-between mt-4 items-end ">
          <Button onPress={() => cart?.clearAllCarts()} color="danger">
            Clear Cart
          </Button>
          <div className="flex flex-col justify-start items-start gap-2">
            <span>
              Total :{" "}
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
              }).format(totlaPrice as number)}
            </span>
            <Link href={"/checkout"}>
              <Button size="md" className="text-white bg-[#249ea7] w-48 ">
                Check Out
              </Button>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartForm;
