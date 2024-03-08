import React from "react";

type OrdersubmissionInputProps = {
  placeholder: string;
};
function OrdersubmissionInput({ placeholder }: OrdersubmissionInputProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none border-2 border-[#D0DBEC] rounded-[8px] p-3 w-full"
        dir="rtl"
      />
    </div>
  );
}

export default OrdersubmissionInput;
