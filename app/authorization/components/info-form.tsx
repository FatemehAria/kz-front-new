"use client";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmissionBtn from "./submission-btn";
import { useFormik } from "formik";
import { UserPanelPersonalSchema } from "@/schemas/userpanel-profile-schema";
import FormInput from "@/app/contact-us/components/form/form-inputs";
import Modal from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import SubmitOrderDropdown from "@/app/panel/user/submit-order/components/submit-order-dropdown";
import { RegisterInfo } from "@/utils/utils";

type infoFormProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const initialValues = {
  FirstName: "",
  LastName: "",
  Password: "",
  type: "",
  shenase_melli: "",
  shomare_sabt: "",
};

const InfoForm = ({ setSteps }: infoFormProps) => {
  const dispatch = useDispatch();
  const { showModal, successMessage } = useSelector(
    (state: any) => state.userData
  );
  const [PhoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let number = window.localStorage.getItem("PhoneNumber");
      setPhoneNumber(number || "");
    }
  }, []);

  const handleSubmission = async () => {
    await RegisterInfo(
      values.FirstName,
      values.LastName,
      values.Password,
      PhoneNumber,
      values.type,
      values.shenase_melli,
      values.shomare_sabt
    );
    setSteps(5);
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
    validationSchema: UserPanelPersonalSchema,
    validateOnMount: true,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {showModal && (
        <Modal
          showModal={showModal}
          text={successMessage}
          buttonText="متوجه شدم"
          data=""
          redirect={true}
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

      <div className="grid grid-cols-1 gap-5">
        <FormInput
          value={PhoneNumber}
          label="شماره تماس"
          type="tel"
          name="PhoneNumber"
          disabled={true}
        />
        {/* required */}
        <div className="grid grid-cols-2 gap-0">
          <div className="relative">
            <FormInput
              value={values.FirstName}
              onChange={handleChange}
              name="FirstName"
              label="نام"
              error={errors.FirstName && touched.FirstName}
              onBlur={handleBlur}
              type="text"
              autoFocus={true}
            />
            <span className="absolute -top-5 right-0 text-[#4866CF]">*</span>
          </div>

          <div className="relative">
            <FormInput
              value={values.LastName}
              onChange={handleChange}
              name="LastName"
              label="نام خانوادگی"
              error={errors.LastName && touched.LastName}
              onBlur={handleBlur}
              type="text"
            />
            <span className="absolute -top-5 right-0 text-[#4866CF]">*</span>
          </div>

          <div className="relative">
            <FormInput
              value={values.Password}
              onChange={handleChange}
              name="Password"
              label="رمزعبور"
              error={errors.Password && touched.Password}
              onBlur={handleBlur}
              type="text"
            />
            <span className="absolute -top-5 right-0 text-[#4866CF]">*</span>
          </div>

          <SubmitOrderDropdown
            dropDownTitle=""
            dropdownItems={["حقیقی", "حقوقی"]}
            onChange={handleChange}
            value={values.type}
            name="type"
          />
        </div>
        {/* optional */}
        <div
          className={`flex flex-row ${
            values.type === "حقوقی" ? "inline-block" : "hidden"
          }`}
        >
          <React.Fragment>
            <div className="flex flex-col justify-end relative">
              <FormInput
                value={values.shenase_melli}
                onChange={handleChange}
                name="shenase_melli"
                label="شناسه ملی"
                error={errors.shenase_melli && touched.shenase_melli}
                onBlur={handleBlur}
                type="text"
              />
              <span className="absolute -top-7 right-20 text-[#4866CF]">*</span>
            </div>
            <div className="flex flex-col justify-end relative">
              <FormInput
                value={values.shomare_sabt}
                onChange={handleChange}
                name="shomare_sabt"
                label="شماره ثبت"
                error={errors.shomare_sabt && touched.shomare_sabt}
                onBlur={handleBlur}
                type="text"
              />
              <span className="absolute -top-7 right-20 text-[#4866CF]">*</span>
            </div>
          </React.Fragment>
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
  );
};
export default InfoForm;
