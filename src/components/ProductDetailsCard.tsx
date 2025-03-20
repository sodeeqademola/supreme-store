"use client";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import Image from "next/image";
import { Button, Textarea } from "@heroui/react";
import { CartContext } from "./Provider";
import moment from "moment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addReview } from "@/Action/paymentIntent";

import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

// type ProductsProps = {
//   products:
//     | {
//         id: string;
//         name: string;
//         description: string;
//         price: number;
//         brand: string;
//         category: string;
//         inStock: boolean;
//         quantity: number | null;
//         images:
//           | {
//               color: string;
//               colorCode: string | null;
//               image: string;
//             }[];
//         review:
//           | {
//               id: string;
//               userId: string;
//               productId: string;
//               rating: number;
//               comment: string;
//               createdDate: string;
//               user: {
//                 id: string;
//                 name: string;
//                 email: string;
//                 image: string;
//                 createdAt: string;
//                 updatedAt: string;
//                 role: string;
//               } | null;
//             }[]
//           | undefined;
//       }
//     | undefined
//     | null;
// };

type ProductsProps = {
  products: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    inStock: boolean;
    quantity: number | null;
    createdAt: Date;
    updatedAT: Date;
    images: {
      color: string;
      colorCode: string | null;
      image: string;
    }[];
    review:
      | {
          User: {
            name: string | null;
            id: string;
            email: string | null;
            image: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
          } | null;
          id: string;
          createdAt: Date;
          updatedAT: Date;
          userId: string | null;
          rating: number;
          comment: string;
          productId: string | null;
        }[]
      | undefined;
  } | null;
};

const ProductDetailsCard = ({ products }: ProductsProps) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    products?.images[0].image
  );
  const [ratingValue, setValue] = React.useState<number | null>(2);

  const rating = products?.review?.reduce((acc, product) => {
    return product.rating + acc;
  }, 0);

  const cart = useContext(CartContext);

  //formSchema
  const formSchema = z.object({
    comment: z.string().min(2, "There should be at least minimum of 2 letters"),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (value: formSchemaType) => {
    try {
      const rating = await addReview(
        value.comment,
        ratingValue,
        products?.id as string
      );

      if (rating?.success === "true") {
        toast.success("Review Submitted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="w-[90%] mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.5, ease: "easeIn" }}
    >
      <div>
        <div className="grid sm:grid-cols-2 gap-4 ">
          <div>
            <div>
              <Image
                src={imageUrl as string}
                alt="productImage"
                height={500}
                width={500}
                className="sm:h-96 mx-auto h-60 rounded-lg"
              />
            </div>
            <div className="flex justify-center mt-3 items-center gap-3 mb-3 ">
              {products?.images.map((image, index) => {
                return (
                  <Image
                    onClick={() => {
                      setImageIndex(index);
                      setImageUrl(image.image);
                    }}
                    key={index}
                    src={image?.image}
                    alt="productImage"
                    width={200}
                    height={500}
                    className="h-14 w-14 cursor-pointer rounded-sm"
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h1>{products?.name || "ade"}</h1>
            <div className="flex justify-start gap-2 items-center text-small">
              <span>
                {" "}
                <Rating
                  readOnly
                  value={
                    rating &&
                    products &&
                    rating / Number(products?.review?.length)
                  }
                  size="small"
                />{" "}
              </span>{" "}
              <span>{products?.review?.length} reviews </span>
            </div>
            <div className="text-justify text-small">
              <h1>{products?.description}</h1>
              <div className="mt-2">
                <span className="text-medium font-semibold">CATEGORY :</span>{" "}
                <span className="text-medium font-medium">
                  {" "}
                  {products?.category}{" "}
                </span>
              </div>
              <div>
                <span className="text-medium font-semibold">BRAND :</span>{" "}
                <span className="text-medium font-medium">
                  {" "}
                  {products?.brand}{" "}
                </span>
              </div>
              <div>
                <h1
                  className={`text-medium font-medium ${
                    products?.inStock ? "text-[#249ea7]" : "text-danger-400"
                  }`}
                >
                  {" "}
                  {products?.inStock ? "InStock" : "Out Of Stock"}
                </h1>
              </div>
              <div className="border-t-2 border-[#249ea7] mt-2">
                <span className="text-medium font-semibold"> quantity:</span>{" "}
                <span className="text-medium font-medium">
                  {" "}
                  {products?.quantity}{" "}
                </span>
              </div>
              <div>
                <span className="text-medium font-semibold"> color:</span>{" "}
                <span className="text-medium font-medium">
                  {" "}
                  <span> {products?.images[imageIndex].color} </span>
                  {/* <span
                  className={`h-3 w-9 border-2 border-[${
                    products?.images[imageIndex].colorCode as string
                  }] rounded-full`}
                ></span> */}
                </span>
              </div>
            </div>
            <Button
              className="mt-2 w-full bg-[#249ea7] text-medium font-semibold text-white"
              onPress={() =>
                cart?.addToCart(
                  products?.id as string,
                  imageUrl as string,
                  imageIndex,
                  products?.name as string,
                  products?.quantity as number,
                  products?.price as number,
                  products?.images[imageIndex].color as string
                )
              }
            >
              Add To Cart
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-lg font-bold tracking-wide">Product Reviews</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Textarea
              type="text"
              {...register("comment")}
              isInvalid={!!errors.comment}
              errorMessage={errors.comment?.message}
            />
            {/* <Rating> */}
            <Rating
              name="simple-controlled"
              value={ratingValue}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              className="mt-2 bg-white rounded-md p-1"
            />
            <br />

            <Button className="mt-2 bg-[#249ea7] text-white" type="submit">
              Submit
            </Button>
          </form>
          {products?.review?.map((item, index) => {
            return (
              <div key={index} className="my-4">
                {item.User?.image ? (
                  <Image
                    src={item.User?.image as string}
                    alt="user"
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                ) : (
                  <FaUserCircle
                    color="#249ea7"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                )}

                <span>
                  <h1 className="font-bold"> {item.User?.name} </h1>
                  <span>
                    {moment(item.User?.createdAt).fromNow()}
                  </span> <br />{" "}
                  <span>
                    <Rating readOnly value={item.rating} size="small" />
                  </span>{" "}
                  <br />
                  <span className="text-small">{item.comment}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsCard;
