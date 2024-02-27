"use client";
import React, { useState } from "react";
import MainadminEmployeesSidebar from "./components/mainadmin-employees-sidebar";
import { MainadminEmployeesSidebarInfo } from "@/lib/data";
import CheckTime from "./check-time";
import Responsibilities from "./responsibilities";
import Report from "./report";
import Achievements from "./achievements";
import AddResponsibility from "./add-responsibility";
import { useSelector } from "react-redux";
import Mosaede from "./mosaede";
import Morakhasi from "./morakhasi";
import axios from "axios";

const adminSidebarOptions = [
  { id: 0, title: "ثبت ورود/خروج", step: 0 },
  { id: 1, title: "فرم مساعده", step: 1 },
  { id: 2, title: "فرم مرخصی", step: 2 },
];
const Employees = () => {
  const { userProfile, localToken } = useSelector(
    (state: any) => state.userRole
  );
  const [step, setStep] = useState(0);
  const [adminStep, setAdminStep] = useState(0);
  const currentDate = new Date().toLocaleDateString("fa-ir");

  const renderGeneralSteps = () => {
    switch (step) {
      case 0:
        return <CheckTime />;
      case 1:
        return <Report />;
      case 2:
        return <Responsibilities />;
      case 3:
        return <Achievements />;
      case 4:
        return <AddResponsibility />;
    }
  };
  const renderAdminSteps = () => {
    switch (adminStep) {
      case 0:
        return <CheckTime currentDate={currentDate} />;
      case 1:
        return <Mosaede currentDate={currentDate} />;
      case 2:
        return <Morakhasi currentDate={currentDate} />;
    }
  };

  return (
    <div className="w-full">
      {userProfile.UserType === "Admin" && (
        <div className="flex flex-row">
          <MainadminEmployeesSidebar
            sidebarOptions={adminSidebarOptions}
            setStep={setAdminStep}
          />
          {renderAdminSteps()}
        </div>
      )}
      {userProfile.UserType === "GeneralAdmin" && (
        <div className="flex flex-row w-full">
          <MainadminEmployeesSidebar
            sidebarOptions={MainadminEmployeesSidebarInfo}
            setStep={setStep}
          />
          {renderGeneralSteps()}
        </div>
      )}
    </div>
  );
};

export default Employees;
