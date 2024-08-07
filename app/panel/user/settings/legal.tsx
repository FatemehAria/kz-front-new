import React, { useEffect, useState } from "react";
import PanelFields from "../../components/panel-fileds";
import axios from "axios";
import { verifyIranianNationalId } from "@persian-tools/persian-tools";
import { useFormik } from "formik";
import { Bounce, toast } from "react-toastify";
import SettingsFileupload from "./components/settings-fileupload";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/redux/features/user/userSlice";
import app from "@/services/service";
const initialValues = {
  shenase_melli: "",
  type: "hoghooghi",
  org_name: "",
  password: "",
  org_registration_number: "",
};
type LegalProps = {
  userId: string;
  token: string;
  userProfile: any;
};
function Legal({ userId, token, userProfile }: LegalProps) {
  const [invalidNationalIdMessage, setInvalidNationalIdMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const dispatch = useDispatch();
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleAvatar = async () => {
    const formData = new FormData();
    formData.append("pic", selectedFile);
    try {
      const { data } = await app.post(
        `/upload/profile_pic/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      // check
      dispatch(
        updateUserProfile({
          ...userProfile,
          pic_path: data.data.pic_path,
        })
      );
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

  const LegalSubmission = async (
    org_name: string,
    password: string,
    shenase_melli: string,
    org_registration_number: string
  ) => {
    try {
      const { data } = await app.put(``, {
        org_name,
        password,
        shenase_melli,
        org_registration_number,
      });
      dispatch(
        updateUserProfile({
          ...userProfile,
          org_name,
          password,
          shenase_melli,
          org_registration_number,
        })
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmission = async () => {
    if (isValidNationalId && !selectedFile) {
      await LegalSubmission(
        values.org_name,
        values.password,
        values.shenase_melli,
        values.org_registration_number
      );
    } else if (isValidNationalId && selectedFile) {
      try {
        (async () => {
          const [legalSubmissionResponse, avatarResponse] = await Promise.all([
            LegalSubmission(
              values.org_name,
              values.password,
              values.shenase_melli,
              values.org_registration_number
            ),
            handleAvatar(),
          ]);
        })();
        console.log("in the handlesubmission if when nationalid is valid");
      } catch (error) {
        console.log(error);
      }
    } else if (
      selectedFile &&
      (values.shenase_melli === "" ||
        values.org_registration_number === "")
    ) {
      await handleAvatar();
    } else {
      setInvalidNationalIdMessage("کدملی صحیح نمی باشد.");
    }
    return isValidNationalId;
  };

  const { handleChange, values, handleSubmit, isValid } = useFormik({
    initialValues,
    onSubmit: handleSubmission,
  });
  const isValidNationalId = verifyIranianNationalId(values.shenase_melli);
  useEffect(() => {
    if (values.shenase_melli === "") {
      setInvalidNationalIdMessage("");
    }
  }, [values.shenase_melli, invalidNationalIdMessage]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-[5%]">
        <div className="flex flex-col justify-between">
          <PanelFields
            label="نام سازمان:"
            onChange={handleChange}
            value={values.org_name}
            disable={false}
          />

          <PanelFields
            label="پسورد:"
            onChange={handleChange}
            value={values.password}
            name="name_of_Organization"
          />

          <div className="relative">
            <PanelFields
              label="شناسه ملی:"
              onChange={handleChange}
              value={values.shenase_melli}
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
            value={values.org_registration_number}
            name="registration_Number"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className={`text-white px-3 py-1 rounded-lg ${
            !selectedFile ? "bg-indigo-400" : "bg-[#4866CF]"
          }`}
          type="submit"
          disabled={!selectedFile ? true : false}
        >
          تایید ویرایش
        </button>
      </div>
    </form>
  );
}

export default Legal;
