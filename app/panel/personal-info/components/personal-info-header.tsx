import React from "react";
type PersonalInfoHeaderProps = {
  step: string;
  setStep?: React.Dispatch<React.SetStateAction<string>>;
};
function PersonalInfoHeader({ step, setStep }: PersonalInfoHeaderProps) {
  return (
    <div className="relative whitespace-nowrap">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "40%",
          height: "100%",
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to left, rgba(72, 102, 207, 1) -5%, rgba(234, 239, 246, 1) 100%) 1",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "45%",
          height: "100%",
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to left, rgba(234, 239, 246, 1) -5%, rgba(72, 102, 207, 1) 100%) 1",
        }}
      ></div>
      <div className="text-center absolute -top-5 left-1/2 text-[20px] -translate-x-1/2 bg-transparent flex flex-row gap-5">
        <button
          className={`rounded-[4px] py-[3%] px-[8%] ${
            step === "Genuine"
              ? "bg-[#4866CF] text-white cursor-default"
              : "bg-[#EAEFF6] text-[#4866CF] cursor-pointer"
          }`}
          onClick={() => setStep && setStep("Genuine")}
        >
          حقیقی
        </button>
        <button
          className={`rounded-[4px] py-[3%] px-[8%] ${
            step === "Legal"
              ? "bg-[#4866CF] text-white cursor-default"
              : "bg-[#EAEFF6] text-[#4866CF] cursor-pointer"
          }`}
          onClick={() => setStep && setStep("Legal")}
        >
          حقوقی
        </button>
      </div>
    </div>
  );
}

export default PersonalInfoHeader;
