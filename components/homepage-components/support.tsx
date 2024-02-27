import Image from "next/image";
import React from "react";
import supportImage from "../../public/support/employees-desk.svg";
const Support = () => {
  return (
    <div className="md:bg-supportBg bg-no-repeat  bg-[length:100%_50%] md:bg-[length:50%_100%] md:bg-[-10%_0] md:w-full lg:bg-[100%_0] lg:bg-[length:55%_100%] ">
      <div
        className="w-[83%] mx-auto lg:flex justify-between relative lg:max-xl:gap-2"
        dir="rtl"
      >
        {/* texts */}
        <div className="flex flex-col justify-center gap-14">
          <p className="flex justify-center md:justify-start items-center lg:gap-4 gap-0">
            <span className="font-bold text-[#4866CF] text-xl md:text-base lg:text-[40px] xl:text-4xl">
              پشتیبانی ما
            </span>
            <span>
              <Image
                src="/titleArrow.svg"
                alt="arrow"
                width={25}
                height={25}
                className="hidden md:block rotate-90"
                quality={100}
              />
            </span>
            <span>
              <Image
                src="/titleArrow.svg"
                alt="arrow"
                width={20}
                height={20}
                className="md:hidden"
                quality={100}
              />
            </span>
          </p>

          <div className="flex flex-col justify-center text-right items-center relative font-semibold gap-8">
            <p className="xl:w-[35rem] lg:w-[20rem] 4xl:w-[25rem] text-justify lg:text-3xl text-xl xl:text-3xl font-semibold lg:!leading-[60px] leading-[35px]">
              شرکت هایی که خدمات خود را به کیکاووس زمان برون سپاری می نمایند از
              یک سال پشتیبانی بهره مند می شوند.
            </p>
            <button
              className="rounded-full w-52 py-3 px-3 items-center justify-center text-2xl text-center lg:flex my-2 text-white hidden self-start"
              style={{ backgroundColor: "#4866CF" }}
            >
              درباره پشتیبانی
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:items-end justify-center items-center gap-0">
          <Image
            src={supportImage}
            width={600}
            height={400}
            className="3xl:pr-[8%] lg:max-2xl:pr-[8%]"
            // className="lg:w-[550px] lg:h-[455px] w-[350px] h-[350px] 3xl:w-[450px] 8xl:w-[600px] 8xl:pr-8"
            alt="employees-desk"
          />
          <button
            className="rounded-full px-3 py-3 text-xl text-center justify-center items-center mx-auto text-white w-52 mt-3 lg:hidden"
            style={{ backgroundColor: "#4866CF" }}
          >
            درباره پشتیبانی
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
