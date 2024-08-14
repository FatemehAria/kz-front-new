import Link from "next/link";
import React from "react";

const NewInfoOnEachPageBtn = ({
  btnText,
  src,
}: {
  btnText: string;
  src: string;
}) => {
  return (
    <Link href={src} className="text-white bg-[#4866CF] p-2 rounded-[5px] flex flex-row gap-3 items-center">
      <p className="w-[20px] h-[20px] bg-white rounded-full font-[16px] text-[#4866CF] flex justify-center items-center">
        <span>+</span>
      </p>
      {btnText}
    </Link>
  );
};

export default NewInfoOnEachPageBtn;
