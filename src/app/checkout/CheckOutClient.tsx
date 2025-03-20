"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { checkOut } from "@/Action/paymentIntent";
import { CartContext } from "@/components/Provider";
import { Button, Card } from "@heroui/react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/components/CheckOutForm";
import Link from "next/link";

type Cart = {
  id: string;
  imageUrl: string;
  imageIndex: number;
  name: string;
  quantity: number;

  price: number;
  color: string;
}[];

const stripePromise = loadStripe(
  "pk_test_51QuylbGa3atNpcOInEWekN6wuAnOvPSEFgGSBUsupblS3iH3u6X70rNlyX748QtvPsfWc31RJYUG58x4cMTt77RB00N4M0fgBm"
);

const CheckOutClient = () => {
  const cart = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  //total price

  let totlaPrice = cart?.cart.reduce((acc, item) => {
    return item.price * item.quantity + acc;
  }, 0);

  totlaPrice = Math.floor(totlaPrice as number);

  useEffect(() => {
    const getIntent = async () => {
      setLoading(true);
      try {
        const intents = await checkOut(
          totlaPrice as number,
          cart?.cart as Cart
        );

        setPaymentIntentId(intents?.id as string);
        setClientSecret(intents?.client_secret as string);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getIntent();
  }, [totlaPrice, cart?.cart]);

  const option: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <div>
        <Card className="grid place-content-center h-scren py-4">
          {clientSecret && !paymentSuccess && (
            <Elements options={option} stripe={stripePromise}>
              <CheckOutForm
                clientSecret={clientSecret}
                handleSetPaymentSuccess={handleSetPaymentSuccess}
                paymentIntentId={paymentIntentId}
              />
            </Elements>
          )}
          {loading && <div className="text-center">Loading Checkout....</div>}

          {paymentSuccess && (
            <div className="flex items-center flex-col gap-4">
              <div className="">Payment successful</div>
              <div className="max-w-[220px] w-fu">
                <Link href={`/address/${paymentIntentId}`}>
                  <Button className="bg-[#249ea7] text-white">
                    Fill in the Delivery Address
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default CheckOutClient;
