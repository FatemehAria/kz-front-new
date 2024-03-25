import Image from "next/image";
import React from "react";
type SubmitOrderDropdownProps = {
  dropDownTitle: string;
  dropdownItems: string[];
  value: string;
  onChange: any;
};
function SubmitOrderDropdown({
  dropDownTitle,
  dropdownItems,
  value,
  onChange,
}: SubmitOrderDropdownProps) {
  return (
    <div className="flex flex-col gap-3 relative">
      <p>{dropDownTitle}</p>
      <select
        name={dropDownTitle}
        id={dropDownTitle}
        className="bg-[#EAEFF6] h-full rounded-[4px] p-2"
        value={value}
        onChange={onChange}
      >
        {dropdownItems.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubmitOrderDropdown;
