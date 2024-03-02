import React from "react";
import company from "../../public/intro/company.png";
import agreement from "../../public/intro/agreement.png";
import Image from "next/image";
function IntroStatistics() {
  return (
    <div className="flex flex-row items-center gap-[5%] justify-center text-[#68707A]" dir="rtl">
      <div className="flex flex-row text-center items-center">
        <p className="flex flex-col">
          <span className="font-faNum font-semibold text-[30px]">68 هزار</span>
          <span className="font-normal text-[16px]">شرکت همکار</span>
        </p>
        <Image src={company} alt="company" />
      </div>
      <div className="flex flex-row text-center items-center">
        <p className="flex flex-col">
          <span className="font-faNum font-semibold text-[30px]">12 هزار</span>
          <span className="font-normal text-[16px]">سایت طراحی شده</span>
        </p>
        <Image src={agreement} alt="company" />
      </div>
    </div>
  );
}

export default IntroStatistics;
