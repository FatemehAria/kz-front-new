"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import firstImage from "../../public/firstSlider/1.svg";
import secondImage from "../../public/firstSlider/2.svg";
import thirdImage from "../../public/firstSlider/3.svg";
const SliderOne = () => {
  return (
    <div className="mx-auto w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        slidesPerView={1}
        loop
        // 800
        speed={2000}
        className="h-full w-[100%]"
        autoplay={{
          // 2500
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            navigation: {
              enabled: false,
            },
            speed: 1000,
          },
          1024: {
            navigation: {
              enabled: true,
            },
          },
        }}
      >
        <SwiperSlide>
          <Image
            src={firstImage}
            alt="slider1"
            className="object-cover mx-auto lg:w-[85%] w-[85%]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={secondImage}
            alt="slider1"
            className="object-cover mx-auto lg:w-[85%] w-[85%]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={thirdImage}
            alt="slider1"
            className="object-cover mx-auto lg:w-[85%] w-[90%]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderOne;
