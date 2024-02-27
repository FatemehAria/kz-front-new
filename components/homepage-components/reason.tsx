import Image from "next/image";
import React from "react";

const Reasons = () => {
  return (
    <div
      className="mx-auto gap-2 grid grid-cols-1 lg:grid-cols-2 w-[85%] justify-center py-[2%]"
      dir="rtl"
    >
      {/* texts */}
      <div className="text-xs flex flex-col lg:gap-6 gap-2">
        <div className="font-bold xl:text-7xl lg:text-5xl text-2xl lg:text-center text-start 3xl:text-6xl 2xl:whitespace-nowrap pb-[5%]">
          <span> چرا </span>
          <span className="text-[#4866CF]">کیکاووس زمان؟</span>
        </div>

        <p className="font-bold 2xl:items-center lg:text-center xl:text-3xl lg:text-3xl lg:!leading-[55px] !leading-[35px] text-justify text-xl">
          شرکت بین المللی کیکاووس زمان این افتخار را دارد که با استفاده از نیروی
          متخصص در کوتاه شدن مسیر موفقیت کنار شما باشد.
        </p>
      </div>

      {/* pics */}
      <div className="flex flex-col w-full lg:pr-[5%]">
        {/* each item */}
        <div className="grid grid-cols-2 w-full">
          <div
            className="p-2 h-50"
            style={{
              border: "none",
              borderLeft: "3px solid",
              borderImage:
                "linear-gradient(to top, #000 -89.2%, rgba(0, 0, 0, 0.00) 89.29%) 1",
            }}
          >
            <p className="text-[#4866CF] font-bold flex justify-start items-center gap-2 mb-2 text-sm md:text-lg whitespace-nowrap">
              <span>
                <Image
                  src="/reasons/1.svg"
                  alt="1"
                  width={37.93}
                  height={38.03}
                />
              </span>
              موفقیت متقابل
            </p>

            <p className="lg:font-semibold md:leading-8 text-center h-30 sm:max-md:p-0 w-[90%] mr-2 text-sm md:text-xl leading-4 ">
              کیکاووس زمان موفقیت خود را در گرو موفقیت مشتریان خود می داند.
            </p>
          </div>

          <div className="p-3 h-50">
            <p className="text-[#4866CF] font-bold flex justify-start items-center gap-2 mb-2 mr-2 text-sm md:text-lg whitespace-nowrap">
              <span>
                <Image
                  src="/reasons/2.svg"
                  alt="2"
                  width={37.93}
                  height={38.03}
                />
              </span>
              نیروی کار آزموده
            </p>

            <p className="lg:font-semibold md:leading-8 text-center h-30 sm:max-md:p-0 text-sm md:text-xl leading-4">
              کیکاووس زمان برای ارائه خدمات حرفه ای به مشتریان خود از متخصص ترین
              نیروها استفاده می نماید.{" "}
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 w-full"
          style={{
            border: "none",
            borderTop: "3px solid",
            borderImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, gray 45% ,gray 55% , rgba(0, 0, 0, 0) 100%) 1",
          }}
        >
          <div
            className="p-2 h-50"
            style={{
              border: "none",
              borderLeft: "3px solid",
              borderImage:
                "linear-gradient(to bottom, #000 -89.2%, rgba(0, 0, 0, 0.00) 89.29%) 1",
            }}
          >
            <p className="text-[#4866CF] font-bold flex justify-start items-center gap-2 mb-1 text-sm md:text-lg">
              <span>
                <Image
                  src="/reasons/3.svg"
                  alt="1"
                  width={37.93}
                  height={38.03}
                />
              </span>
              سرعت عمل
            </p>
            <p className="lg:font-semibold md:leading-8 text-center h-30 sm:max-md:p-0 text-sm md:text-xl leading-4">
              کیکاووس زمان برای تک تک لحظه های بیزینس مشتریان خود احترام قائل
              است.{" "}
            </p>
          </div>

          <div className="p-3 h-50">
            <p className="text-[#4866CF] font-bold flex justify-start items-center gap-2 mb-1 text-sm md:text-lg">
              <span>
                <Image
                  src="/reasons/4.svg"
                  alt="1"
                  width={37.93}
                  height={38.03}
                />
              </span>
              ضمانت خدمات{" "}
            </p>

            <p className="lg:font-semibold md:leading-8 leading-4 text-center h-30 sm:max-md:p-0 text-sm md:text-xl">
              کیکاووس زمان برای اعتماد مشتریان ضمانت کتبی کیفیت خدمات ارائه می
              نماید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reasons;
