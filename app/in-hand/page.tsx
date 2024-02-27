import React from "react";
import styles from "./in-hand.module.css";
const { inHandBackground } = styles;
const InHand = () => {
  return (
    <div className="">
      <div
        className={`bg-inHandSmall lg:bg-inHandLarge ${inHandBackground}`}
      ></div>
    </div>
  );
};

export default InHand;
