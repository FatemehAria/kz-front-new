"use client";
import React from "react";
import plus from "../../../../public/Panel/plus.svg";
import Image from "next/image";
type SubmitOrderDropdownProps = {
  modalFieldTitle: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
function SubmitOrderModalfield({
  modalFieldTitle,
  setShowModal,
}: SubmitOrderDropdownProps) {
  return (
    <div className="flex flex-col gap-3">
      <p>{modalFieldTitle}</p>
      <div className="p-[2%] bg-[#EAEFF6] rounded-[4xl] relative">
        <Image
          src={plus}
          alt="plus"
          className="absolute left-0 top-1/2 -translate-y-1/2 pl-1"
          onClick={() => setShowModal(true)}
        />
      </div>
    </div>
  );
}

export default SubmitOrderModalfield;
