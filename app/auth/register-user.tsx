"use client";
import axios from "axios";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FormSlider from "./components/form-slider";
import SubmissionBtn from "./components/submission-btn";
import Logo from "./components/logo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserInOTPValidation,
} from "@/redux/features/user/userSlice";
import sms from "../../public/Auth/sms.svg";
import phone from "../../public/Auth/phone.svg";
import Modal from "@/components/modal";
import FormInput from "../contact-us/components/form/form-inputs";
import OTPInput from "react-otp-input";
type RegisterUserProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const RegisterUser = ({ setSteps }: RegisterUserProps) => {
  const { status } = useSelector((state: any) => state.userRole);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(90);
  // console.log("step 5 Register User");
  console.log(status);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) return prevCounter - 1;
        return 0;
      });
    }, 1000); // 1 second

    return () => clearTimeout(timeout);
  }, [counter]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const number = window.localStorage.getItem("PhoneNumber");
      setPhoneNumber(number || "");
    }
  }, [PhoneNumber]);

  const getOTP = async (PhoneNumber: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/getOTP",
        {
          PhoneNumber,
        }
      );
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    status === "failed" &&
      (setShowModal(true),
      setSuccessMessage(""),
      setErrorMessage(`کد یکبار مصرف مورد تایید نمی باشد
    دوباره اقدام فرمایید.`),
      setOTP(""));
    status === "success" &&
      (setShowModal(true), setErrorMessage(""), setSteps(3));
    status === "idle" && setShowModal(false);
  }, [status, OTP]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch<any>(fetchUserInOTPValidation({ PhoneNumber, OTP }));
    // setSteps(3);
    // await validateOTP(OTP, PhoneNumber);
  };

  return (
    <div>
      {/*  lg:grid lg:grid-cols-2 */}
      <div
        className="mx-auto grid grid-cols-1 font-YekanBakh rounded-3xl overflow-hidden shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
        dir="rtl"
      >
        <div className="py-[5%] w-full relative px-[5%]">
          <div>
            <Logo />
          </div>
          <form
            onSubmit={(e) => handleSubmission(e)}
            className="flex flex-col gap-5"
          >
            <label>
              <p className="font-bold text-[24px] pt-[3%] pb-1">
                ثبت نام در کیکاووس زمان
              </p>
              <p className="lg:w-[90%] text-[16px] py-4">
                لطفا کد 6 رقمی که به شماره همراه شما ارسال شده است را وارد کنید.
              </p>
            </label>

            <div className="flex flex-col gap-4">
              <FormInput
                value={PhoneNumber.slice(9) + "*****" + PhoneNumber.slice(0, 4)}
                label="شماره تماس"
                type="tel"
                name="PhoneNumber"
                disabled={true}
              />
              <OTPInput
                value={OTP}
                onChange={setOTP}
                numInputs={6}
                inputStyle={{
                  border: "1px solid black",
                  borderRadius: "7px",
                  width: "43px",
                  height: "50px",
                }}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                renderInput={(props) => <input {...props} />}
                inputType="tel"
              />
              {errorMessage !== "" && showModal && (
                <Modal
                  setShowModal={setShowModal}
                  showModal={showModal}
                  buttonText="ارسال مجدد کد"
                  mainButtonText="تغییر شماره همراه"
                  text={errorMessage}
                  data="  "
                />
              )}
              {successMessage !== "" && showModal && (
                <Modal
                  setShowModal={setShowModal}
                  showModal={showModal}
                  buttonText="متوجه شدم"
                  text={successMessage}
                  data=""
                />
              )}
              <div className="grid grid-cols-1 gap-3">
                <span
                  className={`flex w-full items-center text-[20px] gap-2 ${
                    counter === 0 && "text-blue-700 cursor-pointer "
                  }`}
                  onClick={async () =>
                    counter === 0 && (await getOTP(PhoneNumber), setCounter(90))
                  }
                >
                  <Image src={sms} alt="sms" />
                  {counter === 0
                    ? "ارسال مجدد"
                    : `${counter} ثانیه تا ارسال مجدد کد از طریق پیامک
                `}
                </span>
                <span className="flex w-full items-center gap-2 text-[20px]">
                  <Image src={phone} alt="phone" />
                  <span>ارسال کد از طریق تماس</span>
                </span>
              </div>
              <SubmissionBtn text="تایید رمز یکبارمصرف" validation={true} />
            </div>
          </form>
        </div>
        {/* <div className="lg:block hidden bg-[#4866CF]"> */}
          {/* <FormSlider /> */}
        {/* </div> */}
      </div>
    </div>
  );
};
export default RegisterUser;
