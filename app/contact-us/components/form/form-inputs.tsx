import React from "react";
type FormInputsProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  pattern?: string;
  name?: string;
  error?: any;
  onChange?: any;
  disabled?: boolean;
  value: string;
};
const FormInput = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  pattern,
  name,
  error,
  disabled,
}: FormInputsProps) => {
  const setLength = () => {
    if (type === "tel") {
      return 11;
    } else {
      return 100;
    }
  };
  let length = setLength();
  return (
    <div className="relative">
      <label
        className={`absolute -top-3 right-4 z-10 bg-white lg:text-[16px] lg:px-2 px-2 ${
          error === "" || !error ? " text-black" : "text-red-600"
        }`}
      >
        {label}
      </label>
      <input
        className={`${
          error === "" || !error
            ? " border-black text-black"
            : "border-red-600 text-red-600"
        } ${
          disabled && "text-center bg-transparent"
        } mx-auto outline-none rounded-md border-2 px-2 py-2 text-lg w-full`}
        placeholder={placeholder}
        type={type}
        dir={`${type === "tel" ? "rtl" : "rtl"}`}
        onChange={onChange}
        maxLength={length}
        value={value}
        required
        autoComplete="off"
        pattern={pattern}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
