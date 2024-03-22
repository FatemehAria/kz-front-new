"use client";
import React, { ChangeEvent, useState } from "react";
import PanelFields from "../../components/panel-fileds";
import axios from "axios";
import { useFormik } from "formik";
import SettingsFileupload from "./components/settings-fileupload";
import { Bounce, toast } from "react-toastify";

const initialValues = {
  FirstName: "",
  LastName: "",
  type: "Genuine",
  email: "",
  National_ID: "",
};
type GenuineProps = {
  PhoneNumber: string;
  userId: string;
  token: string;
};
function Genuine({ PhoneNumber, userId, token }: GenuineProps) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };
  const handleAvatar = async () => {
    const formData = new FormData();
    formData.append("Image", selectedFile);
    try {
      const { data } = await axios.put(
        `https://keykavoos.liara.run/Client/UploadAvatar/${userId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
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
      console.log(error);
    }
  };
  const GenuineSubmission = async (
    National_ID: string,
    type: string,
    FirstName: string,
    LastName: string,
    email: string
  ) => {
    try {
      const { data } = await axios.put(
        `https://keykavoos.liara.run/Client/EditGenuine/${userId}`,
        {
          National_ID,
          type,
          FirstName,
          LastName,
          email,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmission = async () => {
    Promise.all([
      await GenuineSubmission(
        values.FirstName,
        values.LastName,
        values.type,
        values.National_ID,
        values.email
      ),
      await handleAvatar(),
    ]);
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleSubmission,
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-[5%]">
        <div className="flex flex-col justify-between gap-3">
          <PanelFields
            label="نام:"
            onChange={handleChange}
            value={values.FirstName}
            name="FirstName"
          />
          <PanelFields
            label="نام خانوادگی:"
            onChange={handleChange}
            value={values.LastName}
            name="LastName"
          />
          <PanelFields
            label="شماره موبایل:"
            onChange={handleChange}
            value={PhoneNumber}
            disable={true}
          />
          <PanelFields
            label="ایمیل:"
            onChange={handleChange}
            value={values.email}
            name="email"
          />
        </div>
        <div className="flex flex-col gap-20">
          <SettingsFileupload
            handleChange={handleFileChange}
            selectedFile={selectedFile}
            label="عکس کاربری:"
          />
          <PanelFields
            label="کد ملی:"
            onChange={handleChange}
            value={values.National_ID}
            name="National_ID"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#4866CF] text-white px-3 py-1 rounded-lg"
          type="submit"
        >
          تایید ویرایش
        </button>
      </div>
    </form>
  );
}

export default Genuine;
