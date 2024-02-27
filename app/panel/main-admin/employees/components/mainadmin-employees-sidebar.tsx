"use client";
import React, { useState } from "react";
import Image from "next/image";
// import {
//   changeCertificatesSidebarOptions,
//   changeCoursesSidebarOptions,
//   changeHomeSidebarOptions,
// } from "@/lib/data";
import ChangeHome from "../../change-site/change-home/page";
import ChangeCourses from "../../change-site/change-courses/page";
import ChangeCertificates from "../../change-site/change-certificates/page";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import SubSide from "./sub-side";

type mainAdminSidebarOptions = {
  sidebarOptions: sidebarItems[];
  setStep?: React.Dispatch<React.SetStateAction<number>>;
};
type sidebarItems = {
  id: number;
  title: string;
  step: number;
  subNav?: SubNavItems[];
};
type SubNavItems = {
  title: string;
  id: number;
  step: number;
  address?: string;
  path: string;
};

const MainadminEmployeesSidebar = ({
  sidebarOptions,
  setStep,
}: mainAdminSidebarOptions) => {
  const [selected, setSelected] = useState<number | null>(0);

  const handleItemClick = (itemStep: number) => {
    if (selected === itemStep) {
      return setSelected(null);
    } else {
      setSelected(itemStep);
    }
    setStep(itemStep);
  };

  return (
    <div className="w-[25%] flex flex-col gap-4 border-l border-black whitespace-nowrap">
      {sidebarOptions.map((item) => (
        <div key={item.id}>
          <div className="flex flex-row items-center px-4">
            <div className="flex flex-col">
              <p
                onClick={() => handleItemClick(item.step)}
                className={`cursor-pointer ${
                  selected === item.step
                    ? "bg-gradient-to-l from-indigo-200"
                    : ""
                }`}
              >
                {item.title}
              </p>
            </div>
            {selected === item.step ? (
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

export default MainadminEmployeesSidebar;
