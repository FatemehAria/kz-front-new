import React from "react";

type OrdersubmissionInputProps = {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
function OrdersubmissionInput({
  placeholder,
  onChange,
  value,
}: OrdersubmissionInputProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none border-2 border-[#D0DBEC] rounded-[8px] p-3 w-full"
        dir="rtl"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default OrdersubmissionInput;
