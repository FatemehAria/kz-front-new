import React, { useState } from "react";
import BoostNav from "./boost-nav";
import Hoghoghi from "./hoghoghi";
import Haghighi from "./haghighi";
import { IoArrowBack } from "react-icons/io5";
type BoostToEmployerProps = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
const BoostToEmployer = ({ setSteps }: BoostToEmployerProps) => {
  const [step, setStep] = useState(0);
  const renderSteps = () => {
    switch (step) {
      case 0:
        return <Hoghoghi />;
      case 1:
        return <Haghighi />;
    }
  };
  return (
    <div className="flex flex-col gap-5 p-[3%]">
      <div className="flex justify-end text-xl w-[90%] mx-auto cursor-pointer" onClick={() => setSteps(1)}>
        <IoArrowBack />
      </div>
      <div className="flex flex-row w-[50%] mx-auto items-center border border-black rounded-lg justify-between px-[3%] py-1 mb-[2%]">
        <div
          onClick={() => setStep(0)}
          className={`${step === 0 && "text-[#4866CF]"} cursor-pointer`}
        >
          <BoostNav text="شخصیت حقوقی" step={step}/>
        </div>
        <div
          onClick={() => setStep(1)}
          className={`${step === 1 && "text-[#4866CF]"} cursor-pointer`}
        >
          <BoostNav text="شخصیت حقیقی" step={step}/>
        </div>
      </div>
      {renderSteps()}
    </div>
  );
};

export default BoostToEmployer;
