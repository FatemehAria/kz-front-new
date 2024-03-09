import React from "react";
type FinanceInputProps = {
  label: string;
};
function FinanceInput({ label }: FinanceInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="">{label}</label>
      <input
        type="text"
        className="bg-[#EAEFF6] p-2 outline-none rounded-[4px]"
      />
    </div>
  );
}

export default FinanceInput;
