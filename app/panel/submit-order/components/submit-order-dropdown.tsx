import Image from "next/image";
import React from "react";
type SubmitOrderDropdownProps = {
  dropDownTitle: string;
  dropdownItems: string[];
};
function SubmitOrderDropdown({
  dropDownTitle,
  dropdownItems,
}: SubmitOrderDropdownProps) {
  return (
    <div className="flex flex-col gap-3 relative">
      <p>{dropDownTitle}</p>
      <select name="" id="" className="bg-[#EAEFF6] h-full rounded-[4px]">
        {dropdownItems.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default SubmitOrderDropdown;
