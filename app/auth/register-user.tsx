"use client";
import axios from "axios";
import Image from "next/image";
import {
  ChangeEvent,
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
import { fetchUserInOTPValidation } from "@/redux/features/user/userSlice";
import sms from "../../public/Auth/sms.svg";
import phone from "../../public/Auth/phone.svg";
import Modal from "@/components/modal";
import FormInput from "../contact-us/components/form/form-inputs";
import OTPInput from "react-otp-input";
import { Bounce, toast } from "react-toastify";
type RegisterUserProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const RegisterUser = ({ setSteps }: RegisterUserProps) => {
  const { PhoneNumberInput } = useSelector((state: any) => state.userRole);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(90);
  const [successMessage, setSuccessMessage] = useState("");
  const [User, setUser] = useState();
  const [redirectToAuth, setRedirectToAuth] = useState(false);

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
    if (typeof window !== "undefined" && PhoneNumberInput === true) {
      const number = window.localStorage.getItem("PhoneNumber");
      setPhoneNumber(number || "");
    } else if (PhoneNumberInput === false) {
      window.localStorage.removeItem("PhoneNumber");
    }
  }, [PhoneNumber, PhoneNumberInput]);
  console.log("register user");
  const getNewOTP = async (PhoneNumber: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/SendOTP",
        {
          PhoneNumber,
        }
      );
      // console.log(data);
    } catch (error: any) {
      // console.log(error);
    }
  };
  const validateOTP = async (PhoneNumber: string, OTP: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/OTP",
        {
          PhoneNumber,
          OTP,
        }
      );
      setShowModal(true), setErrorMessage("");
      // console.log(data);
      if (!data.User) {
        setSteps(3);
      } else if (data.isLogin === false && data.User) {
        // console.log(data.isLogin);
        setUser(data.User);
        setRedirectToAuth(true);
        setSuccessMessage(
          `${data.User.FirstName} ${data.User.LastName} عزیز لطفا وارد پنل کاربری خود شوید.`
        );
        setTimeout(() => {
          setSteps(1);
        }, 1500);
      }
    } catch (error: any) {
      setShowModal(true);
      setErrorMessage(`کد یکبار مصرف مورد تایید نمی باشد
    دوباره اقدام فرمایید.`);
      setOTP("");
      // console.log(error);
    }
  };
  const getOTPViaCall = async (PhoneNumber: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Client/SendCallOTP",
        {
          PhoneNumber,
        }
      );
      toast.success("در حال برقراری تماس...", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      // console.log(data);
    } catch (error) {
      toast.error("خطا در برقراری تماس.", {
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
      // console.log(error);
    }
  };

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await validateOTP(PhoneNumber, OTP);
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
            <label className="whitespace-nowrap">
              <p className="font-bold text-[24px] pt-[3%] pb-1">
                ثبت نام در کیکاووس زمان
              </p>
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
                  setShowModal={setShowModal}
                  showModal={showModal}
                  buttonText="ارسال مجدد کد"
                  mainButtonText="تغییر شماره همراه"
                  text={errorMessage}
                  data="  "
                  executeFunction={() => getNewOTP(PhoneNumber)}
                  setCounter={setCounter}
                  changeNumber={true}
                  setSteps={setSteps}
                  isLoggedIn={true}
                />
              )}
              {successMessage !== "" && showModal && (
                <Modal
                  setShowModal={setShowModal}
                  showModal={showModal}
                  buttonText="متوجه شدم"
                  text={successMessage}
                  data=""
                  redirect={true}
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
        {/* <div className="lg:block hidden bg-[#4866CF]"> */}
        {/* <FormSlider /> */}
        {/* </div> */}
      </div>
    </div>
  );
};
export default RegisterUser;
