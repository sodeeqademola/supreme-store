"use client";
import { HeroUIProvider } from "@heroui/react";
import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import toast from "react-hot-toast";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

type ProductsProps = {
  id: string;
  imageUrl: string;
  imageIndex: number;
  name: string;
  quantity: number;
  price: number;
  color: string;
};

type CartContextType = {
  cart: ProductsProps[];
  addToCart: (
    id: string,
    imageUrl: string,
    imageIndex: number,
    name: string,
    quantity: number,
    price: number,
    color: string
  ) => void;

  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearAllCarts: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ProductsProps[]>([]);

  //add to cart
  const addToCart = (
    id: string,
    imageUrl: string,
    imageIndex: number,
    name: string,
    quantity: number,
    price: number,
    color: string
  ) => {
    const productItems = {
      id,
      imageIndex,
      imageUrl,
      quantity,
      name,
      price,
      color,
    };

    const presentInCart = cart.find((item) => {
      return item.id === id;
    });

    if (presentInCart) {
      toast.success("Item already added to cart");
    } else {
      toast.success("Item Added to Cart");
      setCart([...cart, productItems]);
      localStorage.setItem("item", JSON.stringify([...cart, productItems]));
    }
  };

  //increase quantities
  const increaseQuantity = (id: string) => {
    const itemIndex = cart.findIndex((item) => {
      return item.id === id;
    });

    cart[itemIndex].quantity++;
    setCart([...cart]);
    localStorage.setItem("item", JSON.stringify([...cart]));
  };

  //decrese quantity
  const decreaseQuantity = (id: string, quantity: number) => {
    const itemIndex = cart.findIndex((item) => {
      return item.id === id;
    });

    if (quantity > 1) {
      cart[itemIndex].quantity--;
      setCart([...cart]);
      localStorage.setItem("item", JSON.stringify([...cart]));
    }
  };

  //remove from cart
  const removeFromCart = (id: string) => {
    const itemsLeft = cart.filter((item) => {
      return item.id !== id;
    });

    toast.success("item removed successfully");
    localStorage.setItem("item", JSON.stringify([...itemsLeft]));
    setCart([...itemsLeft]);
  };

  //clear all carts
  const clearAllCarts = () => {
    setCart([]);
    localStorage.removeItem("item");
  };

  //persist it to page

  useEffect(() => {
    const persistedItem = localStorage.getItem("item");
    if (persistedItem) {
      setCart(JSON.parse(persistedItem));
    }
  }, []);

  return (
    <HeroUIProvider>
      <NextThemesProvider>
        <CartContext.Provider
          value={{
            cart,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearAllCarts,
          }}
        >
          <KindeProvider>{children} </KindeProvider>
        </CartContext.Provider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default Provider;
