import Image from "next/image";
import React from "react";

const PhoneComponent = () => {
  return (
    <div className="lg:w-[100px] lg:h-[100px] w-[50px] h-[50px] relative lg:mt-20 lg:-left-5">
      <div className="lg:w-[100px] lg:h-[100px] w-[50px] h-[50px] left-0 top-0 absolute bg-gradient-to-b from-indigo-100 to-indigo-400 rounded-full sm:shadow-phoneShadow bg-indigo-300">
        <Image alt="phone" width={40} height={40} src="/support/phone.png" className="h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] lg:left-[26px] lg:top-[28px] left-2 top-2 absolute"/>
      </div>
    </div>
  );
};

export default PhoneComponent;
// box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;