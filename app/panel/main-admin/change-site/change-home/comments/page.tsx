import React from "react";

const ChangeHomeComments = () => {
  return (
    <div className="bg-[#D9D9D933] w-[90%] mx-auto py-[2%] px-[2%] rounded-lg">
      <form className="flex flex-col gap-4">
        <div className="flex flex-row">
          <label>امتیاز:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>نام:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div>
          <div className="flex flex-row items-center">
            <label>لوگو:</label>
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
        <div className="flex flex-row">
          <label>نام شرکت:</label>
          <input className="bg-[#9DACDF] rounded-md" />
        </div>
        <div className="flex flex-row">
          <label>نظر:</label>
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

export default ChangeHomeComments;
