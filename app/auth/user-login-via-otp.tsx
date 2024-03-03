"use client";
import Image from "next/image";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
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
import { getNewOTP, getOTPViaCall } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInOTPValidation, handleAutoFocus } from "@/redux/features/user/userSlice";

type UserLoginViaOTPProps = {
  setSteps: Dispatch<SetStateAction<number>>;
  steps: number;
};

const UserLoginViaOTP = ({ setSteps }: UserLoginViaOTPProps) => {
  const { userInfoOnLogin, status, successMessage, errorMessage, showModal, autoFocus } =
    useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [counter, setCounter] = useState(90);
  const [OTP, setOTP] = useState("");
  // COUNTER
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) return prevCounter - 1;
        return 0;
      });
    }, 1000); // 1 second

    return () => clearTimeout(timeout);
  }, [counter]);
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
    await dispatch<any>(fetchUserInOTPValidation({ PhoneNumber, OTP }));
  };
  useEffect(() => {
    if (status === "failed") {
      setOTP("");
      dispatch(handleAutoFocus(true))
    }
  }, [status]);

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
            <label className="whitespace-nowrap">
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
              {errorMessage !== "" && showModal && (
                <Modal
                  showModal={showModal}
                  buttonText="ارسال مجدد کد یکبارمصرف"
                  text={errorMessage}
                  data=""
                  executeFunction={() => getNewOTP(PhoneNumber)}
                  setCounter={setCounter}
                />
              )}
              {successMessage !== "" && showModal && (
                <Modal
                  showModal={showModal}
                  buttonText="متوجه شدم"
                  text={successMessage}
                  data=""
                  setSteps={setSteps}
                  isLoggedIn={userInfoOnLogin}
                  redirect={userInfoOnLogin}
                />
              )}
              <span
                className={`flex w-full items-center text-[20px] gap-2 ${
                  counter === 0 && "text-blue-700 cursor-pointer "
                }`}
              >
                <Image src={sms} alt="sms" />
                {counter === 0 ? (
                  <div className="flex flex-row w-full items-center gap-5 whitespace-nowrap">
                    <p
                      onClick={async () =>
                        counter === 0 &&
                        (await getNewOTP(PhoneNumber), setCounter(90))
                      }
                    >
                      ارسال مجدد
                    </p>
                    <p className="text-black">یا</p>
                    <p className="flex w-full items-center gap-2">
                      <Image src={phone} alt="phone" />
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          counter === 0 && getOTPViaCall(PhoneNumber)
                        }
                      >
                        ارسال کد از طریق تماس
                      </span>
                    </p>
                  </div>
                ) : (
                  `${counter} ثانیه تا ارسال مجدد کد از طریق پیامک
                `
                )}
              </span>
              <SubmissionBtn text="تایید رمز یکبارمصرف" validation={true} />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserLoginViaOTP;
