"use client";
import { deleteToken } from "@/redux/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
type SideOptionsProps = {
  text: string;
  imgSrc: string;
  address?: string;
};
const PanelSidebarSmall = ({
  sideOptions,
}: {
  sideOptions: SideOptionsProps[];
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  return (
    <div className="flex justify-between w-full px-[3%]">
      <ul className="flex flex-row justify-between w-full">
        {sideOptions.map((item, index) => (
          <li
            key={index}
            className="font-bold text-lg"
          >
            <div className="flex flex-col justify-around items-center">
              <span>
                <Image
                  src={item.imgSrc}
                  alt={`${item}`}
                  width={40}
                  height={40}
                />
              </span>
              <Link
                href={`${item.text === "خروج" ? "/" : item.address}`}
                className={`${
                  item.address === pathname ? "text-[#4866CF]" : "text-black"
                }`}
                onClick={() => item.text === "خروج" && dispatch(deleteToken())}
              >
                {item.text}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelSidebarSmall;
