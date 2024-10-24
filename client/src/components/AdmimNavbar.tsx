"use client";
import { UserStore } from "@/store/UserStore";
import { removeToken } from "@/utils/session";
import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";

function AdminNavbar() {
  const { setLogOut } = UserStore((state) => state);
  const handleSubmit = () => {
    setLogOut();
    removeToken();
  };
  return (
    <div className="flex gap-11 bg-slate-900 ">
      <div className=" rounded-sm m-4 hover:text-gray-300 text-red-50 px-3 py-2">
        <Link href={"/admin/blog"}>Blogs</Link>
      </div>
      <div className=" rounded-sm m-4 hover:text-gray-300 text-red-50 px-3 py-2">
        <Link href={"/admin/user"}>Users</Link>
      </div>
      <div className=" rounded-sm m-4 hover:text-gray-300 text-red-50 px-3 py-2 ">
        <button onClick={handleSubmit}>
          {" "}
          <Link href={"/"}>
            {" "}
            <CiLogout size={25} />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
