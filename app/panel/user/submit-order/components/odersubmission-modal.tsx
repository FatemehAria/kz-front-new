"use client";
import React from "react";

type OrdersubmissionModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  modalInputValue: string;
  setModalInputValue: React.Dispatch<React.SetStateAction<string>>;
};
function OrdersubmissionModal({
  showModal,
  setShowModal,
  data,
  setData,
  modalInputValue,
  setModalInputValue,
}: OrdersubmissionModalProps) {
  const handleSave = () => {
    if (modalInputValue.trim() !== "") {
      setData([...data, modalInputValue]);
    }
    setModalInputValue("");
  };
  // console.log(data);
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        showModal ? "block" : "hidden"
      }  absolute w-full text-center z-50 h-full backdrop-blur-sm`}
    >
      <div className="p-4 w-full flex justify-center">
        <div className="relative p-8 w-full max-w-2xl max-h-full">
          <div className="bg-white rounded-[25px] shadow border">
            <div className="md:p-5 text-black font-semibold">
              <input
                type="text"
                className="bg-[#EAEFF6] w-full rounded-[4px] p-2 outline-none"
                autoFocus={true}
                value={modalInputValue}
                onChange={(e) => setModalInputValue(e.target.value)}
              />
              <div className="flex flex-row-reverse gap-3 mt-3">
                {data.map((item) => (
                  <p key={item} className="bg-[#EAEFF6] rounded-[4px] px-2">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 md:p-5 rounded-b">
              <button
                // onClick={() => {
                //   dispatch(closeModal(false));
                // }}
                type="button"
                className="text-white bg-[#4866CF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 md:py-2.5 text-center"
                onClick={() => handleSave()}
              >
                ذخیره
              </button>
              <div>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  type="button"
                  className={`md:py-2.5 md:px-5 ms-3 px-5 text-sm font-medium focus:outline-none rounded-lg border border-[#4866CF]  bg-white text-[#4866CF]`}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersubmissionModal;
