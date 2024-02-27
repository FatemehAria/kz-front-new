"use client";
import Image from "next/image";
import React, { useState } from "react";
type TableSelectProps = {
  selectText: string;
  dropDownOptions?: string[];
};
const TableSelect = ({ selectText, dropDownOptions }: TableSelectProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <div>
        <div className="flex justify-center items-center gap-[1%] py-[1%]">
          <span>{selectText}</span>
          <Image
            width={12}
            height={12}
            src="/employerpanel/right-arrow.svg"
            alt="arrow"
            className="-rotate-90 gap-[2%] cursor-pointer"
            onClick={() => setShowDropdown(true)}
          />
        </div>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-[3%] bg-white rounded-lg"
        onMouseLeave={() => setShowDropdown(false)}
      >
        {showDropdown && (
          <ul>
            {dropDownOptions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TableSelect;
