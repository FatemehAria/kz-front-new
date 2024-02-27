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
import { useDispatch } from "react-redux";
import { changePhoneNumber } from "@/redux/features/user/userSlice";

type UserCheckProps = {
  setSteps: Dispatch<SetStateAction<number>>;
  steps: number;
};

const UserCheck = ({ setSteps }: UserCheckProps) => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(90);
  const dispatch = useDispatch();

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
      const PhoneNumber = window.localStorage.getItem("PhoneNumber");
      if (PhoneNumber !== null) {
        setPhoneNumber(PhoneNumber);
      } else {
        setPhoneNumber("");
      }
    }
  }, []);

  const validateOTP = async (OTP: string, PhoneNumber: string) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/Signup2",
        {
          OTP,
          PhoneNumber,
        }
      );
      console.log(data);
      setSteps(3);
    } catch (error: any) {
      console.log(error.response.data.message);
      setError("کد معتبر نیست.");
    }
  };
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

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await validateOTP(OTP, PhoneNumber);
  };
  useEffect(() => {
    setError("");
  }, [OTP]);

  return (
    <div className="w-[80%] mx-auto">
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 font-YekanBakh rounded-xl overflow-hidden my-[3%] shadow-2xl shadow-[13px_0_61px_-24px_rgba(0, 0, 0, 0.15)]"
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
              <span
                className="text-[#4866CF] text-sm cursor-pointer"
                onClick={() => (dispatch(changePhoneNumber()), setSteps(1))}
              >
                ویرایش شماره
              </span>
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
              <p
                className={`w-[100%] ${
                  error
                    ? "bg-black text-[0.75rem] p-[0.25rem] text-white relative -bottom-[10px] rounded-lg"
                    : "absolute -left-[9999px]"
                }`}
              >
                {error}
              </p>
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
export default UserCheck;
