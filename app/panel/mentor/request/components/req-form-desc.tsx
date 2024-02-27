import React from "react";

const ReqFormDesc = () => {
  return (
    <div className="grid grid-cols-1 gap-y-[2%]">
      <label className="font-bold">توضیحات:</label>
      <textarea
        className="border-2 rounded-lg bg-[#EDF0FB] px-2 py-4 w-full h-[200px] text-black placeholder:text-black"
        placeholder="شرح مختصری از درخواست منتورینگ را بنویسید..."
      ></textarea>
    </div>
  );
};

export default ReqFormDesc;
