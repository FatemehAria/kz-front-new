import Image, { StaticImageData } from "next/image";
import React from "react";
type IntroStatisticsAtomProps = {
  amount: string;
  jobDone: string;
  imgSrc: StaticImageData;
};
function IntroStatisticsAtom({
  amount,
  jobDone,
  imgSrc,
}: IntroStatisticsAtomProps) {
  return (
    <div className="flex flex-row text-center items-center gap-2">
      <div className="flex flex-col">
        <p className="font-faNum font-semibold text-[30px]">{amount}</p>
        <p className="font-normal text-[16px]">{jobDone}</p>
      </div>
      <div className="bg-[#D0DBEC] rounded-full w-[70px] h-[70px] flex justify-center items-center" >
        <Image src={imgSrc} alt={jobDone} />
      </div>
    </div>
  );
}

export default IntroStatisticsAtom;
