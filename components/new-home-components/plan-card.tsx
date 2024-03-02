import Image from "next/image";
import React from "react";
import options from "../../public/plans/options.svg";
type PlanCardProps = {
  data: CardInfo;
};
type CardInfo = {
  id: number;
  type: string;
  title: string;
  planInfo: string[];
  price: string;
  imgSrc: string;
};
function PlanCard({ data }: PlanCardProps) {
  return (
    <div className="mt-[5%]">
      <div className="bg-white w-[250px] rounded-lg p-[3%] relative">
        <div className="bg-[#4866CF] w-[80%] mx-auto text-center text-[32px] font-extrabold text-white rounded-b-2xl absolute z-10 -translate-x-1/2 left-1/2 -top-1">
          {data.type}
        </div>
        <div className="border border-[#4866CF] rounded-xl">
          <div className="p-[3%] mt-[15%]">
            <p className="text-center text-[#68707A]">{data.title}</p>
            <div className="flex flex-col justify-center items-center">
              <Image src={data.imgSrc} alt="news" />
              <div>
                {data.planInfo.map((item, index) => (
                  <div key={index} className="flex flex-row items-center gap-2">
                    <span className="text-[16px] text-[#68707A]">{item}</span>
                    <Image src={options} alt="options" />
                  </div>
                ))}
              </div>
              <div className="border border-[#4866CF] rounded-xl overflow-hidden p-[1%] w-full">
                <div className="text-[#4866CF] flex items-center flex-row-reverse justify-between">
                  <span className="text-[16px]">:شروع قیمت از</span>
                  <span className="text-[48px]">{data.price}</span>
                  <p className="text-[16px] flex flex-col text-center">
                    <span>میلیون</span>
                    <span>تومان</span>
                  </p>
                </div>
                <button className="text-white bg-[#4866CF] flex justify-center w-full rounded-lg py-[1%]">
                  توضیحات بیشتر
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
