import React from "react";
import PersonalInfoHeader from "./components/personal-info-header";
import PersonalInfoFields from "./components/personal-info-fileds";
import PersonalInfoFileupload from "./components/personal-info-fileupload";

function PersonalInfo() {
  return (
    <React.Fragment>
      <div className="py-[5%] w-[90%] shadow mx-auto bg-white rounded-2xl px-[3%]">
        <div className="pb-[5%] pt-0">
          <PersonalInfoHeader />
        </div>
        <div className="grid grid-cols-2 gap-[5%]">
          <div className="flex flex-col justify-between">
            <PersonalInfoFields label="نام و نام خانوادگی:" />
            <PersonalInfoFields label="شماره موبایل:" />
            <PersonalInfoFields label="ایمیل:" />
          </div>
          <div>
            <PersonalInfoFileupload />
            <PersonalInfoFields label="کد ملی:" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PersonalInfo;
