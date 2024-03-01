"use client";
import {
  updateInputDisability,
  updateStatus,
} from "@/redux/features/user/userSlice";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type ModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  data?: any;
  text?: string;
  buttonText?: string;
  setSteps?: Dispatch<SetStateAction<number>>;
  mainButtonText?: string;
  executeFunction?: any;
  setCounter?: any;
  changeNumber?: boolean;
};
function Modal({
  setShowModal,
  showModal,
  data,
  text,
  buttonText,
  setSteps,
  mainButtonText,
  executeFunction,
  setCounter,
  changeNumber,
}: ModalProps) {
  const dispatch = useDispatch();
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
                    setShowModal(false);
                    setSteps?.(5);
                    dispatch(updateStatus());
                    changeNumber && dispatch(updateInputDisability(false));
                  }}
                  type="button"
                  className="text-white bg-[#4866CF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                    setShowModal(false);
                    dispatch(updateStatus());
                    executeFunction && executeFunction() && setCounter(90);
                  }}
                  type="button"
                  className={`py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border border-[#4866CF] ${
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
