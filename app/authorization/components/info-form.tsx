"use client";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmissionBtn from "./submission-btn";
import { useFormik } from "formik";
import { UserRegistrationPersonalSchema } from "@/schemas/userpanel-profile-schema";
import FormInput from "@/app/contact-us/components/form/form-inputs";
import Modal from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import SubmitOrderDropdown from "@/app/panel/user/submit-order/components/submit-order-dropdown";
import { registerInfo, saveToLocalStorage } from "@/utils/utils";
import { openModal } from "@/redux/features/user/userSlice";
import FormValidationMsg from "./form-validation-msg";
import { verifyIranianNationalId } from "@persian-tools/persian-tools";
import InfoFormFieldContainer from "./info-form-filed-container";

type infoFormProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const initialValues = {
  FirstName: "",
  LastName: "",
  Password: "",
  type: "حقیقی",
  shenase_melli: "",
  shomare_sabt: "",
};

const InfoForm = ({ setSteps }: infoFormProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: any) => state.userData);
  const [PhoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let number = window.localStorage.getItem("PhoneNumber");
      setPhoneNumber(number as string);
    }
  }, []);

  const handleSubmission = async () => {
    try {
      setErrorMsg("");
      if (values.type !== "حقیقی") {
        if (verifyIranianNationalId(values.shenase_melli)) {
          console.log("کدملی معتبر");
          values.shenase_melli = values.shenase_melli;
        } else {
          console.log("کدملی نامعتبر");
          setErrorMsg("شناسه ملی معتبر نمی باشد.");
        }
      }
      await registerInfo(
        values.FirstName,
        values.LastName,
        values.Password,
        PhoneNumber,
        values.type === "حقیقی" ? "haghighi" : "hoghooghi",
        values.shenase_melli,
        values.shomare_sabt,
        setSteps
      );
    } catch (error: any) {
      setErrorMsg(error.message);
      dispatch(openModal(true));
    }
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
    validationSchema: UserRegistrationPersonalSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      saveToLocalStorage("name", values.FirstName);
      saveToLocalStorage("surname", values.LastName);
      saveToLocalStorage("type", values.type);
    }
  }, [values.FirstName, values.LastName, values.type]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {errorMsg && showModal && (
        <Modal
          showModal={showModal}
          text={errorMsg}
          buttonText="متوجه شدم"
          data=""
          redirect={true}
          setSteps={setSteps}
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

      <div className="grid grid-cols-1 gap-8">
        <FormInput
          value={PhoneNumber}
          label="شماره تماس"
          type="tel"
          name="PhoneNumber"
          disabled={true}
        />
        {/* required */}
        <div className="grid grid-cols-2 gap-8">
          <InfoFormFieldContainer errorMsg={errors.FirstName}>
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
            <span className="absolute -top-7 right-[3.25rem] z-20 text-[#4866CF]">
              *
            </span>
            {errors.FirstName && touched.FirstName && (
              <FormValidationMsg errorMsg={`${errors.FirstName}`} />
            )}
          </InfoFormFieldContainer>

          <InfoFormFieldContainer errorMsg={errors.LastName}>
            <FormInput
              value={values.LastName}
              onChange={handleChange}
              name="LastName"
              label="نام خانوادگی"
              error={errors.LastName && touched.LastName}
              onBlur={handleBlur}
              type="text"
            />
            <span className="absolute -top-7 right-[7rem] z-20 text-[#4866CF]">
              *
            </span>
            {errors.LastName && touched.LastName && (
              <FormValidationMsg errorMsg={`${errors.LastName}`} />
            )}
          </InfoFormFieldContainer>

          <InfoFormFieldContainer errorMsg={errors.Password}>
            <FormInput
              value={values.Password}
              onChange={handleChange}
              name="Password"
              label="رمزعبور"
              error={errors.Password && touched.Password}
              onBlur={handleBlur}
              type="text"
            />
            <span className="absolute -top-7 right-[5rem] z-20 text-[#4866CF]">
              *
            </span>
            {errors.Password && touched.Password && (
              <FormValidationMsg errorMsg={`${errors.Password}`} />
            )}
          </InfoFormFieldContainer>

          <div className="pb-0">
            <SubmitOrderDropdown
              dropDownTitle=""
              dropdownItems={["حقیقی", "حقوقی"]}
              onChange={handleChange}
              value={values.type}
              name="type"
            />
          </div>
        </div>
        {/* optional */}
        <div
          className={`flex flex-row gap-8 ${
            values.type === "حقوقی" ? "inline-block" : "hidden"
          }`}
        >
          <React.Fragment>
            <InfoFormFieldContainer errorMsg={errors.shenase_melli}>
              <FormInput
                value={values.shenase_melli}
                onChange={handleChange}
                name="shenase_melli"
                label="شناسه ملی"
                error={errors.shenase_melli && touched.shenase_melli}
                onBlur={handleBlur}
                type="text"
              />
              <span className="absolute -top-7 right-[6.5rem] text-[#4866CF]">
                *
              </span>
              {errors.shenase_melli && touched.shenase_melli && (
                <FormValidationMsg
                  errorMsg={`${errorMsg ? errorMsg : errors.shenase_melli}`}
                />
              )}
            </InfoFormFieldContainer>
            <InfoFormFieldContainer errorMsg={errors.shomare_sabt}>
              <FormInput
                value={values.shomare_sabt}
                onChange={handleChange}
                name="shomare_sabt"
                label="شماره ثبت"
                error={errors.shomare_sabt && touched.shomare_sabt}
                onBlur={handleBlur}
                type="text"
              />
              <span className="absolute -top-7 right-[6.5rem] text-[#4866CF]">
                *
              </span>
              {errors.shomare_sabt && touched.shomare_sabt && (
                <FormValidationMsg
                  errorMsg={`${errorMsg ? errorMsg : errors.shomare_sabt}`}
                />
              )}
            </InfoFormFieldContainer>
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
