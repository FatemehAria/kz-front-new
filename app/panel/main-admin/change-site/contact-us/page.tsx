import React from "react";

const Contactus = () => {
  return (
    <div className="bg-[#D9D9D933] w-[90%] mx-auto">
      <form className="flex flex-col gap-4">
        <div className="flex flex-row">
          <label>متن تماس:</label>
          <input className="bg-[#9DACDF] rounded-md" />
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
          <button className="bg-[#9DACDF] w-[100px] rounded-xl">
            تایید ادیت
          </button>
          <button className="bg-[#9DACDF] w-[100px] rounded-xl">
            کلمه کلیدی
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contactus;
