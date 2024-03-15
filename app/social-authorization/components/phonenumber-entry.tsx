"use client";
import Logo from "@/app/authorization/components/logo";
import SubmissionBtn from "@/app/authorization/components/submission-btn";
import FormInput from "@/app/contact-us/components/form/form-inputs";
import Modal from "@/components/modal";
import { LoginSchema } from "@/schemas/userpanel-profile-schema";
import { login2 } from "@/utils/utils";
import axios from "axios";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
type LoginProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};

const initialValues = {
  PhoneNumber: "",
};
function PhonenumberEntry({ setSteps }: LoginProps) {
  const { showModal } = useSelector((state: any) => state.userData);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const login = async (PhoneNumber: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/SignUp",
        {
          PhoneNumber,
        }
      );
      toast.success("کد ارسال شد.", {
        position: "top-center",
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
      setSteps(2);
    } catch (error: any) {
      toast.error("خطا در ارسال کد.", {
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

  const handleSubmission = async () => {
    await login(formik.values.PhoneNumber);
    if (!executeRecaptcha) {
      console.log("Recaptcha not available");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

    const response = await axios({
      method: "post",
      url: "/api/recaptchaSubmit",
      data: {
        gRecaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmission,
    validationSchema: LoginSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("PhoneNumber", formik.values.PhoneNumber);
    }
  }, [formik.values.PhoneNumber]);

  return (
    <React.Fragment>
      <div
        className="mx-auto grid grid-cols-1 font-YekanBakh rounded-3xl overflow-hidden shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
        dir="rtl"
      >
        <div className="py-[5%] w-full relative px-[5%]">
          <Modal
            showModal={showModal}
            data={formik.values.PhoneNumber}
            text={`${
              formik.values.PhoneNumber
                ? "شماره تماس زیر مورد تایید است؟"
                : "شماره همراه خود را وارد کنید"
            }`}
            buttonText={`${
              formik.values.PhoneNumber ? "تغییر شماره همراه" : "تایید"
            }`}
            setSteps={setSteps}
            executeFunction2={() => login2(formik.values.PhoneNumber)}
            isLoggedIn={true}
          />
          <div>
            <Logo />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <form
              className="flex flex-col gap-5"
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="PhoneNumber">
                <p className="lg:w-[90%] text-[16px] leading-6 py-2">
                  لطفا شماره موبایل خود را وارد کنید.
                </p>
              </label>

              <div className="flex flex-col justify-end">
                <FormInput
                  onChange={formik.handleChange}
                  value={formik.values.PhoneNumber}
                  label="شماره تماس"
                  type="tel"
                  name="PhoneNumber"
                  error={formik.errors.PhoneNumber}
                  autoFocus={true}
                />
                <div className="relative">
                  {formik.errors.PhoneNumber && (
                    <p className="text-red-500 absolute left-1/2 -translate-x-1/2 w-full z-20">{`${formik.errors.PhoneNumber}`}</p>
                  )}
                </div>
              </div>
              <SubmissionBtn
                text="ورود"
                validation={formik.isValid}
                type={showModal ? "button" : "submit"}
              />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PhonenumberEntry;
