import Image from "next/image";
import React from "react";
import arrowImage from "../../public/arrow.png";
function FooterRabon() {
  return (
    <div className="font-semibold text-black flex justify-center items-center lg:grid xl:grid-cols-12 lg:grid-cols-9 4xl:grid-cols-10 lg:w-[90%] 3xl:w-full sm:mx-auto text-center bg-blue-100 rounded-3xl my-2 sm:p-3 gap-4 whitespace-nowrap">
      <p className="flex flex-col lg:grid lg:grid-cols-3 lg:justify-around lg:items-center xl:w-[90%] w-full xl:col-span-10 lg:col-span-8 4xl:col-span-9 gap-0">
        <span className="text-indigo-600 font-semibold relative top-4 lg:top-0 font-faNum lg:border-l-2 lg:border-[#4866CF]">
          پشتیبانی 24 ساعته،7روز هفته{" "}
          {/* <span className="hidden md:inline-block lg:mx-8 8xl:mx-10">|</span> */}
        </span>
        <br className="md:hidden" />
        <span className="text-indigo-600 font-semibold relative lg:border-l-2 lg:border-[#4866CF]">
          پشتیبانی کارفرمایان: <br className="md:hidden" />
          <span className="text-gray-800 font-semibold font-faNum">
            <span className="lg:hidden">021-88329768</span>
            <span className="hidden lg:inline-block">021-88329768</span>
            {/* <span className="text-indigo-600 font-semibold hidden lg:inline-block mx-1 xl:mx-8 8xl:mr-20">
              |
            </span> */}
            <br className="lg:hidden" />
          </span>
        </span>
        <span className="text-indigo-600 font-semibold relative">
          <span>پشتیبانی کارآموزان:</span> <br className="md:hidden" />
          <span className="text-gray-800 font-semibold font-faNum">
            <span className="lg:hidden">021-91691650</span>
            <span className="hidden lg:inline-block">021-91691650</span>

            <br className="lg:hidden" />
          </span>
        </span>
      </p>
      <span className="text-gray-600 font-bold lg:flex justify-center items-center hidden gap-1 xl:col-span-2 lg:col-span-1 4xl:col-span-1 4xl:hover:drop-shadow-4xl">
        <span className="cursor-pointer">پشتیبانی آنلاین</span>
        <span>
          <Image
            src={arrowImage}
            width={15}
            height={15}
            className="-rotate-180 4xl:hidden"
            alt="arrow"
          />
        </span>
      </span>
    </div>
  );
}

export default FooterRabon;
