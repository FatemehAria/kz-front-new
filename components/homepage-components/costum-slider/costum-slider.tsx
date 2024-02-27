"use client";
import React, { useEffect, useState } from "react";
import SliderThreeCard from "../slider-three-card";
import Image from "next/image";
import { thirdSliderData } from "@/lib/data";
import styles from "./costum-slider.module.css";
const { slide, slideActive } = styles;
type Timeout = ReturnType<typeof setTimeout>;

const CostumSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const [autoplay, setAutoplay] = useState(true);
  const [intervalId, setIntervalId] = useState<null | Timeout | number>(null);

  const startAutoplay = () => {
    const id = setInterval(() => {
      nextSlide();
    }, 4000);
    setIntervalId(id);
  };

  const stopAutoplay = () => {
    clearInterval(intervalId as number);
    setIntervalId(null);
  };

  const nextSlide = () => {
    setCurrentSlide((last) =>
      last === thirdSliderData.length - 1 ? 0 : last + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((last) =>
      last === 0 ? thirdSliderData.length - 1 : last - 1
    );
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (autoplay) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }, [autoplay]);

  return (
    <div
      className="mx-auto relative w-[95%] lg:w-[80%] mt-[3%]"
    >
      <div className="relative flex w-full h-[200px] justify-center items-center mx-auto overflow-hidden gap-6 lg:gap-0">
        {thirdSliderData.map((item) => (
          <div
            className={`absolute top-0 left-0 w-full ${slide} ${
              currentSlide === item.id ? slideActive : ""
            }`}
            key={item.id}
          >
            <SliderThreeCard
              text={item.text}
              title1={item.title1}
              title2={item.title2}
            />
          </div>
        ))}
      </div>
      {/* arrows */}
      <div className="justify-between relative -top-36 hidden lg:flex p-8">
        <Image
          src="/arrow.png"
          alt="arrow"
          width={20}
          height={20}
          className="rotate-180 cursor-pointer"
          onClick={() => nextSlide()}
        />
        <Image
          src="/arrow.png"
          alt="arrow"
          width={20}
          height={20}
          onClick={() => prevSlide()}
          className="cursor-pointer"
        />
      </div>
      {/* pagination */}
      <div
        className="flex justify-center items-center gap-2 relative lg:-top-20 -top-5 md:-top-2"
        dir="rtl"
      >
        {Array.from({ length: thirdSliderData.length }, (_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-20 h-1 border rounded-sm ${
              index === currentSlide ? "bg-[#4866CF]" : "bg-neutral-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CostumSlider;
