"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainadminEmployeesSidebar from "../employees/components/mainadmin-employees-sidebar";
import Mosaede from "./mosaede";
import Morakhasi from "./morakhasi";
import { MainadminEmployeesSidebarInfo } from "@/lib/data";
import CheckTime from "../employees/check-time";
import Responsibilities from "../employees/responsibilities";
import Achievements from "../employees/achievements";
import AddResponsibility from "../employees/add-responsibility";
import Report from "../employees/report";
import Personel from "./personel";
import GeneralMosaede from "./general-mosaede";
import GeneralMorakhasi from "./general-morakhasi";
import ApprovedAids from "./approved-aids";
import ApprovedLeaves from "./approved-leaves";
const sideInfo = [
  {
    id: 0,
    title: "فرم مساعده",
    step: 0,
  },
  {
    id: 1,
    title: "فرم مرخصی",
    step: 1,
  },
  {
    id: 2,
    title: "پرسنل",
    step: 2,
  },
];
const Adminstrative = () => {
  const { userProfile } = useSelector((state: any) => state.userRole);
  const [step, setStep] = useState(0);
  const currentDate = new Date().toLocaleDateString("fa-ir");
  const renderGeneralSteps = () => {
    switch (step) {
      case 0:
        return <GeneralMosaede setStep={setStep} />;
      case 1:
        return <GeneralMorakhasi setStep={setStep}/>;
      case 2:
        return <Personel />;
      case 3:
        return <ApprovedAids />;
      case 4:
        return <ApprovedLeaves />;
      default:
        return;
    }
  };

  const renderAdminSteps = () => {
    switch (step) {
      case 0:
        return <CheckTime currentDate={currentDate}/>;
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

  return (
    <div className="">
      {userProfile.UserType === "Admin" && (
        <div className="flex flex-row">
          <MainadminEmployeesSidebar
            sidebarOptions={MainadminEmployeesSidebarInfo}
            setStep={setStep}
          />
          {renderAdminSteps()}
        </div>
      )}
      {userProfile.UserType === "GeneralAdmin" && (
        <div className="flex flex-row">
          <MainadminEmployeesSidebar
            sidebarOptions={sideInfo}
            setStep={setStep}
          />
          <div className="w-full px-[3%]">{renderGeneralSteps()}</div>
        </div>
      )}
    </div>
  );
};

export default Adminstrative;
