import Image from "next/image";
import React from "react";
import dropdownbutton from "../../../../public/Panel/dropdownbutton.svg";
type SubmitOrderDropdownProps = {
  dropDownTitle: string;
};
function SubmitOrderDropdown({ dropDownTitle }: SubmitOrderDropdownProps) {
  return (
    <div className="flex flex-col gap-3">
      <p>{dropDownTitle}</p>
      <div className="p-[2%] bg-[#EAEFF6] rounded-[4xl] relative">
        <Image src={dropdownbutton} alt="drop" className="absolute left-0 top-1/2 -translate-y-1/2 pl-1" />
      </div>
    </div>
  );
}

export default SubmitOrderDropdown;
