"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import SubmissionBtn from "../auth/components/submission-btn";
import Logo from "../auth/components/logo";
import FormSlider from "../auth/components/form-slider";
import FormInput from "../contact-us/components/form/form-inputs";
import { useFormik } from "formik";
import { LoginSchema } from "@/schemas/userpanel-profile-schema";
import LoginVia from "./components/login-via";
import Link from "next/link";
import Modal from "@/components/modal";

type LoginProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};

const initialValues = {
  PhoneNumber: "",
};

const Login = ({ setSteps }: LoginProps) => {
  const [showModal, setshowModal] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [answer, setAnswer] = useState("");
  console.log("login");
  const login = async (PhoneNumber: string) => {
    try {
      // const { data } = await axios.post(
      //   "https://keykavoos.liara.run/User/Signup1",
      //   {
      //     PhoneNumber,
      //   }
      // );
      // console.log(data);
      setSteps(2);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmission = async () => {
    await login(formik.values.PhoneNumber);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmission,
    validationSchema: LoginSchema,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("PhoneNumber", formik.values.PhoneNumber);
    }
  }, [formik.values.PhoneNumber]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const number = window.localStorage.getItem("PhoneNumber") || "";
      setPhoneNumber(number);
    }
  }, []);

  return (
    <div className="w-[80%] mx-auto">
      <div
        className="mx-auto grid grid-cols-1 lg:grid lg:grid-cols-2 font-YekanBakh rounded-3xl overflow-hidden my-[3%] shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
        dir="rtl"
      >
        <div className="py-[5%] w-full relative px-[5%]">
          <Modal
            setShowModal={setshowModal}
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
                <p className="font-bold text-[24px] pt-[3%] pb-1">
                  به خانواده ما خوش آمدید
                </p>
                <p className="lg:w-[90%] text-[16px]">
                  دوست عزیز سلام ! <br />
                  از این که شما را در جمع خود می بینیم بسیار خوشحالیم.
                  <br /> لطفا شماره تماس خود را وارد کنید.
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
                />
                <div className="relative">
                  {formik.errors.PhoneNumber && (
                    <p className="text-red-500 absolute left-1/2 -translate-x-1/2 w-full z-20">{`${formik.errors.PhoneNumber}`}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[8%]">
                <FormInput
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAnswer(e.target.value)
                  }
                  value={answer}
                  label="جواب سوال"
                  name="answer"
                />
                <input
                  type="text"
                  className="mx-auto outline-none rounded-md border-[0.3px] flex justify-center w-full text-center items-center text-3xl border-black"
                  style={{ direction: "ltr" }}
                  disabled={true}
                  value="10 + 22"
                />
              </div>
              <SubmissionBtn
                text="ورود"
                validation={formik.isValid && answer !== ""}
              />
            </form>
            <LoginVia />
            <div className="text-[16px] flex flex-row gap-1 justify-center items-center">
              <p>حساب کاربری ندارید؟</p>
              <span>
                <span
                  onClick={() => setshowModal(true)}
                  className="text-[#4866CF] cursor-pointer"
                >
                  ثبت نام
                </span>{" "}
                کنید.
              </span>
            </div>
          </div>
        </div>
        <div className="lg:block hidden bg-[#4866CF]">
          {/* <FormSlider /> */}
        </div>
      </div>
    </div>
  );
};
export default Login;
