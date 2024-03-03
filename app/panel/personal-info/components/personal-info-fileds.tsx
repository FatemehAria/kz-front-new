import React from "react";
import { string } from "yup";
type PersonalInfoFieldsProps = {
  label: string;
};
function PersonalInfoFields({ label }: PersonalInfoFieldsProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="">{label}</label>
      <input className="bg-[#EAEFF6] outline-none border-none py-2 rounded-[4px]" />
    </div>
  );
}

export default PersonalInfoFields;
