"use client";
import React, { useState } from "react";
import MainadminEmployeesSidebar from "../employees/components/mainadmin-employees-sidebar";
import { MainadminManagementSidebarInfo } from "@/lib/data";
import NewPersonel from "./new-personel";
import AllPersonel from "./all-personel";
import PersonelCheck from "./personel-check";
import AllEmployers from "./all-employers";
import AllStudents from "./all-students";

const Management = () => {
  const [step, setStep] = useState(0);

  const renderSteps = () => {
    switch (step) {
      case 0:
        return <NewPersonel />;
      case 1:
        return <AllPersonel />;
      case 2:
        return <PersonelCheck />;
      case 3:
        return <AllEmployers />;
      case 4:
        return <AllStudents />;
    }
  };
  return (
    <div className="flex flex-row w-full">
      <MainadminEmployeesSidebar
        sidebarOptions={MainadminManagementSidebarInfo}
        setStep={setStep}
      />
      <div className="py-[3%] w-full">{renderSteps()}</div>
    </div>
  );
};

export default Management;
