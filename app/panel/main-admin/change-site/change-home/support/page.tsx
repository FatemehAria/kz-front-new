import React from "react";

const ChangeHomeSupport = () => {
  return (
    <div className="bg-[#D9D9D933] w-[90%] mx-auto py-[2%] px-[2%] rounded-lg">
      <form className="flex flex-col gap-4">
        <div className="flex flex-row">
          <label>تیتر:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>توضیح:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>دکمه:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div>
          <div className="flex flex-row items-center">
            <label>تصویر:</label>
            <input
              id="fileInput"
              type="file"
              // onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="bg-[#9DACDF] text-white rounded-lg whitespace-nowrap w-[100px] text-center py-1"
            >
              انتخاب فایل
              {/* {selectedFile ? selectedFile.name : "افزودن فایل"} */}
            </label>
          </div>
        </div>
        <div className="bg-[#D9D9D9] h-[100px] mt-2"></div>
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

export default ChangeHomeSupport;
