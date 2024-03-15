"use client";
import Logo from "@/app/authorization/components/logo";
import SubmissionBtn from "@/app/authorization/components/submission-btn";
import FormInput from "@/app/contact-us/components/form/form-inputs";
import Modal from "@/components/modal";
import {
  fetchUserInOTPValidation,
  handleAutoFocus,
} from "@/redux/features/user/userSlice";
import { getNewOTP, getOTPViaCall } from "@/utils/utils";
import Image from "next/image";
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import sms from "../../../public/Auth/sms.svg";
import phone from "../../../public/Auth/phone.svg";
type UserLoginViaOTPProps = {
    setSteps: Dispatch<SetStateAction<number>>;
    steps: number;
  };
function EnterOTP({ setSteps }: UserLoginViaOTPProps) {
  const {
    userInfoOnLogin,
    status,
    successMessage,
    errorMessage,
    showModal,
    autoFocus,
  } = useSelector((state: any) => state.userData);
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
      dispatch(handleAutoFocus(true));
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
            <label className="md:whitespace-nowrap">
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
                        (await getNewOTP(PhoneNumber), setCounter(90))
                      }
                    >
                      <Image src={sms} alt="sms" />
                      <span>ارسال مجدد</span>
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
                type={showModal ? "button" : "submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EnterOTP;