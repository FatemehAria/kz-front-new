import Image from "next/image";
import React from "react";
type BoostNavProps = {
  text: string;
  step?: number;
};
const BoostNav = ({ text, step }: BoostNavProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="relative">
        <Image
          src={
            step === 0 && text === "شخصیت حقوقی"
              ? "/mainadminpanel/redcircle.svg"
              : step === 1 && text === "شخصیت حقیقی"
              ? "/mainadminpanel/redcircle.svg"
              : "/employerpanel/adtitleicon.png"
          }
          width={20}
          height={20}
          alt="bullet"
        />
      </div>
      <li className="font-YekanBakh flex justify-center items-center gap-2">
        {text}
      </li>
    </div>
  );
};

export default BoostNav;
