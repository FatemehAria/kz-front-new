"use client";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmissionBtn from "./submission-btn";
import { useFormik } from "formik";
import { UserPanelPersonalSchema } from "@/schemas/userpanel-profile-schema";
import FormInput from "@/app/contact-us/components/form/form-inputs";
import Modal from "@/components/modal";

type infoFormProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const initialValues = {
  FirstName: "",
  LastName: "",
  email: "",
};

const InfoForm = ({ setSteps }: infoFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      let number = window.localStorage.getItem("PhoneNumber");
      setPhoneNumber(number || "");
    }
  }, []);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setSteps(1);
  //     // console.log("first");
  //   }, 5 * 60 * 1000); // 5 minutes in milliseconds

  //   return () => clearTimeout(timeout);
  // }, []);

  const sendInfo = async (
    FirstName: string,
    LastName: string,
    email: string,
    PhoneNumber: string
  ) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/SignUp_Form",
        {
          FirstName,
          LastName,
          email,
          PhoneNumber,
        }
      );
      setShowModal(true);
      setSuccessMessage(
        `${data.User.FirstName} ${data.User.LastName} عزیز با موفقیت وارد پنل کاربری خود شدید.`
      );
      // console.log(data);
    } catch (error: any) {
      setShowModal(false);
      // console.log(error);
    }
  };

  const handleSubmission = async () => {
    await sendInfo(
      formik.values.FirstName,
      formik.values.LastName,
      formik.values.email,
      PhoneNumber
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmission,
    validationSchema: UserPanelPersonalSchema,
    validateOnMount: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          text={successMessage}
          buttonText="متوجه شدم"
          data=""
        />
      )}
      <label>
        <p className="font-bold text-[24px] pt-[3%] pb-1">
          ثبت نام در کیکاووس زمان
        </p>
        <p className="text-[16px] py-4">
          اطلاعات خود را وارد کنید و به جمع ما بپیوندید تا از خدمات ویژه ما بهره
          مند شوید.
        </p>
      </label>
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-1 gap-8">
          <div className="relative">
            <FormInput
              value={formik.values.FirstName}
              onChange={formik.handleChange}
              name="FirstName"
              label="نام"
              error={formik.errors.FirstName && !formik.touched.FirstName}
              onBlur={formik.handleBlur}
              type="text"
              autoFocus={true}
            />
            <span className="absolute -top-7 right-12 text-[#4866CF]">*</span>
          </div>
          <div className="relative">
            <FormInput
              value={formik.values.LastName}
              onChange={formik.handleChange}
              name="LastName"
              label="نام خانوادگی"
              error={formik.errors.LastName && formik.touched.LastName}
              onBlur={formik.handleBlur}
              type="text"
            />
            <span className="absolute -top-7 right-28 text-[#4866CF]">*</span>
          </div>
          <div className="flex flex-col justify-end relative">
            <FormInput
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              label="پست الکترونیکی"
              error={formik.errors.email && formik.touched.email}
              onBlur={formik.handleBlur}
              type="text"
            />
            <span className="absolute -top-7 right-36 text-[#4866CF]">*</span>
            {/* <div className="relative">
              {formik.errors.email && (
                <p className="text-red-500 absolute left-1/2 -translate-x-1/2 w-full z-20">{`${formik.errors.email}`}</p>
              )}
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-[3%] items-center">
          <div className="text-left">
            <SubmissionBtn text="تایید اطلاعات" validation={formik.isValid} />
          </div>
        </div>
      </div>
    </form>
  );
};
export default InfoForm;
