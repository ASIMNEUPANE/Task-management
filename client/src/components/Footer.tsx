import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex gap-11 bg-slate-900 ">
      <div className=" rounded-sm m-4 hover:text-gray-300 text-red-50 px-3 py-2">
        <Link href={""}>Home</Link>
      </div>
      <div className=" rounded-sm m-4 hover:text-gray-300 text-red-50 px-3 py-2">
        <Link href={""}>TasK</Link>
      </div>
      <div className=" rounded-sm m-4 hover:text-gray-300 text-red-50 px-3 py-2">
        <Link href={""}>SignIn</Link>
      </div>
    </div>
  );
}

export default Footer;
