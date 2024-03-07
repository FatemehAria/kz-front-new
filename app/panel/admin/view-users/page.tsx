"use client";
import React, { useState } from "react";
import PersonalInfoHeader from "../../personal-info/components/personal-info-header";
import LegalUsers from "./legal-users";
import GenuineUsers from "./genuine-users";

function ViewUsers() {
  const [step, setStep] = useState(1);
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <LegalUsers />;
      case 2:
        return <GenuineUsers />;
      default:
        return;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-10 w-full">
      <PersonalInfoHeader setStep={setStep} step={step} />
      <div
        className={`bg-white shadow mx-auto rounded-2xl w-full`}
      >
        {renderSteps()}
      </div>
    </div>
  );
}

export default ViewUsers;
