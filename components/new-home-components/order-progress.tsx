"use client";
import React, { useState } from "react";
import styles from "./order.module.css";
type OrderProgressProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
function OrderProgress({ currentStep, setCurrentStep }: OrderProgressProps) {
  const dotPositions = ["0%", "25%", "50%", "75%", "100%"];
  const stepTexts = [
    "ثبت سفارش",
    "ثبت سفارش",
    "ثبت سفارش",
    "ثبت سفارش",
    "ثبت سفارش",
  ];
  const handleDotClick = (step: number) => {
    setCurrentStep(step);
  };

  const getSquarePosition = () => {
    return dotPositions[currentStep];
  };

  return (
    <div className={styles.progressContainer}>
      {dotPositions.map((position, index) => (
        <div
          key={index}
          className={`${styles.dot} ${
            currentStep === index ? styles.activeDot : ""
          }`}
          style={{ left: position }}
        >
          <span className="whitespace-nowrap absolute -bottom-10 left-1/2 -translate-x-1/2 text-[#4866CF]">
            {stepTexts[index]}
          </span>
        </div>
      ))}
      <div
        className={styles.square}
        style={{ left: getSquarePosition() }}
      ></div>
    </div>
  );
}

export default OrderProgress;
