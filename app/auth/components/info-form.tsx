"use client";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmissionBtn from "./submission-btn";
import { useFormik } from "formik";
import { UserPanelPersonalSchema } from "@/schemas/userpanel-profile-schema";
import FormInput from "@/app/contact-us/components/form/form-inputs";
import Modal from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataInRegistration } from "@/redux/features/user/userSlice";

type infoFormProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const initialValues = {
  FirstName: "",
  LastName: "",
  email: "",
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSteps(1);
      // console.log("first");
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmission = async () => {
    const FirstName = formik.values.FirstName;
    const LastName = formik.values.LastName;
    const email = formik.values.email;
    await dispatch<any>(
      fetchUserDataInRegistration({ FirstName, LastName, email, PhoneNumber })
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
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-1 gap-8">
          <div className="relative">
            <FormInput
              value={formik.values.FirstName}
              onChange={formik.handleChange}
              name="FirstName"
              label="نام"
              error={formik.errors.FirstName && formik.touched.FirstName}
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-[3%] items-center">
          <div className="text-left">
            <SubmissionBtn
              text="تایید اطلاعات"
              validation={formik.isValid}
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default InfoForm;
