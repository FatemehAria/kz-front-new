import React, { useEffect, useState } from "react";
import PanelFields from "../../components/panel-fileds";
import axios from "axios";
import { verifyIranianNationalId } from "@persian-tools/persian-tools";
import { useFormik } from "formik";
import { Bounce, toast } from "react-toastify";
import SettingsFileupload from "./components/settings-fileupload";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/redux/features/user/userSlice";
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
  userProfile: any;
};
function Legal({ PhoneNumber, userId, token, userProfile }: LegalProps) {
  const [invalidNationalIdMessage, setInvalidNationalIdMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const dispatch = useDispatch();
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleAvatar = async () => {
    const formData = new FormData();
    formData.append("Image", selectedFile);

    try {
      await axios.put(
        `https://keykavoos.liara.run/Client/UploadAvatar/${userId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // After successful upload, fetch updated user profile
      const { data } = await axios.get(
        `https://keykavoos.liara.run/Client/User/${userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // Dispatch an action to update the user profile with the new data
      dispatch(
        updateUserProfile({
            ...userProfile,
            avatar: {
                ...userProfile.avatar,
                path: data.data.avatar.path // Assuming the response contains the new avatar path
            }
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
      dispatch(
        updateUserProfile({
          ...userProfile,
          National_ID,
          type,
          name_of_Organization,
          registration_Number,
        })
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
    if (isValidNationalId && !selectedFile) {
      await LegalSubmission(
        values.National_ID,
        values.type,
        values.name_of_Organization,
        values.registration_Number
      );
    } else if (isValidNationalId && selectedFile) {
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
        })();
        console.log("in the handlesubmission if when nationalid is valid");
      } catch (error) {
        console.log(error);
      }
    } else if (
      selectedFile &&
      (values.National_ID === "" ||
        values.name_of_Organization === "" ||
        values.registration_Number === "")
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
  const isValidNationalId = verifyIranianNationalId(values.National_ID);
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
