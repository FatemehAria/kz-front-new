"use client";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import play from "../../public/Intro/play.svg";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function IntroBtns() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  return (
    <div className="flex md:justify-end justify-center w-full gap-3">
      <button className="flex flex-row items-center h-[40px] w-[145px] rounded-[4px] text-[#597193]">
        <Image src={play} alt="play" width={40} height={40} />
        <span>تماشا ویدیو</span>
      </button>
      <Link
        href={`${
          localToken && localUserId
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
