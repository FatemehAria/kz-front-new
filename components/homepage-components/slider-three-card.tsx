import Image from "next/image";
import React from "react";
type ThirdSliderProps = {
  text: string;
  title1: string;
  title2: string;
};
const SliderThreeCard = ({ text, title1, title2 }: ThirdSliderProps) => {
  return (
    <div
      dir="rtl"
      className="mx-auto flex rounded-3xl gap-2 lg:gap-0 lg:w-[80%] border h-36 md:h-44 lg:border-2 relative border-gray-400"
    >
      {/* pro and star */}
        <div className="flex flex-row items-center justify-center text-center w-[100px] lg:w-[300px] lg:gap-3">
          {/* stars */}
          <span className="flex flex-col justify-center items-center w-12 gap-1">
            <img src="/thirdSlider/star.svg" className="lg:w-6 w-4"/>
            <img src="/thirdSlider/star.svg" className="lg:w-6 w-4"/>
            <img src="/thirdSlider/star.svg" className="lg:w-6 w-4"/>
            <img src="/thirdSlider/star.svg" className="lg:w-6 w-4"/>
            <img src="/thirdSlider/star.svg" className="lg:w-6 w-4"/>
          </span>

          <div className="flex flex-col items-center">
            <img
              alt="profile"
              src="/thirdSlider/pro.png"
              className="lg:w-[70%] w-[50%]"
            />
            <p className="flex flex-col justify-center items-center gap-1">
              <span className="lg:text-[0.8rem] text-[0.5rem] whitespace-nowrap">{title1}</span>
              <span className="lg:text-[0.5rem] text-[0.3rem]">{title2}</span>
            </p>
          </div>
        </div>

      {/* text */}
      <p className="text-black font-normal lg:text-base text-xs overflow-hidden md:leading-5 flex justify-center items-center lg:w-[65%] w-[65%] 3xl:w-[50%] 3xl:text-justify">
        {text}
      </p>
    </div>
  );
};

export default SliderThreeCard;
