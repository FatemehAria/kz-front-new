import Image from "next/image";
import React from "react";
import CertificatesSliderCards from "./certificates-slidercards";
import styles from "../certificates.module.css";
import CertificatesImageslider from "./certificate-imageslider";
const { conatinerFive } = styles;
const CertificatesSlider = () => {
  return (
    <div className={`w-full pb-[5%]`}>
      <div
        className="flex lg:flex-row flex-col justify-center items-center 2xl:max-4xl:w-[70%] w-[80%] mx-auto rounded-[59px] lg:h-[246px] overflow-hidden lg:gap-8 relative z-50 px-3"
        style={{
          boxShadow: "0px 31px 70px 0px rgba(0, 0, 0, 0.25)",
          backgroundColor: "rgba(255, 255, 255,1)",
        }}
      >
        <p className="text-center font-bold text-[23px] lg:w-[160px] lg:px-3 order-last lg:order-first pb-[20%] lg:pb-0">
          گواهینامه اخذ شده از دانشگاه TQS
        </p>
        <Image
          src="/certificates/vector2.png"
          alt="vector"
          width={5}
          height={324}
          className="h-[170px] w-[8px] rotate-90 lg:rotate-0"
        />
        <CertificatesSliderCards />
        <Image
          src="/certificates/vector2.png"
          alt="vector"
          width={5}
          height={324}
          className="h-[170px] w-[8px] rotate-90 lg:rotate-0"
        />
        <div className="order-first lg:order-last pt-[25%] lg:pt-0">
          <Image
            src="/certificates/tqs.svg"
            alt="گواهینامه دانشگاه TQS"
            width={200}
            height={190}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificatesSlider;
