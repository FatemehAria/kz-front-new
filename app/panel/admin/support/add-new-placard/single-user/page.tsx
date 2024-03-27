"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
type SingleUserProps = {
  AllUsers: any;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
function SingleUser({ AllUsers, setSteps }: SingleUserProps) {
  const [selectedInput, setSelectedInput] = useState("");
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("userPhoneNumber", selectedInput);
    setSteps(0);
  };
  return (
    <div className="flex flex-col gap-5 relative">
      <div
        className="flex justify-end text-xl cursor-pointer absolute -top-20 -left-10"
        onClick={() => setSteps(0)}
      >
        <div className="bg-white rounded-full p-2">
          <IoArrowBack />
        </div>
      </div>
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>شماره موبایل</p>
        <p>نام و نام خانوادگی</p>
        <p>ایمیل</p>
        <p>انتخاب</p>
      </div>
      <form
        onSubmit={(e) => handleSubmission(e)}
        className="flex flex-col gap-3"
      >
        {AllUsers &&
          AllUsers.map((item: any, index: number) => (
            <div
              key={item._id}
              className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
            >
              <p className="font-faNum">{index + 1}</p>
              <p className="font-faNum">{item.PhoneNumber}</p>
              <p>
                {item.FirstName} {item.LastName}
              </p>
              <p>{item.email}</p>
              <div className="flex gap-3 items-center justify-center">
                <input
                  type="radio"
                  className="appearance-none border-2 border-black rounded-sm w-4 h-4 checked:bg-[#4866CF]"
                  name="radio-button"
                  value={item.PhoneNumber}
                  onChange={() => setSelectedInput(item.PhoneNumber)}
                />
              </div>
            </div>
          ))}
        <div className="flex flex-row justify-end">
          <button className="bg-[#EAEFF6] text-black px-2 rounded-lg py-1">
            تایید
          </button>
        </div>
      </form>
    </div>
  );
}

export default SingleUser;
