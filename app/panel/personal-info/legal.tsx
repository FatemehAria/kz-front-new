import React, { useEffect, useState } from "react";
import PanelFields from "../components/panel-fileds";
import PersonalInfoFileupload from "./components/personal-info-fileupload";
import axios from "axios";
import {
  verifyIranianNationalId,
} from "@persian-tools/persian-tools";
import { useFormik } from "formik";
const initialValues = {
  National_ID: "",
  type: "Legal",
  name_of_Organization: "",
  registration_Number: "",
};
type LegalProps = {
  PhoneNumber: string;
  userId: string;
  token: string;
};
function Legal({ PhoneNumber, userId, token }: LegalProps) {
  const [validNationalID, setValidNationalId] = useState<
    boolean | null | undefined
  >(false);
  const [invalidNationalIdMessage, setInvalidNationalIdMessage] = useState("");

  const LegalSubmission = async (
    National_ID: string,
    type: string,
    name_of_Organization: string,
    registration_Number: string
  ) => {
    try {
      const { data } = await axios.put(
        `https://keykavoos.liara.run/Client/EditLegal/${userId}`,
        {
          National_ID,
          type,
          name_of_Organization,
          registration_Number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmission = async () => {
    setValidNationalId(verifyIranianNationalId(values.National_ID));
    if (validNationalID) {
      console.log(validNationalID);
      await LegalSubmission(
        values.National_ID,
        values.type,
        values.name_of_Organization,
        values.registration_Number
      );
      console.log(values.type);
    } else {
      console.log(invalidNationalIdMessage);
      setInvalidNationalIdMessage("کدملی صحیح نمی باشد.");
    }
  };
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleSubmission,
  });

  useEffect(() => {
    if (values.National_ID === "") {
      setInvalidNationalIdMessage("");
    }
  }, [values.National_ID, invalidNationalIdMessage]);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-[5%]">
        <div className="flex flex-col justify-between">
          <PanelFields
            label="نام سازمان:"
            onChange={handleChange}
            value={values.name_of_Organization}
            name="name_of_Organization"
          />
          <PanelFields
            label="شماره موبایل:"
            onChange={handleChange}
            value={PhoneNumber}
            disable={true}
          />
          <div className="relative">
            <PanelFields
              label="شناسه ملی:"
              onChange={handleChange}
              value={values.National_ID}
              name="National_ID"
            />
            <span className="absolute top-20">{invalidNationalIdMessage}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <PersonalInfoFileupload />
          <PanelFields
            label="شماره ثبت:"
            onChange={handleChange}
            value={values.registration_Number}
            name="registration_Number"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#4866CF] text-white px-3 py-1 rounded-lg"
          type="submit"
        >
          تایید
        </button>
      </div>
    </form>
  );
}

export default Legal;
