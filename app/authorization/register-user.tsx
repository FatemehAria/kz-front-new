"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import SubmissionBtn from "./components/submission-btn";
import Logo from "./components/logo";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserByOTPInLoginAndRegistration } from "@/redux/features/user/userSlice";
import sms from "../../public/Auth/sms.svg";
import phone from "../../public/Auth/phone.svg";
import Modal from "@/components/modal";
import FormInput from "../contact-us/components/form/form-inputs";
import OTPInput from "react-otp-input";
import { getNewOTP, getOTPViaCall } from "@/utils/utils";
import { AuthContext } from "./context/AuthContext";
import { useTimer } from "@/hooks/useTimer";

const RegisterUser = () => {
  const {
    PhoneNumberInput,
    successMessage,
    errorMessage,
    userInfoOnLogin,
    showModal,
  } = useSelector((state: any) => state.userData);
  const { setAuthSteps } = useContext(AuthContext);
  const { counter, setCounter } = useTimer();
  const dispatch = useDispatch();
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && PhoneNumberInput === true) {
      const number = window.localStorage.getItem("PhoneNumber");
      setPhoneNumber(number || "");
    } else if (PhoneNumberInput === false) {
      window.localStorage.removeItem("PhoneNumber");
    }
  }, [PhoneNumber, PhoneNumberInput]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await dispatch<any>(
    //   verifyUserByOTPInLoginAndRegistration({
    //     mobile: PhoneNumber,
    //     otp_code: OTP,
    //   })
    // );
    
    // if(تایپ یوزر === حقوقی){
      setAuthSteps(6);
    // }
  };

  return (
    <div>
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
                value={
                  PhoneNumberInput
                    ? PhoneNumber.slice(9) + "*****" + PhoneNumber.slice(0, 4)
                    : PhoneNumber
                }
                label="شماره تماس"
                type="tel"
                name="PhoneNumber"
                disabled={PhoneNumberInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(e.target.value)
                }
              />
              <OTPInput
                value={OTP}
                onChange={setOTP}
                numInputs={6}
                inputStyle={{
                  border: "0.3px solid lightgray",
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
                shouldAutoFocus={true}
              />
              {errorMessage !== "" && showModal && (
                <Modal
                  showModal={showModal}
                  buttonText="ارسال مجدد کد"
                  mainButtonText="تغییر شماره همراه"
                  text={errorMessage}
                  data="  "
                  executeFunction={() => getNewOTP(PhoneNumber)}
                  setCounter={setCounter}
                  changeNumber={true}
                  setSteps={setAuthSteps}
                  isLoggedIn={userInfoOnLogin}
                />
              )}
              {successMessage !== "" && showModal && (
                <Modal
                  showModal={showModal}
                  buttonText="متوجه شدم"
                  text={successMessage}
                  data=""
                  redirect={userInfoOnLogin}
                  isLoggedIn={userInfoOnLogin}
                  setSteps={setAuthSteps}
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
    </div>
  );
};
export default RegisterUser;
