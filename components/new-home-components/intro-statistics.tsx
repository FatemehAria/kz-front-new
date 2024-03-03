import React from "react";
import company from "../../public/Intro/company.png";
import agreement from "../../public/Intro/agreement.png";
import IntroStatisticsAtom from "./intro-statistics-atom";
function IntroStatistics() {
  return (
    <div
      className="flex flex-row items-center gap-[5%] justify-center text-[#68707A]"
      dir="rtl"
    >
      <IntroStatisticsAtom
        amount="68 هزار"
        imgSrc={company}
        jobDone="شرکت همکار"
      />
      <IntroStatisticsAtom
        amount="12 هزار"
        imgSrc={agreement}
        jobDone="سایت طراحی شده"
      />
    </div>
  );
}

export default IntroStatistics;
