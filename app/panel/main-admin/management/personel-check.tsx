import React from "react";

const PersonelCheck = () => {
  return (
    <div className="px-[3%]">
      <div className="flex flex-row gap-[1%]">
        <div className="flex flex-col">
          <label>سمت</label>
          <input disabled={true} type="text" className="bg-profileBorderbg w-[80%]" />
        </div>
        <div className="flex flex-col">
          <label>ساعت شروع</label>
          <input disabled={true} type="text" className="bg-profileBorderbg w-[80%]" />
        </div>
        <div className="flex flex-col">
          <label>ساعت پایان</label>
          <input disabled={true} type="text" className="bg-profileBorderbg w-[80%]" />
        </div>
        <div className="flex flex-col">
          <label>نتیجه</label>
          <input disabled={true} type="text" className="bg-profileBorderbg w-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default PersonelCheck;
