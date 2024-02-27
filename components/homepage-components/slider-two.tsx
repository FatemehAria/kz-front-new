"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./slider-two.module.css";
import Image from "next/image";
import backgroundImage from "../../public/secondSlider/bg1234.png";
import saamMohaseb from "../../public/secondSlider/mohaseb.svg";
import Basij from "../../public/secondSlider/4.svg";
import AhmadiRoshan from "../../public/secondSlider/22.svg";
import lsa from "../../public/secondSlider/1.png";
import saamGroup from "../../public/secondSlider/5.svg";
import Irgc from "../../public/secondSlider/6.svg";
import TehranUni from "../../public/secondSlider/7.svg";
import nokhbegan from "../../public/secondSlider/8.svg";
import khajenasir from "../../public/secondSlider/9.svg";
const SliderTwo = () => {
  return (
    <div className="w-full px-[8%]">
      <Swiper
        modules={[Navigation, Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 5,
          },
          1923: {
            slidesPerView: 3,
          },
          1700: {
            slidesPerView: 3,
          },
          2000: {
            slidesPerView: 3,
          },
        }}
        loop
        speed={1000}
        className="flex flex-row justify-center items-center 6xl:mx-auto"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {/* 1st */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="سام-محاسب"
            />
            <Image
              className="w-[50px] h-[50px] absolute lg:w-[130px] lg:h-[130px]"
              src={saamMohaseb}
              alt="سام-محاسب"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 2nd */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="بسیج دانشجویی"
            />
            <Image
              className="w-[48.14px] h-[48.14px] absolute py-1 lg:w-[120px] lg:h-[120px]"
              src={Basij}
              alt="بسیج دانشجویی"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 3rd */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="مرکز رشد شهید احمدی روشن"
            />
            <Image
              className="w-[48.14px] h-[48.14px] absolute py-1 lg:w-[120px] lg:h-[120px]"
              src={AhmadiRoshan}
              alt="مرکز رشد شهید احمدی روشن"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 4th */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="لیان صنعت آرمان"
            />
            <Image
              className="w-[58.95px] h-[35.37px] absolute p-2 lg:w-[180px] lg:h-[100px] lg:p-6"
              src={lsa}
              alt="لیان صنعت آرمان"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 5th */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="گروه سام"
            />
            <Image
              className="w-[100px] h-[40px] absolute lg:w-[180px] lg:h-[180px] lg:pr-4"
              src={saamGroup}
              alt="گروه سام"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 6th */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="شرکت نفت ایران"
            />
            <Image
              className="w-[35px] h-[48.14px] absolute lg:w-[130px] lg:h-[130px] lg:pr-3"
              src={Irgc}
              alt="شرکت نفت ایران"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 7th */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="دانشگاه تهران"
            />
            <Image
              className="w-[40px] h-[40px] absolute lg:w-[120px] lg:h-[120px] lg:pr-3"
              src={TehranUni}
              alt="دانشگاه تهران"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 8th */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="خانه نخبگان"
            />
            <Image
              className="w-[40px] h-[40px] absolute lg:w-[120px] lg:h-[120px] lg:pr-3"
              src={nokhbegan}
              alt="خانه نخبگان"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
        {/* 9th */}
        <SwiperSlide>
          <div
            className={`w-[101.53px] h-[75px] relative overflow-hidden lg:w-[300px] lg:h-[229px] ${styles.polygonContainer}`}
          >
            <Image
              className="w-full h-full left-0 top-0 relative"
              src={backgroundImage}
              alt="دانشگاه خواجه نصیر"
            />
            <Image
              className="w-[40px] h-[40px] absolute lg:w-[120px] lg:h-[120px] lg:pr-3"
              src={khajenasir}
              alt="دانشگاه خواجه نصیر"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderTwo;
