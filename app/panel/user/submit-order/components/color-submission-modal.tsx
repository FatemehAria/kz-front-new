"use client";
import React from "react";

type ColorSubmissionModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: { title: string; color: string }[];
  setData: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        color: string;
      }[]
    >
  >;
  modalInputValue: {
    title: string;
    color: string;
  };
  setModalInputValue: React.Dispatch<
    React.SetStateAction<{
      title: string;
      color: string;
    }>
  >;
};
function ColorSubmissionModal({
  showModal,
  setShowModal,
  data,
  setData,
  modalInputValue,
  setModalInputValue,
}: ColorSubmissionModalProps) {
  const handleSave = () => {
    if (
      modalInputValue.title.trim() !== "" &&
      modalInputValue.color.trim() !== ""
    ) {
      setData([...data, modalInputValue]);
    }
    setModalInputValue({ title: "", color: "" });
  };
  console.log(data);
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
            <div className="md:p-5 text-black font-semibold grid grid-cols-1 gap-5">
              <input
                type="text"
                className="bg-[#EAEFF6] w-full rounded-[4px] p-2 outline-none"
                autoFocus={true}
                value={modalInputValue.title}
                onChange={(e) =>
                  setModalInputValue((last) => ({
                    ...last,
                    title: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                className="bg-[#EAEFF6] w-full rounded-[4px] p-2 outline-none"
                value={modalInputValue.color}
                onChange={(e) =>
                  setModalInputValue((last) => ({
                    ...last,
                    color: e.target.value,
                  }))
                }
              />
              <div className="flex flex-row-reverse gap-3">
                {data.map((item) => (
                  <p key={item.color} className="bg-[#EAEFF6] rounded-[4px] px-2">
                    {item.color}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 md:p-5 rounded-b">
              <button
                // onClick={() => {
                //   dispatch(openModal(false));
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

export default ColorSubmissionModal;
