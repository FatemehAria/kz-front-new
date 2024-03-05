import React from "react";
import PanelFields from "../components/panel-fileds";
import PersonalInfoFileupload from "./components/personal-info-fileupload";
import axios from "axios";

function Genuine() {
  const GenuineSubmission = async (
    National_ID: string,
    type: string,
    FirstName: string,
    LastName: string
  ) => {
    try {
      const { data } = await axios.put(
        `https://keykavoos.liara.run/Client/EditGenuine/${userId}`,
        {}
      );
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-2 gap-[5%]">
      <div className="flex flex-col justify-between">
        <PanelFields label="نام و نام خانوادگی:" />
        <PanelFields label="شماره موبایل:" />
        <PanelFields label="ایمیل:" />
      </div>
      <div className="flex flex-col gap-5">
        <PersonalInfoFileupload />
        <PanelFields label="کد ملی:" />
      </div>
    </div>
  );
}

export default Genuine;
