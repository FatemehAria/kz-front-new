"use client";
import React, { useContext } from "react";
import SubmissionBtn from "./components/submission-btn";
import { useFormik } from "formik";
import FormInput from "../contact-us/components/form/form-inputs";
import Logo from "./components/logo";
import { sendOTPCodeForRegistration } from "@/utils/utils";
import { InfoContext } from "./context/InfoContext";

const initialValues = {
  org_address: "",
  org_name: "",
  org_phone: "",
  org_registration_number: "",
};

function AdditionalInfoOnRegister({
  setSteps,
}: {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { savedInfo } = useContext(InfoContext);

  const handleSubmission = async () => {
    await sendOTPCodeForRegistration(
      savedInfo.name,
      savedInfo.surname,
      savedInfo.type,
      savedInfo.mobile,
      values.org_name,
      values.org_registration_number,
      values.org_address,
      values.org_phone
    );
    // setSteps(2);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    touched,
    errors,
  } = useFormik({
    initialValues,
    onSubmit: handleSubmission,
    validateOnMount: true,
  });

  return (
    <div
      className="mx-auto grid grid-cols-1 font-YekanBakh rounded-3xl overflow-hidden my-[3%] shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)] p-[5%]"
      dir="rtl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Logo />
        <label>
          <p className="font-bold text-[24px] pt-[3%] pb-1">
            ثبت نام در کیکاووس زمان
          </p>
          <p className="text-[16px] py-4">لطفا اطلاعات خود را کامل کنید.</p>
        </label>

        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 gap-8">
            <div className="relative">
              <FormInput
                value={values.org_name}
                onChange={handleChange}
                name="org_name"
                label="نام سازمان"
                error={errors.org_name && touched.org_name}
                onBlur={handleBlur}
                type="text"
                autoFocus={true}
              />
              <span className="absolute -top-6 right-[6.5rem] text-[#4866CF] z-20">
                *
              </span>
            </div>

            <div className="relative">
              <FormInput
                value={values.org_registration_number}
                onChange={handleChange}
                name="org_registration_number"
                label="شماره ثبت سازمان"
                error={
                  errors.org_registration_number &&
                  touched.org_registration_number
                }
                onBlur={handleBlur}
                type="text"
              />
              <span className="absolute -top-6 right-[9.25rem] text-[#4866CF] z-20">
                *
              </span>
            </div>

            <div className="relative">
              <FormInput
                value={values.org_address}
                onChange={handleChange}
                name="org_address"
                label="آدرس سازمان"
                error={errors.org_address && touched.org_address}
                onBlur={handleBlur}
                type="text"
              />
              <span className="absolute -top-6 right-[7.25rem] text-[#4866CF] z-20">
                *
              </span>
            </div>

            <div className="relative">
              <FormInput
                value={values.org_phone}
                onChange={handleChange}
                name="org_phone"
                label="شماره تماس سازمان"
                error={errors.org_phone && touched.org_phone}
                onBlur={handleBlur}
                type="text"
              />
              <span className="absolute -top-6 right-[10.25rem] text-[#4866CF] z-20">
                *
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-[3%] items-center">
            <div className="text-left">
              <SubmissionBtn
                text="تایید اطلاعات"
                validation={isValid}
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdditionalInfoOnRegister;
