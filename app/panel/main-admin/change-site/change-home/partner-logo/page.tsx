import Image from "next/image";
import React from "react";

const ChangeHomePartnerlogo = () => {
  return (
    <div className="bg-[#D9D9D933] w-[90%] mx-auto py-[2%] px-[2%] rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <p>لوگو یک:</p>
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

      <div className="flex flex-row items-center gap-3 mb-4">
        <Image
          src="/userpanel/jobtestlogo.svg"
          alt="job-logo"
          width={80}
          height={80}
        />
        <p>
          حذف دوره:<span>❌</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 text-white">
        <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
          افزودن لوگو
        </button>
        <div className="flex flex-row justify-between">
          <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
            تایید ادیت
          </button>
          <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1">
            کلمه کلیدی
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeHomePartnerlogo;
