import React from "react";
import OrdersubmissionInput from "./ordersubmission-input";
import Image from "next/image";
import uploadfile from "../../public/Panel/uploadfile.svg";
type OrdersubmissionFormProps = {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
function OrdersubmissionForm({ setCurrentStep }: OrdersubmissionFormProps) {
  return (
    <form className="bg-[#F8FAFC] rounded-2xl grid grid-cols-1 gap-3 px-[5%] py-[2%] w-[80%] mx-auto">
      <label className="text-[#4866CF] flex justify-center text-[36px]">
        فرم ثبت درخواست
      </label>
      <div className="flex flex-row-reverse justify-between">
        <OrdersubmissionInput placeholder="نام و نام خانوادگی" />
        <OrdersubmissionInput placeholder="پست الکترونیکی" />
        <OrdersubmissionInput placeholder="شماره تماس" />
      </div>
      <div className="flex flex-row-reverse justify-between gap-3">
        <textarea
          className="outline-none border-[#D0DBEC] border-2 rounded-[8px] h-[100px] w-[50%] p-3"
          placeholder="توضیحات تکمیلی"
          dir="rtl"
        ></textarea>
        <div className="flex flex-col border-[#D0DBEC] border-2 rounded-[8px] items-center justify-center w-[50%]">
          <Image src={uploadfile} alt="آپلود فایل" />
          <p className="text-[#68707A]">انتخاب فایل</p>
        </div>
      </div>
      <button className="bg-[#4866CF] text-white w-[100px] py-2 rounded-lg">
        ثبت درخواست
      </button>
    </form>
  );
}

export default OrdersubmissionForm;
