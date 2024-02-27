"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type mainAdminSidebarOptions = {
  sidebarOptions: sidebarItems[];
};
type sidebarItems = {
  id: number;
  title: string;
  step: number;
  address: string;
  path: string;
  subNav?: SubNavItems[];
};
type SubNavItems = {
  title: string;
  id: number;
  step: number;
  address?: string;
  path: string;
};

const ChangeSiteSidebar = ({ sidebarOptions }: mainAdminSidebarOptions) => {
  const [showSub, setShowSub] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-[200px] flex flex-col gap-4 whitespace-nowrap">
      {sidebarOptions.map((item) => (
        <div key={item.id}>
          <div className="flex flex-row items-center px-4">
            <div className="flex flex-col">
              <Link
                href={item.address}
                onClick={() => setShowSub(true)}
                className={`${
                  pathname.includes(item.path) &&
                  "bg-gradient-to-l from-indigo-200"
                }`}
              >
                {item.title}
              </Link>
              <div>
                {item.subNav &&
                  showSub &&
                  pathname.includes(item.path) &&
                  item.subNav.map((sub, index) => (
                    <div key={index}>
                      <Link
                        href={sub.address || ""}
                        className={`${
                          pathname.includes(sub.path) &&
                          "bg-gradient-to-l from-indigo-200"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            {pathname.includes(item.path) ? (
              ""
            ) : (
              <span>
                <Image
                  src="/employerpanel/right-arrow.svg"
                  alt="right-arrow"
                  width={15}
                  height={15}
                />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChangeSiteSidebar;
