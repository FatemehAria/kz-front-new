"use client";
import { useGetUserRoles } from "@/hooks/useGetUserRoles";
import {
  openModal,
  handleAutoFocus,
  updateStatus,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { userRoleType } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type ModalProps = {
  showModal: boolean;
  data?: any;
  text?: string;
  isLoggingIn?: boolean;
  setSteps?: Dispatch<SetStateAction<number>>;
  setStartLogin: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText?: string;
  mainButtonText?: string;
  executeFunction?: any;
  executeFunction2?: any;
  setCounter?: any;
  changeNumber?: boolean;
  isLoggedIn?: boolean;
  redirect?: boolean;
};
function Modal({
  showModal,
  data,
  text,
  isLoggingIn,
  setStartLogin,
  buttonText,
  setSteps,
  mainButtonText,
  executeFunction,
  executeFunction2,
  setCounter,
  changeNumber,
  isLoggedIn,
  redirect,
}: ModalProps) {
  const { token, role } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getTokenFromLocal());
  }, []);
  console.log(role);
  console.log(token);
  const handleMainButtonClick = () => {
    dispatch(openModal(false));
    if (isLoggingIn) {
      if (!token) {
        setStartLogin(true);
        setSteps?.(1);
      }
    } else {
      setSteps?.(3);
    }
  };

  const handlePrimaryButtonClick = () => {
    dispatch(openModal(false));
  };
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        showModal ? "block" : "hidden"
      }  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-50 flex justify-center items-center backdrop-blur-sm h-full`}
    >
      <div className="p-4 w-full">
        <div className="relative p-8 w-full max-w-2xl max-h-full">
          <div className="bg-white rounded-[25px] shadow border">
            <div className="md:p-5 text-black font-semibold">
              <p className="text-[20px] leading-relaxed max-w-sm mx-auto py-3">
                {/* متن */}
                {/* شماره همراه ؟ شماره تماس مورد تایید است : شماره همراه را وارد کنید*/}
                {text}
              </p>
              {/* شماره موبایل */}
              {/* شماره همراه ؟ شماره همراه : "" */}
              <p className="text-[32px]">{data}</p>
            </div>

            <div className="flex items-center justify-between p-4 md:p-5 rounded-b whitespace-nowrap">
              {/* اگر شماره موبایل بود */}

              <button
                onClick={() => handleMainButtonClick()}
                type="button"
                className="text-white bg-[#4866CF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 md:py-2.5 text-center"
              >
                تایید شماره همراه
              </button>
              <div
                className={`${
                  data === "" && "flex justify-center w-full text-center "
                }`}
              >
                <button
                  onClick={() => handlePrimaryButtonClick()}
                  type="button"
                  className={`md:py-2.5 md:px-5 ms-3 px-5 text-sm font-medium focus:outline-none rounded-lg border border-[#4866CF] ${
                    data
                      ? "self-center bg-[#4866CF] text-white"
                      : " bg-white text-[#4866CF]"
                  }`}
                >
                  تغییر شماره همراه
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
