import React from "react";

const ChangeCertificateOne = () => {
  return (
    <div className="bg-[#D9D9D933] w-full py-[2%]">
      <form className="flex flex-col gap-4">
        <div className="flex flex-row">
          <label>نام مجوز:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>توضیح:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>لوگو:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>عکس:</label>
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

export default ChangeCertificateOne;
