import Image from "next/image";
import React from "react";

type BoostPanelItemProps = {
  text: string;
  imgSrc: string;
};
const BoostPanelItem = ({ text, imgSrc }: BoostPanelItemProps) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center border-b py-2 gap-4">
        <Image src={imgSrc} alt={text} width={90} height={90} />
        <span>{text}</span>
      </div>
    </div>
  );
};

export default BoostPanelItem;
