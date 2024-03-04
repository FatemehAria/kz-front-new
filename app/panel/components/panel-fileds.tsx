import React from "react";

type  PanelFieldsProps = {
  label: string;
};
function PanelFields({ label }: PanelFieldsProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="">{label}</label>
      <input className="bg-[#EAEFF6] outline-none border-none py-2 rounded-[4px]" />
    </div>
  );
}

export default PanelFields;
