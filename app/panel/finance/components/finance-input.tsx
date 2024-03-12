import React from "react";
type FinanceInputProps = {
  label: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
function FinanceInput({ label, value, onChange }: FinanceInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="">{label}</label>
      <input
        type="text"
        className="bg-[#EAEFF6] p-2 outline-none rounded-[4px]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FinanceInput;
