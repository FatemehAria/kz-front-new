import React from "react";

const ChangeContactus = () => {
  return (
    <div className="bg-[#D9D9D933] w-[90%] mx-auto py-[2%] px-[2%] rounded-lg">
      <form className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <label>متن تماس:</label>
          <input className="bg-[#9DACDF] rounded-md h-[100px]" />
        </div>
        <div className="flex flex-row">
          <label>شماره تماس 1:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>شماره تماس 2:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>ایمیل 1:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>ایمیل 2:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>آدرس:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>

        <div className="flex flex-row justify-between text-white">
          <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
            تایید ادیت
          </button>
          <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
            کلمه کلیدی
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeContactus;
