"use client";
import {
  closeModal,
  handleAutoFocus,
  updateStatus,
} from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

type ModalProps = {
  showModal: boolean;
  data?: any;
  text?: string;
  buttonText?: string;
  setSteps?: Dispatch<SetStateAction<number>>;
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
  const { userType } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const router = useRouter();
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
                {text}
              </p>
              <p className="text-[32px]">{data}</p>
            </div>

            <div className="flex items-center justify-between p-4 md:p-5 rounded-b">
              {data && (
                <button
                  onClick={() => {
                    dispatch(closeModal(false));
                    setSteps?.(5);
                    // changeNumber && dispatch(updateInputDisability(false));
                    changeNumber && setSteps?.(1);
                    data !== "  " && executeFunction2();
                  }}
                  type="button"
                  className="text-white bg-[#4866CF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 md:py-2.5 text-center"
                >
                  {mainButtonText ? mainButtonText : "تایید شماره همراه"}
                </button>
              )}
              <div
                className={`${
                  data === "" && "flex justify-center w-full text-center "
                }`}
              >
                <button
                  onClick={() => {
                    dispatch(closeModal(false));
                    executeFunction && executeFunction() && setCounter(90);
                    !isLoggedIn && setSteps?.(3);
                    dispatch(handleAutoFocus(true));
                    redirect &&
                      (userType === "User"
                        ? router.replace("/panel")
                        : router.replace("/panel/admin/view-users"));
                  }}
                  type="button"
                  className={`md:py-2.5 md:px-5 ms-3 px-5 text-sm font-medium focus:outline-none rounded-lg border border-[#4866CF] ${
                    data.length === 0
                      ? "self-center bg-[#4866CF] text-white"
                      : " bg-white text-[#4866CF]"
                  }`}
                >
                  {buttonText}
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
