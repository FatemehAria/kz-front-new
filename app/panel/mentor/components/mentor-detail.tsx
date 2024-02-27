"use client";
import React, { ChangeEvent, useState } from "react";
import ReqFormTitle from "../request/components/req-form-title";
import ReqFormSelect from "../request/components/req-form-select";
import ReqFormDesc from "../request/components/req-form-desc";
import ReqFormFile from "../request/components/req-form-file";
import Image from "next/image";

const MentorDetail = () => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };
  return (
    <div className="lg:w-[100%] mx-auto rounded-xl lg:p-[2%] grid grid-cols-1 justify-center gap-[3%] bg-white">
      <form className="bg-white w-full rounded-lg grid grid-cols-1 p-[5%] gap-[5%]">
        <div className="flex lg:flex-row flex-col justify-between lg:gap-[8%] lg:items-center gap-2">
          <div className="lg:w-[50%]">
            <ReqFormTitle />
          </div>
          <div className="lg:w-[50%]">
            <ReqFormSelect />
          </div>
        </div>
        <ReqFormDesc />
        <div className="flex lg:flex-row justify-between lg:gap-[50%] flex-col gap-2">
          <div className="w-[50%]">
            <ReqFormFile
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
            />
          </div>
          <button className="bg-[#9DACDF] whitespace-nowrap px-[2%] rounded-xl text-white flex justify-center items-center gap-1">
            <span>مشاهده کردم</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MentorDetail;
