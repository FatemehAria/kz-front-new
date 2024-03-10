"use client";
import React, { useState } from "react";
import OrderProgress from "./order-progress";
import OrdersubmissionForm from "./ordersubmission-form";

function Order() {
  const [currentStep, setCurrentStep] = useState(0);
  const renderSteps = () => {
    switch (currentStep) {
      case 0:
        return <OrdersubmissionForm setCurrentStep={setCurrentStep} />;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-5">
      <OrderProgress
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      {renderSteps()}
    </div>
  );
}

export default Order;
