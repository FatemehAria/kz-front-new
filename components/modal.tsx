"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type ModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  data?: any;
  text?: string;
  buttonText?: string;
};
function Modal({
  setShowModal,
  showModal,
  data,
  text,
  buttonText,
}: ModalProps) {
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
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="bg-white rounded-[25px] shadow">
            <div className="p-4 md:p-5 space-y-4 text-black font-semibold">
              <p className="text-[24px] leading-relaxed">
                {text}
              </p>
              <p className="text-[32px] leading-relaxed">{data}</p>
            </div>

            <div className="flex items-center justify-between p-4 md:p-5 rounded-b">
              {data && (
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  تایید شماره همراه
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className={`py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 ${
                  data === "" &&
                  "flex w-full text-center justify-center bg-blue-800 text-white"
                }`}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
