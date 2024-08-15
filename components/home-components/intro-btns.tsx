"use client";
import { getTokenFromLocal } from "@/redux/features/user/userSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function IntroBtns() {
  const { localToken, role } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
  }, []);
  return (
    <div className="flex md:justify-end justify-center w-full gap-3">
      <Link
        href={`${
          role === "User" && localToken
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
