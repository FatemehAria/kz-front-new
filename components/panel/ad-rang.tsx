"use client";
import { ChangeEvent, useState } from "react";
import styles from "./ad-range.module.css";

const AdRange = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(e.target.value);
  };

  return (
    <div className="flex flex-row">
      <p className="whitespace-nowrap pl-2">{sliderValue === 0 ? `پایه` : `${sliderValue} میلیون`}</p>
      <input
        max={44}
        type="range"
        className={`${styles.rangeInput}`}
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default AdRange;
