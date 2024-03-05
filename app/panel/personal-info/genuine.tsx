"use client";
import React, { ChangeEvent, useState } from "react";
import PanelFields from "../components/panel-fileds";
import PersonalInfoFileupload from "./components/personal-info-fileupload";
import axios from "axios";
import { useFormik } from "formik";

const initialValues = {
  FullName: "",
  type: "حقیقی",
  email: "",
  National_ID: "",
};
type GenuineProps = {
  PhoneNumber: string;
  userId: string;
  token: string;
};
function Genuine({ PhoneNumber, userId, token }: GenuineProps) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };
  const GenuineSubmission = async (
    National_ID: string,
    type: string,
    FullName: string,
    email: string
  ) => {
    try {
      const { data } = await axios.put(
        `https://keykavoos.liara.run/Client/EditGenuine/${userId}`,
        {
          National_ID,
          type,
          FullName,
          email,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmission = async () => {
    await GenuineSubmission(
      values.FullName,
      values.type,
      values.National_ID,
      values.email
    );
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleSubmission,
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-[5%]">
        <div className="flex flex-col justify-between">
          <PanelFields
            label="نام و نام خانوادگی:"
            onChange={handleChange}
            value={values.FullName}
            name="FullName"
          />
          <PanelFields
            label="شماره موبایل:"
            onChange={handleChange}
            value={PhoneNumber}
            disable={true}
          />
          <PanelFields
            label="ایمیل:"
            onChange={handleChange}
            value={values.email}
            name="email"
          />
        </div>
        <div className="flex flex-col gap-5">
          <PersonalInfoFileupload handleChange={handleChange} selectedFile={selectedFile} />
          <PanelFields
            label="کد ملی:"
            onChange={handleChange}
            value={values.National_ID}
            name="National_ID"
          />
        </div>
      </div>
    </form>
  );
}

export default Genuine;
