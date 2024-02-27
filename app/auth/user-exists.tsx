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
import { fetchUserRole, updateStatus } from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import ShowPassword from "@/components/show-password";
import { Bounce, toast } from "react-toastify";
type UserExistsProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const UserExists = ({ setSteps }: UserExistsProps) => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const [oneTimeMsg, setOneTimeMsg] = useState("");
  const [onetimeSent, setOnetimeSent] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [counter, setCounter] = useState(90);
  const [show, setShow] = useState(false);

  const { status } = useSelector((state: any) => state.userRole);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) return prevCounter - 1;
        return 0;
      });
    }, 1000); // 1 second

    return () => clearTimeout(timeout);
  }, [counter]);

  let maxLength = onetimeSent ? 4 : 100;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const number = window.localStorage.getItem("PhoneNumber");
      setPhoneNumber(number || "");
    }
  }, [PhoneNumber]);

  const getNewPassword = async (PhoneNumber: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/getOTP",
        {
          PhoneNumber,
        }
      );
      console.log(data);
      setOnetimeSent(true);
      setOneTimeMsg("رمز یکبار مصرف ارسال شد.");
      setShowError("");
    } catch (error: any) {
      setOnetimeSent(false);
      console.log(error);
    }
  };

  const checkNewPassword = async (PhoneNumber: string, OTP: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/SendOTP",
        {
          PhoneNumber,
          OTP,
        }
      );
      localStorage.setItem("token", data.token);
      toast.success("با موفقیت وارد شدید.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      if (data.token.length > 0) {
        router.replace("/panel");
      }
    } catch (error: any) {
      setOneTimeMsg("کد وارد شده صحیح نمی باشد.");
      console.log(error.response.data.message);
    }
  };

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onetimeSent) {
      await checkNewPassword(PhoneNumber, Password);
    } else {
      dispatch<any>(fetchUserRole({ PhoneNumber, Password }));
    }
  };

  useEffect(() => {
    if (status === "failed") {
      return setShowError("رمز عبور اشتباه است."), setOneTimeMsg("");
    }
    if (status === "succeeded") {
      setSteps(6);
    }
  }, [status, Password]);

  useEffect(() => {
    dispatch(updateStatus());
  }, [Password]);

  return (
    <div className="w-[80%] mx-auto">
      <div
        className="mx-auto grid lg:grid-cols-2 font-YekanBakh rounded-3xl overflow-hidden my-[3%]"
        style={{ boxShadow: "13px 0px 61px -24px rgba(0, 0, 0, 0.15)" }}
        dir="rtl"
      >
        <div className="py-[8%] lg:py-0">
          <div className="p-[5%]">
            <Logo />
          </div>
          <form
            className="flex flex-col justify-start gap-[3%] px-[5%] h-full"
            onSubmit={(e) => handleSubmission(e)}
          >
            <label>
              <p className="font-bold text-[20px] pb-[5%]">
                ورود به کیکاووس زمان
              </p>
              <p className="lg:w-[90%]">
                شماره شما در سامانه ثبت شده است لطفا رمز عبور را وارد کنید.
              </p>
            </label>

            <div className="w-[90%] flex flex-col gap-4">
              <div className="flex flex-row relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder={
                    onetimeSent ? "کد یکبار مصرف" : "رمز عبور خود را وارد کنید"
                  }
                  className="border w-full p-[3%] px-[10%] rounded-md"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  maxLength={maxLength}
                  required
                />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
                  <ShowPassword show={show} setShow={setShow} />
                </div>
              </div>

              {showError && status === "failed" && (
                <p
                  className={`w-[100%] ${
                    showError && status === "failed"
                      ? "bg-black text-[0.75rem] p-[0.25rem] text-white relative -bottom-[10px] rounded-lg"
                      : "absolute -left-[9999px]"
                  }`}
                >
                  {showError}
                </p>
              )}

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span
                    className="text-[#4866CF] cursor-pointer"
                    onClick={() => (
                      getNewPassword(PhoneNumber), setCounter(90)
                    )}
                  >
                    {onetimeSent
                      ? `${
                          counter === 0
                            ? "ارسال مجدد"
                            : `${counter} ثانیه تا ارسال مجدد`
                        } `
                      : "رمز عبور یکبار مصرف"}
                  </span>

                  {oneTimeMsg !== "" && (
                    <span
                      className={`w-[100%] ${
                        oneTimeMsg !== ""
                          ? "bg-black text-[0.75rem] p-[0.25rem] text-white relative -bottom-[10px] rounded-lg"
                          : "absolute -left-[9999px]"
                      }`}
                    >
                      {oneTimeMsg}
                    </span>
                  )}
                </div>
                <SubmissionBtn text="تایید اطلاعات" validation={true} />
              </div>
            </div>
          </form>
        </div>
        <div className="lg:block hidden">
          <FormSlider />
        </div>
      </div>
    </div>
  );
};
export default UserExists;
