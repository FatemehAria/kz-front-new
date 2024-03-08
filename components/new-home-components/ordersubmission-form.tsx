import React from "react";
import OrdersubmissionInput from "./ordersubmission-input";
import Image from "next/image";
import uploadfile from "../../public/Panel/uploadfile.svg";
type OrdersubmissionFormProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
function OrdersubmissionForm({ setCurrentStep }: OrdersubmissionFormProps) {
  return (
    <form className="bg-[#F8FAFC] rounded-2xl grid grid-cols-1 gap-3 px-[5%] py-[2%] w-full">
      <label className="text-[#4866CF] flex justify-center sm:text-[36px] text-[30px]">
        فرم ثبت درخواست
      </label>
      <div className="flex flex-row-reverse gap-3 flex-wrap md:flex-nowrap">
        <OrdersubmissionInput placeholder="نام و نام خانوادگی" />
        <OrdersubmissionInput placeholder="پست الکترونیکی" />
        <OrdersubmissionInput placeholder="شماره تماس" />
      </div>
      <div className="flex flex-row-reverse justify-between gap-3 flex-wrap sm:flex-nowrap">
        <textarea
          className="outline-none bg-white border-[#D0DBEC] border-2 rounded-[8px] h-[100px] w-full sm:w-[50%] p-3"
          placeholder="توضیحات تکمیلی"
          dir="rtl"
        ></textarea>
        <div className="flex flex-col bg-white border-[#D0DBEC] border-2 rounded-[8px] items-center justify-center sm:w-[50%] w-full">
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
