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
import { useDispatch, useSelector } from "react-redux";
import FormSlider from "./components/form-slider";
import Logo from "./components/logo";
import SubmissionBtn from "./components/submission-btn";
import { useRouter } from "next/navigation";
import {
  fetchUserInOTPLogin,
  updateStatus,
} from "@/redux/features/user/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

type UserExistsProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};

const LoginOTPValidation = ({ setSteps }: UserExistsProps) => {
  const [OTP, setOTP] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [validOTP, setValidOTP] = useState(false);
  const [validOTPMsg, setValidOTPMsg] = useState("");
  const [counter, setCounter] = useState(90);
  const router = useRouter();
  const dispatch = useDispatch();

  const { status, userRole } = useSelector((state: any) => state.userRole);

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
  }, []);

  useEffect(() => {
    if (PhoneNumber.length > 0) {
      getNewOTP(PhoneNumber);
    }
  }, [PhoneNumber]);

  const getNewOTP = async (PhoneNumber: string) => {
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
    if (status === "failed") {
      return setValidOTPMsg("کد وارد شده صحیح نمی باشد.");
    }
    if (status === "success") {
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
      if (userRole.UserType === "User") {
        router.replace("/panel");
      } else if (userRole.UserType === "Admin") {
        router.replace("/panel/main-admin/profile");
      } else if (userRole.UserType === "GeneralAdmin") {
        router.replace("/panel/main-admin/profile");
      } else if (userRole.UserType === "Employer") {
        router.replace("/panel/employer-panel");
      }
    }
  }, [status, OTP]);

  useEffect(() => {
    dispatch(updateStatus());
  }, [OTP]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch<any>(fetchUserInOTPLogin({ PhoneNumber, OTP }));
  };

  return (
    <div className="w-[80%] mx-auto">
      <div
        className="mx-auto grid lg:grid-cols-2 grid-cols-1 font-YekanBakh rounded-3xl overflow-hidden my-[3%] shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
        dir="rtl"
      >
        <div className="py-[8%] lg:py-0">
          <div className="p-[5%]">
            <Logo />
          </div>
          <form
            onSubmit={(e) => handleSubmission(e)}
            className="flex flex-col justify-start gap-[3%] px-[5%] h-full"
          >
            <div>
              <p className="lg:w-[90%]">
                به {PhoneNumber} یک کد تایید ارسال شد.
              </p>
              <p
                className="text-[#4866CF] text-sm cursor-pointer"
                onClick={() => setSteps(1)}
              >
                ویرایش شماره
              </p>
            </div>
            <div className="w-[90%] flex flex-col gap-4">
              <input
                type="text"
                placeholder="کد تایید"
                className="border w-full p-[3%] rounded-md"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                maxLength={4}
                autoFocus
              />
              {validOTP !== true && (
                <p
                  className={`w-[100%] ${
                    validOTPMsg && status === "failed"
                      ? "bg-black text-[0.75rem] p-[0.25rem] text-white relative -bottom-[10px] rounded-lg"
                      : "absolute -left-[9999px]"
                  }`}
                >
                  {validOTPMsg}
                </p>
              )}
              <div className="flex justify-between items-center">
                <span
                  className="text-[#4866CF] cursor-pointer"
                  onClick={async () =>
                    counter === 0 &&
                    (await getNewOTP(PhoneNumber), setCounter(90))
                  }
                >
                  {counter === 0
                    ? "ارسال مجدد"
                    : `${counter} ثانیه تا ارسال مجدد.
                `}
                </span>
                <SubmissionBtn text="تایید کد تایید" validation={true} />
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
export default LoginOTPValidation;
