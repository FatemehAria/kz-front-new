"use client";
import Link from "next/link";
import React, { useState } from "react";
import MentorTable from "./components/mentor-table";
import Request from "./request/page";
import MentorComponent from "./components/mentor-component";
import MentorDetail from "./components/mentor-detail";
const Mentor = () => {
  const [step, setStep] = useState(1);
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <MentorComponent setStep={setStep} />;
      case 2:
        return <Request setStep={setStep} />;
      case 3:
        return <MentorDetail />;
    }
  };
  return (
    <div
      className="w-[90%] mx-auto rounded-xl p-[2%] grid grid-cols-1 justify-center my-[2%]"
      style={{ background: "rgba(72, 102, 207, 0.10)" }}
    >
      {renderSteps()}
    </div>
  );
};

export default Mentor;
