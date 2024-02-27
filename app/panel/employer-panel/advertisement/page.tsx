"use client";
import AdnavNums from "@/components/panel/adnav-nums";
import Language from "./components/language";
import { useState } from "react";
import Info from "./components/info";
import Position from "./components/position";
import Benefits from "./components/benefits";

const Advertisement = () => {
  const [steps, setSteps] = useState(0);
  const renderSteps = () => {
    switch (steps) {
      case 0:
        return <Language />;
      case 1:
        return <Position />;
      case 2:
        return <Info />;
      case 3:
        return <Benefits />;
      case 4:
        return <Language />;
    }
  };
  return (
    <div className="px-[3%]">
      <div className="flex justify-between items-center border px-[1%] py-1 gap-2 mb-[3%] border-black rounded-3xl">
        <div
          onClick={() => setSteps(1)}
          className={
            steps === 0 ? "text-[#4866CF] cursor-pointer" : "text-black"
          }
        >
          <AdnavNums text="زبان آگهی" number={1} />
        </div>
        <div
          onClick={() => setSteps(2)}
          className={
            steps === 1 ? "text-[#4866CF] cursor-pointer" : "text-black"
          }
        >
          <AdnavNums text="شرح جایگاه شغلی" number={2} />
        </div>
        <div
          onClick={() => setSteps(3)}
          className={
            steps === 2 ? "text-[#4866CF] cursor-pointer" : "text-black"
          }
        >
          <AdnavNums text="مشخصات پایه" number={3} />
        </div>
        <div
          onClick={() => setSteps(4)}
          className={
            steps === 3 ? "text-[#4866CF] cursor-pointer" : "text-black"
          }
        >
          <AdnavNums text="مزایای شغلی" number={4} />
        </div>
        <div
          className={
            steps === 4 ? "text-[#4866CF] cursor-pointer" : "text-black"
          }
        >
          <AdnavNums text="بررسی" number={5} />
        </div>
      </div>
      {renderSteps()}
    </div>
  );
};
export default Advertisement;
