"use client";
import React from "react";

const ChangeHomeSlider = () => {
  return (
    <div className="bg-[#D9D9D933] w-[90%] mx-auto py-[2%] px-[2%] rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <p>اسلایدر یک:</p>
        <div>
          <div className="flex flex-row items-center">
            <input
              id="fileInput"
              type="file"
              // onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="bg-[#9DACDF] text-white rounded-lg py-[2%] whitespace-nowrap w-[100px] text-center"
            >
              انتخاب فایل
              {/* {selectedFile ? selectedFile.name : "افزودن فایل"} */}
            </label>
          </div>
        </div>
        <p className="text-[#9DACDF] font-faNum text-sm">
          سایز مناسب:<span>1740*608</span>
        </p>
        <p>❌</p>
      </div>
      <div className="flex flex-row justify-between text-white">
        <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
          تایید ادیت
        </button>
        <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
          کلمه کلیدی
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 mt-3">
          <p>نمایش:</p>
          <div>
            <select className="bg-[#9DACDF] outline-none text-white rounded-lg">
              <option>اسلایدر 1</option>
            </select>
          </div>
        </div>
        <div className="bg-[#D9D9D9] h-[100px] mt-2"></div>
      </div>
    </div>
  );
};

export default ChangeHomeSlider;
