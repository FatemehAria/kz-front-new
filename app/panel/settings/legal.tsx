import React, { ChangeEvent, useEffect, useState } from "react";
import PanelFields from "../components/panel-fileds";
import axios from "axios";
import { verifyIranianNationalId } from "@persian-tools/persian-tools";
import { useFormik } from "formik";
import { Bounce, toast } from "react-toastify";
import SettingsFileupload from "./components/settings-fileupload";
const initialValues = {
  National_ID: "",
  type: "Legal",
  name_of_Organization: "",
  registration_Number: "",
};
type LegalProps = {
  PhoneNumber: string;
  userId: string;
  token: string;
};
function Legal({ PhoneNumber, userId, token }: LegalProps) {
  const [invalidNationalIdMessage, setInvalidNationalIdMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [avatarError, setAvatarError] = useState(false);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleAvatar = async () => {
    const formData = new FormData();
    formData.append("Image", selectedFile);
    // console.log(formData);
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
      // console.log(selectedFile);
      console.log(formData);
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
      setAvatarError(true);
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
  const LegalSubmission = async (
    National_ID: string,
    type: string,
    name_of_Organization: string,
    registration_Number: string
  ) => {
    try {
      const { data } = await axios.put(
        `https://keykavoos.liara.run/Client/EditLegal/${userId}`,
        {
          National_ID,
          type,
          name_of_Organization,
          registration_Number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("ثبت اطلاعات موفق بود.", {
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
      console.log(data);
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
      console.log(error);
    }
  };

  const handleSubmission = async () => {
    const isValidNationalId = verifyIranianNationalId(values.National_ID);
    if (isValidNationalId) {
      try {
        (async () => {
          const [legalSubmissionResponse, avatarResponse] = await Promise.all([
            LegalSubmission(
              values.National_ID,
              values.type,
              values.name_of_Organization,
              values.registration_Number
            ),
            handleAvatar(),
          ]);

          // Handle legalSubmissionResponse and avatarResponse here
          // console.log("Legal Submission response:", legalSubmissionResponse);
          // console.log("Avatar response:", avatarResponse);
        })();
        console.log("in the handlesubmission if when nationalid is valid");
      } catch (error) {
        console.log(error);
      }
    } else {
      setInvalidNationalIdMessage("کدملی صحیح نمی باشد.");
    }

    return isValidNationalId;
  };

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleSubmission,
  });

  useEffect(() => {
    if (values.National_ID === "") {
      setInvalidNationalIdMessage("");
    }
  }, [values.National_ID, invalidNationalIdMessage]);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-[5%]">
        <div className="flex flex-col justify-between">
          <PanelFields
            label="نام سازمان:"
            onChange={handleChange}
            value={values.name_of_Organization}
            name="name_of_Organization"
          />
          <PanelFields
            label="شماره موبایل:"
            onChange={handleChange}
            value={PhoneNumber}
            disable={true}
          />
          <div className="relative">
            <PanelFields
              label="شناسه ملی:"
              onChange={handleChange}
              value={values.National_ID}
              name="National_ID"
            />
            <span className="absolute top-20">{invalidNationalIdMessage}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <SettingsFileupload
            handleChange={handleFileChange}
            selectedFile={selectedFile}
            label="عکس لوگو:"
          />
          <PanelFields
            label="شماره ثبت:"
            onChange={handleChange}
            value={values.registration_Number}
            name="registration_Number"
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

export default Legal;
