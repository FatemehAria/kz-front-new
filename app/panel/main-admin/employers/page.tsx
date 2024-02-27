"use client";
import React, { useState } from "react";
import Approval from "./approval";
import CompanyInfo from "./company-info";
import AdApproval from "./ad-approval";
import BoostPanel from "./boost-panel";
import Score from "./score";
import MainadminEmployeesSidebar from "../employees/components/mainadmin-employees-sidebar";
import { MainadminEmployersSidebarInfo } from "@/lib/data";
import { useSelector } from "react-redux";

const Employers = () => {
  const { userProfile } = useSelector((state: any) => state.userRole);
  const [step, setStep] = useState(0);
  const renderGeneralSteps = () => {
    switch (step) {
      case 0:
        return <Approval />;
      case 1:
        return <CompanyInfo />;
      case 2:
        return <AdApproval />;
      case 3:
        return <BoostPanel />;
      case 4:
        return <Score />;
    }
  };
  return (
    <div className="flex flex-row w-full">
      {userProfile.UserType === "GeneralAdmin" && (
        <div className="w-full flex flex-row">
          <MainadminEmployeesSidebar
            sidebarOptions={MainadminEmployersSidebarInfo}
            setStep={setStep}
          />
          <div className="w-full">{renderGeneralSteps()}</div>
        </div>
      )}
    </div>
  );
};

export default Employers;
