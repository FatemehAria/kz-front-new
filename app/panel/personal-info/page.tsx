"use client";
import React, { useState } from "react";
import PersonalInfoHeader from "./components/personal-info-header";
import PersonalInfoFields from "./components/personal-info-fileds";
import PersonalInfoFileupload from "./components/personal-info-fileupload";

function PersonalInfo() {
  const [userType, setUserType] = useState("حقیقی");
  return (
    <React.Fragment>
      <div className="py-[5%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%]">
        <div className="pb-[5%] pt-0">
          <PersonalInfoHeader userType={userType} />
        </div>
        {userType === "حقیقی" && (
          <div className="grid grid-cols-2 gap-[5%]">
            <div className="flex flex-col justify-between">
              <PersonalInfoFields label="نام و نام خانوادگی:" />
              <PersonalInfoFields label="شماره موبایل:" />
              <PersonalInfoFields label="ایمیل:" />
            </div>
            <div className="flex flex-col gap-5">
              <PersonalInfoFileupload />
              <PersonalInfoFields label="کد ملی:" />
            </div>
          </div>
        )}
        {userType === "حقوقی" && (
          <div className="grid grid-cols-2 gap-[5%]">
            <div className="flex flex-col justify-between">
              <PersonalInfoFields label="نام و نام خانوادگی:" />
              <PersonalInfoFields label="شماره موبایل:" />
              <PersonalInfoFields label="ایمیل:" />
            </div>
            <div className="flex flex-col gap-5">
              <PersonalInfoFileupload />
              <PersonalInfoFields label="کد ملی:" />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default PersonalInfo;
