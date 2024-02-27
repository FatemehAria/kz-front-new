import React from "react";

const ReqFormTitle = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <label className="font-bold">موضوع:</label>
      <input
        className={`bg-[#EDF0FB] rounded-lg py-[2%] px-[3%] w-full text-black`}
        type="text"
      />
    </div>
  );
};

export default ReqFormTitle;
