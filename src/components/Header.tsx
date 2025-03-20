"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Badge } from "@heroui/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { CartContext } from "./Provider";
import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getUserDetails } from "@/Action/paymentIntent";
import queryString from "query-string";
import { useRouter } from "next/navigation";

type UserDetails = {
  email: string | null;
  id: string;
  image: string | null;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [presentUser, setPresentuser] = useState<UserDetails>({
    email: "",
    id: "",
    image: "",
    name: "",
    role: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const cart = useContext(CartContext);

  const { isAuthenticated } = useKindeBrowserClient();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const getDetails = async () => {
      const currentUser = await getUserDetails();
      setPresentuser(currentUser as UserDetails);
    };
    getDetails();
  }, []);

  //hanlde Search
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search) return router.push("/");
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: search,
        },
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeIn" }}
      className="fixed z-10 -mt-20 w-full"
    >
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link
              href={"/"}
              className="sm:flex justify-between items-center hidden"
            >
              <Image
                src="/supremelogo.png"
                alt="supreme logo"
                width={40}
                height={40}
                className="rounded-full mr-1"
              />
              <p className="font-bold italic text-[#249ea7] sm:text-xl text-[16px] hidden sm:flex">
                Supreme Store
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className=" sm:flex gap-4" justify="center">
          <NavbarItem className="flex items-center">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-r-none",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<IoIosSearch size={24} />}
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="bg-[#249ea7] text-white rounded-l-none"
              onPress={() => handleSearch()}
            >
              Search
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="flex items-center">
            <ThemeSwitcher />
            {/* user dropdown for login and signup */}
            <div className="items-center ml-2 mr-1 gap-4 hidden sm:flex">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  {user?.picture ? (
                    <Image
                      src={user?.picture}
                      height={100}
                      width={100}
                      priority
                      quality={96}
                      className="h-8 w-8 rounded-full cursor-pointer"
                      alt="picture"
                    />
                  ) : (
                    <span>
                      <FaUserCircle
                        color="#249ea7"
                        className="h-8 w-8 rounded-full cursor-pointer"
                      />
                    </span>
                  )}
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  {user?.email && (
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">
                        Signed in as : {user?.email as string}
                      </p>
                      <p className="font-semibold"></p>
                    </DropdownItem>
                  )}

                  <DropdownItem key="Order">
                    <Link className="font-bold text-medium " href={"/order"}>
                      {" "}
                      My Orders
                    </Link>
                  </DropdownItem>
                  {presentUser?.role === "ADMIN" && (
                    <DropdownItem key="admin">
                      <Link href={"/admin"} className="font-bold text-medium ">
                        {" "}
                        Admin Dashboard
                      </Link>
                    </DropdownItem>
                  )}

                  <DropdownItem key="Login">
                    {isAuthenticated ? (
                      <div className="bg-red-600 rounded-md p-1.5 text-white hover:bg-red-700">
                        <LogoutLink className="font-bold text-medium ">
                          LogOut
                        </LogoutLink>
                      </div>
                    ) : (
                      <LoginLink
                        className="font-bold text-medium"
                        postLoginRedirectURL="/api/creation"
                      >
                        Login
                      </LoginLink>
                    )}
                  </DropdownItem>

                  {!isAuthenticated && (
                    <DropdownItem key="SignUp">
                      <RegisterLink
                        className="font-bold text-medium"
                        postLoginRedirectURL="/api/creation"
                      >
                        Register
                      </RegisterLink>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <Link href="/cart">
              <Badge
                className="bg-[#249ea7] text-white rounded-full"
                content={cart?.cart.length || 0}
              >
                <Button
                  isIconOnly
                  aria-label="more than 99 notifications"
                  radius="full"
                  variant="light"
                >
                  <IoCartOutline size={24} className="text-[#249ea7]" />
                </Button>
              </Badge>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <div className="mt-1">
            <NavbarMenuItem>
              {user?.picture ? (
                <Image
                  src={user?.picture}
                  height={100}
                  width={100}
                  priority
                  quality={96}
                  className="h-8 w-8 rounded-full cursor-pointer mb-3"
                  alt="picture"
                />
              ) : (
                <span>
                  <FaUserCircle
                    color="#249ea7"
                    className="h-8 w-8 rounded-full cursor-pointer mb-3"
                  />
                </span>
              )}
              <Link className="w-full" href={"/order"}>
                My Orders
              </Link>{" "}
              <br />
              {presentUser?.role === "ADMIN" && (
                <Link className="w-full" href={"/admin"}>
                  Admin DashBoard
                </Link>
              )}
              {isAuthenticated ? (
                <div className="bg-red-600 rounded-md p-1.5 text-white hover:bg-red-700 my-1">
                  <LogoutLink className="font-bold text-medium">
                    LogOut
                  </LogoutLink>
                </div>
              ) : (
                <LoginLink
                  className="font-bold text-xl"
                  postLoginRedirectURL="/api/creation"
                >
                  Login
                </LoginLink>
              )}{" "}
              <br />
              {!isAuthenticated && (
                <RegisterLink
                  className="font-bold text-xl"
                  postLoginRedirectURL="/api/creation"
                >
                  Register
                </RegisterLink>
              )}
            </NavbarMenuItem>
          </div>
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
}
