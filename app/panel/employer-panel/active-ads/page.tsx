"use client";
import SinglepageCards from "@/components/panel/singlepage-cards";
import Image from "next/image";
import { useState } from "react";
import Active from "./active";
import SingleAd from "./single-ad/page";
import Person from "./single-ad/person/page";
import Approve from "../approve/page";
import FinalApproval from "../approve/final-approval/page";

const ActiveAds = () => {
  const [steps, setSteps] = useState(0);
  const renderSteps = () => {
    switch (steps) {
      case 0:
        return <Active setSteps={setSteps} />;
      case 1:
        return <SingleAd setSteps={setSteps} />;
      case 2:
        return <Person setSteps={setSteps} />;
      case 3:
        return <Approve setSteps={setSteps} />;
      case 4:
        return <FinalApproval />;
      default:
        return;
    }
  };
  return <div className="pb-[3%]">{renderSteps()}</div>;
};
export default ActiveAds;
