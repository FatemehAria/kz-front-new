"use client";
import React, { useState } from "react";
import BoostOptions from "./components/boost-options";
import BoostToEmployer from "./components/boost-to-employer";

const BoostPanel = () => {
  const [boostSteps, setBoostSteps] = useState(1);
  const renderSteps = () => {
    switch (boostSteps) {
      case 1:
        return <BoostOptions setSteps={setBoostSteps}/>;
      case 2:
        return <BoostToEmployer setSteps={setBoostSteps}/>;
    }
  };
  return <div>{renderSteps()}</div>;
};

export default BoostPanel;
