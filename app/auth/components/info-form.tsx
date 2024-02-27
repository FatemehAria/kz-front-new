"use client";

import axios from "axios";
import Link from "next/link";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SubmissionBtn from "./submission-btn";

type infoFormProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const PhoneNumberRegex = /^(09)\d{9}$/;
const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
// const FirstNameRegex = /^(?:[A-Za-z][^\W\d_]){2,}[A-Za-z]$/;
// const LastNameRegex = /^(?:[A-Za-z][^\W\d_]){3,}[A-Za-z]$/;

const InfoForm = ({ setSteps }: infoFormProps) => {
  const [localStoragePhoneNumber, setLocalStoragePhoneNumber] =
    useState<string>("");
  const [info, setInfo] = useState({
    PhoneNumber: "",
    FirstName: "",
    LastName: "",
    Password: "",
    confirmPassword: "",
    skils: "",
  });

  const [validPassword, setValidPassword] = useState(false);
  const [PasswordFocus, setPasswordFocus] = useState(false);
  const [validConfirmPass, setValidConfirmPass] = useState(false);
  const [ConfirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const validate =
    validConfirmPass && validPassword;

  const { PhoneNumber, FirstName, LastName, Password, confirmPassword } = info;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSteps(1);
      // console.log("first");
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStoragePhone = window.localStorage.getItem("PhoneNumber");
      setLocalStoragePhoneNumber(localStoragePhone || "");
    }
  }, []);

  const sendInfo = async (
    PhoneNumber: string,
    FirstName: string,
    LastName: string,
    Password: string,
    confirmPassword: string
  ) => {
    try {
      console.log(PhoneNumber);
      const { data } = await axios.post(
        "https://keykavoos.liara.run/User/Signup3",
        {
          PhoneNumber: localStoragePhoneNumber,
          FirstName,
          LastName,
          Password,
          confirmPassword,
        }
      );
      console.log(data);
      setSteps(4);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const passwordResult = PasswordRegex.test(Password);
    setValidPassword(passwordResult);
    setValidConfirmPass(Password === confirmPassword);
    // const firstnameResult = FirstNameRegex.test(FirstName);
    // setValidFirstName(firstnameResult);
    // const lastnameResult = LastNameRegex.test(LastName);
    // setValidLastName(lastnameResult);
    const phoneNumberResult = PhoneNumberRegex.test(PhoneNumber);
    setValidPhoneNumber(phoneNumberResult);
  }, [Password, confirmPassword, FirstName, LastName, PhoneNumber]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendInfo(PhoneNumber, FirstName, LastName, Password, confirmPassword);
  };

  return (
    <form onSubmit={(e) => handleSubmission(e)} className="pb-[8%] lg:pb-0">
      <div className="grid grid-cols-1 gap-y-[2%]">
        <input
          placeholder="شماره موبایل"
          className="border w-full p-[3%] rounded-md text-center text-lg bg-gray-100"
          value={localStoragePhoneNumber}
          onChange={(e) => setLocalStoragePhoneNumber(e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-x-[3%]">
          <input
            placeholder="نام"
            className="border p-[3%] rounded-md"
            value={info.FirstName}
            onChange={(e) =>
              setInfo((last) => ({ ...last, FirstName: e.target.value }))
            }
            minLength={3}
            maxLength={11}
            required
          />

          <input
            placeholder="نام خانوادگی"
            className="border p-[3%] rounded-md"
            value={info.LastName}
            onChange={(e) =>
              setInfo((last) => ({ ...last, LastName: e.target.value }))
            }
            minLength={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-[3%]">
          <div className="w-full flex flex-col">
            <input
              placeholder="رمز عبور"
              className="border p-[3%] rounded-md"
              value={info.Password}
              onChange={(e) =>
                setInfo((last) => ({ ...last, Password: e.target.value }))
              }
              aria-describedby="passnot"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
            />
            <p
              id="passnote"
              className={
                PasswordFocus && Password && !validPassword
                  ? "bg-black text-white text-[0.75rem] p-[0.25rem] rounded-lg relative -bottom-[10px]"
                  : "absolute -left-[9999px]"
              }
            >
              رمز عبور باید شامل یک کاراکتر بزرگ، یک کاراکتر کوچک و حداقل به طول
              هشت باشد
            </p>
          </div>
          <div className="w-full flex flex-col">
            <input
              placeholder="تکرار رمز عبور"
              className="border p-[3%] rounded-md"
              value={info.confirmPassword}
              onChange={(e) =>
                setInfo((last) => ({
                  ...last,
                  confirmPassword: e.target.value,
                }))
              }
              aria-describedby="confrimpassnot"
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
              required
            />
            <p
              id="confirmnote"
              className={
                ConfirmPasswordFocus && confirmPassword && !validConfirmPass
                  ? "bg-black text-white text-[0.75rem] p-[0.25rem] rounded-lg relative -bottom-[10px]"
                  : "absolute -left-[9999px]"
              }
            >
              پسووردها همخوانی ندارند.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-[3%] items-center">
          {/* <input
            placeholder="مهارت ها"
            className="border p-[3%] rounded-md"
            value={info.skils}
            onChange={(e) =>
              setInfo((last) => ({ ...last, skils: e.target.value }))
            }
            required
          /> */}
          <div className="text-left">
            <SubmissionBtn text="تایید اطلاعات" validation={validate} />
          </div>
        </div>
      </div>
    </form>
  );
};
export default InfoForm;
