"use server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/utils/cloudinary";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export const checkOut = async (
  totlaPrice: number,
  cart: {
    id: string;
    imageUrl: string;
    imageIndex: number;
    name: string;
    quantity: number;
    price: number;
    color: string;
  }[]
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const orderExist = await prisma.order.findFirst({
    where: {
      userId: user?.id as string,
    },
  });

  const totalPrice = Math.floor(totlaPrice);
  let currentIntent;

  if (orderExist?.paymentIntentId) {
    currentIntent = await stripe.paymentIntents.retrieve(
      orderExist?.paymentIntentId as string
    );
  }
  if (orderExist?.paymentIntentId && currentIntent?.status !== "succeeded") {
    //update intent and order

    //update intent
    const updateIntent = await stripe.paymentIntents.update(
      orderExist.paymentIntentId as string,
      {
        amount: totalPrice * 100,
        currency: "usd",
      }
    );

    //update order
    await prisma.order.update({
      where: {
        paymentIntentId: orderExist?.paymentIntentId,
      },
      data: {
        amount: totalPrice,
        products: cart,
      },
    });

    return { ...updateIntent };

    //update order
  } else {
    //create intent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //create order
    await prisma.order.create({
      data: {
        amount: totlaPrice,
        currency: "usd",
        paymentIntentId: paymentIntent.id,
        status: "pending",
        deliveryStatus: "pending",
        products: cart,
        userId: user.id,
      },
    });

    return { ...paymentIntent };
  }
};

export const updateOrderStatus = async (paymentIntentId: string) => {
  await prisma.order.update({
    where: {
      paymentIntentId,
    },
    data: {
      status: "completed",
    },
  });
};

export const updateAddress = async (
  city: string,
  country: string,
  line1: string,
  line2: string,
  id: string
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  await prisma.order.update({
    where: {
      userId: user.id as string,
      paymentIntentId: id,
    },
    data: {
      address: {
        city,
        country,
        line1,
        line2,
      },
    },
  });
};

export const handleDelete = async (publicId: string) => {
  const response = await await cloudinary.uploader.destroy(publicId);

  return response;
};

export const getUserDetails = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    return currentUser;
  }
};

export const createProduct = async (
  name: string,
  description: string,
  price: string,
  brand: string,
  category: string,
  inStock: boolean,
  images: {
    color: string;
    image: string;
  }[]
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are nit admin");
  } else {
    await prisma.products.create({
      data: {
        name,
        description,
        brand,
        category,
        inStock,
        images,
        price: parseFloat(price),
      },
    });
    return {
      success: "true",
    };
  }
};

export const getProductsForAdmin = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are not authorized");
  } else {
    const products = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  }
};

export const deleteProduct = async (id: string) => {
  await prisma.products.delete({
    where: {
      id,
    },
  });

  return { success: "true" };
};

export const updateProduct = async (
  name: string,
  description: string,
  price: string,
  brand: string,
  category: string,
  inStock: boolean,
  images: { color: string; image: string }[],
  id: string
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are not admin");
  } else {
    await prisma.products.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        brand,
        category,
        inStock,
        images,
        price: parseFloat(price),
      },
    });
    return {
      success: "true",
    };
  }
};

export const handleDispatched = async (id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("!Oops Denied");
  } else {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        deliveryStatus: "OnDispatched",
      },
    });
    revalidatePath("/admin/manage-orders", "layout");
    return {
      success: "true",
    };
  }
};

export const handleDelivered = async (id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("!Oops Denied");
  } else {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        deliveryStatus: "delivered",
      },
    });
    revalidatePath("/admin/manage-orders", "layout");
    return {
      success: "true",
    };
  }
};

export const addReview = async (
  comment: string,
  rating: number | null,
  productId: string
) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();
  if (currentUser) {
    await prisma.review.create({
      data: {
        comment,
        rating: rating as number,
        userId: currentUser.id,
        productId,
      },
    });

    revalidatePath(`/productDetails/${productId}`);
    return {
      success: "true" as string,
    };
  }
};
