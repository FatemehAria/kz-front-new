"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import OrdersubmissionInput from "./ordersubmission-input";
import Image from "next/image";
import uploadfile from "../../public/Panel/uploadfile.svg";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
type OrdersubmissionFormProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
function OrdersubmissionForm({ setCurrentStep }: OrdersubmissionFormProps) {
  const [formFileds, setFormFields] = useState({
    FullName: "",
    PhoneNumber: "",
    email: "",
    Description: "",
    _id: "",
  });
  const [File, setFile] = useState<any>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleChange(file);
    }
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("File", File);
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Client/UploadFile_req`,
        formData
      );
      setFormFields((last) => ({ ...last, _id: data.data }));
      toast.success("آپلود فایل موفق بود.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    } catch (error) {
      toast.error("خطا در آپلود فایل، لطفا مجدد آپلود کنید.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    }
  };
  const handleFormReq = async (
    FullName: string,
    PhoneNumber: string,
    email: string,
    Description: string,
    id: string
  ) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Client/FormReq`,
        {
          FullName,
          PhoneNumber,
          email,
          Description,
          _id: id,
        }
      );
      toast.success("اطلاعات با موفقیت ثبت شد.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    } catch (error) {
      toast.error("خطا در ثبت اطلاعات.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    }
  };
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Promise.all([
      await handleFileUpload(),
      await handleFormReq(
        formFileds.FullName,
        formFileds.PhoneNumber,
        formFileds.email,
        formFileds.Description,
        formFileds._id
      ),
    ]);
  };
  return (
    <form
      onSubmit={(e) => handleSubmission(e)}
      className="bg-[#F8FAFC] rounded-2xl grid grid-cols-1 gap-3 px-[5%] py-[2%] w-full"
    >
      <label className="text-[#4866CF] flex justify-center sm:text-[36px] text-[30px]">
        فرم ثبت درخواست
      </label>
      <div className="flex flex-row-reverse gap-3 flex-wrap md:flex-nowrap">
        <OrdersubmissionInput
          placeholder="نام و نام خانوادگی"
          value={formFileds.FullName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormFields((last) => ({ ...last, FullName: e.target.value }))
          }
        />
        <OrdersubmissionInput
          placeholder="پست الکترونیکی"
          value={formFileds.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormFields((last) => ({ ...last, email: e.target.value }))
          }
        />
        <OrdersubmissionInput
          placeholder="شماره تماس"
          value={formFileds.PhoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormFields((last) => ({ ...last, PhoneNumber: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-row-reverse justify-between gap-3 flex-wrap sm:flex-nowrap">
        <textarea
          className="outline-none bg-white border-[#D0DBEC] border-2 rounded-[8px] h-[100px] w-full sm:w-[50%] p-3"
          placeholder="توضیحات تکمیلی"
          dir="rtl"
          value={formFileds.Description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormFields((last) => ({ ...last, Description: e.target.value }))
          }
        ></textarea>
        <div className="flex flex-col bg-white border-[#D0DBEC] border-2 rounded-[8px] items-center justify-center sm:w-[50%] w-full">
          <div className="flex flex-col items-center gap-[5%] whitespace-nowrap">
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label className="text-[#68707A]">انتخاب فایل</label>
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer" }}
              className="flex flex-col items-center"
            >
              {File ? File.name : <Image src={uploadfile} alt="انتخاب فایل" />}
            </label>
          </div>
        </div>
      </div>
      <button className="bg-[#4866CF] text-white w-[100px] py-2 rounded-lg">
        ثبت درخواست
      </button>
    </form>
  );
}

export default OrdersubmissionForm;
