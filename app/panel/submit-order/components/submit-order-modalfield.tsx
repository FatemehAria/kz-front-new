"use client";
import React, { useEffect, useState } from "react";
import plus from "../../../../public/Panel/plus.svg";
import Image from "next/image";
import OrdersubmissionModal from "./odersubmission-modal";
type SubmitOrderDropdownProps = {
  modalFieldTitle: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // showModal: boolean;
  data: string[];
  // setData: React.Dispatch<React.SetStateAction<string[]>>;
  // modalInputValue: string;
  // setModalInputValue: React.Dispatch<React.SetStateAction<string>>;
};
function SubmitOrderModalfield({
  modalFieldTitle,
  setShowModal,
  // showModal,
  data,
}: // setData,
// modalInputValue,
// setModalInputValue,
SubmitOrderDropdownProps) {
  return (
    <div className="flex flex-col gap-3 relative">
      <label>{modalFieldTitle}</label>
      <div className="p-[2%] bg-[#EAEFF6] rounded-[4xl] relative">
        <Image
          src={plus}
          alt="plus"
          className="absolute left-0 top-1/2 -translate-y-1/2 pl-1"
          onClick={() => setShowModal(true)}
        />
        {data.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default SubmitOrderModalfield;
