"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input } from "@heroui/react";
import { updateAddress } from "@/Action/paymentIntent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// formschematype
type formSchemaType = {
  city: string;
  country: string;
  line1: string;
  line2: string;
};

const AddressForm = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const formSchema = z.object({
    city: z.string().min(1, { message: "It is required" }),
    country: z.string().min(1, { message: "It is required" }),
    line1: z.string().min(1, { message: "It is required" }),
    line2: z.string().min(1, { message: "It is required" }),
  });

  //router
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  // handle submit
  const handleSubmitForm = async (value: formSchemaType) => {
    setLoading(true);
    try {
      const { city, country, line1, line2 } = value;
      await updateAddress(city, country, line1, line2, id);
      toast.success("Address submitted successfully");
      router.push("/order");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <form
        className="w-[80%] mx-auto"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="flex flex-col gap-4 justify-center items-center mx-auto">
          <Input
            type="text"
            label="city"
            {...register("city")}
            isInvalid={!!errors.city}
            errorMessage={errors.city?.message}
          />
          <Input
            type="text"
            label="country"
            {...register("country")}
            isInvalid={!!errors.country}
            errorMessage={errors.country?.message}
          />
          <Input
            type="text"
            label="line1"
            {...register("line1")}
            isInvalid={!!errors.line1}
            errorMessage={errors.line1?.message}
          />
          <Input
            type="text"
            label="line2"
            errorMessage={errors.line2?.message}
            isInvalid={!!errors.line2}
            {...register("line2")}
          />
          {loading ? (
            <Button
              className="bg-[#249ea7] text-white w-full h-12 cursor-not-allowed"
              type="submit"
            >
              Processing ...
            </Button>
          ) : (
            <Button
              className="bg-[#249ea7] text-white w-full h-12"
              type="submit"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default AddressForm;
