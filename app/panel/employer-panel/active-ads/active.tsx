"use client";
import SinglepageCards from "@/components/panel/singlepage-cards";
import React, { Dispatch, SetStateAction } from "react";

type ActiveProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const Active = ({ setSteps }: ActiveProps) => {
  return (
    <div className="px-[3%] flex flex-col gap-10">
      <div onClick={() => setSteps(1)} className="cursor-pointer">
        <SinglepageCards title="کارآموز حسابداری(هلو)" amount={69} />
      </div>
      <div>
        <SinglepageCards title="کارآموز برنامه نویسی(فرانت اند)" amount={69} />
      </div>
    </div>
  );
};

export default Active;
