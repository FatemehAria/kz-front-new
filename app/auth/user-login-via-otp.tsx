"use client";
import { validateOTP } from "@/utils/utils";
import axios from "axios";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Logo from "./components/logo";
import FormSlider from "./components/form-slider";
import SubmissionBtn from "./components/submission-btn";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../contact-us/components/form/form-inputs";
import OtpInput from "react-otp-input";
import sms from "../../public/Auth/sms.svg";
import phone from "../../public/Auth/phone.svg";
import Modal from "@/components/modal";
import {
  fetchUserInOTPValidation,
  updateStatus,
} from "@/redux/features/user/userSlice";

type UserLoginViaOTPProps = {
  setSteps: Dispatch<SetStateAction<number>>;
  steps: number;
};

const UserLoginViaOTP = ({ setSteps }: UserLoginViaOTPProps) => {
  const { status, userRole } = useSelector((state: any) => state.userRole);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [counter, setCounter] = useState(90);
  const [OTP, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  console.log(status);
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
  // ارسال مجدد
  const getNewOTP = async (PhoneNumber: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/SendOTP",
        {
          PhoneNumber,
        }
      );
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  const validateOTP = async (OTP: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/OTP",
        {
          OTP,
        }
      );
      console.log(data);
      setSteps(3);
    } catch (error: any) {
      console.log(error.response.data.message);
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
      (setShowModal(true),
      setErrorMessage(""),
      setSuccessMessage("با موفقیت وارد پنل کاربری خود شدید."));
    status === "idle" && setShowModal(false);
  }, [status, OTP]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await validateOTP(OTP);
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
                }}
                renderInput={(props) => <input {...props} />}
                inputType="tel"
              />
              {errorMessage !== "" && showModal && (
                <Modal
                  setShowModal={setShowModal}
                  showModal={showModal}
                  buttonText="ارسال مجدد کد یکبارمصرف"
                  text={errorMessage}
                  data=""
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
                    counter === 0 &&
                    (await getNewOTP(PhoneNumber), setCounter(90))
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
        {/* <div className="lg:block hidden bg-[#4866CF]">
          <FormSlider />
        </div> */}
      </div>
    </div>
  );
};
export default UserLoginViaOTP;
