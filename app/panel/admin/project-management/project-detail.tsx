import React from "react";
import { ImBackward, ImBackward2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import FileUpload from "../../submit-order/components/file-upload";
const ProjectDetailNav = [
  "ثبت سفارش",
  "تهیه زیرساخت",
  "طراحی UI",
  "Front",
  "Back",
  "دیپلوی",
  "تحویل موقت",
  "پشتیبانی",
];
type ProjectDetailProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
function ProjectDetail({ setStep }: ProjectDetailProps) {
  return (
    <div className="relative w-full">
      <div
        className="flex justify-end text-xl cursor-pointer absolute -top-20 -left-10"
        onClick={() => setStep(1)}
      >
        <div className="bg-white rounded-full p-2">
          <IoArrowBack />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <label htmlFor="">عنوان پروژه:</label>
            <input className={"bg-[#EAEFF6]"} />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">نوع پروژه:</label>
            <input className={"bg-[#EAEFF6]"} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <label htmlFor="">پلن انتخابی:</label>
            <input className={"bg-[#EAEFF6]"} />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">بودجه مورد نظر:</label>
            <input className={"bg-[#EAEFF6]"} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">سایت مشابه مورد نظر شماست:</label>
          <input className={"bg-[#EAEFF6]"} />
        </div>
        <div>
          <div className="flex flex-col gap-3">
            <label>توضیحات پروژه:</label>
            <textarea className="p-[2%] bg-[#EAEFF6] rounded-[4xl]"></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">قالب و افزونه های مورد نیاز:</label>
          <input className={"bg-[#EAEFF6]"} />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">رنگ سازمانی:</label>
          <input className={"bg-[#EAEFF6]"} />
        </div>
        <div className="grid grid-cols-3">
          <FileUpload />
          <div className="bg-[#4866CE] text-white rounded-lg p-1 flex justify-start items-center">
            شماره درخواست:
          </div>
          <div className="w-full flex justify-end items-center gap-3">
            <button className="bg-[#EAEFF6] text-[#4866CE] rounded-lg py-1 px-3">
              رد پروژه
            </button>
            <button className="bg-[#4866CE] text-white rounded-lg p-1">
              تایید پروژه
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea className="p-[2%] bg-[#EAEFF6] rounded-[4xl] w-full" rows={4}></textarea>
          <button className="bg-[#4866CE] text-white absolute left-2 bottom-5 rounded-[4px] p-2">تایید و ارسال به کارفرما</button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
