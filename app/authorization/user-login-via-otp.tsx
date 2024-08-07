"use client";
import Image from "next/image";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Logo from "./components/logo";
import FormSlider from "./components/form-slider";
import SubmissionBtn from "./components/submission-btn";
import FormInput from "../contact-us/components/form/form-inputs";
import OtpInput from "react-otp-input";
import sms from "../../public/Auth/sms.svg";
import phone from "../../public/Auth/phone.svg";
import Modal from "@/components/modal";
import { sendOTPCodeMain } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAutoFocus,
  verifyUserByOTPInLoginAndRegistration,
} from "@/redux/features/user/userSlice";
import { AuthContext } from "./context/AuthContext";
import { useTimer } from "@/hooks/useTimer";
import { useRouter } from "next/navigation";

const UserLoginViaOTP = () => {
  const {
    isLoggedIn,
    status,
    successMessage,
    errorMessage,
    showModal,
    autoFocus,
    role,
  } = useSelector((state: any) => state.userData);
  const { setAuthSteps } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const { counter, setCounter } = useTimer();
  const router = useRouter();
  // PHONENUMBER FROM LOCALSTORAGE
  useEffect(() => {
    if (typeof window !== "undefined") {
      const PhoneNumber = window.localStorage.getItem("PhoneNumber");
      if (PhoneNumber !== null) {
        setPhoneNumber(PhoneNumber);
      } else {
        setPhoneNumber("");
      }
    }
  }, []);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("running");
    await dispatch<any>(
      verifyUserByOTPInLoginAndRegistration({
        otp_code: OTP,
        mobile: PhoneNumber,
      })
    );
    if (role === "admin" || role === "Admin")
      router.replace("/panel/admin/view-users");
    else router.replace("/panel/user/dashboard");
  };

  useEffect(() => {
    if (status === "failed") {
      setOTP("");
      dispatch(handleAutoFocus(true));
    }
  }, [status]);
  // console.log(successMessage);
  console.log("2");
  return (
    <React.Fragment>
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
            <label className="md:whitespace-nowrap">
              <p className="font-bold text-[24px] pt-[3%] pb-1">
                ورود به کیکاووس زمان
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
              <OtpInput
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
                  flexDirection: "row-reverse",
                }}
                renderInput={(props) => <input {...props} />}
                inputType="tel"
                shouldAutoFocus={autoFocus}
              />
              {/* {errorMessage !== "" && showModal && (
                <Modal
                  showModal={showModal}
                  buttonText="ارسال مجدد کد یکبارمصرف"
                  text={errorMessage}
                  data=""
                  executeFunction={() => sendOTPCodeMain(PhoneNumber)}
                  setCounter={setCounter}
                />
              )}
              {successMessage !== "" && showModal && (
                <Modal
                  showModal={showModal}
                  buttonText="متوجه شدم"
                  text={successMessage}
                  data=""
                  setSteps={setAuthSteps}
                  isLoggedIn={isLoggedIn}
                  redirect={isLoggedIn}
                />
              )} */}
              <span
                className={`w-full text-[20px] ${
                  counter === 0 && "text-blue-700 cursor-pointer "
                }`}
              >
                {counter === 0 ? (
                  <div className="flex flex-row flex-wrap lg:flex-nowrap w-full  items-center gap-10 whitespace-nowrap">
                    <p
                      className="flex items-center gap-2"
                      onClick={async () =>
                        counter === 0 &&
                        (sendOTPCodeMain(PhoneNumber,setAuthSteps), setCounter(90))
                      }
                    >
                      <Image src={sms} alt="sms" />
                      <span>ارسال مجدد</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 items-center">
                    <Image src={sms} alt="sms" />
                    <span className="whitespace-nowrap sm:text-xl text-sm xsm:text-lg">
                      {counter} ثانیه تا ارسال مجدد کد از طریق پیامک
                    </span>
                  </div>
                )}
              </span>
              <SubmissionBtn
                text="تایید رمز یکبارمصرف"
                validation={true}
                type="submit"
                // type={showModal ? "button" : "submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserLoginViaOTP;
