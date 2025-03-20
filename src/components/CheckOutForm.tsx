"use client";
import {
  //   AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./Provider";
import toast from "react-hot-toast";
import { Button, CardHeader } from "@heroui/react";
import { updateOrderStatus } from "@/Action/paymentIntent";

type CheckOUtFormProps = {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
  paymentIntentId: string;
};

const CheckOutForm = ({
  clientSecret,
  handleSetPaymentSuccess,
  paymentIntentId,
}: CheckOUtFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const cart = useContext(CartContext);

  const totlaPrice = cart?.cart.reduce((acc, item) => {
    return item.price * item.quantity + acc;
  }, 0);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [clientSecret, stripe]);

  const handleSUbmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const confirmPayment = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!confirmPayment.error) {
      toast.success("checkout successfully");
      cart?.clearAllCarts();
      handleSetPaymentSuccess(true);
      await updateOrderStatus(paymentIntentId);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSUbmit}>
        <div className="text-left">
          <CardHeader className="font-bold text-lg">
            Enter Your Details to Complete Checkout
          </CardHeader>

          {/* <h1 className="font-semibold text-sm my-2">Address Information</h1> */}

          {/* <AddressElement
            options={{
              mode: "shipping",
              allowedCountries: ["NGA", "US", "KE"],
            }}
          /> */}

          <h1 className="font-semibold text-sm my-3">Payment Information</h1>
          <PaymentElement
            id="payment-element"
            options={{
              layout: "tabs",
            }}
          />

          <div className="text-center text-xl font-bold mb-2">
            {" "}
            Total :{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totlaPrice as number)}
          </div>
        </div>
        {loading ? (
          <Button disabled className="w-full bg-[#249ea7] text-white ">
            Processing ...
          </Button>
        ) : (
          <Button type="submit" className="w-full bg-[#249ea7] text-white ">
            Pay Now
          </Button>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
