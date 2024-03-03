"use client";
import React, {
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
import Modal from "@/components/modal";
import { Bounce, toast } from "react-toastify";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import MathProblemComponent from "./components/math-problem-component";
import { login2 } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/features/user/userSlice";

type LoginProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};

const initialValues = {
  PhoneNumber: "",
};

const Login = ({ setSteps }: LoginProps) => {
  const { showModal } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [answer, setAnswer] = useState("");
  const [mathProblem, setMathProblem] = useState("");
  const [wrongAnswerMessage, setWrongAnswerMessage] = useState("");
  const [firstNumber, setFirstNumber] = useState(
    Math.floor(Math.random() * 10) + 1
  );
  const [secondNumber, setSecondNumber] = useState(
    Math.floor(Math.random() * 10) + 1
  );
  let correctAnswer = firstNumber + secondNumber;

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
    if (parseInt(answer) === correctAnswer) {
      await login(formik.values.PhoneNumber);
    }
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

    // if (response?.data?.success === true) {
    //   console.log(`Success with score: ${response?.data?.score}`);
    // } else {
    //   console.log(`Failure with score: ${response?.data?.score}`);
    // }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmission,
    validationSchema: LoginSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    setMathProblem(`${firstNumber} + ${secondNumber}`);

    if (answer === "") {
      setWrongAnswerMessage("");
    } else if (
      parseInt(answer) !== correctAnswer &&
      formik.values.PhoneNumber
    ) {
      setWrongAnswerMessage("پاسخ صحیح نیست.");
    } else if (parseInt(answer) === correctAnswer) {
      setWrongAnswerMessage("");
    }
  }, [answer, formik.values.PhoneNumber]);

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
                <p className="font-bold text-[24px] pt-[3%] pb-1">
                  به خانواده ما خوش آمدید
                </p>
                <p className="lg:w-[90%] text-[16px] leading-6">
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
                  autoFocus={true}
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
                <MathProblemComponent
                  mathProblem={mathProblem}
                  wrongAnswerMessage={wrongAnswerMessage}
                />
              </div>
              <SubmissionBtn
                text="ورود"
                validation={
                  formik.isValid && parseInt(answer) === correctAnswer
                }
              />
            </form>
            <LoginVia />
            <div className="text-[16px] flex flex-row gap-1 justify-center items-center">
              <p>حساب کاربری ندارید؟</p>
              <span>
                <span
                  onClick={() => dispatch(closeModal(true))}
                  className="text-[#4866CF] cursor-pointer"
                >
                  ثبت نام
                </span>{" "}
                کنید.
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
