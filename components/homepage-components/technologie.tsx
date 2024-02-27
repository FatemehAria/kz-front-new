import Image from "next/image";
import React from "react";
import emptyOffice from "../../public/empty-office.svg";
import ecmaLogo from "../../public//ecmalogo.svg";

const Technologie = () => {
  return (
    <div className="bg-techBg bg-no-repeat md:bg-[0_-40%] bg-[length:80%_50%] md:bg-[length:50%_100%] md:w-full lg:bg-[0_100%] lg:bg-[length:60%_100%]">
      <div
        className="lg:w-[84%] w-[90%] grid grid-cols-1 sm:flex justify-between items-center mx-auto gap-[3%] md:max-lg:gap-[10%] lg:gap-0"
        dir="ltr"
      >
        <div className="flex flex-col justify-center items-center">
          <p className="flex justify-end items-center sm:gap-4 z-50 lg:relative lg:self-start">
            <span>
              <Image
                src="/titleArrow.svg"
                alt="arrow"
                width={22}
                height={22}
                className="sm:hidden"
              />
            </span>
            <span className="font-bold text-[#4866CF] text-2xl sm:text-xl lg:text-[40px] xl:text-4xl">
              تکنولوژی ما
            </span>
            <span>
              <Image
                src="/titleArrow.svg"
                alt="arrow"
                width={25}
                height={25}
                className="hidden sm:block -rotate-90"
                quality={100}
              />
            </span>
          </p>

          <div
            className="mx-auto font-semibold w-full relative z-50 text-lg px-[4%] md:justify-center text-justify lg:w-80 xl:w-96 3xl:w-80 xl:text-3xl sm:w-60 md:text-2xl md:w-64 lg:text-3xl lg:pt-3 xsm:max-sm:text-xl"
            dir="rtl"
          >
            <div className="lg:leading-[65px] leading-[45px]">
              <div className="pt-4 pb-0 mb-0 lg:h-40 sm:max-lg:h-24 h-14">
                <span>استفاده از آخرین نسخه استانداردهای</span>
                <Image
                  src={ecmaLogo}
                  className="w-[55px] relative pr-1 -left-[17.5rem] -top-[1.8rem] lg:w-[120px] lg:self-end lg:-top-[3.5rem] sm:-left-[60%] sm:max-md:w-[70px] md:max-lg:w-[85px] md:max-lg:-top-[2rem] md:max-lg:-left-[65%] xsm:max-sm:-left-[19rem] xsm:max-sm:-top-8 xsm:max-sm:w-[80px]"
                  alt="ecma-logo"
                />
              </div>
              <span>که باعث افزایش اعتبار شما در عرصه بین الملل میشود.</span>
            </div>
          </div>
          <button
            className="rounded-full py-3 w-52 px-3 lg:text-2xl sm:text-xl text-2xl text-center sm:flex justify-center items-center mx-auto sm:py-1 md:py-3 my-2 text-white z-50 hidden lg:block lg:relative cursor-pointer"
            style={{ backgroundColor: "#4866CF" }}
          >
            درباره تکنولوژی
          </button>
        </div>

        <div>
          <Image
            src={emptyOffice}
            alt="empty-office"
            width={620}
            height={200}
            className="flex justify-center items-center lg:max-xl:pl-[8%] 3xl:pl-[8%] px-[4%] lg:px-0"
          />
        </div>
        <p className="bg-[#4866CF] rounded-full py-3 px-3 w-52 text-xl text-center flex justify-center items-center mx-auto md:p-2 mb-4 text-white z-[999] sm:hidden">
          درباره تکنولوژی
        </p>
      </div>
    </div>
  );
};

export default Technologie;
