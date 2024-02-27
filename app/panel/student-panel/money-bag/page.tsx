"use client";
import React, { useState } from "react";
import MainBag from "./main-bag";
import Increase from "./increase";
import Transfer from "./transfer";

const MoneyBag = () => {
  const [steps, setSteps] = useState(0);
  const renderSteps = () => {
    switch (steps) {
      case 0:
        return <MainBag setSteps={setSteps}/>;
      case 1:
        return <Increase />;
      case 2:
        return <Transfer />;
      default:
        break;
    }
  };
  return <div>{renderSteps()}</div>;
};

export default MoneyBag;
