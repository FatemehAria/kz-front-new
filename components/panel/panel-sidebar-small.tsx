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
    <div className="flex justify-between w-full">
      <ul className="flex flex-row justify-between w-full whitespace-nowrap p-[3%] gap-3">
        {sideOptions.map((item, index) => (
          <li key={index} className="font-bold text-lg">
            <div className="flex flex-col justify-around items-center gap-2">
              <Image src={item.imgSrc} alt={`${item}`} width={40} height={40} />
              <Link
                href={`${item.address}`}
                className={`text-sm ${
                  item.address === pathname ? "text-white" : "text-black"
                }`}
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
