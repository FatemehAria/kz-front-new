"use client";
import React, { useState } from "react";
import PersonalInfoHeader from "../../personal-info/components/personal-info-header";
import SearchLegal from "./search-legal";
import SearchGenuine from "./search-genuine";

function SearchUser() {
  const [step, setStep] = useState(1);
  const renderSteps = () => {
    switch (step) {
      case 1:
        return <SearchLegal />;
      case 2:
        return <SearchGenuine />;
      default:
        return;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-10 w-full">
      <PersonalInfoHeader setStep={setStep} step={step} />
      <div className={`bg-white shadow mx-auto rounded-2xl w-full p-[3%]`}>
        {renderSteps()}
      </div>
    </div>
  );
}

export default SearchUser;
