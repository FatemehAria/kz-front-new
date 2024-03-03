import React from "react";
import PersonalInfoHeader from "./components/personal-info-header";
import PersonalInfoFields from "./components/persona-info-fileds";

function PersonalInfo() {
  return (
    <React.Fragment>
      <div className="py-[5%] w-[90%] shadow mx-auto bg-white rounded-2xl">
        <div className="pb-[5%] pt-0 px-[3%]">
          <PersonalInfoHeader />
        </div>
        <PersonalInfoFields />
      </div>
    </React.Fragment>
  );
}

export default PersonalInfo;
