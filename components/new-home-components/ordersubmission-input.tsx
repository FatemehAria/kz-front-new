import React from "react";

type OrdersubmissionInputProps = {
  placeholder: string;
};
function OrdersubmissionInput({ placeholder }: OrdersubmissionInputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none border-2 border-[#D0DBEC] rounded-[8px] p-3"
        dir="rtl"
      />
    </div>
  );
}

export default OrdersubmissionInput;
