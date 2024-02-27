import Image from "next/image";
import Link from "next/link";
import React from "react";
type AdnavNumsProps = {
  text: string;
  linkSrc: string;
};
const ChartNav = ({ text, linkSrc }: AdnavNumsProps) => {
  return (
    <div className="flex justify-center items-center gap-[3%]">
      <Image
        src={
          text === "بالانس مالی"
            ? "/employerpanel/adtitleicon.png"
            : text === "هزینه های شرکت"
            ? "/mainadminpanel/redcircle.svg"
            : text === "درآمد های شرکت"
            ? "/mainadminpanel/greencircle.svg"
            : ""
        }
        width={20}
        height={20}
        alt="circle"
      />
      <Link href={linkSrc}>{text}</Link>
    </div>
  );
};

export default ChartNav;
