import React from "react";
import MentorTable from "./mentor-table";

type MentorComponentProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const MentorComponent = ({ setStep }: MentorComponentProps) => {
  return (
    <div className="bg-white w-full rounded-lg flex flex-col px-[3%] py-[2%] gap-[8%]">
      <button
        className="bg-[#4866CF] text-white rounded-3xl py-[1%] px-[2%] w-[150px]"
        onClick={() => setStep(2)}
      >
        درخواست منتور
      </button>
      <MentorTable setStep={setStep}/>
    </div>
  );
};

export default MentorComponent;
