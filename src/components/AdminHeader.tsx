import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminHeader = () => {
  const pathname = usePathname();

  return (
    <header className="my-2">
      <ul className="flex justify-center items-center gap-4 ">
        <Link
          href="/admin"
          className={` ${
            pathname === "/admin" ? "border-b-2 border-gray-600" : ""
          } `}
        >
          <li className="hover:text-[17px] hover:font-bold text-[16px] cursor-pointer transition-all duration-500 font-bold tracking-wider flex items-center justify-center gap-0.5">
            Summary
          </li>
        </Link>
        <Link
          href="/admin/add-products"
          className={` ${
            pathname === "/admin/add-products"
              ? "border-b-2 border-gray-600"
              : ""
          } `}
        >
          <li className="hover:text-[17px] hover:font-bold text-[16px] cursor-pointer transition-all duration-500 font-bold tracking-wider flex items-center justify-center gap-0.5">
            AddProduct
          </li>
        </Link>
        <Link
          href="/admin/manage-products"
          className={` ${
            pathname === "/admin/manage-products"
              ? "border-b-2 border-gray-600"
              : ""
          } `}
        >
          <li className="hover:text-[17px] hover:font-bold text-[16px] cursor-pointer transition-all duration-500 font-bold tracking-wider flex items-center justify-center gap-0.5">
            Products
          </li>
        </Link>
        <Link
          href="/admin/manage-orders"
          className={` ${
            pathname === "/admin/manage-orders"
              ? "border-b-2 border-gray-600"
              : ""
          } `}
        >
          <li className="hover:text-[17px] hover:font-bold text-[16px] cursor-pointer transition-all duration-500 font-bold tracking-wider flex items-center justify-center gap-0.5">
            Orders
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default AdminHeader;
