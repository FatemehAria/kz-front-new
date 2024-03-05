import React, { ChangeEvent } from "react";
// : React.ChangeEvent<HTMLInputElement>
type PanelFieldsProps = {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disable?: boolean;
  name?: string;
};
function PanelFields({
  label,
  onChange,
  value,
  disable,
  name,
}: PanelFieldsProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="">{label}</label>
      <input
        className={`${
          disable ? "bg-[#EAEFF6] text-slate-500" : "bg-[#EAEFF6]"
        } outline-none border-none py-2 rounded-[4px]`}
        onChange={onChange}
        value={value}
        disabled={disable}
        name={name}
      />
    </div>
  );
}

export default PanelFields;
