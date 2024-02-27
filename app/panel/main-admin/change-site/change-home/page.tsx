import React, { useState } from "react";
import ChangeHomeSlider from "./home-slider/page";
import ChangeHomePartnerlogo from "./partner-logo/page";
import ChangeHomeTechnology from "./technology/page";
import ChangeHomeSupport from "./support/page";
import ChangeHomeComments from "./comments/page";
type ChangeHomeProps = {
  subStep?: number;
};
const ChangeHome = ({ subStep }: ChangeHomeProps) => {
  return <div className="w-full absolute top-0 left-0 px-[20%]"></div>;
};

export default ChangeHome;
