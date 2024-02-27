import React from "react";

const ReqFormSelect = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <label className="whitespace-nowrap font-bold">درخواست منتورینگ:</label>
      <select className="bg-[#EDF0FB] outline-none w-full rounded-lg py-[1%] text-black px-[1%]">
        <option>بک اند</option>
        <option>فرانت اند</option>
        <option>حسابداری</option>
      </select>
    </div>
  );
};

export default ReqFormSelect;
