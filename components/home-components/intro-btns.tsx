"use client";
import Link from "next/link";
import React from "react";
import {  useSelector } from "react-redux";

function IntroBtns() {
  const { token, role } = useSelector(
    (state: any) => state.userData
  );
  return (
    <div className="flex md:justify-end justify-center w-full gap-3">
      <Link
        href={`${
          token && role === "User"
            ? "/panel/user/submit-order"
            : "/authorization"
        }`}
        className="bg-[#4866CF] flex justify-center items-center text-white h-[40px] w-[135px] rounded-[4px]"
      >
        ثبت سفارش
      </Link>
    </div>
  );
}

export default IntroBtns;
